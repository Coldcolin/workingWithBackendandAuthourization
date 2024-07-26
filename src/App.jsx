import {createBrowserRouter, RouterProvider} from "react-router-dom"
import AuthLayout from "./Components/AuthLayout";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Users from "./pages/Users";

const route = createBrowserRouter([
  {
    path:"/",
    element: <AuthLayout/>,
    children:[
      {
        path: "/",
        element: <Login/>
      },
      {
        path: "signup",
        element: <SignUp/>
      }
    ]
  },
  {
    path:"/users",
    element: <Users/>
  }
])

function App() {
  return (
    <RouterProvider  router={route}/>
  )
}

export default App
