import React, { useEffect, useState } from 'react'
import Title from '../Components/Title'
import Card from '../Components/Card'
import { Link } from 'react-router-dom'

function CategoriesOfBooks() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('https://chapter-and-verse-server-side.vercel.app/categories')
            .then(res => res.json())
            .then(data => setCategories(data))
    }, []);

    return (
        <div className=' container mx-auto pt-1'>
            <Title title={'Category of Books'}></Title>
            <div className=' mb-5 grid grid-cols-4 lg:grid-cols-12 gap-2 p-2'>
                {
                    categories?.map((x, index) =>
                        <button key={index} className=' border'><Link to={`${x.name}`}>{x.name}</Link></button>)
                }
            </div>
            <div className=' container px-2 md:px-5 lg:px-0 mx-auto grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-5'>
                {
                    categories?.map((x, index) =>
                        <Card key={index} image={x.image} categoryName={x.name} route={`${x.name}`}
                            description={x.description}></Card>)
                }
            </div>
        </div>
    )
}

export default CategoriesOfBooks