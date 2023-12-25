import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
// import React from "react";
import Home from "./pages/Home.tsx";
import Register from "./pages/Register.tsx";
import {QueryClient, QueryClientProvider} from "react-query";

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <Home/>
        },
        {
            path: "/registration",
            element: <Register/>
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
