import { RootState } from "../../redux/store"

export const testRootState: RootState = {
  app: {
    preview: {},
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
