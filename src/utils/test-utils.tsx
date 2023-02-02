import React, { ReactElement } from "react"
import { cleanup, render, RenderOptions } from "@testing-library/react"
import { Provider } from "react-redux"
import { store } from "../redux/store"
import { getTestData } from "./test-data"

export let mockData = getTestData()
afterEach(() => {
  cleanup()
  // mockData is reseted after each test
  mockData = getTestData()
})

// No theme provider atm, but I might use one later.
// so here is fake one that will be replaced if I use a real one later
const ThemeProvider = ({ theme, children }: { theme: string; children: React.ReactNode }) => <>{children}</>

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme="light">
      <Provider store={store}>{children}</Provider>
    </ThemeProvider>
  )
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) => render(ui, { wrapper: AllTheProviders, ...options })

export * from "@testing-library/react"
export { default as userEvent } from "@testing-library/user-event"
// override render export
export { customRender as render }
