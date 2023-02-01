import { FC } from "react"
import AlertMessage from "./AlertMessage"
import { slugify } from "../utils/utils"
import InventoryTable from "./InventoryTable"
import { Character } from "../data/types"
import { toast } from "react-toastify"

interface IProps {
  title: string
  activeItems: Character[]
  maximumActiveItemsCount: number
  tableItems: Character[]
  onClickItem?: (arg: Character) => void
  onClickTable: (inventoryId: number) => void
}
//  Should be tested so we never have more

const InventoryCard: FC<IProps> = ({ title, maximumActiveItemsCount, activeItems, tableItems, onClickItem, onClickTable }) => {
  return (
    <div className="inventory-card">
      <h2 className="inventory-card-title">{title}</h2>

      {activeItems.length > maximumActiveItemsCount && (
        <AlertMessage type="error" title="Error Message" message="Fatal error, it seems like you have more active item than authorized." />
      )}

      {/* TODO : Fill with empty if not full */}
      {maximumActiveItemsCount > 0 && (
        <div className="inventory-active-items">
          {new Array(maximumActiveItemsCount).fill(undefined).map((_, index) => {
            const item = activeItems[index] ?? undefined
            return (
              <div
                key={`active-item-${slugify(title)}-${index}`}
                className="inventory-item"
                onClick={(e) => {
                  // if item : resolve onClick function.
                  // else : push notification to say "click on one guardian of you inventory to equip" or smthg like that
                  item
                    ? onClickItem && onClickItem(item)
                    : toast("Add a Guardian/Character to your team first", { type: "info", position: "top-center", autoClose: 2000, hideProgressBar: true })
                }}
              >
                {item && <img src={item.image} />}
              </div>
            )
          })}
        </div>
      )}
      <InventoryTable items={tableItems} title={title} onClickTable={onClickTable} />
    </div>
  )
}

export default InventoryCard
