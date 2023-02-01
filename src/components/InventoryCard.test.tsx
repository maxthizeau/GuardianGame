import { mockData, render, screen, userEvent } from "../utils/test-utils"
import InventoryCard, { IInventoryCardProps } from "./InventoryCard"
import { vi } from "vitest"
import { Character } from "../data/types"
import heroes from "../data/heroes"

// Basic functions that will be passed as parameters
const getName = (arg: Character) => arg.name
const getInventoryId = (inventoryId: number) => inventoryId

const baseProps: IInventoryCardProps = {
  title: "Title",
  activeItems: [],
  maximumActiveItemsCount: 2,
  tableItems: [],
  onClickItem: getName,
  onClickTable: getInventoryId,
}

let props: IInventoryCardProps = baseProps

describe("InventoryCard - Component", () => {
  beforeEach(() => {
    // {...baseProps} instead of baseProps to hard copy and not pass the reference
    // did that in order to modify props for each test if we need to
    props = { ...baseProps }
  })
  afterEach(() => {
    vi.restoreAllMocks()
  })
  it("should display title", () => {
    render(<InventoryCard {...props} />)
    props.title = "iejkej"
    expect(screen.getByRole("title")).toHaveTextContent("Title")
  })
  it("should show alert if there is more activeItems than authorized", () => {
    render(<InventoryCard {...props} activeItems={mockData.heroes.slice(0, 1)} maximumActiveItemsCount={0} />)
    expect(screen.getByRole("alert")).toBeDefined()
  })
  it("should display image of the active items", async () => {
    const activeProp = mockData.heroes.slice(0, 1)
    render(<InventoryCard {...props} activeItems={activeProp} maximumActiveItemsCount={1} />)
    const activeItems = await screen.findAllByLabelText("active-item")
    expect(activeItems[0]).toBeDefined()
    const image = activeItems[0].querySelector("img") as HTMLImageElement
    expect(image).not.toBeNull()
    expect(image).toHaveAttribute("src", activeProp[0].image)
  })
  it("should display empty space if not enough active Items", async () => {
    const activeProp = mockData.heroes.slice(0, 1)
    render(<InventoryCard {...props} activeItems={activeProp} maximumActiveItemsCount={2} />)
    const activeItems = await screen.findAllByLabelText("active-item")
    expect(activeItems[0]).toBeDefined()
    expect(activeItems[1]).toBeDefined()
    const image = activeItems[1].querySelector("img") as HTMLImageElement
    expect(image).toBeNull()
  })
  it("should fire event when clicking on active item", async () => {
    // set spy to track call count
    const spy = vi.spyOn(props, "onClickItem")
    // render
    render(<InventoryCard {...props} activeItems={mockData.heroes.slice(0, 1)} maximumActiveItemsCount={1} />)
    // verify it has not been called yet
    expect(spy).toHaveBeenCalledTimes(0)
    const activeItems = await screen.findAllByLabelText("active-item")
    expect(activeItems[0]).toBeDefined()
    await userEvent.click(activeItems[0])
    expect(spy).toHaveBeenCalledTimes(1)
  })
  it("should not fire event when clicking on empty active item", async () => {
    const spy = vi.spyOn(props, "onClickItem")

    render(<InventoryCard {...props} maximumActiveItemsCount={1} />)
    const activeItems = await screen.findAllByLabelText("active-item")
    expect(activeItems[0]).toBeDefined()
    await userEvent.click(activeItems[0])
    // verify it has not been called
    expect(spy).not.toHaveBeenCalled()
  })
  // Moved to InventoryTable.test.tsx
  //   it("should display all tableItems in table", () => {
  //   })
  //   it("should fire event when clicking on row the of table ", () => {})
})
