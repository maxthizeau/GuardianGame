import * as Items from "../assets/items"
import { InventoryItem, Item, ItemType, Rarity } from "./types"

const items: InventoryItem[] = [
  {
    id: 1,
    name: "Ring",
    image: Items.Ring1,
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
    name: "Ring 2",
    image: Items.Ring2,
    powerValue: 250,
    type: ItemType.RING,
    rarity: Rarity.COMMON,
    statisticsRanges: {
      vitality: { min: 100, max: 200 },
      strength: { min: 100, max: 200 },
      intelligence: { min: 100, max: 200 },
    },
  },
  {
    id: 3,
    name: "Ring 3",
    image: Items.Ring3,
    powerValue: 300,
    type: ItemType.RING,
    rarity: Rarity.UNCOMMON,
    statisticsRanges: {
      vitality: { min: 100, max: 200 },
      strength: { min: 100, max: 200 },
      intelligence: { min: 100, max: 200 },
    },
  },
  {
    id: 4,
    name: "Ring 4",
    image: Items.Ring4,
    powerValue: 320,
    type: ItemType.RING,
    rarity: Rarity.UNCOMMON,
    statisticsRanges: {
      vitality: { min: 100, max: 200 },
      strength: { min: 100, max: 200 },
      intelligence: { min: 100, max: 200 },
    },
  },
  {
    id: 5,
    name: "Ring 5",
    image: Items.Ring5,
    powerValue: 340,
    type: ItemType.RING,
    rarity: Rarity.UNCOMMON,
    statisticsRanges: {
      vitality: { min: 100, max: 200 },
      strength: { min: 100, max: 200 },
      intelligence: { min: 100, max: 200 },
    },
  },
  {
    id: 6,
    name: "Ring 6",
    image: Items.Ring6,
    powerValue: 400,
    type: ItemType.RING,
    rarity: Rarity.RARE,
    statisticsRanges: {
      vitality: { min: 100, max: 200 },
      strength: { min: 100, max: 200 },
      intelligence: { min: 100, max: 200 },
    },
  },
  {
    id: 7,
    name: "Ring 7",
    image: Items.Ring7,
    powerValue: 425,
    type: ItemType.RING,
    rarity: Rarity.RARE,
    statisticsRanges: {
      vitality: { min: 100, max: 200 },
      strength: { min: 100, max: 200 },
      intelligence: { min: 100, max: 200 },
    },
  },
  {
    id: 8,
    name: "Ring 8",
    image: Items.Ring8,
    powerValue: 500,
    type: ItemType.RING,
    rarity: Rarity.EPIC,
    statisticsRanges: {
      vitality: { min: 100, max: 200 },
      strength: { min: 100, max: 200 },
      intelligence: { min: 100, max: 200 },
    },
  },
  {
    id: 9,
    name: "Ring 9",
    image: Items.Ring9,
    powerValue: 550,
    type: ItemType.RING,
    rarity: Rarity.EPIC,
    statisticsRanges: {
      vitality: { min: 100, max: 200 },
      strength: { min: 100, max: 200 },
      intelligence: { min: 100, max: 200 },
    },
  },
  {
    id: 10,
    name: "Ring 10",
    image: Items.Ring10,
    powerValue: 800,
    type: ItemType.RING,
    rarity: Rarity.LEGENDARY,
    statisticsRanges: {
      vitality: { min: 100, max: 200 },
      strength: { min: 100, max: 200 },
      intelligence: { min: 100, max: 200 },
    },
  },
  {
    id: 11,
    name: "Hat 1",
    image: Items.Hat1,
    powerValue: 200,
    type: ItemType.HAT,
    rarity: Rarity.UNCOMMON,
    statisticsRanges: {
      vitality: { min: 100, max: 200 },
      strength: { min: 100, max: 200 },
      intelligence: { min: 100, max: 200 },
    },
  },
  {
    id: 12,
    name: "Hat 2",
    image: Items.Hat2,
    powerValue: 600,
    type: ItemType.HAT,
    rarity: Rarity.EPIC,
    statisticsRanges: {
      vitality: { min: 100, max: 200 },
      strength: { min: 100, max: 200 },
      intelligence: { min: 100, max: 200 },
    },
  },
  {
    id: 13,
    name: "Hat 3",
    image: Items.Hat3,
    powerValue: 1200,
    type: ItemType.HAT,
    rarity: Rarity.LEGENDARY,
    statisticsRanges: {
      vitality: { min: 100, max: 200 },
      strength: { min: 100, max: 200 },
      intelligence: { min: 100, max: 200 },
    },
  },
]

export default items
