import { Box, useColorModeValue } from '@chakra-ui/react'
import React from 'react'

import Footer from '../Footer'
import Header from '../Header'
import Main from '../Main'

const Layout: React.FC = ({ children }) => {
  const bgColor = useColorModeValue('gray.100', 'gray.700')

  return (
    <>
      <Box
        display={'flex'}
        flexDirection={'column'}
        minH={'calc(100vh)'}
        backgroundColor={bgColor}
      >
        <Header />
        <Main>{children}</Main>
        <Footer />
      </Box>
    </>
  )
}

export default Layout
