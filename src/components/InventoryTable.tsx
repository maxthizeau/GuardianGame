import { FC, ReactNode } from "react"
import energyIcon from "../assets/icons/energy.svg"
import { Character, Guardian } from "../data/types"
import { slugify } from "../utils/utils"
import Currency from "./Currency"
import { useAppDispatch } from "../redux/store"
import { inventoryActions } from "../redux/slices/inventorySlice"

interface IProps {
  title: string
  items: Character[]
  onClickTable: (inventoryId: number) => void
}

const InventoryTable: FC<IProps> = ({ items, title, onClickTable }) => {
  const dispatch = useAppDispatch()
  return (
    <div className="inventory-table">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Power Value</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => {
            return (
              <tr
                className={item.isSelected ? `border clickable` : "clickable"}
                key={`table-item-${slugify(title)}-${index}`}
                onClick={() => onClickTable(item.inventoryId)}
              >
                <td className="td-image">
                  <img src={item.image} />
                </td>
                <td>{item.name}</td>

                <td>
                  <Currency flat icon={{ src: energyIcon, alt: "Power Icon" }} value={item.powerValue} />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default InventoryTable
