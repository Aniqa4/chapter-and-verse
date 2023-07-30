import React from 'react'
import Title from '../Components/Title';
import banglaLiterature from '../assets/booksByCategory/bangla-literature.jpg'
import biography from '../assets/booksByCategory/biography.jpg'
import religion from '../assets/booksByCategory/religion.jpg'
import history from '../assets/booksByCategory/history.jpg'
import nonFiction from '../assets/booksByCategory/non-fiction.jpg'
import psychology from '../assets/booksByCategory/psychology.png'
import SciFi from '../assets/booksByCategory/science-fiction.jpg'
import cookBook from '../assets/booksByCategory/cook-book.jpg'
import science from '../assets/booksByCategory/science.jpg'
import comics from '../assets/booksByCategory/comics.jpg'
import childrensBook from '../assets/booksByCategory/childrens-book.jpg'
import fiction from '../assets/booksByCategory/fiction.jpg'
import Card from '../Components/Card';

function BooksByCategory() {
  return (
    <div>
        <Title title={'Browse by Genre'}></Title>
        <div className=' container px-2 md:px-5 lg:px-0 mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-5'>
            <Card image={banglaLiterature} categoryName={'Bangla Literature'} route={'/category=bangla-literature'}></Card>
            <Card image={religion} categoryName={'Religion'} route={'/category=religion'}></Card>
            <Card image={fiction} categoryName={'Fiction'} route={'/category=fiction'}></Card>
            <Card image={SciFi} categoryName={'Science Fiction(Sci-Fi)'} route={'/category=science-fiction'}></Card>
            <Card image={nonFiction} categoryName={'Non Fiction'} route={'/category=non-fiction'}></Card>
            <Card image={biography} categoryName={'Biography'} route={'/category=biography'}></Card>
            <Card image={history} categoryName={'History'}  route={'/category=history'}></Card>
            <Card image={comics} categoryName={'Comics'}  route={'/category=comics'}></Card>
            <Card image={science} categoryName={'Science'}  route={'/category=science'}></Card>
            <Card image={psychology} categoryName={'Psychology'}  route={'/category=psychology'}></Card>
            <Card image={cookBook} categoryName={'Cook Books'}  route={'/category=cook-books'}></Card>
            <Card image={childrensBook} categoryName={`Children's Books`}  route={`/category=children's-books`}></Card>
        </div>
    </div>
  )
}

export default BooksByCategory