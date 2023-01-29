import { FC, ReactNode } from "react"
import { InventoryItem, Item } from "../../data/types"
import PlaceholderImage from "../../assets/placeholder.png"

interface IProps {
  itemSelected?: InventoryItem
}

const ItemSelector: FC<IProps> = ({ itemSelected }) => {
  return (
    <div className="item-selector">
      {!itemSelected && <p className="item-selector-placeholder">Click on an item to view its stats and spells</p>}

      {itemSelected && (
        <table>
          <thead>
            <tr>
              <th>
                <img className={`item-image rarity-${itemSelected.rarity}`} src={itemSelected.image} />
              </th>
              <th>{itemSelected.name}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <b>Vitality</b>
              </td>
              <td>920</td>
            </tr>
            <tr>
              <td>
                <b>Strength</b>
              </td>
              <td>122</td>
            </tr>
            <tr>
              <td>
                <b>Intelligence</b>
              </td>
              <td>92</td>
            </tr>
            <tr>
              <td>
                <img src={PlaceholderImage} />
              </td>
              <td>
                <p>
                  <b>Vitality Boost</b>
                </p>
                <p>
                  Increase vitality of all characters of 20% <span className="spell-value">(+5%)</span> for the next 2 rounds.
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  )
}

export default ItemSelector
