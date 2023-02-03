import React, { PropsWithChildren, ReactElement } from "react"
import { cleanup, render, RenderHookOptions, RenderOptions } from "@testing-library/react"
import { Renderer, renderHook, RenderHookResult, WrapperComponent } from "@testing-library/react-hooks"
import { Provider } from "react-redux"
import { AppStore, RootState, setupStore } from "../redux/store"
import { getTestData } from "./test-data"
import { PreloadedState } from "@reduxjs/toolkit"
import ReactNode from "react"

export let mockData = getTestData()
afterEach(() => {
  cleanup()
  // mockData is reseted after each test
  mockData = getTestData()
})

// No theme provider atm, but I might use one later.
// so here is fake one that will be replaced if I use a real one later
const ThemeProvider = ({ theme, children }: { theme: string; children: React.ReactNode }) => <>{children}</>

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>
  store?: AppStore
}

export const CreateWrapper = ({
  children,
  preloadedState = {},
  store = setupStore(preloadedState),
}: {
  children: React.ReactNode
  preloadedState?: PreloadedState<RootState>
  store?: AppStore
}) => {
  return (
    <ThemeProvider theme="light">
      <Provider store={store}>{children}</Provider>
    </ThemeProvider>
  )
}

interface ExtendedRenderHookOptions {
  preloadedState?: PreloadedState<RootState>
  store?: AppStore
}

// export function renderHookWithProviders<T>(
//   callback: (arg: T) => unknown,
//   {
//     preloadedState = {},
//     // Automatically create a store instance if no store was passed in
//     store = setupStore(preloadedState),
//     ...renderOptions
//   }: ExtendedRenderHookOptions = {}
// ) {
//     const wrapper = ({ children }) => <Pr step={2}>{children}</Pr>

//   const AllTheProviders : WrapperComponent<T> = ({ children }: { children: React.ReactNode }) => {

//       <ThemeProvider theme="light">
//         <Provider store={store}>{children}</Provider>
//       </ThemeProvider>

//   }

//   return { store, ...renderHook(callback, { wrapper: AllTheProviders, ...renderOptions }) }
// }

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
    return (
      <ThemeProvider theme="light">
        <Provider store={store}>{children}</Provider>
      </ThemeProvider>
    )
  }

  return { store, ...render(ui, { wrapper: AllTheProviders, ...renderOptions }) }
}

export * from "@testing-library/react"
export { default as hooks } from "@testing-library/react-hooks"
export { default as userEvent } from "@testing-library/user-event"
// override render export
export { renderWithProviders as render }
// export { renderHookWithProviders as renderHook }
