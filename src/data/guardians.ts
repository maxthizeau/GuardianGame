import { Guardian1, Guardian2, Guardian3 } from "../assets/guardians"
import { Guardian, Rarity } from "./types"

const guardians: Guardian[] = [
  {
    id: 1,
    name: "Aurelion",
    image: Guardian1,
    powerValue: 200,
    rarity: Rarity.UNCOMMON,
  },
  {
    id: 2,
    name: "Malphite",
    image: Guardian2,
    powerValue: 250,
    rarity: Rarity.EPIC,
  },
  {
    id: 3,
    name: "Singed",
    image: Guardian3,
    powerValue: 200,
    rarity: Rarity.LEGENDARY,
  },
]

export default guardians
