import { appActions, appReducer } from "./appSlice"
import { describe } from "vitest"
import { setupStore } from "../store"
import { mockNetWorkResponse } from "../../utils/mocks/apiCalls.data"

describe("appSlice - redux slice", () => {
  // Views have been deleted in state for the benefit of react router v6
  // it("should return Home view when initial state", () => {
  //   const appState = appReducer(undefined, { type: undefined })
  //   expect(appState.view.type).toBe(EViews.HOME)
  // })
  // it("should handle change view", () => {
  //   const prevState = appReducer(undefined, { type: undefined })
  //   expect(prevState.view.type).toBe(EViews.HOME)
  //   const appState = appReducer(prevState, appActions.changeView({ type: EViews.CHARACTER }))
  //   expect(appState.view.type).toBe(EViews.CHARACTER)
  // })

  beforeAll(() => {
    // Mock responses of API that are used in middleware
    mockNetWorkResponse()
  })

  it("should not add a hover item in preview if there is one already selected", () => {
    const store = setupStore({
      app: {
        preview: {
          type: "selected",
          itemToShow: {
            type: "string",
            item: "any string",
          },
        },
      },
    })

    // Dispatch : Select a preview with type "hover"
    store.dispatch(
      appActions.selectPreview({
        type: "hover",
        itemToShow: {
          type: "string",
          item: "added item",
        },
      })
    )
    // Should not change the state when preview type is "selected" and the new one is "hover"
    expect(store.getState().app.preview.itemToShow?.item).toBe("any string")
  })
  it("should add item in preview if type is set as selected", () => {
    const store = setupStore({
      app: {
        preview: {
          type: "selected",
          itemToShow: {
            type: "string",
            item: "any string",
          },
        },
      },
    })

    // Dispatch : Select a preview with type "hover"
    store.dispatch(
      appActions.selectPreview({
        type: "selected",
        itemToShow: {
          type: "string",
          item: "added item",
        },
      })
    )

    expect(store.getState().app.preview.itemToShow?.item).toBe("added item")
  })
  it("should clear preview", () => {
    const store = setupStore({
      app: {
        preview: {
          type: "selected",
          itemToShow: {
            type: "string",
            item: "any string",
          },
        },
      },
    })

    store.dispatch(appActions.clearPreview())

    expect(store.getState().app.preview).toMatchObject({})
  })
})
