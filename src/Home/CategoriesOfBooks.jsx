import React, { useEffect, useState } from 'react'
import Title from '../Components/Title';
import Card from '../Components/Card';

function CategoriesOfBooks() {
  const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('https://chapter-and-verse-server-side.vercel.app/categories')
            .then(res => res.json())
            .then(data => setCategories(data))
    }, []);

  return (
    <div>
      <Title title={'Browse by Genre'}></Title>
      <div className='container px-2 md:px-5 lg:px-0 mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-5'>
        {
          categories?.map((x, index) =>
            <Card key={index} image={x.image} categoryName={x.name} route={`categories/${x.name}`}></Card>)
        }

      </div>
    </div>
  )
}

export default CategoriesOfBooks