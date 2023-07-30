import React from 'react'
import Banner from './Banner'
import Gallery from './Gallery'
import BooksByCategory from './BooksByCategory'
import FeaturedBooks from './FeaturedBooks'

function Home() {
  return (
    <div>
      <Banner></Banner>
      <FeaturedBooks></FeaturedBooks>
      <BooksByCategory></BooksByCategory>
      <Gallery></Gallery>
    </div>
  )
}

export default Home