import { ChakraProvider } from '@chakra-ui/react'
import { DefaultSeo } from 'next-seo'

import Layout from '@/components/common/Layout'

import SEO from '../../next-seo.config'
import customTheme from '../styles/theme'

import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={customTheme}>
      <DefaultSeo {...SEO} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  )
}

export default MyApp
