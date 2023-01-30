import { FC, ReactNode } from "react"
import energyIcon from "../assets/icons/energy.svg"
import { InventoryItem } from "../data/types"
import { slugify } from "../libs/utils"
import Currency from "./Currency"

interface IProps {
  title: string
  items: InventoryItem[]
}

const InventoryTable: FC<IProps> = ({ items, title }) => {
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
              <tr key={`table-item-${slugify(title)}-${index}`}>
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
