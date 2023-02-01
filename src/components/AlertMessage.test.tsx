import { render, screen } from "../utils/test-utils"
import AlertMessage from "./AlertMessage"

describe("AlertMessage - Component", () => {
  it("should render an error alert", async () => {
    const { container } = render(<AlertMessage title="ERROR TITLE" type="error" message="This is a message" />)
    const alert = screen.getByRole("alert")
    expect(alert).toBeDefined()
    expect(alert).toHaveClass("error")
    expect(alert).toHaveTextContent(/ERROR TITLE/i)
    expect(alert).toHaveTextContent(/This is a message/i)
  })
})
