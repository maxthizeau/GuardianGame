import React, { PropsWithChildren, ReactElement } from "react"
import { cleanup, render, RenderHookOptions, RenderOptions } from "@testing-library/react"
import { Renderer, renderHook, RenderHookResult, WrapperComponent } from "@testing-library/react-hooks"
import { Provider } from "react-redux"
import { AppStore, RootState, setupStore } from "../redux/store"

import { AnyAction, PreloadedState } from "@reduxjs/toolkit"
import ReactNode from "react"
import { RouterProvider } from "react-router"
import { getTestData } from "./mocks/inventoryItems.data"
import { mockNetWorkResponse } from "./mocks/apiCalls.data"

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

export function createWrapper(store = setupStore()): React.FC {
  return ({ children }: { children?: React.ReactNode }) => <Provider store={store}>{children}</Provider>
}

// interface ExtendedRenderHookOptions {
//   preloadedState?: PreloadedState<RootState>
//   store?: AppStore
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

export const localStorageMock = (function () {
  let store: any = {}

  return {
    getItem: function (key: string) {
      return store[key] || null
    },
    setItem: function (key: string, value: string) {
      store[key] = value.toString()
    },
    removeItem: function (key: string) {
      delete store[key]
    },
    clear: function () {
      store = {}
    },
  }
})()

export * from "@testing-library/react"
export { default as hooks } from "@testing-library/react-hooks"
export { default as userEvent } from "@testing-library/user-event"
// override render export
export { renderWithProviders as render }
// export { renderHookWithProviders as renderHook }
