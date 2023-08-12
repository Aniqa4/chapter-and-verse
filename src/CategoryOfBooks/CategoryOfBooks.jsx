import React, { useEffect, useState } from 'react'
import Title from '../Components/Title'
import Card from '../Components/Card'
import { Link } from 'react-router-dom'

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
                    description?.map((x, index) =>
                        <button key={index} className=' border'><Link to={`category=/${x.name}`}>{x.name}</Link></button>)
                }
            </div>
            <div className=' container px-2 md:px-5 lg:px-0 mx-auto grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-5'>
                {
                    description?.map((x, index) =>
                        <Card image={x.image} categoryName={x.name} route={`category=/${x.name}`}
                            description={x.description}></Card>)
                }
            </div>
        </div>
    )
}

export default CategoryOfBooks