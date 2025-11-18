import React from 'react';
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import LogInPage from './mainpage/LogInPage';
import AdminDashboard from './mainpage/AdminDashboard';

const router = createBrowserRouter([

  {
    path: "/",
    element: <LogInPage/>,
  },
  {
    path: "/dashboard",
    element: <AdminDashboard/>,
  }
 
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);