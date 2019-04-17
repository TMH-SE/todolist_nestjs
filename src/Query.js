import gql from 'graphql-tag'

export const GET_ALL_TASK = gql`
  query getAllTask {
    getAllTask {
      id
      name
      status
    }
  } 
`

export const ADD_TASK = gql`
  mutation addTask ($task: TaskInput!) {
    addTask (task: $task) {
      id
      name
      status
    }
  }
`

export const DELETE_TASK = gql`
  mutation deleteTask ($id: String!) {
    removeTask (id: $id) {
      id
      name
      status
    }
  }
`

export const UPDATE_TASK = gql`
  mutation updateTask ($taskUpdate: TaskUpdate!) {
    updateTask (taskUpdate: $taskUpdate) {
      id
      name
      status
    }
  }
`
