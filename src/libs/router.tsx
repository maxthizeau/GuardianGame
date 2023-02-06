import { createBrowserRouter } from "react-router-dom"
import AuthHandler from "../api/AuthHandler"
import App from "../App"
import ErrorView from "../views/ErrorView"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorView title="Error" message="Undefined path" />,
  },
  {
    path: "/auth",
    element: <AuthHandler />,
  },
])
