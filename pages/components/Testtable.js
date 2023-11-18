

import * as React from 'react'
import { providersApi,useGetRoomsQuery} from '@/services/providers'


export default function Testtable() {

  const { data, error, isLoading  } = useGetRoomsQuery("Rooms");



  const renderHeader = () => {
    return(
        <tr>
            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Network Name</th>
            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">ID</th>
            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">URL</th>
            <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Port</th>
          </tr>
    )
    
  }



const renderRooms = () => {
  if(!isLoading){

    var myarray = new Array()
    myarray = data.Data;

    console.dir(myarray);
    return(
     <p>{JSON.stringify(data)}</p> 
    )
   

    // return myarray.map(({id, providerId, providerName, providerUrl, providerPort}) => {
    //   return <tr key={id} className="hover:bg-gray-100 dark:hover:bg-gray-700" >
    //     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">{providerName}</td>
    //     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{providerId}</td>
    //     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{providerUrl}</td>
    //     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{providerPort}</td>
    //     <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
    //       <button type="button" className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">Delete</button>
    //     </td>
    //     </tr>
    // })
  }
  
}


    return (
   <div className="container mx-auto">
     <div className="flex flex-col">
     <div className="-m-1.5 overflow-x-auto">
       <div className="p-1.5 min-w-full inline-block align-middle">
         <div className="overflow-hidden">
           <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
           {renderHeader()}
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {renderRooms()}
             </tbody>
           </table>
         </div>
       </div>
     </div>
   </div>
   </div>
   
     )
   }
   
