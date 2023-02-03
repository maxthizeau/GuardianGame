import { mockData, render, screen } from "../utils/test-utils"
import ItemCard from "./ItemCard"

describe("ItemCard - Component", () => {
  it("should show a message when zero item in props", async () => {
    const { container } = render(<ItemCard title="TitleCard" items={[]} />)
    const message = screen.getByTestId("no-item-message")
    expect(message).toBeDefined()
  })
  it("should not show a message when items are passed in props", async () => {
    // pass items as props
    const { container } = render(<ItemCard title="TitleCard" items={mockData.items} />)
    expect(screen.queryByTestId("no-item-message")).not.toBeInTheDocument()
  })
})
