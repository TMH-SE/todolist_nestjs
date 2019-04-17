import React, { Component } from 'react'
import { Button, Icon, Popconfirm, notification } from 'antd'
import { GET_ALL_TASK, DELETE_TASK } from '../Query'
import { compose, graphql } from 'react-apollo'

class TaskListAction extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.onUpdateTask = this.onUpdateTask.bind(this)
    this.onDeleteTask = this.onDeleteTask.bind(this)
  }
  onUpdateTask () {
    this.props.updateTask()
  }
  onDeleteTask () {
    let id = this.props.taskID
    this.props.mutate({
      variables: { id },
      update: (store, { data: { removeTask } }) => {
        const data = store.readQuery({ query: GET_ALL_TASK })
        data.getAllTask.map((task, i) => task.id === removeTask.id ? data.getAllTask.splice(i, 1) : null)
        store.writeQuery({ query: GET_ALL_TASK, data })
      }
    }).then(a => this.openNotifi('success', 'Delete Task Completetion!'))
      .catch(e => this.openNotifi('error', 'Fail!'))
  }
  openNotifi (type, msg) {
    notification[type]({
      message: msg,
      placement: 'bottomLeft',
      duration: 1.25
    })
  }
  render () {
    return (
      <div>
        <Button onClick={this.onUpdateTask} type='primary'><Icon type='edit' /> Modify</Button>
        <Popconfirm placement='topLeft' title='Are you sure?' onConfirm={this.onDeleteTask} okText='Yes' cancelText='No'>
          <Button type='danger'><Icon type='delete' /> Delete</Button>
        </Popconfirm>
      </div>
    )
  }
}
export default compose(graphql(DELETE_TASK))(TaskListAction)
