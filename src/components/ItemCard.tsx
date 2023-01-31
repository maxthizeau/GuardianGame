import { FC, ReactNode } from "react"
import AlertMessage from "./AlertMessage"
import Currency from "./Currency"
import energyIcon from "../assets/icons/energy.svg"
import { slugify } from "../libs/utils"
import InventoryTable from "./InventoryTable"
import ItemList from "./ItemList"
import { InventoryItem, Item } from "../data/types"

interface IProps {
  title: string
  items: Item[]
  onEquip?: (itemInventoryId: number) => void
  equippedItems?: number[]
}
//  Should be tested so we never have more

const ItemCard: FC<IProps> = ({ title, items, onEquip, equippedItems }) => {
  return (
    <div className="inventory-card">
      <h2 className="inventory-card-title">{title}</h2>
      {items.length > 0 ? (
        <ItemList items={items} title={title} onEquip={onEquip} equippedItems={equippedItems} />
      ) : (
        <div className="center">It looks like you don't have any item yet. Purchase some first !</div>
      )}
    </div>
  )
}

export default ItemCard
