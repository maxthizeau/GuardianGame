import { Guardian1, Guardian2, Guardian3 } from "../assets/guardians"
import { Guardian, InventoryItem, ItemType, Rarity } from "./types"

const guardians: InventoryItem[] = [
  {
    id: 1,
    name: "Aurelion",
    image: Guardian1,
    powerValue: 200,
    rarity: Rarity.UNCOMMON,
    type: ItemType.GUARDIAN,
    statisticsRanges: {
      vitality: { min: 100, max: 200 },
      strength: { min: 100, max: 200 },
      intelligence: { min: 100, max: 200 },
    },
  },
  {
    id: 2,
    name: "Malphite",
    image: Guardian2,
    powerValue: 250,
    rarity: Rarity.EPIC,
    type: ItemType.GUARDIAN,
    statisticsRanges: {
      vitality: { min: 100, max: 200 },
      strength: { min: 100, max: 200 },
      intelligence: { min: 100, max: 200 },
    },
  },
  {
    id: 3,
    name: "Singed",
    image: Guardian3,
    powerValue: 200,
    rarity: Rarity.LEGENDARY,
    type: ItemType.GUARDIAN,
    statisticsRanges: {
      vitality: { min: 100, max: 200 },
      strength: { min: 100, max: 200 },
      intelligence: { min: 100, max: 200 },
    },
  },
]

export default guardians
