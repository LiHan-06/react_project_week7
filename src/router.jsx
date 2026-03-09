import { createHashRouter } from "react-router-dom";
import FrontendLayout from "./layout/FrontendLayout";

import Home from './views/front/Home';
import Products from './views/front/Products';
import SingleProduct from './views/front/SingleProduct';
import Cart from './views/front/Cart';
import NotFound from './views/front/NotFound';
import Checkout from './views/front/Checkout';
import Login from './views/Login';
import AdminLayout from "./layout/AdminLayout";
import AdminProducts from "./views/admin/AdminProducts";
import AdminOrder from "./views/admin/AdminOrder";

export const routes = createHashRouter([
    {
        path: '/',
        element: <FrontendLayout />,
        children: [
        { index: true, element: <Home /> },
        { path: 'product', element: <Products /> },
        { path: 'product/:id', element: <SingleProduct /> },
        { path: 'cart', element: <Cart /> },
        { path: 'checkout', element: <Checkout /> },
        { path: 'login', element: <Login /> },
        ]
    },
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            {
                path: 'product',
                element: <AdminProducts />,
            },
            {
                path: 'order',
                element: <AdminOrder />,
            },
        ]
    },
    {
        path: '*',
        element: <NotFound />
    }
]);
