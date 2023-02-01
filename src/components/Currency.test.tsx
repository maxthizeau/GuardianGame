import { render, screen } from "../utils/test-utils"
import Currency from "./Currency"

describe("Currency - Component", () => {
  it("should render and display value correctly", async () => {
    render(<Currency value={123} />)
    expect(screen.getByText(/123/)).toBeDefined()
  })
  it("should display an icon", async () => {
    const { src, alt } = { src: "http://placeholder.com/fakeimage.png", alt: "fake alt desc" }
    render(<Currency value={123} icon={{ src, alt }} />)
    const testIcon = document.querySelector("img") as HTMLImageElement

    expect(testIcon.src).toBe(src)
    expect(testIcon.alt).toBe(alt)
  })
})
