import { EViews } from "../../redux/slices/appSlice"
import { RootState } from "../../redux/store"

export const testRootState: RootState = {
  app: {
    view: {
      type: EViews.HOME,
    },
  },
  inventory: {
    money: 0,
    characters: [],
    items: [],
  },
  profile: {
    name: "testusername",
  },
}
