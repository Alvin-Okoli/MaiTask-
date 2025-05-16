import { useState } from 'react'
import './App.css'
import Nav from './reusable component/Nav'

import {
  createBrowserRouter,
  createRoutesFromChildren, 
  RouterProvider,
  Route
} 
from 'react-router'

const router = createBrowserRouter(
  createRoutesFromChildren(
    <>
      <Route path='/' element={<div>Hello</div>}/>
    </>
  )
)

function App() {

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App

