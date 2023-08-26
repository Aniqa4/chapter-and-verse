import React, { useContext, useEffect, useState } from 'react';
import { MdDeleteForever } from 'react-icons/md'
import Title from '../Components/Title';
import { AuthContext } from '../Authentication/AuthProvider/AuthProvider';

function Wishlist() {
  const [favoriteItems, setFavoriteItems] = useState([])
  const {user}=useContext(AuthContext)
  const email = user?.email

  //get items from local storage
  useEffect(() => {
    const arrayOfItems = localStorage.getItem(email ? email + 'favorites' : 'favorites');
    const favorites = JSON.parse(arrayOfItems);
    setFavoriteItems(favorites)
  }, [])

  //delete from local storage
  const deleteItem = (index) => {
    const arrayOfItems = localStorage.getItem(email ? email + 'favorites' : 'favorites');
    const arrayOfObjects = JSON.parse(arrayOfItems)
    arrayOfObjects.splice(index, 1)
    localStorage.setItem(email ? email + 'favorites' : 'favorites', JSON.stringify(arrayOfObjects));
    setFavoriteItems(arrayOfObjects);
    //console.log(arrayOfObjects);
  }

  console.log(favoriteItems)
  return (
    <div className='pt-1'>
      <Title title={'Favorite Books'} />
      <table className='container mx-auto lg:w-1/3'>
        <tbody>
          {
            favoriteItems && favoriteItems[0] !== undefined ? favoriteItems.map((x, index) =>
              <tr key={index} className=''>
                <td>{index + 1}</td>
                <td><img src={x.bookImage} className='w-16' /></td>
                <td>{x.bookName}</td>
                <td>{x.price} Tk</td>
                <td onClick={() => deleteItem(index)} className=' text-red-800 text-xl'><MdDeleteForever /></td>
              </tr>) : <tr><td>You have not selected any item</td></tr>
          }
        </tbody>
      </table>
    </div>
  )
}

export default Wishlist