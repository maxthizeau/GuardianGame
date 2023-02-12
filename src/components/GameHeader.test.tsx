import { fireEvent, render, screen } from "../utils/test-utils"
import GameHeader from "./GameHeader"
import { vi } from "vitest"

describe("GameHeader - Component", () => {
  it("should fire event when setting up previous Function and clicking on previous button ", () => {
    const previousFunction = vi.fn()

    expect(previousFunction).toHaveBeenCalledTimes(0)
    render(<GameHeader title="Title" previousAction={previousFunction} />)
    const prevButton = screen.getByTestId("previous-button")
    fireEvent.click(prevButton)
    expect(previousFunction).toHaveBeenCalledTimes(1)
  })
  it("should render a disabled previous-button if no function passed in props ", () => {
    const previousFunction = vi.fn()
    render(<GameHeader title="Title" />)
    const prevButton = screen.getByTestId("previous-button")
    expect(prevButton).toHaveClass("disabled")
  })
})
