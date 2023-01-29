import { Character1, Character2, Character3 } from "../assets/characters"
import { Character, Rarity } from "./types"

const characters: Character[] = [
  {
    id: 1,
    name: "Spargo",
    image: Character1,
    powerValue: 200,
    rarity: Rarity.COMMON,
  },
  {
    id: 2,
    name: "Glutonny",
    image: Character2,
    powerValue: 250,
    rarity: Rarity.EPIC,
  },
  {
    id: 3,
    name: "MKLeo",
    image: Character3,
    powerValue: 200,
    rarity: Rarity.LEGENDARY,
  },
]

export default characters
