import { Character, Guardian, InventoryItem, Item, LootboxType } from "../../data/types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import lootboxes from "../../data/lootboxes"

interface IInventoryState {
  money: number
  characters: InventoryItem[]
  guardians: InventoryItem[]
  items: InventoryItem[]
}

const initialState: IInventoryState = {
  money: 1000,
  characters: [],
  guardians: [],
  items: [],
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

      state.money -= lootbox.cost

      switch (lootbox.type) {
        case LootboxType.CHARACTERS:
          state.characters.push(itemWon)
          break
        case LootboxType.GUARDIANS:
          state.guardians.push(itemWon)
          break
        case LootboxType.ITEMS:
          state.items.push(itemWon)
          break
        default:
          break
      }
    },
  },
})

export const inventoryReducer = inventorySlice.reducer
export const inventoryActions = inventorySlice.actions
