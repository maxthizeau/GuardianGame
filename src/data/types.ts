export enum ItemType {
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

export interface InventoryItem {
  id: number
  image: string
  name: string
  powerValue: number
  cost?: number
  rarity: Rarity
}

export interface Item extends InventoryItem {
  type: ItemType
}

export interface Guardian extends InventoryItem {
  stats?: number
}

export interface Character extends InventoryItem {
  stats?: number
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
  data: (Guardian | Character | Item)[]
}
