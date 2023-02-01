import { Character, Hero, Item, Guardian, InventoryItem, ItemType, Rarity } from "../data/types"

const inventoryItems: InventoryItem[] = [
  {
    id: 1,
    name: "Ring",
    image: "http://localhost:3000/image.png",
    powerValue: 200,
    type: ItemType.RING,
    rarity: Rarity.COMMON,
    statisticsRanges: {
      vitality: { min: 100, max: 200 },
      strength: { min: 100, max: 200 },
      intelligence: { min: 100, max: 200 },
    },
  },
  {
    id: 2,
    name: "Hat",
    image: "http://localhost:3000/image.png",
    powerValue: 200,
    type: ItemType.HAT,
    rarity: Rarity.RARE,
    statisticsRanges: {
      vitality: { min: 100, max: 200 },
      strength: { min: 100, max: 200 },
      intelligence: { min: 100, max: 200 },
    },
  },
  {
    id: 3,
    name: "Guardian 1",
    image: "http://localhost:3000/image.png",
    powerValue: 200,
    type: ItemType.GUARDIAN,
    rarity: Rarity.RARE,
    statisticsRanges: {
      vitality: { min: 100, max: 200 },
      strength: { min: 100, max: 200 },
      intelligence: { min: 100, max: 200 },
    },
  },
  {
    id: 4,
    name: "Guardian 2",
    image: "http://localhost:3000/image.png",
    powerValue: 200,
    type: ItemType.GUARDIAN,
    rarity: Rarity.LEGENDARY,
    statisticsRanges: {
      vitality: { min: 100, max: 200 },
      strength: { min: 100, max: 200 },
      intelligence: { min: 100, max: 200 },
    },
  },
  {
    id: 5,
    name: "Hero 1",
    image: "http://localhost:3000/image.png",
    powerValue: 200,
    type: ItemType.HERO,
    rarity: Rarity.UNCOMMON,
    statisticsRanges: {
      vitality: { min: 100, max: 200 },
      strength: { min: 100, max: 200 },
      intelligence: { min: 100, max: 200 },
    },
  },
  {
    id: 6,
    name: "Hero 2",
    image: "http://localhost:3000/image.png",
    powerValue: 200,
    type: ItemType.HERO,
    rarity: Rarity.EPIC,
    statisticsRanges: {
      vitality: { min: 100, max: 200 },
      strength: { min: 100, max: 200 },
      intelligence: { min: 100, max: 200 },
    },
  },
]

const getHeroes = (startIndex: number): Hero[] => {
  return [
    ...inventoryItems
      .filter((x) => x.type == ItemType.HERO)
      .map((hero, index) => {
        return {
          ...hero,
          inventoryId: startIndex + index,
          statistics: {
            vitality: 120,
            strength: 120,
            intelligence: 120,
          },
          level: 1,
          xp: 0,
          items: [],
          isSelected: false,
        }
      }),
  ]
}

const getGuardians = (startIndex: number): Guardian[] => {
  return [
    ...inventoryItems
      .filter((x) => x.type == ItemType.GUARDIAN)
      .map((guardian, index) => {
        return {
          ...guardian,
          inventoryId: startIndex + index,
          statistics: {
            vitality: 120,
            strength: 120,
            intelligence: 120,
          },
          level: 1,
          xp: 0,
          items: [],
          isSelected: false,
        }
      }),
  ]
}

const getItems = (startIndex: number): Item[] => {
  return [
    ...inventoryItems
      .filter((x) => x.type == ItemType.RING || x.type == ItemType.HAT)
      .map((item, index) => {
        return {
          ...item,
          inventoryId: startIndex + index,
          statistics: {
            vitality: 120,
            strength: 120,
            intelligence: 120,
          },

          isEquiped: false,
        }
      }),
  ]
}

export const getTestData = () => {
  const guardians = getGuardians(1)
  const heroes = getHeroes(guardians.length)
  const items = getItems(1)
  return {
    inventoryItems,
    items,
    guardians,
    heroes,
  }
}
