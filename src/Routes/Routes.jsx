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
                path:'/category=islamic-books',
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