import React from 'react'
import Banner from './Banner'
import Gallery from './Gallery'
import FeaturedBooks from './FeaturedBooks'
import CategoriesOfBooks from './CategoriesOfBooks'
import NewArrivals from './NewArrivals'
import BestSellingBooks from './BestSellingBooks'

function Home() {
  return (
    <div>
      <Banner/>
      <FeaturedBooks/>
      <BestSellingBooks/>
      <NewArrivals/>
      <CategoriesOfBooks/>
      <Gallery/>
    </div>
  )
}

export default Home