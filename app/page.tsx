'use client'

import { Box } from '@chakra-ui/react'

import { Banner } from '@/components/banner'
import { Contribute } from '@/components/Contribute'
import { FeaturedVideo } from '@/components/featured-video'
import { Footer } from '@/components/footer'
import { Hero } from '@/components/hero'
import { LatestPostsBlock } from '@/components/latest-post-block'
import Nav from '@/components/nav'
import { Stats } from '@/components/stats'

export default function Home() {
  return (
    <Box overflow='hidden'>
      <Banner />
      <Nav />
      <Hero />
      <Contribute />
      <LatestPostsBlock />
      <Stats />
      <FeaturedVideo />
      <Footer />
    </Box>
  )
}
