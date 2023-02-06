import { createMemoryRouter, RouterProvider } from "react-router"
import { localStorageMock, render, screen } from "../utils/test-utils"
import AuthHandler from "./AuthHandler"
import { vi } from "vitest"
import { setupStore } from "../redux/store"
import { fetchUser, profileActions } from "../redux/slices/profileSlice"
import { LOCAL_KEY_uuid } from "../libs/constants"

const testUuidState = "testuuid"

const routes = [
  {
    path: "/auth",
    element: <AuthHandler />,
  },
]

const initialEntries = [
  "/",
  "/auth",
  `/auth#access_token=access_token&scope=channel%3Amanage%3Apolls+channel%3Aread%3Apolls&state=${testUuidState}&token_type=bearer`,
  "/auth?error=access_denied&error_description=The+user+denied+you+access&state=c3ab8aa609ea11e793ae92361f002671",
]

describe("AuthHandler - component", () => {
  beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
      value: localStorageMock,
    })
  })

  it("should display an error if there are no parameters in url", () => {
    const router = createMemoryRouter(routes, {
      initialEntries,
      initialIndex: 1, // 1 ==> /auth
    })

    render(<RouterProvider router={router} />)
    expect(screen.getByRole("alert")).toHaveClass("error")
  })
  it("should display an error if states mismatch", () => {
    const router = createMemoryRouter(routes, {
      initialEntries,
      initialIndex: 2, // 2 ==> valid response
    })

    render(<RouterProvider router={router} />)
    // we have not set local storage uuid, so it should mismatch and display an error
    expect(screen.getByRole("alert")).toHaveClass("error")
  })
  it("should display an error message if contains error parameters in url", () => {
    const router = createMemoryRouter(routes, {
      initialEntries,
      initialIndex: 3, // 3 ==> error response
    })

    render(<RouterProvider router={router} />)

    expect(screen.getByRole("alert")).toHaveClass("error")
  })
  it("should display a success message if states are equal and all property are in url ", () => {
    const router = createMemoryRouter(routes, {
      initialEntries,
      initialIndex: 2, // 2 ==> valid response
    })

    // Set local uuid key manually to simulate successful call
    window.localStorage.setItem(LOCAL_KEY_uuid, testUuidState)
    render(<RouterProvider router={router} />)

    expect(screen.getByRole("alert")).toHaveClass("success")
  })
})
