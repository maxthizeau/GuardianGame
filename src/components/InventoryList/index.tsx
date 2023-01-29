import { FC, ReactNode, useState } from "react"
import { InventoryItem, Item } from "../../data/types"
import { slugify } from "../../libs/utils"
import ItemSelector from "./ItemSelector"

interface IProps {
  title: string
  items: InventoryItem[]
}

const InventoryList: FC<IProps> = ({ title, items }) => {
  const [selectedItem, setSelectedItem] = useState<InventoryItem | undefined>(undefined)

  return (
    <div className="inventory-item-selector">
      <div className="inventory-list">
        {items
          .sort((a, b) => a.rarity - b.rarity)
          .map((item) => {
            return (
              <div onClick={() => setSelectedItem(item)} key={`list-${slugify(title)}-${item.id}}`} className={`inventory-item border-rarity-${item.rarity}`}>
                <img src={item.image} />
              </div>
            )
          })}
      </div>
      <ItemSelector itemSelected={selectedItem} />
    </div>
  )
}

export default InventoryList
