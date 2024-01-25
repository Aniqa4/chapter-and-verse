import React from 'react'
import Banner from './Banner'
import FeaturedBooks from './FeaturedBooks'
import CategoriesOfBooks from './CategoriesOfBooks'
import NewArrivals from './NewArrivals'
import BestSellingBooks from './BestSellingBooks'
import SearchBooks from './SearchBooks'

function Home() {
  return (
    <div>
      <Banner/>
      <SearchBooks/>
      <FeaturedBooks/>
      <CategoriesOfBooks/>
      <BestSellingBooks/>
      <NewArrivals/>
    </div>
  )
}

export default Home