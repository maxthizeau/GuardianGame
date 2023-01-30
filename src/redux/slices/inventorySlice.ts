import { Character, Guardian, InventoryItem, Item, LootboxType, Statistic, StatisticRange } from "../../data/types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import lootboxes from "../../data/lootboxes"

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

      if (!lootbox || !itemWon || state.money - lootbox.cost < 0) {
        return state
      }

      // Create new item

      state.money -= lootbox.cost

      switch (lootbox.type) {
        case LootboxType.CHARACTERS:
          state.characters.push({
            ...itemWon,
            // Add character's specific values
            inventoryId: state.characters.length + 1,
            level: 1,
            statistics: generateStatistics(itemWon.statisticsRanges),
            xp: 0,
          })
          break
        case LootboxType.GUARDIANS:
          state.guardians.push({
            ...itemWon,
            // Add guradian's specific values
            inventoryId: state.characters.length + 1,
            level: 1,
            statistics: generateStatistics(itemWon.statisticsRanges),
            xp: 0,
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
  },
})

export const inventoryReducer = inventorySlice.reducer
export const inventoryActions = inventorySlice.actions
