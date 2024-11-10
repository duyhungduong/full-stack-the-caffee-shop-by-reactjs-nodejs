import React from 'react'
import { Link } from 'react-router-dom'
import CancelImage from '../assest/UX Success GIF.gif'
const Cancel = () => {
  
  return (
    <div className='bg-white  dark:bg-gray-100 dark:border max-w-2xl mx-auto flex justify-center items-center flex-col p-4 mt-10 rounded shadow-md transition-transform transform hover:scale-105 hover:shadow-lg'><img src={CancelImage} alt="" className=''/>
    <p className='text-red-600 font-bold text-xl'>Payment Cancel</p>
    <Link to={"/cart"} className='p-2 px-3 my-2 mt-5 border-2 border-red-600 rounded font-semibold text-red-600 hover:text-white hover:bg-red-600 shadow-md transition-transform transform hover:scale-105 hover:shadow-lg'>Go to cart</Link></div>
  )
}

export default Cancel