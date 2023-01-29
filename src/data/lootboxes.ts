import { Lootbox, LootboxType } from "./types"
import { Lootbox2, Lootbox3, Lootbox4 } from "../assets/lootbox"
import items from "./items"
import guardians from "./guardians"
import characters from "./characters"
const lootboxes: Lootbox[] = [
  {
    type: LootboxType.ITEMS,
    image: Lootbox2,
    name: "Items Lootbox",
    cost: 200,
    data: items,
  },
  {
    type: LootboxType.GUARDIANS,
    image: Lootbox3,
    name: "Guardians Lootbox",
    cost: 500,
    data: guardians,
  },
  {
    type: LootboxType.CHARACTERS,
    image: Lootbox4,
    name: "Characters Lootbox",
    cost: 1000,
    data: characters,
  },
]

export default lootboxes
