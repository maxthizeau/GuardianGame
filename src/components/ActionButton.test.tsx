import { render, screen, userEvent, within } from "../utils/test-utils"
import ActionButton, { IActionButtonProps } from "./ActionButton"
import { vi } from "vitest"

const buttonProps: IActionButtonProps = {
  title: "My Title",
  secondaryLine: <div role="navigation">Secondary Line</div>,
}

describe("ActionButton - Component", () => {
  it("should display a button with correct title", async () => {
    const { container } = render(<ActionButton {...buttonProps} />)

    const button = screen.getByRole("button")
    expect(button).toHaveTextContent(buttonProps.title)
  })
  it("should display a second line correctly", async () => {
    const { container } = render(<ActionButton {...buttonProps} />)

    const button = screen.getByRole("button")
    const secondaryLine = within(button).getByRole("navigation")
    expect(button).toBeDefined()
    expect(secondaryLine).toBeDefined()

    expect(secondaryLine).toHaveTextContent(/Secondary Line/i)
  })
  it("should provide functionnal onclick", async () => {
    const onClick = vi.fn().mockImplementation(() => {
      return // just need to verify fn has been called
    })
    const { container } = render(<ActionButton {...buttonProps} onClick={onClick} />)
    const button = screen.getByRole("button")

    expect(onClick).toHaveBeenCalledTimes(0)

    await userEvent.click(button)

    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
