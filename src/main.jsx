import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { ThemeProvider } from "./context/ThemeContext.jsx"
import App from './App.jsx'
import Movies from './pages/Movies.jsx';
import NotFound from './pages/NotFound.jsx';
import Movie from './pages/Movie.jsx';
import People from './pages/People.jsx';
import Person from './pages/Person.jsx';
import Tv from './pages/Tv.jsx';
import Show from './pages/show.jsx';
import "./assets/css/style.scss";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Movies />
      },
      {
        path: "/movies/:id",
        element: <Movie />
      },

      {
        path: "/people",
        element: <People />,
      },
      {
        path: "/people/:id",
        element: <Person />
      },
      {
        path: "/tv",
        element: <Tv />,
      },
      {
        path: "/tv/:id",
        element: <Show />
      },

    ],
  },
  {
    path: "*",
    element: <NotFound />,
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
)