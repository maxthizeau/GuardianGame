import { FC, HTMLProps, ReactNode } from "react"
import { powerIcon } from "../assets/icons"
import { Character, Item, InventoryItem } from "../data/types"
import { getPowerValue } from "../utils/gameFunctions"

interface IProps extends HTMLProps<HTMLDivElement> {
  item?: Item | Character
  customWidth?: number
  extraContent?: ReactNode
}

const ItemElement: FC<IProps> = ({ item, customWidth, extraContent, ...props }) => {
  const powerValue = item ? (item?.statistics ? getPowerValue(item) : item?.powerValue) : "-"
  return (
    <>
      <div className="game-inventory-item" {...props}>
        <div
          className={`game-inventory-item-image border-rarity border-rarity-${item?.rarity ?? "none"}`}
          style={customWidth ? { width: `${customWidth}px`, height: `${customWidth}px` } : {}}
        >
          {item && (
            <>
              <img src={item.image} className="" />
              <div className="game-inventory-item-gradiant">
                <div className="item-power-indicator">
                  <img src={powerIcon} />
                  <span>{powerValue}</span>
                </div>
              </div>
            </>
          )}
        </div>
        {extraContent}
      </div>
    </>
  )
}

export default ItemElement
