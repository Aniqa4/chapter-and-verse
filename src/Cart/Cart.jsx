import React, { useContext, useEffect, useState } from 'react';
import { MdDeleteForever } from 'react-icons/md'
import Title from '../Components/Title';
import { AuthContext } from '../Authentication/AuthProvider/AuthProvider';

function Cart() {
  const [cartItems, setCartItems] = useState([])
  const {user}=useContext(AuthContext)
  const email = user?.email

  //get items from local storage
  useEffect(() => {
    const arrayOfItems = localStorage.getItem(email ? email + 'cart' : 'cart');
    const cart = JSON.parse(arrayOfItems);
    setCartItems(cart)
  }, [])

  //delete from local storage
  const deleteItem = (index) => {
    const arrayOfItems = localStorage.getItem(email ? email + 'cart' : 'cart');
    const arrayOfObjects = JSON.parse(arrayOfItems)
    arrayOfObjects.splice(index, 1)
    localStorage.setItem(email ? email + 'cart' : 'cart', JSON.stringify(arrayOfObjects));
    setCartItems(arrayOfObjects);
    //console.log(arrayOfObjects);
  }

  return (
    <div className='pt-1'>
      <Title title={'Cart'} />
      <table className='container mx-auto'>
        <tbody>
          {
            cartItems && cartItems[0] !== undefined ? cartItems.map((x, index) =>
              <tr key={index} className='border-b'>
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

export default Cart