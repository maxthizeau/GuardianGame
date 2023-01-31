import { Lootbox, LootboxType } from "./types"
import { Lootbox2, Lootbox3, Lootbox4 } from "../assets/lootbox"
import items from "./items"
import guardians from "./guardians"
import heroes from "./heroes"
const lootboxes: Lootbox[] = [
  {
    id: 1,
    type: LootboxType.ITEMS,
    image: Lootbox2,
    name: "Items Lootbox",
    cost: 200,
    data: items,
  },
  {
    id: 2,
    type: LootboxType.GUARDIANS,
    image: Lootbox3,
    name: "Guardians Lootbox",
    cost: 500,
    data: guardians,
  },
  {
    id: 3,
    type: LootboxType.HEROES,
    image: Lootbox4,
    name: "Heroes Lootbox",
    cost: 1000,
    data: heroes,
  },
]

export default lootboxes
