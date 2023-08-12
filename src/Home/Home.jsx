import React from 'react'
import Banner from './Banner'
import Gallery from './Gallery'
import BooksByCategory from './CategoriesOfBooks'
import FeaturedBooks from './FeaturedBooks'
import CategoriesOfBooks from './CategoriesOfBooks'

function Home() {
  return (
    <div>
      <Banner/>
      <FeaturedBooks/>
      <CategoriesOfBooks/>
      <Gallery/>
    </div>
  )
}

export default Home