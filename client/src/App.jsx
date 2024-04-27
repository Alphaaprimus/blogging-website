

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Routes,
  Outlet
} from "react-router-dom";

import Register from "./Pages/Register"
import Login from "./Pages/Login"
import Home from "./Pages/Home"
import Write from "./Pages/Write"
import Single from "./Pages/Single"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import "./style.scss"

const Layout = () => {
  return (
    <>
     <Navbar/>
     <Outlet/>
     <Footer/>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [

  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/post/:id",
    element: <Single/>,
  },
  {
    path: "/write",
    element: <Write/>,
  }, 
   

]
},
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/home",
    element: <Home/>,
  },
  {
    path: "/write",
    element: <Write/>,
  },
  {
    path: "/single",
    element: <Single/>,
  },
]);

function App() {
  return (
    <div className="app" >
    <div className="container">
    <RouterProvider router={router}/>
    </div>
  </div>
  );

}

export default App;
