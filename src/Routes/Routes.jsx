import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/Home";
import AllBooks from "../pages/allBooks/AllBooks";
import AddBooks from "../pages/allBooks/AddBooks";
import CategoriesOfBooks from "../pages/categoriesOfBooks/CategoriesOfBooks";
import BooksByCategory from "../pages/categoriesOfBooks/BooksByCategory";
import BookDetails from "../pages/categoriesOfBooks/BookDetails";
import UpdateBooks from "../pages/allBooks/UpdateBooks";
import Authors from "../pages/authors/Authors";
import BooksByAuthor from "../pages/authors/BooksByAuthor";
import UpdateAuthor from "../pages/authors/UpdateAuthor";
import Publishers from "../pages/publishers/Publishers";
import BooksByPublisher from "../pages/publishers/BooksByPublisher";
import UpdatePublisher from "../pages/publishers/UpdatePublisher";
import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";
import Dashboard from "../Dashboard/Dashboard";
import DashboardHome from "../Dashboard/adminDashboard/DashboardHome";
import ManageUsers from "../Dashboard/adminDashboard/ManageUsers";
import DeleteBooks from "../pages/allBooks/DeleteBooks";
import AddPublishers from "../pages/publishers/AddPublishers";
import AddAuthors from "../pages/authors/AddAuthors";
import AddNewCategory from "../pages/categoriesOfBooks/AddNewCategory";
import Wishlist from "../pages/Wishlist/Wishlist";
import Cart from "../pages/cart/Cart";
import Main from "../layout/Main";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main/>,
        children: [
            {
                path: '/',
                element: <Home/>
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
                element: <BooksByCategory/>
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
                element: <Dashboard/>,
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