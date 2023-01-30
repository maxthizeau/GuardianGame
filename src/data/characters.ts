import { Character1, Character2, Character3 } from "../assets/characters"
import { Character, ItemType, Rarity, InventoryItem } from "./types"

const characters: InventoryItem[] = [
  {
    id: 1,
    name: "Spargo",
    image: Character1,
    powerValue: 200,
    rarity: Rarity.COMMON,
    type: ItemType.CHARACTER,
    statisticsRanges: {
      vitality: { min: 100, max: 200 },
      strength: { min: 100, max: 200 },
      intelligence: { min: 100, max: 200 },
    },
  },
  {
    id: 2,
    name: "Glutonny",
    image: Character2,
    powerValue: 250,
    rarity: Rarity.EPIC,
    type: ItemType.CHARACTER,
    statisticsRanges: {
      vitality: { min: 100, max: 200 },
      strength: { min: 100, max: 200 },
      intelligence: { min: 100, max: 200 },
    },
  },
  {
    id: 3,
    name: "MKLeo",
    image: Character3,
    powerValue: 200,
    rarity: Rarity.LEGENDARY,
    type: ItemType.CHARACTER,
    statisticsRanges: {
      vitality: { min: 100, max: 200 },
      strength: { min: 100, max: 200 },
      intelligence: { min: 100, max: 200 },
    },
  },
]

export default characters
