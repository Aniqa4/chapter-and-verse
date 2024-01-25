import React, { useEffect, useState } from 'react'
import Title from '../../components/Title';
import Card from '../../components/Card';
import BookCategories from '../../Hooks/BookCategories';

function CategoriesOfBooks() {
  const categories = BookCategories();

  return (
    <div>
      <Title title={'Browse by Genre'}></Title>
      <div className='container px-2 md:px-5 lg:px-0 mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-5'>
        {
          categories?.map((x, index) =>
            <Card key={index}
              image={x.image}
              categoryName={x.name}
              route={`categories/${x.name}`}>
            </Card>)
        }

      </div>
    </div>
  )
}

export default CategoriesOfBooks