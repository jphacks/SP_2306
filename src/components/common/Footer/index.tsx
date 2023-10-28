import { Center, Text } from '@chakra-ui/react'
import React from 'react'

const Footer: React.FC = () => {
  const date = new Date()
  const year = date.getFullYear()

  return (
    <Center p={8} as={'footer'}>
      <Text fontSize={'sm'}>since {year}</Text>
    </Center>
  )
}

export default Footer
