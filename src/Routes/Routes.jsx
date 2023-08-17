import { createBrowserRouter } from "react-router-dom";
import Home from "../Home/Home";
import Main from "../Layout/Main";
import AllBooks from "../AllBooks/AllBooks";
import Login from "../Authentication/Login";
import Register from "../Authentication/Register";
import CategoriesOfBooks from "../CategoriesOfBooks/CategoriesOfBooks";
import Wishlist from "../Wishlist/Wishlist";
import Cart from "../Cart/Cart";
import AddBooks from "../AllBooks/AddBooks";
import Authors from "../Authors/Authors";
import Publishers from "../Publishers/Publishers";
import BooksByCategory from "../CategoriesOfBooks/BooksByCategory";
import AddAuthors from "../Authors/AddAuthors";
import AddPublishers from "../Publishers/AddPublishers";
import AddNewCategory from "../CategoriesOfBooks/AddNewCategory";
import BookDetails from "../CategoriesOfBooks/BookDetails";
import UpdateBooks from "../AllBooks/UpdateBooks";
import UpdateAuthor from "../Authors/UpdateAuthor";
import BooksByAuthor from "../Authors/BooksByAuthor";
import UpdatePublisher from "../Publishers/UpdatePublisher";
import BooksByPublisher from "../Publishers/BooksByPublisher";

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
                path:'categories/add-new-category',
                element:<AddNewCategory/>
            },
            {
                path:`/categories/:name`,
                element:<BooksByCategory/>
            },
            {
                path:`/categories/:name/:bookName`,
                element:<BookDetails/>
            },
            {
                path:`/categories/:name/:bookName/update-book`,
                element:<UpdateBooks/>
            },
            {
                path:'/authors',
                element:<Authors/>
            },
            {
                path:'/authors/:name',
                element:<BooksByAuthor/>
            },
            {
                path:'/authors/add-authors',
                element:<AddAuthors/>
            },
            {
                path:'/authors/:id/update-authors',
                element:<UpdateAuthor/>
            },
            {
                path:'/publishers',
                element:<Publishers/>
            },
            {
                path:'/publishers/:name',
                element:<BooksByPublisher/>
            },
            {
                path:'/publishers/:id/update-publisher',
                element:<UpdatePublisher/>
            },
            {
                path:'/publishers/add-publishers',
                element:<AddPublishers/>
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