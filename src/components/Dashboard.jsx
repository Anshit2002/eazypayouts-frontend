import React from 'react'
import Leftbar from './Leftbar'
import Rightbar from './Rightbar'

const Dashboard = () => {
  return (
    <div className='w-screen h-screen bg-red-500 flex flex-row'>
        <Leftbar/>
        <Rightbar/>
    </div>
  )
}

export default Dashboard