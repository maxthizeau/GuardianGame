import { describe, it } from "vitest"
<<<<<<< HEAD
import { mockData, render, screen } from "./utils/test-utils"
import App from "./App"

describe("App - Component", () => {
  // Todo : Move these tests to a global test file
  it("should modify the mockData correctly", () => {
    mockData.heroes[0].isSelected = true
    expect(mockData.heroes[0].isSelected).toBe(true)
  })
  it("should have the mockData back ", () => {
    expect(mockData.heroes[0].isSelected).toBe(false)
=======
import { render, screen } from "./utils/test-utils"
import App from "./App"

describe("App - Component", () => {
  it("should display a menu button", () => {
    // ARRANGE
    render(<App />)

    // EXPECT
    const menuButton = screen.getByRole("button", { name: /menu/i })
    expect(menuButton).toBeDefined()
>>>>>>> origin/tests/setup-env
  })
})
