export enum ItemType {
  HERO,
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
  isEquiped: boolean
}

// Guardian looted
export interface Guardian extends InventoryItem {
  inventoryId: number
  statistics: Statistic
  level: number
  xp: number
  items: number[]
  isSelected: boolean
}

// Character looted
export interface Hero extends InventoryItem {
  inventoryId: number
  statistics: Statistic
  level: number
  xp: number
  items: number[]
  isSelected: boolean
}

export enum LootboxType {
  GUARDIANS,
  ITEMS,
  HERO,
}

export interface Lootbox {
  id: number
  type: LootboxType
  image: string
  name: string
  cost: number
  data: InventoryItem[]
}

export type Character = Guardian | Hero
