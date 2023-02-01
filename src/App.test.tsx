import { describe, it } from "vitest"
import { render, screen } from "./utils/test-utils"
import App from "./App"

describe("App - Component", () => {
  it("should display a menu button", () => {
    // ARRANGE
    render(<App />)

    // EXPECT
    const menuButton = screen.getByRole("button", { name: /menu/i })
    expect(menuButton).toBeDefined()
  })
})
