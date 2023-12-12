import React, { useContext, useEffect, useState } from 'react';
import { MdDeleteForever } from 'react-icons/md'
import Title from '../Components/Title';
import { AuthContext } from '../Authentication/AuthProvider/AuthProvider';
import WishlistToCart from '../Hooks/WishlistToCart';

function Wishlist() {
  const [favoriteItems, setFavoriteItems] = useState([]);
  const {handleCart}=WishlistToCart()
  const {user}=useContext(AuthContext)
  const email = user?.email;

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


  return (
    <div className='pt-1 '>
      <Title title={'Favorite Books'} />
      <table className='container mx-auto  text-gray-600 font-semibold'>
        <tbody>
          {
            favoriteItems && favoriteItems[0] !== undefined ? favoriteItems?.map((x, index) =>
              <tr key={index} className='border-b'>
                <td>{index + 1}</td>
                <td><img src={x.bookImage} className='w-16' /></td>
                <td className=''>{x.bookName}</td>
                <td>{x.price} Tk</td>
                <td onClick={()=>handleCart(x.product_id,x.bookName,x.bookImage,x.price,email,index,setFavoriteItems)} className='underline text-blue-600'>Add to Cart</td>
                <td onClick={() => deleteItem(index)} className=' text-red-800 text-xl'><MdDeleteForever /></td>
              </tr>) : <tr><td className='text-red-700 pb-10 text-center'>You have not selected any item</td></tr>
          }
        </tbody>
      </table>
    </div>
  )
}

export default Wishlist