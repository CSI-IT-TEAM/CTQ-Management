import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from './components';
import { Homepage, LoginPage, ErrorPage } from './pages';

const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <ErrorPage />,
        element: (
            <Layout>
                <Homepage />
            </Layout>
        ),
    },
    {
        path: "/log-in",
        errorElement: <ErrorPage />,
        element: (
            <LoginPage />
        ),
    },
    {
        path: "*",
        element: (
            <ErrorPage />
        ),
    },
]);

function App() {
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;