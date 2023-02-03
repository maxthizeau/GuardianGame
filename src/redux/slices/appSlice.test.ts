import { appActions, appReducer, EViews } from "./appSlice"
import { describe } from "vitest"

describe("appSlice - redux slice", () => {
  it("should return Home view when initial state", () => {
    const appState = appReducer(undefined, { type: undefined })
    expect(appState.view.type).toBe(EViews.HOME)
  })
  it("should handle change view", () => {
    const prevState = appReducer(undefined, { type: undefined })
    expect(prevState.view.type).toBe(EViews.HOME)
    const appState = appReducer(prevState, appActions.changeView({ type: EViews.CHARACTER }))
    expect(appState.view.type).toBe(EViews.CHARACTER)
  })
})
