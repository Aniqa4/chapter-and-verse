import React from 'react'
import Banner from './Banner'
import Gallery from './Gallery'
import BooksByCategory from './BooksByCategory'

function Home() {
  return (
    <div>
      <Banner></Banner>
      <BooksByCategory></BooksByCategory>
      <Gallery></Gallery>
    </div>
  )
}

export default Home