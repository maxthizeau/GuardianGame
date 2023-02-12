import { fireEvent, mockData, render, screen } from "../utils/test-utils"
import { vi } from "vitest"
import ItemElement from "./ItemElement"
import { getPowerValue } from "../utils/gameFunctions"

// interface IProps extends HTMLProps<HTMLDivElement> {
//   item?: Item | Character
//   customWidth?: number
//   extraContent?: ReactNode
// }
const item = mockData.heroes[0]

describe("ItemElement - Component", () => {
  it("should display the image of item", () => {
    render(<ItemElement item={item} />)
    expect(screen.getByTestId("item-image")).toHaveAttribute("src", item.image)
  })
  it("should display the powervalue of item", () => {
    render(<ItemElement item={item} />)
    const powerValue = getPowerValue(item)
    expect(screen.getByTestId("item-powervalue")).toHaveTextContent(new RegExp(powerValue.toString(), "i"))
  })
})
