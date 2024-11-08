import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SummaryApi from '../common'
import VerticalCard from '../components/VerticalCard'

const SearchProduct = () => {
    const query = useLocation()
    console.log("query",query.search)
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)


    const fetchProduct = async()=>{
        setLoading(true)
        const response = await fetch(SummaryApi.searchProduct.url+query.search)
        const dataResponse = await response.json()

        setLoading(false)

        setData(dataResponse.data)
    }


    useEffect(()=>{
        fetchProduct()
    },[query])
  return (
    <div className='container mx-auto p-4'>
      {loading && (
        <div className='flex justify-center items-center h-40'>
          <div className='loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4'></div>
          <p className='text-lg text-center ml-4'>Loading ...</p>
        </div>
      )}
 
      <p className='text-lg font-semibold my-3'>Search Results : {data.length}</p>

      {
        data.length === 0 && !loading && (
           <p className='bg-white text-lg text-center p-4'>No Data Found....</p>
        )
      }


      {
        data.length !==0 && !loading && (
          <VerticalCard loading={ loading} data={data}/>
        )
      }
{/* <VerticalCardProduct loading={ loading} data={data}/> */}
    </div>
  )
}

export default SearchProduct