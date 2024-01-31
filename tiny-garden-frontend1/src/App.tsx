import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
// import React from "react";
import Home from "./pages/Home.tsx";
import Register from "./pages/Register.tsx";
import {QueryClient, QueryClientProvider} from "react-query";
import AdminCustomer from "./pages/AdminCustomer.tsx";
import DemoAdminCustomer from "./pages/DemoAdminCustomer.tsx";
import HeaderUser from "./pages/HeaderUser.tsx";
import Login from "./pages/Login.tsx";
import Categories from "./pages/Categories.tsx";
import AdminFoliage from "./pages/AdminFoliage.tsx";
import HeaderAdmin from "./pages/HeaderAdmin.tsx";
import AddProductForm from "./pages/AddProductForm.tsx";
import EditProductForm from "./pages/EditProductForm.tsx";
import Foliage from "./pages/Foliage.tsx";
import AdminSucculent from "./pages/AdminSucculent.tsx";
import ProductAnalytics from "./pages/ProductAnalytics.tsx";
import AdminCactus from "./pages/AdminCactus.tsx";
import AdminFlower from "./pages/AdminFlower.tsx";
import AdminHerb from "./pages/AdminHerb.tsx";
import Succulent from "./pages/Succulent.tsx";
import Cactus from "./pages/Cactus.tsx";
import Flower from "./pages/Flower.tsx";
import Herb from "./pages/Herb.tsx";

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <Home/>
        },
        {
            path: "/headerUser",
            element: <HeaderUser/>
        },
        {
            path: "/registration",
            element: <Register/>
        },
        {
            path: "/login",
            element: <Login/>
        },
        {
            path:"/adminCustomer",
            element: <AdminCustomer/>
        },
        {
            path:"/demoAdCustomer",
            element: <DemoAdminCustomer/>
        },
        {
            path: "/categories",
            element: <Categories/>
        },
        {
            path: "/adminFoliage",
            element: <AdminFoliage/>
        },
        {
            path: "/headerAdmin",
            element: <HeaderAdmin/>
        },
        {
            path: "/addProductForm",
            element: <AddProductForm/>
        },
        {
            path: "/editProductForm",
            element: <EditProductForm/>
        },
        {
            path: "/foliage",
            element: <Foliage/>
        },
        {
            path: "/adminSucculent",
            element: <AdminSucculent/>
        },
        {
            path: "/productAnalytics",
            element: <ProductAnalytics/>
        },
        {
            path: "/adminCactus",
            element: <AdminCactus/>
        },
        {
            path: "/adminFlower",
            element: <AdminFlower/>
        },
        {
            path: "/adminHerb",
            element: <AdminHerb/>
        },
        {
            path: "/succulent",
            element: <Succulent/>
        },
        {
            path: "/cactus",
            element: <Cactus/>
        },
        {
            path: "/flower",
            element: <Flower/>
        },
        {
            path: "/herb",
            element: <Herb/>
        }
    ]
)

const queryClient = new QueryClient();

function App() {

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router}/>
            </QueryClientProvider>
        </>
    )
}

export default App
