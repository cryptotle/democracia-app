import { VStack } from '@chakra-ui/react'
import { Form } from 'formik'
import React from 'react'

interface Props {
    children: React.ReactNode
}

export default function FieldsContainer( {children}:Props ) {
  return (
    <Form style={{width:"100%"}}>
        <VStack spacing="30px">
            {children}
        </VStack>
    </Form>
  )
}
