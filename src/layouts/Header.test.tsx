import { render, screen } from "../utils/test-utils"
import Header from "./Header"

describe("Header - Component", () => {
  it("should display money of the current user", async () => {
    const { container } = render(<Header />)
    // Base money given to user is 1000.
    // Todo : Update this value with a default state
    const res = await screen.findAllByText(/1000/i)
    expect(res[0]).toHaveClass("currency-value")
    // Verify it is the money value by verifying alt of the image (which is money icon and should mention "money")
    expect(res[0].parentElement).toHaveClass("currency")
    expect(res[0].parentElement?.firstChild).toHaveAttribute("alt", expect.stringMatching(/money/i))
  })
  it("should display power value of the current user", async () => {
    const { container } = render(<Header />)
    // Base money given to user is 1000.
    // Todo : Update this value with a default state
    const res = await screen.findAllByText(/524/i)
    expect(res[0]).toHaveClass("currency-value")
    // Verify it is the power value by verifying alt of the image (which is power icon and should mention "power")
    expect(res[0].parentElement).toHaveClass("currency")
    expect(res[0].parentElement?.firstChild).toHaveAttribute("alt", expect.stringMatching(/power/i))
  })
})
