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
