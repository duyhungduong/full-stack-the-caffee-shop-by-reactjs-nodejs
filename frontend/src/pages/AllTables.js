import React, { useEffect, useState } from 'react'
import UploadTable from '../components/UploadTable'
import SummaryApi from '../common'
import AdminTableCard from '../components/AdminTableCard'

const AllTables = () => {
  const [openUploadTable, setOpenUploadTable] = useState(false)
  const [allTable, setAllTable] =useState([])

  const fetchAllTable = async() =>{
    const response = await fetch(SummaryApi.allTable.url)

    const dataResponse = await response.json()

    setAllTable(dataResponse?.data || []) 
  }
  useEffect(()=>{
    fetchAllTable()
  }, [])

  return (
    <div><div className='bg-coffee-beige py-2 px-4 flex justify-between items-center'>
    <h2 className='font-bol text-lg text-coffee-dark'>All Table</h2>
    <button className='border border-[#0091daa7] bg-[#0090da] text-white hover:bg-white hover:text-[#0091daa7] py-2 px-4 rounded-md' onClick={()=>setOpenUploadTable(true)}>Upload Table</button>
  </div>

  <div className='grid grid-cols-1 justify-items-center sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6 bg-gray-100 overflow-y-scroll h-[calc(100vh-190px)]'>
        {
          allTable.map((product, index) => {
            return(
              <AdminTableCard data={product} key={index+ product} fetchdata={fetchAllTable}/>
              
            )
          })
        }
      </div>
  {
    openUploadTable && (
          <UploadTable onClose={()=>setOpenUploadTable(false)} 
          fetchData={fetchAllTable}

          />
        )
      }
  </div>
  )
}

export default AllTables