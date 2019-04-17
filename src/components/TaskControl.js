import React, { Component } from 'react'
import { Button, Row, Icon } from 'antd'
import TaskSeachControl from './TaskSeachControl'

export default class TaskControl extends Component {
  onToggleForm () {
    this.props.toggleForm()
  }
  onSearch (v) {
    this.props.onSearch(v)
  }
  render () {
    return (
      <div className='task-control'>
        <Button type={'primary'} onClick={this.onToggleForm.bind(this)}><Icon type='plus' /> Add Task</Button>
        <Row className='control'>
          <TaskSeachControl onSearch={this.onSearch.bind(this)} />
        </Row>
      </div>
    )
  }
}
