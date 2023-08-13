import { createBrowserRouter } from "react-router-dom";
import Home from "../Home/Home";
import Main from "../Layout/Main";
import AllBooks from "../AllBooks/AllBooks";
import Login from "../Authentication/Login";
import Register from "../Authentication/Register";
import CategoriesOfBooks from "../CategoriesOfBooks/CategoriesOfBooks";
import Wishlist from "../Wishlist/Wishlist";
import Cart from "../Cart/Cart";
import AddBooks from "../AddBooks/AddBooks";
import Authors from "../Authors/Authors";
import Publishers from "../Publishers/Publishers";
import BooksByCategory from "../CategoriesOfBooks/BooksByCategory";

const router=createBrowserRouter([
    {
        path:"/",
        element:<Main/>,
        children:[
            {
                path:'/',
                element:<Home/>
            },
            {
                path:'/books',
                element:<AllBooks/>
            },
            {
                path:'books/add-books',
                element:<AddBooks/>
            },
            {
                path:'/categories',
                element:<CategoriesOfBooks/>
            },
            {
                path:`/categories/:name`,
                element:<BooksByCategory/>
            },
            {
                path:'/authors',
                element:<Authors/>
            },
            {
                path:'/publishers',
                element:<Publishers/>
            },
            {
                path:'/wishlist',
                element:<Wishlist/>
            },
            {
                path:'/cart',
                element:<Cart/>
            },
            {
                path:'/log-in',
                element:<Login/>
            },
            {
                path:'/register',
                element:<Register/>
            },
        ]
    }
])

export default router;