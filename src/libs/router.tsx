import { createBrowserRouter } from "react-router-dom"
import AuthHandler from "../api/AuthHandler"
import App from "../App"
import ErrorView from "../views/ErrorView"
import GuardiansView from "../views/GuardiansView"
import HeroesView from "../views/HeroesView"
import ItemsView from "../views/ItemsView"
import LoginView from "../views/Login"
import LootboxView from "../views/LootboxView"
import CharacterView from "../views/CharacterView"

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <App>
        <LoginView />
      </App>
    ),

    errorElement: <ErrorView title="Error" message="Undefined path" />,
  },
  {
    path: "/heroes",
    element: (
      <App>
        <HeroesView />
      </App>
    ),
  },
  {
    path: "/lootboxes",
    element: (
      <App>
        <LootboxView />
      </App>
    ),
  },
  {
    path: "/guardians",
    element: (
      <App>
        <GuardiansView />
      </App>
    ),
  },
  {
    path: "/items",
    element: (
      <App>
        <ItemsView />
      </App>
    ),
  },
  {
    path: "/character/:charId",
    element: (
      <App>
        <CharacterView />
      </App>
    ),
  },
  {
    path: "/auth",
    element: (
      <App>
        <AuthHandler />
      </App>
    ),
  },
])
