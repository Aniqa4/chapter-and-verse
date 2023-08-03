import { createBrowserRouter } from "react-router-dom";
import Home from "../Home/Home";
import Main from "../Layout/Main";
import BanglaLiterature from "../CategoryOfBooks/BanglaLiterature";
import IslamicBooks from "../CategoryOfBooks/IslamicBooks";
import Science from "../CategoryOfBooks/Science";
import Psychology from "../CategoryOfBooks/Psychology";
import ScienceFiction from "../CategoryOfBooks/ScienceFiction";
import Fiction from "../CategoryOfBooks/Fiction";
import NonFiction from "../CategoryOfBooks/NonFiction";
import Comics from "../CategoryOfBooks/Comics";
import History from "../CategoryOfBooks/History";
import Biography from "../CategoryOfBooks/Biography";
import ChildrensBooks from "../CategoryOfBooks/ChildrensBooks";
import CookBooks from "../CategoryOfBooks/CookBooks";
import AllBooks from "../AllBooks/AllBooks";
import Login from "../Authentication/Login";
import Register from "../Authentication/Register";
import CategoryOfBooks from "../CategoryOfBooks/CategoryOfBooks";
import Wishlist from "../Wishlist/Wishlist";
import Cart from "../Cart/Cart";
import AddBooks from "../AddBooks/AddBooks";

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
                path:'/all-books',
                element:<AllBooks/>
            },
            {
                path:'/add-books',
                element:<AddBooks/>
            },
            {
                path:'/category',
                element:<CategoryOfBooks/>
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
            {
                path:'/category=religion',
                element: <IslamicBooks/>
            },
            {
                path:'/category=bangla-literature',
                element:<BanglaLiterature/>
            },
            {
                path:'/category=science',
                element:<Science/>
            },
            {
                path:'/category=psychology',
                element:<Psychology/>
            },
            {
                path:'/category=science-fiction',
                element:<ScienceFiction/>
            },
            {
                path:'/category=fiction',
                element:<Fiction/>
            },
            {
                path:'/category=non-fiction',
                element:<NonFiction/>
            },
            {
                path:'/category=comics',
                element:<Comics/>
            },
            {
                path:'/category=history',
                element:<History/>
            },
            {
                path:'/category=biography',
                element:<Biography/>
            },
            {
                path:`/category=children's-books`,
                element:<ChildrensBooks/>
            },
            {
                path:'/category=cook-books',
                element:<CookBooks/>
            },

        ]
    }
])

export default router;