

import * as React from 'react'
import { providersApi, useGetProvidersByNameQuery} from '@/services/providers'
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button
} from '@chakra-ui/react'


export default function Testtable() {

  const { data, error, isLoading  } = useGetProvidersByNameQuery("providers");


const renderProviders = () => {
  if(!isLoading){

    var myarray = new Array()
    myarray = data.Data;

    return myarray.map(({id, providerId, providerName, providerUrl, providerPort}) => {
      return <tr key={id} >
        <td>{providerName}</td>
        <td><Button colorScheme='blue' size='xs'>Visit</Button></td>
        </tr>
    })
  }
  
}


    return (
    <TableContainer>
      <Table size='sm' variant='simple'>
        <Thead>
          <Tr>
            <Th>Providers</Th>
          </Tr>
        </Thead>
        <Tbody>
        {renderProviders()}
        </Tbody>
      </Table>
    </TableContainer>
   
     )
   }
   
  
