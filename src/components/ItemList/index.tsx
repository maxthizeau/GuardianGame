import { FC, ReactNode, useState } from "react"
import { InventoryItem, Item } from "../../data/types"
import { slugify } from "../../utils/utils"
import ItemSelector from "./ItemSelector"

interface IProps {
  title: string
  items: Item[]
  onEquip?: (itemInventoryId: number) => void
  equippedItems?: number[]
}

const ItemList: FC<IProps> = ({ title, items, onEquip, equippedItems }) => {
  const [selectedItem, setSelectedItem] = useState<Item | undefined>(undefined)

  return (
    <div className="inventory-item-selector">
      <div className="inventory-list">
        {items
          // .sort((a, b) => a.rarity - b.rarity)
          .map((item, index) => {
            return (
              <div onClick={() => setSelectedItem(item)} key={`list-${slugify(title)}-${index}}`} className={`inventory-item border-rarity-${item.rarity}`}>
                <img src={item.image} />
              </div>
            )
          })}
      </div>
      <ItemSelector equipped={selectedItem && equippedItems?.includes(selectedItem.inventoryId)} itemSelected={selectedItem} onEquip={onEquip} />
    </div>
  )
}

export default ItemList
