import '../globals.css'

import { Box } from '@chakra-ui/react'
import type { Metadata } from 'next'
import Script from 'next/script'

import { Banner } from '@/components/banner'
import { Footer } from '@/components/footer'
import Nav from '@/components/nav'

export const metadata: Metadata = {
  title: 'Morpheus',
  description: 'Decentralized open-source AI project',
}

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box>
      <Script id='embed'>
        {`(function(w,d,e,u,f,l,n){w[f]=w[f]||function(){(w[f].q=w[f].q||[])
      .push(arguments);},l=d.createElement(e),l.async=1,l.src=u,
      n=d.getElementsByTagName(e)[0],n.parentNode.insertBefore(l,n);})
      (window,document,'script','https://assets.mailerlite.com/js/universal.js','ml');
      ml('account', '706158');`}
      </Script>
      <Banner />
      <Nav />
      {children}
      <Footer />
    </Box>
  )
}
