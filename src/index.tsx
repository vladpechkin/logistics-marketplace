import React, { createRef, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Provider } from 'react-redux'
import 'leaflet/dist/leaflet.css'
import 'antd/dist/antd.css'
import { store } from './store'
import { Layout } from 'antd'
import offers from './offers.json'
import { selectOffer, useAppDispatch } from './store'
import { Sidebar } from './components/Sidebar'
import { Map } from './components/Map'
import { SplitView } from './components/SplitView'

const App = () => {
  const dispatch = useAppDispatch()
  dispatch(selectOffer(offers[0]))
  return (
    <SplitView left={<Sidebar />} right={<Map/>}/>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
