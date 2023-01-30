export enum ItemType {
  CHARACTER,
  GUARDIAN,
  RING,
  HAT,
}

export enum Rarity {
  COMMON,
  UNCOMMON,
  RARE,
  EPIC,
  LEGENDARY,
}

export interface Statistic {
  vitality: number
  strength: number
  intelligence: number
}

export type Range = { min: number; max: number }

export interface StatisticRange {
  vitality: Range
  strength: Range
  intelligence: Range
}

export interface InventoryItem {
  id: number
  image: string
  name: string
  type: ItemType
  powerValue: number
  cost?: number
  rarity: Rarity
  statisticsRanges: StatisticRange
}

export interface Skill {
  id: number
  image: string
  name: string
  rarity: Rarity
}

// Item looted
export interface Item extends InventoryItem {
  inventoryId: number
  statistics: Statistic
  skill?: Skill
}

// Guardian looted
export interface Guardian extends InventoryItem {
  inventoryId: number
  statistics: Statistic
  level: number
  xp: number
}

// Character looted
export interface Character extends InventoryItem {
  inventoryId: number
  statistics: Statistic
  level: number
  xp: number
}

export enum LootboxType {
  GUARDIANS,
  ITEMS,
  CHARACTERS,
}

export interface Lootbox {
  id: number
  type: LootboxType
  image: string
  name: string
  cost: number
  data: InventoryItem[]
}
