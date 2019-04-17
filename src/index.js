import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import 'antd/dist/antd.css'
import * as serviceWorker from './serviceWorker'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

const client = new ApolloClient({ uri: 'https://03p8x23pll.sse.codesandbox.io/graphql' })
const T = () => (
  <ApolloProvider client={client} >
    <App />
  </ApolloProvider>
)
ReactDOM.render(<T />, document.getElementById('root'))
serviceWorker.unregister()
