import { FC } from "react"
import ItemList from "./ItemList"
import { Item } from "../data/types"

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
        <div data-testid="no-item-message" className="center">
          It looks like you don't have any item yet. Purchase some first !
        </div>
      )}
    </div>
  )
}

export default ItemCard
