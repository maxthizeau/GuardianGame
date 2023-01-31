import { Character, Guardian, InventoryItem, Item, LootboxType, Statistic, StatisticRange } from "../../data/types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import lootboxes from "../../data/lootboxes"
import { MAX_GUARDIAN_COUNT, MAX_CHARACTER_COUNT } from "../../libs/constants"
import characters from "../../data/characters"
import items from "../../data/items"
import guardians from "../../data/guardians"

interface IInventoryState {
  money: number
  characters: Character[]
  guardians: Guardian[]
  items: Item[]
}

const initialState: IInventoryState = {
  money: 1000,
  characters: [],
  guardians: [],
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

const canPushToTeam = (data: (Character | Guardian)[], maximumActive: number, setSelected: boolean) => {
  // If the action is to remove from team : no problem
  if (!setSelected) {
    return true
  }

  // Get number of selected items
  const selectedItemsCount = data.filter((x) => x.isSelected).length

  return selectedItemsCount < maximumActive
}

// filter function to get "random" items
const filterRandom = (x: any) => x.id % Math.floor(Math.random() * 4 + 1)

// generate an advanced state
const generateTestModeState = (): IInventoryState => {
  return {
    money: 10500,
    characters: characters.filter(filterRandom).map((x, index) => {
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
    guardians: guardians.filter(filterRandom).map((x, index) => {
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
    items: items.filter(filterRandom).map((x, index) => {
      return {
        ...x,
        inventoryId: index + 1,
        statistics: generateStatistics(x.statisticsRanges),
      }
    }),
  }
}

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    earnMoney: (state, action: PayloadAction<number>) => {
      state.money += action.payload
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
        case LootboxType.CHARACTERS:
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
          state.guardians.push({
            ...itemWon,
            // Add guradian's specific values
            inventoryId: state.guardians.length + 1,
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
            inventoryId: state.characters.length + 1,
            statistics: generateStatistics(itemWon.statisticsRanges),
            // skill: TODO
          })
          break
        default:
          break
      }
    },
    // add/remove guardian to team
    selectGuardian: (state, action: PayloadAction<{ inventoryId: number }>) => {
      const guardianIndex = state.guardians.findIndex((x) => x.inventoryId == action.payload.inventoryId)
      //  -1 = not found
      if (guardianIndex > -1) {
        // revert the "isSelected"
        const guardianSelected = state.guardians[guardianIndex]
        const newValue = !guardianSelected.isSelected
        if (canPushToTeam(state.guardians, MAX_GUARDIAN_COUNT, newValue)) {
          state.guardians[guardianIndex].isSelected = !guardianSelected.isSelected
        }
      }
    },
    // add/remove character to team
    selectCharacter: (state, action: PayloadAction<{ inventoryId: number }>) => {
      const characterIndex = state.characters.findIndex((x) => x.inventoryId == action.payload.inventoryId)
      //  -1 = not found
      if (characterIndex > -1) {
        // revert the "isSelected"
        const characterSelected = state.characters[characterIndex]
        const newValue = !characterSelected.isSelected
        if (canPushToTeam(state.characters, MAX_CHARACTER_COUNT, newValue)) {
          state.characters[characterIndex].isSelected = !characterSelected.isSelected
        }
      }
    },
    enableTestMode: (state) => {
      return generateTestModeState()
    },
  },
})

export const inventoryReducer = inventorySlice.reducer
export const inventoryActions = inventorySlice.actions
