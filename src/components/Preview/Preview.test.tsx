import { fireEvent, render, screen } from "../../utils/test-utils"
import { vi } from "vitest"
import Preview from "./Preview"
import { setupStore } from "../../redux/store"

describe("Preview - Component", () => {
  it("should render placeholder when there is no active preview", () => {
    const store = setupStore()
    render(<Preview />, { store: store })
    const placeholderText = screen.getByTestId("preview-placeholder")
    expect(placeholderText).toBeDefined()
  })
  it("should  display close button when one item is selected in preview", () => {
    const store = setupStore({
      app: {
        preview: {
          itemToShow: {
            type: "string",
            item: "hello world",
          },
          type: "selected",
        },
      },
    })
    render(<Preview />, { store: store })
    const closeButton = screen.getByTestId("close-button")
    expect(closeButton).toBeDefined()
  })
  it("should not display close button when item in preview is hover mode", () => {
    const store = setupStore({
      app: {
        preview: {
          itemToShow: {
            type: "string",
            item: "hello world",
          },
          type: "hover",
        },
      },
    })
    render(<Preview />, { store: store })
    const closeButton = screen.queryByTestId("close-button")
    expect(closeButton).toBeNull()
  })
  it("should not active preview on hover when preview is mobile mode", () => {
    const store = setupStore({
      app: {
        preview: {
          itemToShow: {
            type: "string",
            item: "hello world",
          },
          type: "hover",
        },
      },
    })
    render(<Preview mobile />, { store: store })
    const previewContainer = screen.queryByTestId("preview-container")
    expect(previewContainer).not.toHaveClass("active")
  })
})
