import { Character1, Character2, Character3 } from "../assets/characters"
import { ItemType, Rarity, InventoryItem } from "./types"

const heroes: InventoryItem[] = [
  {
    id: 1,
    name: "Spargo",
    image: Character1,
    powerValue: 200,
    rarity: Rarity.COMMON,
    type: ItemType.HERO,
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
    type: ItemType.HERO,
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
    type: ItemType.HERO,
    statisticsRanges: {
      vitality: { min: 100, max: 200 },
      strength: { min: 100, max: 200 },
      intelligence: { min: 100, max: 200 },
    },
  },
]

export default heroes
