import { Hero, Guardian, InventoryItem, Item, LootboxType, Statistic, StatisticRange, Character, ItemType } from "../../data/types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import lootboxes from "../../data/lootboxes"
import { MAX_GUARDIAN_COUNT, MAX_HERO_COUNT, MAX_ITEM_COUNT_PER_CHAR } from "../../libs/constants"
import items from "../../data/items"
import guardians from "../../data/guardians"
import heroes from "../../data/heroes"

export interface IInventoryState {
  money: number
  characters: Character[]
  items: Item[]
}

export const initialState: IInventoryState = {
  money: 1000,
  characters: [],
  items: [],
}

const generateStatistics = (statsRange: StatisticRange): Statistic => {
  const { vitality, strength, intelligence } = statsRange
  // Function to get random number between min and max (prevent repetition)
  let rng = (min: number, max: number) => Math.floor(Math.random() * (max - min) + min)

  return {
    vitality: rng(vitality.min, vitality.max),
    strength: rng(strength.min, strength.max),
    intelligence: rng(intelligence.min, intelligence.max),
  }
}

const canPushToTeam = (data: Character[], setSelected: boolean, type: ItemType) => {
  // If type is not guardian or hero, do nothing. (dont know why it would happen but we never know !)
  if (type !== ItemType.GUARDIAN && type !== ItemType.HERO) {
    return false
  }

  const maximumActive = type == ItemType.GUARDIAN ? MAX_GUARDIAN_COUNT : MAX_HERO_COUNT
  // If the action is to remove from team : no problem
  if (!setSelected) {
    return true
  }

  // Get number of selected items
  const selectedItemsCount = data.filter((x) => x.type == type && x.isSelected).length

  return selectedItemsCount < maximumActive
}

// filter function to get "random" items
const filterRandom = (x: any) => x.id % Math.floor(Math.random() * 4 + 1)

