import { fireEvent, mockData, render, screen } from "../utils/test-utils"
import { vi } from "vitest"
import InventoryList from "./InventoryList"
import { setupStore } from "../redux/store"
import { Item } from "../data/types"

// interface IProps {
//   itemsArray: (Item | Character)[]
//   title?: string
//   defaultSort?: Sorter
//   limit?: number
// }

describe("InventoryList - Component", () => {
  it("should display all items if limit is not specified", () => {
    render(<InventoryList itemsArray={[...mockData.heroes]} />)
    const data = screen.getByRole("contentinfo")
    expect(data.children.length).toBe(mockData.heroes.length)
  })
  it("should display not display more items than limit if specified", () => {
    render(<InventoryList itemsArray={[...mockData.heroes]} limit={2} />)
    const data = screen.getByRole("contentinfo")
    expect(data.children.length).toBe(2)
  })

  // Display filters / sorters
  it("should not display filter hideEquipped if array is not full of Item (no character)", () => {
    // array to display are Items AND Heroes = should not display hideEquipped filter
    const items = [...mockData.items, ...mockData.heroes]

    render(<InventoryList itemsArray={items} />)
    const data = screen.getByRole("contentinfo")

    const filterEquippedButton = screen.queryByTestId("filter-button-hide-equipped")
    expect(filterEquippedButton).toBeNull()
  })
  it("should not display level sorter if array is not full of Character", () => {
    // array to display are Items AND Heroes = should not display level sorter
    const items = [...mockData.items, ...mockData.heroes]

    render(<InventoryList itemsArray={items} />)
    const data = screen.getByRole("contentinfo")

    const sorterLevelButton = screen.queryByTestId("sorter-button-level")
    expect(sorterLevelButton).toBeNull()
  })

  //   Filters and sorters
  it("should hide equipped items when clicking on hide Equipped button", () => {
    const items = [...mockData.items]
    // set isEquiped on only one item
    items.map((x, index) => (x.isEquiped = index == 0))
    render(<InventoryList itemsArray={items} />)
    const data = screen.getByRole("contentinfo")

    fireEvent.click(screen.getByTestId("filter-button-hide-equipped"))
    expect(data.children.length).toBe(items.length - 1)
  })
  it("should display the sorted array by power DESC when clicking on the button", () => {
    const items: Item[] = []

    // Change the powervalue to be different for each item

    for (let i = 0; i < 3; i++) {
      items.push({
        ...mockData.items[i],
        statistics: {
          vitality: 100 * i,
          intelligence: 100 * i,
          strength: 100 * i,
        },
      })
    }
    // Power value is calculated by additionning all statistics, so should be [0, 300, 600]

    render(<InventoryList itemsArray={items} />)

    fireEvent.click(screen.getByTestId("sorter-button-power"))

    const orderedValues: number[] = []
    screen.getByRole("contentinfo").childNodes.forEach((value) => {
      value.textContent && orderedValues.push(parseInt(value.textContent))
    })

    expect(orderedValues).toMatchObject([600, 300, 0])
    // expect(data.children.length).toBe(items.length - 1)
  })
  it("should display the sorted array by power ASC when clicking twice the button", () => {
    const items: Item[] = []

    // Change the powervalue to be different for each item
    for (let i = 0; i < 3; i++) {
      items.push({
        ...mockData.items[i],
        statistics: {
          vitality: 100 * i,
          intelligence: 100 * i,
          strength: 100 * i,
        },
      })
    }
    // Power value is calculated by additionning all statistics, so should be [0, 300, 600]

    render(<InventoryList itemsArray={items} />)

    fireEvent.click(screen.getByTestId("sorter-button-power"))
    fireEvent.click(screen.getByTestId("sorter-button-power"))

    const orderedValues: number[] = []
    screen.getByRole("contentinfo").childNodes.forEach((value) => {
      value.textContent && orderedValues.push(parseInt(value.textContent))
    })

    expect(orderedValues).toMatchObject([0, 300, 600])
  })
})
