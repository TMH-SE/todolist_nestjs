import React, { Component } from 'react'
import { Button, Row, Icon, Col, Input } from 'antd'

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
          <Col span={12} className='searchcontrol'>
            <Input.Search
              placeholder='Enter key words'
              enterButton
              onSearch={this.onSearch.bind(this)}
            />
          </Col>
        </Row>
      </div>
    )
  }
}
