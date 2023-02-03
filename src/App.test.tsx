import { describe, it } from "vitest"

import { mockData, render, screen } from "./utils/test-utils"
import App from "./App"

describe("App - Component", () => {
  // Todo : Move these tests to a global test file
  it("should modify the mockData correctly", () => {
    mockData.guardians[0].isSelected = true
    expect(mockData.guardians[0].isSelected).toBe(true)
  })
  it("should have the mockData back ", () => {
    expect(mockData.guardians[0].isSelected).toBe(false)
  })
})
