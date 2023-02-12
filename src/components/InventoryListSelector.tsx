/**
 * This is a copy of InventoryList component, without filters/sorters and with a different setOnClickOnHover action type, taking care of the charId prop
 * This can and should be factorized later on a single component for easier testing
 */

import { FC, ReactNode, useState, useCallback } from "react"
import { Character, InventoryItem, Item, ItemType } from "../data/types"
import { usePreview } from "../hook/usePreview"
import ItemElement from "./ItemElement"
import { getPowerValue } from "../utils/gameFunctions"
import Divider from "./UIKit/Divider"

interface IProps {
  itemsArray: Item[]
  title?: string
  charId: number
}

const InventoryListSelector: FC<IProps> = ({ itemsArray, title, charId }) => {
  const { setOnClickOnHoverPreview } = usePreview()

  return (
    <>
      {title && <h3>{title}</h3>}

      {/* GameInventoryListSelector */}
      <div className="game-inventory-list-selector">
        {itemsArray

          // .sort(compareFunction)

          .map((item, index) => {
            return (
              <ItemElement
                item={item}
                key={`inventory-${index}`}
                {...setOnClickOnHoverPreview({
                  item: {
                    type: "item-selector",
                    item: item,
                    args: charId,
                  },
                })}
                customWidth={50}
              />
            )
          })}
      </div>
    </>
  )
}

export default InventoryListSelector
