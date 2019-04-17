import React, { Component } from 'react'
import { Table } from 'antd'
import TaskListAction from './TaskListAction'
import { compose, graphql } from 'react-apollo'
import { GET_ALL_TASK, UPDATE_TASK } from '../Query'
class TaskList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tasks: []
    }
    this.columns = [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '40%',
      sorter: (a, b) => (a.name).localeCompare(b.name),
      sortDirections: ['ascend', 'descend']
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: '30%',
      filters: [
        { text: 'Actived', value: 'Actived' },
        { text: 'Disabled', value: 'Disabled' }
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
      render: (text, record) => <label className={`${text.toLowerCase()}`} onClick={this.onUpdateStatus.bind(this, record)}>{text}</label>
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (t, r) => <TaskListAction updateTask={this.onUpdateTask.bind(this, r)} taskID={r.id} />
    }]
  }
  componentWillReceiveProps () {
    this.setState({ tasks: this.props.data.getAllTask })
  }
  onUpdateTask (r) {
    this.props.updateTask(r.id)
  }
  onUpdateStatus (record) {
    let tasks = this.props.data.getAllTask
    let taskEdit = tasks.filter(task => task.id === record.id)[0]
    taskEdit.status = taskEdit.status === 'Disabled' ? 'Actived' : 'Disabled'
    let { id, name, status } = taskEdit
    this.props.mutate({
      variables: { taskUpdate: { id, name, status } },
      update: (store, { data: { updateTask } }) => {
        const data = store.readQuery({ query: GET_ALL_TASK })
        data.getAllTask.map((task, i) => task.id === id ? data.getAllTask.splice(i, 1, updateTask) : null)
        store.writeQuery({ query: GET_ALL_TASK, data })
      }
    })
  }
  render () {
    let { filterKey } = this.props
    let { tasks } = this.state
    if (filterKey !== '') {
      tasks = tasks.filter(task => task.name.toLowerCase().indexOf(filterKey.toLowerCase()) !== -1)
    }
    return (
      <div className='task-list'>
        <Table loading={!this.props.data.getAllTask} columns={this.columns} dataSource={tasks} bordered scroll={{ y: 300 }} rowKey={(r) => r.id} />
      </div>
    )
  }
}
export default compose(graphql(GET_ALL_TASK), graphql(UPDATE_TASK))(TaskList)
