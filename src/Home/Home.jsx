import React from 'react'
import Banner from './Banner'
import Gallery from './Gallery'
import FeaturedBooks from './FeaturedBooks'
import CategoriesOfBooks from './CategoriesOfBooks'
import NewArrivals from './NewArrivals'

function Home() {
  return (
    <div>
      <Banner/>
      <FeaturedBooks/>
      <NewArrivals/>
      <CategoriesOfBooks/>
      <Gallery/>
    </div>
  )
}

export default Home