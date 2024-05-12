import React from 'react'
import ReactDOM from 'react-dom/client'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';



import HomePage from './pages/HomePage.jsx'
import AboutMe from './pages/AboutMe.jsx'
import Aktivnosti from './pages/Aktivnost.jsx'
import Volonteri from './pages/Volonteri.jsx'
import Udruge from './pages/Udruge.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import './App.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '/about',
        element: <AboutMe />,
      },
      {
        path: '/aktivnosti',
        element: <Aktivnosti />,
      },
      {
        path: '/volonteri',
        element: <Volonteri />,
      },
      {
        path: '/udruge',
        element: <Udruge />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router = {router} />
  </React.StrictMode>,
)
