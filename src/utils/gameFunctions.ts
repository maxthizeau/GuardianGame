import { Character, Item, Statistic } from "../data/types"

export function getPowerValue(item: Item | Character): number {
  return item.statistics.intelligence + item.statistics.strength + item.statistics.vitality
}

export function getItemsStatistics(itemArray: (Item | undefined)[]): Statistic {
  const itemsStatistics: Statistic = {
    vitality: 0,
    intelligence: 0,
    strength: 0,
  }

  itemArray.map((item) => {
    if (item) {
      itemsStatistics.vitality += item.statistics.vitality
      itemsStatistics.intelligence += item.statistics.intelligence
      itemsStatistics.strength += item.statistics.strength
    }
  })
  return itemsStatistics
}
