import { act, createWrapper, mockData, renderHook } from "../utils/test-utils"
import { setupStore } from "../redux/store"
import { usePreview } from "./usePreview"

describe("usePreview - hook", () => {
  it("should dispatch clear function to store", () => {
    const store = setupStore({
      app: {
        preview: {
          type: "selected",
          itemToShow: {
            type: "string",
            item: "hello world",
          },
        },
      },
    })
    const { result } = renderHook(() => usePreview(), { wrapper: createWrapper(store) })

    expect(result.current.preview.itemToShow?.item).toBe("hello world")
    // clear preview from hook
    act(() => {
      result.current.clearPreview()
    })

    expect(result.current.preview.itemToShow).toBeUndefined()
  })

  it("should give a function returning onClick, onMouseEnter, onMouseLeave", () => {
    const store = setupStore()
    const { result } = renderHook(() => usePreview(), { wrapper: createWrapper(store) })
    let clickProps
    // clear preview from hook
    act(() => {
      clickProps = result.current.setOnClickOnHoverPreview({ item: { type: "string", item: "hello world" } })
    })

    expect(clickProps).toHaveProperty("onClick")
    expect(clickProps).toHaveProperty("onMouseEnter")
    expect(clickProps).toHaveProperty("onMouseLeave")
  })
})
