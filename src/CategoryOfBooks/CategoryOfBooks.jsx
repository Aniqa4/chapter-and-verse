import React, { useEffect, useState } from 'react'
import Title from '../Components/Title'
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
import Card from '../Components/Card'

function CategoryOfBooks() {

    const [description, setDescription] = useState([]);

    useEffect(() => {
        fetch('description.json')
            .then(res => res.json())
            .then(data => setDescription(data.categories))
    }, []);

    //console.log(description);


    return (
        <div className=' container mx-auto pt-1'>
            <Title title={'Category of Books'}></Title>
            <div className=' mb-5 grid grid-cols-4 lg:grid-cols-12 gap-2 p-2'>
                {
                    description.map((x,index)=>
                        <button key={index} className=' border'>{x.name}</button>)
                }
            </div>
            <div className=' container px-2 md:px-5 lg:px-0 mx-auto grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-5'>
                <Card image={banglaLiterature} categoryName={'Bangla Literature'} route={'/category=bangla-literature'}
                description={description[11]?.description}></Card>
                <Card image={religion} categoryName={'Religion'} route={'/category=religion'} description={description[6]?.description}></Card>
                <Card image={fiction} categoryName={'Fiction'} route={'/category=fiction'} description={description[0]?.description}></Card>
                <Card image={SciFi} categoryName={'Science Fiction'} route={'/category=science-fiction'} description={description[2]?.description}></Card>
                <Card image={nonFiction} categoryName={'Non Fiction'} route={'/category=non-fiction'} description={description[1]?.description}></Card>
                <Card image={biography} categoryName={'Biography'} route={'/category=biography'} description={description[3]?.description}></Card>
                <Card image={history} categoryName={'History'} route={'/category=history'} description={description[6]?.description}></Card>
                <Card image={comics} categoryName={'Comics'} route={'/category=comics'} description={description[7]?.description}></Card>
                <Card image={science} categoryName={'Science'} route={'/category=science'} description={description[9]?.description}></Card>
                <Card image={psychology} categoryName={'Psychology'} route={'/category=psychology'} description={description[8]?.description}></Card>
                <Card image={cookBook} categoryName={'Cook Books'} route={'/category=cook-books'} description={description[5]?.description}></Card>
                <Card image={childrensBook} categoryName={`Children's Books`} route={`/category=children's-books`} 
                description={description[4]?.description}></Card>
            </div>
        </div>
    )
}

export default CategoryOfBooks