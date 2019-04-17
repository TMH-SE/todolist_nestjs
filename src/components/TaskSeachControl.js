import React, { Component } from 'react'
import { Input, Col } from 'antd'

export default class TaskSeachControl extends Component {
  onSearch (v) {
    this.props.onSearch(v)
  }
  render () {
    return (
      <Col span={12} className='searchcontrol'>
        <Input.Search
          placeholder='Enter key words'
          enterButton
          onSearch={this.onSearch.bind(this)}
        />
      </Col>
    )
  }
}
