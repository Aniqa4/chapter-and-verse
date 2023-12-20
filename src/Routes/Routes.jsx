import { createBrowserRouter } from "react-router-dom";
import Home from "../home/Home";
import Main from "../Layout/Main";
import AllBooks from "../AllBooks/AllBooks";
import Login from "../Authentication/Login";
import Register from "../Authentication/Register";
import CategoriesOfBooks from "../CategoriesOfBooks/CategoriesOfBooks";
import AddBooks from "../AllBooks/AddBooks";
import Authors from "../Authors/Authors";
import Publishers from "../publishers/Publishers";
import BooksByCategory from "../categoriesOfBooks/BooksByCategory";
import AddAuthors from "../authors/AddAuthors";
import AddPublishers from "../publishers/AddPublishers";
import AddNewCategory from "../CategoriesOfBooks/AddNewCategory";
import BookDetails from "../CategoriesOfBooks/BookDetails";
import UpdateBooks from "../AllBooks/UpdateBooks";
import UpdateAuthor from "../Authors/UpdateAuthor";
import BooksByAuthor from "../Authors/BooksByAuthor";
import UpdatePublisher from "../publishers/UpdatePublisher";
import BooksByPublisher from "../publishers/BooksByPublisher";
import DeleteBooks from "../AllBooks/DeleteBooks";
import Dashboard from "../Dashboard/Dashboard";
import Cart from "../cart/Cart";
import Wishlist from "../Wishlist/Wishlist";
import ManageUsers from "../Dashboard/adminDashboard/ManageUsers";
import DashboardHome from "../Dashboard/adminDashboard/DashboardHome";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: 'books',
                element: <AllBooks />
            },
            {
                path: '/dashboard/manage-books/add-books',
                element: <AddBooks />
            },
            {
                path: '/categories',
                element: <CategoriesOfBooks />
            },
            {
                path: `/categories/:name`,
                element: <BooksByCategory />
            },
            {
                path: `/categories/:name/:bookName`,
                element: <BookDetails />
            },
            {
                path: `/categories/:name/:bookName/update-book`,
                element: <UpdateBooks />
            },
            {
                path: '/authors',
                element: <Authors />
            },
            {
                path: '/authors/:name',
                element: <BooksByAuthor />
            },
            {
                path: '/authors/:id/update-authors',
                element: <UpdateAuthor />
            },
            {
                path: '/publishers',
                element: <Publishers />
            },
            {
                path: '/publishers/:name',
                element: <BooksByPublisher />
            },
            {
                path: '/publishers/:id/update-publisher',
                element: <UpdatePublisher />
            },
            {
                path: '/log-in',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/dashboard',
                element: <Dashboard />,
                children: [
                    {
                        path: '/dashboard',
                        element: <DashboardHome />
                    },
                    {
                        path: 'manage-users',
                        element: <ManageUsers />
                    },
                    {
                        path: 'manage-books',
                        element: <DeleteBooks />
                    },
                    {
                        path: 'add-publishers',
                        element: <AddPublishers />
                    },
                    {
                        path: 'add-authors',
                        element: <AddAuthors />
                    },
                    {
                        path: 'add-new-category',
                        element: <AddNewCategory />
                    },
                ]
            },
            {
                path: '/wishlist',
                element: <Wishlist />
            },
            {
                path: '/cart',
                element: <Cart />
            },
        ]
    }
])

export default router;