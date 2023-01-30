import { FC, ReactNode } from "react"
import AlertMessage from "./AlertMessage"
import Currency from "./Currency"
import energyIcon from "../assets/icons/energy.svg"
import { slugify } from "../libs/utils"
import InventoryTable from "./InventoryTable"
import InventoryList from "./ItemList"
import { InventoryItem } from "../data/types"

interface IProps {
  title: string
  activeItems: InventoryItem[]
  maximumActiveItemsCount: number
  tableItems: InventoryItem[]
  onClickItem?: (arg: InventoryItem) => void
}
//  Should be tested so we never have more

const InventoryCard: FC<IProps> = ({ title, maximumActiveItemsCount, activeItems, tableItems, onClickItem }) => {
  return (
    <div className="inventory-card">
      <h2 className="inventory-card-title">{title}</h2>

      {activeItems.length > maximumActiveItemsCount && (
        <AlertMessage type="error" title="Error Message" message="Fatal error, it seems like you have more active item than authorized." />
      )}

      {/* TODO : Fill with empty if not full */}
      {maximumActiveItemsCount > 0 && (
        <div className="inventory-active-items">
          {activeItems.map((item) => {
            return (
              <div
                key={`active-item-${slugify(title)}-${item.id}`}
                className="inventory-item"
                onClick={(e) => {
                  onClickItem && onClickItem(item)
                }}
              >
                <img src={item.image} />
              </div>
            )
          })}
        </div>
      )}
      <InventoryTable items={tableItems} title={title} />
    </div>
  )
}

export default InventoryCard
