import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Character, InventoryItem, Item, Lootbox } from "../../data/types"

// export const enum EViews {
//   HOME,
//   CHARACTER,
//   LOOTBOX,
// }

// export type View = {
//   type: EViews
//   arg?: any
// }

export type ItemInPreview = {
  item: InventoryItem | Character | Item | Lootbox | string
  type: "string" | "character" | "item" | "lootbox" | "item-selector"
  args?: any
}

export type Preview = {
  type?: "selected" | "hover"
  itemToShow?: ItemInPreview
}

interface IAppState {
  // view: View
  preview: Preview
}

const initialState: IAppState = {
  // view: { type: EViews.HOME },
  preview: {},
}

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    // changeView: (state, action: PayloadAction<View>) => {
    //   state.view = action.payload
    // },
    selectPreview: (state, action: PayloadAction<Preview>) => {
      // If type will be selected (user wants to display it and clicked on it)
      // or if current preview is not selected (on mouse hover for example)
      if (action.payload.type == "selected" || state.preview.type !== "selected") {
        state.preview = action.payload
      }
    },
    clearPreview: (state) => {
      state.preview = {}
    },
  },
})

export const appReducer = appSlice.reducer
export const appActions = appSlice.actions
