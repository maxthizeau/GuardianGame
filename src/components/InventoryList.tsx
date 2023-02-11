import { FC, ReactNode, useState, useCallback } from "react"
import { Character, InventoryItem, Item, ItemType } from "../data/types"
import { usePreview } from "../hook/usePreview"
import ItemElement from "./ItemElement"
import { getPowerValue } from "../utils/gameFunctions"
import Divider from "./UIKit/Divider"

const characterTypes = [ItemType.GUARDIAN, ItemType.HERO]
const itemTypes = [ItemType.HAT, ItemType.RING]

type OrderBy = "power" | "level" | "date"
type Sorter = {
  orderBy: OrderBy
  sort: "asc" | "desc"
}

interface IProps {
  itemsArray: (Item | Character)[]
  title?: string
  defaultSort?: Sorter
  limit?: number
}

type Filter = "hideEquipped"

const InventoryList: FC<IProps> = ({ itemsArray, title, defaultSort, limit }) => {
  const { setOnClickOnHoverPreview } = usePreview()
  const [sorter, setSorter] = useState<Sorter | undefined>(defaultSort)
  const [filter, setFilter] = useState<Filter | undefined>(undefined)

  const changeSorter = (orderBy: OrderBy) => {
    if (!sorter || sorter.orderBy != orderBy) {
      setSorter({ orderBy, sort: "desc" })
    } else {
      setSorter({ orderBy, sort: sorter.sort == "asc" ? "desc" : "asc" })
    }
  }

  const getClassNames = (orderBy: OrderBy) => {
    let initSorter = sorter ?? defaultSort
    if (!initSorter) {
      return ""
    } else {
      return `${initSorter.orderBy == orderBy ? `active ${initSorter.sort == "asc" ? "up" : "down"}` : ""}`
    }
  }

  const filterFunction = useCallback(
    (value: Item | Character) => {
      if (itemTypes.includes(value.type)) {
        const typedItem = value as Item
        if (filter == "hideEquipped") {
          return !typedItem.isEquiped
        }
      }
      return true
    },
    [filter]
  )

  function compareFunction(a: Item | Character, b: Item | Character): number {
    if (!sorter) {
      return 0
    }

    if (sorter.orderBy == "power") {
      const powerA = getPowerValue(a)
      const powerB = getPowerValue(b)
      return sorter?.sort == "asc" ? powerA - powerB : powerB - powerA
    }
    if (sorter.orderBy == "level") {
      const typedA = a as Character
      const typedB = b as Character
      if (typedA.level !== undefined && typedB.level !== undefined) {
        return sorter?.sort == "asc" ? typedA.level - typedB.level : typedB.level - typedA.level
      }
    }
    if (sorter.orderBy == "date") {
      return sorter?.sort == "asc" ? a.inventoryId - b.inventoryId : b.inventoryId - a.inventoryId
    }

    return 0
  }
  return (
    <>
      {title && <h3>{title}</h3>}
      <div className="inventory-sorters">
        <a onClick={() => changeSorter("power")} className={getClassNames("power")}>
          Power
        </a>
        {!itemsArray.find((x) => itemTypes.includes(x.type)) && (
          <a onClick={() => changeSorter("level")} className={getClassNames("level")}>
            Lvl
          </a>
        )}
        <a onClick={() => changeSorter("date")} className={getClassNames("date")}>
          Date
        </a>
        {itemsArray.find((x) => itemTypes.includes(x.type)) && (
          <>
            <Divider vertical />
            <a
              className={filter == "hideEquipped" ? "active" : ""}
              onClick={() => {
                setFilter(filter == "hideEquipped" ? undefined : "hideEquipped")
              }}
            >
              Hide equipped
            </a>
          </>
        )}
      </div>
      {/* GameInventoryList */}
      <div className="game-inventory-items-list">
        {itemsArray

          .sort(compareFunction)
          .filter((value) => filterFunction(value))
          .map((item, index) => {
            const previewType = [ItemType.GUARDIAN, ItemType.HERO].includes(item.type) ? "character" : "item"
            return (
              <ItemElement
                item={item}
                key={`inventory-${index}`}
                {...setOnClickOnHoverPreview({
                  item: {
                    type: previewType,
                    item: item,
                  },
                })}
              />
            )
          })}
      </div>
    </>
  )
}

export default InventoryList
