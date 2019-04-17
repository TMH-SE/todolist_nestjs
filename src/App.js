import React, { Component } from 'react'
import './App.css'
import TaskForm from './components/TaskForm'
import { Row, Col, Card, Icon } from 'antd'
import TaskControl from './components/TaskControl'
import TaskList from './components/TaskList'
import { compose, graphql } from 'react-apollo'
import { GET_ALL_TASK } from './Query'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tasks: [],
      isDisplayForm: false,
      titleFrm: '',
      taskEdit: null,
      searchKey: ''
    }
    this.onUpdateTask = this.onUpdateTask.bind(this)
    this.onSearch = this.onSearch.bind(this)
  }
  onToggleForm () {
    if (this.state.taskEdit) {
      this.setState({ isDisplayForm: true, titleFrm: 'Add Task', taskEdit: null })
    } else {
      this.setState({ isDisplayForm: !this.state.isDisplayForm, titleFrm: 'Add Task', taskEdit: null })
    }
  }
  onExitForm () {
    this.setState({ isDisplayForm: false })
  }
  onUpdateTask (id) {
    let tasks = this.props.data.getAllTask
    let taskEdit = tasks.filter(task => task.id === id)
    this.setState({ taskEdit: taskEdit[0], isDisplayForm: true, titleFrm: 'Modify Task' })
  }
  onSearch (v) {
    this.setState({ searchKey: v })
  }
  render () {
    let { isDisplayForm, taskEdit } = this.state
    let elmFrm = isDisplayForm
      ? (
        <Card
          title={this.state.titleFrm}
          extra={<Icon type='close-circle' onClick={() => this.onExitForm()} />}
          style={{ width: 300 }}
          headStyle={{ backgroundColor: '#f7f7f7' }}
        >
          <TaskForm dataEdit={taskEdit} exitForm={() => this.onExitForm()} />
        </Card>
      ) : ''
    return (
      <div className='container'>
        <div className='header'>
          <h1>Todo List</h1>
        </div>
        <Row>
          <Col span={isDisplayForm ? 8 : 0}>
            { elmFrm }
          </Col>
          <Col span={isDisplayForm ? 16 : 24}>
            <TaskControl onSearch={this.onSearch} toggleForm={() => this.onToggleForm()} />
            <TaskList updateTask={this.onUpdateTask} filterKey={this.state.searchKey} />
          </Col>
        </Row>
      </div>
    )
  }
}

export default compose(graphql(GET_ALL_TASK))(App)