// generate an advanced state
const generateTestModeState = (): IInventoryState => {
  return {
    money: 10500,
    characters: [
      ...heroes.filter(filterRandom).map((x, index) => {
        return {
          ...x,
          inventoryId: index + 1,
          isSelected: false,
          items: [],
          level: Math.floor(Math.random() * 20),
          xp: 0,
          statistics: generateStatistics(x.statisticsRanges),
        }
      }),
      ...guardians.filter(filterRandom).map((x, index) => {
        return {
          ...x,
          // Add 3 to be sure there is no duplicate value
          inventoryId: index + 3 + 1,
          isSelected: false,
          items: [],
          level: Math.floor(Math.random() * 20),
          xp: 0,
          statistics: generateStatistics(x.statisticsRanges),
        }
      }),
    ],
    items: items.filter(filterRandom).map((x, index) => {
      return {
        ...x,
        inventoryId: index + 1,
        statistics: generateStatistics(x.statisticsRanges),
        isEquiped: false,
      }
    }),
  }
}

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    earnMoney: (state, action: PayloadAction<number>) => {
      if (action.payload > 0) {
        state.money += action.payload
      }
    },
    buyLootbox: (state, action: PayloadAction<{ lootboxId: number; itemWonId: number }>) => {
      const lootbox = lootboxes.find((x) => x.id == action.payload.lootboxId)
      const itemWon = lootbox?.data.find((x) => x.id == action.payload.itemWonId)

      // Verify lootbox and itemwon are valid, AND user has enough money
      if (!lootbox || !itemWon || state.money < lootbox.cost) {
        return state
      }

      // Spend the money
      state.money -= lootbox.cost

      // Create and add item to the state
      switch (lootbox.type) {
        case LootboxType.HEROES:
          state.characters.push({
            ...itemWon,
            // Add character's specific values
            inventoryId: state.characters.length + 1,
            level: 1,
            statistics: generateStatistics(itemWon.statisticsRanges),
            xp: 0,
            items: [],
            isSelected: false,
          })
          break
        case LootboxType.GUARDIANS:
          state.characters.push({
            ...itemWon,
            // Add guradian's specific values
            inventoryId: state.characters.length + 1,
            level: 1,
            statistics: generateStatistics(itemWon.statisticsRanges),
            xp: 0,
            items: [],
            isSelected: false,
          })
          break
        case LootboxType.ITEMS:
          state.items.push({
            ...itemWon,
            // Add item's specific values
            inventoryId: state.items.length + 1,
            statistics: generateStatistics(itemWon.statisticsRanges),
            isEquiped: false,
            // skill: TODO
          })
          break
        default:
          break
      }
    },
    // add/remove guardian to team
    selectCharacter: (state, action: PayloadAction<{ inventoryId: number }>) => {
      const characterIndex = state.characters.findIndex((x) => x.inventoryId == action.payload.inventoryId)
      //  -1 = not found
      if (characterIndex > -1) {
        // revert the "isSelected"
        const characterSelected = state.characters[characterIndex]
        const newValue = !characterSelected.isSelected
        // If it will be selected
        if (newValue == true && canPushToTeam(state.characters, newValue, characterSelected.type)) {
          state.characters[characterIndex].isSelected = !characterSelected.isSelected
        }
        // If it will be removed from the team
        if (newValue == false) {
          state.characters[characterIndex].isSelected = false
          // Unequip all items before removing
          for (let i = 0; i < state.characters[characterIndex].items.length; i++) {
            const itemId = state.characters[characterIndex].items[i]
            const itemStateIndex = state.items.findIndex((x) => x.inventoryId == itemId)
            // if valid index
            if (itemStateIndex > -1 && itemStateIndex < state.items.length) {
              state.items[itemStateIndex].isEquiped = false
            }
          }
          // reset item array to an empty array
          state.characters[characterIndex].items = []
        }
      }
    },
    // add/remove heroes to team
    // selectHero: (state, action: PayloadAction<{ inventoryId: number }>) => {
    //   const heroIndex = state.characters.findIndex((x) => x.inventoryId == action.payload.inventoryId)
    //   //  -1 = not found
    //   if (heroIndex > -1) {
    //     // revert the "isSelected"
    //     const heroSelected = state.characters[heroIndex]
    //     const newValue = !heroSelected.isSelected
    //     if (canPushToTeam(state.characters, MAX_HERO_COUNT, newValue, ItemType.HERO)) {
    //       state.characters[heroIndex].isSelected = !heroSelected.isSelected
    //     }
    //   }
    // },

    // equip item
    equipItem: (state, action: PayloadAction<{ charInventoryId: number; itemInventoryId: number }>) => {
      const { charInventoryId, itemInventoryId } = action.payload
      const itemSelectedIndex = state.items.findIndex((x) => x.inventoryId == itemInventoryId)

      // Verify item exists
      if (itemSelectedIndex < 0 || itemSelectedIndex >= state.items.length) {
        // console.log("Item does not exist")
        return state
      }

      const itemSelected = state.items.find((x) => x.inventoryId == itemInventoryId)

      if (!itemSelected || itemSelected.isEquiped) {
        // console.log("Item is already equiped")
        return state
      }

      var charSelectedIndex = state.characters.findIndex((x) => x.inventoryId == charInventoryId)
      // Verify char exists and has free slot for a new item
      if (charSelectedIndex > -1 && charSelectedIndex < state.characters.length) {
        const charSelected = state.characters[charSelectedIndex]
        // Verify character has a slot for this item
        if (charSelected.items.length + 1 <= MAX_ITEM_COUNT_PER_CHAR && state.characters[charSelectedIndex].isSelected) {
          // push item's inventoryId to items array of the selected character
          state.characters[charSelectedIndex].items.push(itemInventoryId)
          // Set "isEquiped" of item to true
          state.items[itemSelectedIndex].isEquiped = true
        }
      }
    },

    enableTestMode: (state) => {
      return generateTestModeState()
    },
    importSave: (state, action: PayloadAction<{ serializedState: IInventoryState }>) => {
      return action.payload.serializedState
    },
  },
})

export const inventoryReducer = inventorySlice.reducer
export const inventoryActions = inventorySlice.actions
export const getInventoryInitialState = inventorySlice.getInitialState
