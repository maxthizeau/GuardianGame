import { Hero, Guardian, InventoryItem, Item, LootboxType, Statistic, StatisticRange, Character } from "../../data/types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import lootboxes from "../../data/lootboxes"
import { MAX_GUARDIAN_COUNT, MAX_HERO_COUNT } from "../../libs/constants"
import items from "../../data/items"
import guardians from "../../data/guardians"
import heroes from "../../data/heroes"

interface IInventoryState {
  money: number
  heroes: Hero[]
  guardians: Guardian[]
  items: Item[]
}

const initialState: IInventoryState = {
  money: 1000,
  heroes: [],
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

const canPushToTeam = (data: Character[], maximumActive: number, setSelected: boolean) => {
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
    heroes: heroes.filter(filterRandom).map((x, index) => {
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
        case LootboxType.HERO:
          state.heroes.push({
            ...itemWon,
            // Add character's specific values
            inventoryId: state.heroes.length + 1,
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
    // add/remove heroes to team
    selectHero: (state, action: PayloadAction<{ inventoryId: number }>) => {
      const heroIndex = state.heroes.findIndex((x) => x.inventoryId == action.payload.inventoryId)
      //  -1 = not found
      if (heroIndex > -1) {
        // revert the "isSelected"
        const heroSelected = state.heroes[heroIndex]
        const newValue = !heroSelected.isSelected
        if (canPushToTeam(state.heroes, MAX_HERO_COUNT, newValue)) {
          state.heroes[heroIndex].isSelected = !heroSelected.isSelected
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
