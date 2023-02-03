import { describe } from "vitest"
import { IInventoryState, inventoryActions, inventoryReducer } from "./inventorySlice"
import lootboxes from "../../data/lootboxes"
import { LootboxType } from "../../data/types"
import { mockData } from "../../utils/test-utils"
import { MAX_HERO_COUNT, MAX_ITEM_COUNT_PER_CHAR } from "../../libs/constants"

const emptyState: IInventoryState = {
  money: 0,
  characters: [],
  items: [],
}

const lootboxItems = lootboxes.find((x) => x.type == LootboxType.ITEMS)!
const itemWonItems = lootboxItems.data[0]

const lootboxGuardians = lootboxes.find((x) => x.type == LootboxType.GUARDIANS)!
const itemWonGuardians = lootboxGuardians.data[0]

const lootbox = lootboxItems
const itemWon = itemWonItems

describe("inventorySlice - redux slice", () => {
  it("should init state with zero item and character in inventory", () => {
    const prevState = inventoryReducer(undefined, { type: undefined })
    expect(prevState.characters.length).toEqual(0)
    expect(prevState.items.length).toEqual(0)
  })
  it("should handle earn money", () => {
    let prevState = inventoryReducer(emptyState, { type: undefined })
    expect(prevState.money).toEqual(0)
    prevState = inventoryReducer(prevState, inventoryActions.earnMoney(300))
    expect(prevState.money).toEqual(300)
  })
  it("should not change state when earning money with negative value ", () => {
    const initState = inventoryReducer({ ...emptyState, money: 300 }, { type: undefined })
    expect(initState.money).toEqual(300)
    const prevState = inventoryReducer(initState, inventoryActions.earnMoney(-100))
    expect(prevState.money).toEqual(300)
  })
  it("should spend money when buying a lootbox", () => {
    let prevState = inventoryReducer({ ...emptyState, money: 10000 }, { type: undefined })
    expect(prevState.money).toEqual(10000)
    prevState = inventoryReducer(prevState, inventoryActions.buyLootbox({ lootboxId: lootbox.id, itemWonId: itemWon.id }))
    expect(prevState.money).toEqual(10000 - lootbox.cost)
  })
  it("should not change any state when buying a lootbox but not having enough money", () => {
    let prevState = inventoryReducer(emptyState, { type: undefined })
    expect(prevState.money).toEqual(0)
    const newState = inventoryReducer(prevState, inventoryActions.buyLootbox({ lootboxId: lootbox.id, itemWonId: itemWon.id }))
    expect(prevState).toMatchObject(newState)
  })
  it("should not change state passing undefined itemWon or lootbox", () => {
    let prevState = inventoryReducer({ ...emptyState, money: 10000 }, { type: undefined })
    // expect(prevState.view.type).toBe(EViews.HOME)
    const stateWithUndefinedLootboxID = inventoryReducer(prevState, inventoryActions.buyLootbox({ lootboxId: -1, itemWonId: itemWon.id }))
    expect(prevState).toMatchObject(stateWithUndefinedLootboxID)
    const stateWithUndefinedItemWonID = inventoryReducer(prevState, inventoryActions.buyLootbox({ lootboxId: lootbox.id, itemWonId: -1 }))
    expect(prevState).toMatchObject(stateWithUndefinedItemWonID)
    const stateWithBothUndefined = inventoryReducer(prevState, inventoryActions.buyLootbox({ lootboxId: -1, itemWonId: -1 }))
    expect(prevState).toMatchObject(stateWithBothUndefined)
  })
  it("should add typed item when buying a lootbox successfully", () => {
    let prevState = inventoryReducer({ ...emptyState, money: 10000 }, { type: undefined })
    prevState = inventoryReducer(prevState, inventoryActions.buyLootbox({ lootboxId: lootboxItems.id, itemWonId: itemWonItems.id }))
    expect(prevState.items.length).toEqual(1)
    prevState = inventoryReducer(prevState, inventoryActions.buyLootbox({ lootboxId: lootboxGuardians.id, itemWonId: itemWonGuardians.id }))
    expect(prevState.characters.length).toEqual(1)
  })
  it("should handle character selected and removed from team", () => {
    const characters = mockData.guardians // guardians are not selected by default (unlike heroes)
    let prevState = inventoryReducer({ ...emptyState, characters: characters }, { type: undefined })
    expect(prevState.characters.length).toEqual(characters.length)
    expect(prevState.characters[0].isSelected).toBe(false)
    prevState = inventoryReducer(prevState, inventoryActions.selectCharacter({ inventoryId: characters[0].inventoryId }))
    expect(prevState.characters[0].isSelected).toBe(true)
    prevState = inventoryReducer(prevState, inventoryActions.selectCharacter({ inventoryId: characters[0].inventoryId }))
    expect(prevState.characters[0].isSelected).toBe(false)
  })
  it("should not add a character in team when already at maximum number", () => {
    // by default heroes are selected to maximum possible in mockData
    let prevState = inventoryReducer({ ...emptyState, characters: mockData.heroes }, { type: undefined })

    const selectedCount = prevState.characters.filter((x) => x.isSelected).length
    expect(selectedCount).toEqual(MAX_HERO_COUNT)

    const newState = inventoryReducer(prevState, inventoryActions.selectCharacter({ inventoryId: mockData.heroes[MAX_HERO_COUNT + 1].inventoryId }))
    const newSelectedCount = newState.characters.filter((x) => x.isSelected).length
    expect(newSelectedCount).toEqual(MAX_HERO_COUNT)
    expect(newState).toMatchObject(prevState)
  })

  it("should add item to character when calling equipItem ", () => {
    let prevState = inventoryReducer({ ...emptyState, characters: mockData.heroes, items: mockData.items }, { type: undefined })
    expect(prevState.items[0].isEquiped).toBe(false)
    expect(prevState.characters[0].items.length).toBe(0)

    prevState = inventoryReducer(
      prevState,
      inventoryActions.equipItem({ charInventoryId: mockData.heroes[0].inventoryId, itemInventoryId: mockData.items[0].inventoryId })
    )
    expect(prevState.items[0].isEquiped).toBe(true)
    expect(prevState.characters[0].items.length).toBe(1)
    expect(prevState.characters[0].items[0]).toBe(mockData.items[0].inventoryId)
  })

  it("should not equip item to an undefined character", () => {
    const { heroes, items } = mockData
    let prevState = inventoryReducer({ ...emptyState, characters: heroes, items: items }, { type: undefined })
    prevState = inventoryReducer(prevState, inventoryActions.equipItem({ charInventoryId: 999, itemInventoryId: items[0].inventoryId }))
    expect(prevState.items[0].isEquiped).toBe(false)
  })
  it("should not equip undefined item", () => {
    const { heroes, items } = mockData
    const prevState = inventoryReducer({ ...emptyState, characters: heroes, items: items }, { type: undefined })
    const newState = inventoryReducer(prevState, inventoryActions.equipItem({ charInventoryId: heroes[0].inventoryId, itemInventoryId: 999 }))
    expect(prevState).toMatchObject(newState)
  })
  it("should not equip item to character already at maximum item count", () => {
    const { heroes, items } = mockData
    const heroId = heroes[0].inventoryId
    let prevState = inventoryReducer({ ...emptyState, characters: heroes, items: items }, { type: undefined })

    for (let i = 0; i < MAX_ITEM_COUNT_PER_CHAR; i++) {
      prevState = inventoryReducer(prevState, inventoryActions.equipItem({ charInventoryId: heroId, itemInventoryId: items[i].inventoryId }))
    }

    const equippedItemCount = prevState.items.filter((x) => x.isEquiped).length
    const itemOnHero = prevState.characters[0].items.length

    expect(equippedItemCount).toBe(MAX_ITEM_COUNT_PER_CHAR)
    expect(itemOnHero).toBe(MAX_ITEM_COUNT_PER_CHAR)

    // Try to add one more
    const newState = (prevState = inventoryReducer(
      prevState,
      inventoryActions.equipItem({ charInventoryId: heroId, itemInventoryId: items[MAX_ITEM_COUNT_PER_CHAR].inventoryId })
    ))

    // Should not modify the state
    expect(newState).toMatchObject(prevState)
  })
  it("should not equip item if already equipped to another char", () => {
    const { heroes, items } = mockData
    const heroZero = heroes[0]
    const heroOne = heroes[1]
    const itemInventoryId = items[0].inventoryId
    //init
    let prevState = inventoryReducer({ ...emptyState, characters: heroes, items: items }, { type: undefined })
    //equip to heroZero
    prevState = inventoryReducer(prevState, inventoryActions.equipItem({ charInventoryId: heroZero.inventoryId, itemInventoryId }))
    //verify it is equipped to heroZero
    expect(prevState.characters[0].items.length).toBe(1)
    // try to equip to heroOne
    const newState = inventoryReducer(prevState, inventoryActions.equipItem({ charInventoryId: heroOne.inventoryId, itemInventoryId }))
    // should not modify the state in any way
    expect(prevState).toMatchObject(newState)
  })

  it("should not add item to a non-selected character", () => {
    // use guardian => not selected by default
    const { guardians, items } = mockData
    //init

    let prevState = inventoryReducer({ ...emptyState, characters: guardians, items: items }, { type: undefined })

    expect(prevState.characters[0].isSelected).toBe(false)

    // try equip item on not selected guardian
    const newState = inventoryReducer(
      prevState,
      inventoryActions.equipItem({ charInventoryId: guardians[0].inventoryId, itemInventoryId: items[0].inventoryId })
    )
    // should do nothing to state
    expect(newState).toMatchObject(prevState)
  })

  it("should disequip all items when removing a character from the team", () => {
    const { heroes, items } = mockData
    const heroId = heroes[0].inventoryId
    //init
    let prevState = inventoryReducer({ ...emptyState, characters: heroes, items: items }, { type: undefined })
    for (let i = 0; i < MAX_ITEM_COUNT_PER_CHAR; i++) {
      prevState = inventoryReducer(prevState, inventoryActions.equipItem({ charInventoryId: heroId, itemInventoryId: items[i].inventoryId }))
    }
    // expect to have equipped items

    expect(prevState.characters[0].items.length).toBeGreaterThan(0)
    expect(prevState.items[0].isEquiped).toBe(true)

    // act : remove from team
    prevState = inventoryReducer(prevState, inventoryActions.selectCharacter({ inventoryId: heroId }))

    // expect to have unequipped item
    expect(prevState.characters[0].items.length).toBe(0)
    expect(prevState.items[0].isEquiped).toBe(false)
  })

  it("should handle unequip item", () => {
    let prevState = inventoryReducer(undefined, { type: undefined })
    // TODO : not implemented yet
  })
})
