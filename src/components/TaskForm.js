import React, { Component } from 'react'
import { Icon, Form, Input, Select, Button, notification } from 'antd'
import { GET_ALL_TASK, ADD_TASK, UPDATE_TASK } from '../Query'
import { compose, graphql } from 'react-apollo'

class TaskForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      status: 'Disabled'
    }
    this.onSubmit = this.onSubmit.bind(this)
  }
  componentWillMount () {
    let { dataEdit } = this.props
    if (dataEdit) {
      this.setState({ name: dataEdit.name, status: dataEdit.status })
    }
  }
  componentWillReceiveProps (newProps) {
    let { dataEdit } = newProps
    this.setState({ name: dataEdit ? dataEdit.name : '', status: dataEdit ? dataEdit.status : 'Disabled' })
  }
  onExitForm () {
    this.props.exitForm()
  }
  onChangeSelect (value) {
    this.setState({ status: value })
  }
  onSubmit (e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (!this.props.dataEdit) {
          let { status } = this.state
          let { name } = values
          this.props.mutate({
            mutation: ADD_TASK,
            variables: { task: { name, status } },
            update: (store, { data: { addTask } }) => {
              const data = store.readQuery({ query: GET_ALL_TASK })
              data.getAllTask.push(addTask)
              store.writeQuery({ query: GET_ALL_TASK, data })
              this.onExitForm()
            }
          }).then(a => this.openNotifi('success', 'Add Task Completetion!'))
            .catch(e => this.openNotifi('error', 'Fail!'))
        } else {
          let id = this.props.dataEdit.id
          let { status } = this.state
          let { name } = values
          this.props.mutate({
            mutation: UPDATE_TASK,
            variables: { taskUpdate: { id, name, status } },
            update: (store, { data: { updateTask } }) => {
              const data = store.readQuery({ query: GET_ALL_TASK })
              data.getAllTask.map((task, i) => task.id === id ? data.getAllTask.splice(i, 1, updateTask) : null)
              store.writeQuery({ query: GET_ALL_TASK, data })
              this.onExitForm()
            }
          }).then(a => this.openNotifi('success', 'Update Task Completetion!'))
            .catch(e => this.openNotifi('error', 'Fail!'))
        }
      }
    })
  }
  openNotifi (type, msg) {
    notification[type]({
      message: msg,
      placement: 'bottomLeft',
      duration: 1.25
    })
  }
  render () {
    let { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.onSubmit} layout='vertical'>
        <Form.Item label='Task Name' >
          {getFieldDecorator('name', {
            initialValue: this.state.name,
            rules: [{
              required: true,
              message: 'Please input task name!'
            }]
          })(<Input name='name' />) }
        </Form.Item>
        <Form.Item label='Status'>
          <Select value={this.state.status} placeholder='Choose a status' onChange={(value) => this.onChangeSelect(value)}>
            <Select.Option value='Actived'>Actived</Select.Option>
            <Select.Option value='Disabled'>Disabled</Select.Option>
          </Select>
        </Form.Item>
        <Button size='large' htmlType='submit' type={'primary'}><Icon type='save' /> Save</Button>
        <Button size='large' type={'danger'} onClick={() => this.onExitForm()}><Icon type='close' /> Cancel</Button>
      </Form>
    )
  }
}

export default compose(graphql(ADD_TASK), graphql(UPDATE_TASK))(Form.create()(TaskForm))
