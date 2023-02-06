import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import App from "./App"
import { store } from "./redux/store"
import "./styles/index.scss"
import { createBrowserRouter, createHashRouter, HashRouter, RouterProvider } from "react-router-dom"
import ErrorView from "./views/ErrorView"
import AuthHandler from "./api/AuthHandler"

const router = createBrowserRouter([
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

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
