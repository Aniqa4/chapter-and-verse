import React, { useContext, useEffect, useState } from 'react';
import { MdDeleteForever } from 'react-icons/md'
import Title from '../../components/Title';
import { AuthContext } from '../../authProvider/AuthProvider';
import { useDispatch } from 'react-redux';
import { CartItems } from '../../redux/features/cart/cartSlice';

function Cart() {
  const [cartItems, setCartItems] = useState([])
  const {user}=useContext(AuthContext)
  const dispatch = useDispatch()
  const email = user?.email;

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
    dispatch(CartItems(cartItems.length-1))
    //console.log(arrayOfObjects);
  }
   

  return (
    <div className='pt-1'>
      <Title title={'Cart'} />
      <table className='container mx-auto  text-gray-600 font-semibold'>
        <tbody>
          {
            cartItems && cartItems[0] !== undefined ? cartItems.map((x, index) =>
              <tr key={index} className='border-b'>
                <td>{index + 1}</td>
                <td><img src={x.bookImage} className='w-16' /></td>
                <td>{x.bookName}</td>
                <td>{x.price} Tk</td>
                <td onClick={() => deleteItem(index)} className=' text-red-800 text-xl'><MdDeleteForever /></td>
              </tr>) : <tr><td className='text-red-700 pb-10 text-center'>You have not selected any item</td></tr>
          }
        </tbody>
      </table>
    </div>
  )
}

export default Cart