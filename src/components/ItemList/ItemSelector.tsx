import { FC, ReactNode } from "react"
import { InventoryItem, Item } from "../../data/types"
import PlaceholderImage from "../../assets/placeholder.png"

interface IProps {
  itemSelected?: Item
  onEquip?: (itemInventoryId: number) => void
  equipped?: boolean
}

const ItemSelector: FC<IProps> = ({ itemSelected, onEquip, equipped }) => {
  return (
    <div className="item-selector">
      {!itemSelected && <p className="item-selector-placeholder">Click on an item to view its stats and spells</p>}

      {itemSelected && (
        <div className="item-selector-details">
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
                <td>{itemSelected.statistics.vitality}</td>
              </tr>
              <tr>
                <td>
                  <b>Strength</b>
                </td>
                <td>{itemSelected.statistics.strength}</td>
              </tr>
              <tr>
                <td>
                  <b>Intelligence</b>
                </td>
                <td>{itemSelected.statistics.intelligence}</td>
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
          {onEquip && (
            <button disabled={equipped} className="my-2" onClick={() => onEquip(itemSelected.inventoryId)}>
              {equipped ? "Equipped" : "Equip"}
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default ItemSelector
