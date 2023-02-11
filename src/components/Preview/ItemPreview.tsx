import { FC, ReactNode } from "react"
import { powerIcon } from "../../assets/icons"
import { Character, Item } from "../../data/types"
import ItemElement from "../ItemElement"
import IntelligenceIcon from "../../assets/icons/intelligence.png"
import StrengthIcon from "../../assets/icons/strength.png"
import VitalityIcon from "../../assets/icons/vitality.png"
import { useAppSelector, useAppDispatch } from "../../redux/store"
import SkillBox from "../SkillBox"
import { inventoryActions } from "../../redux/slices/inventorySlice"

interface IProps {
  item: Item
  toEquip?: boolean
  charId?: number
}

const DetailsActions = ({ isEquipped, equippedTo }: { isEquipped: boolean; equippedTo?: Character }) => {
  return (
    <>
      {isEquipped && equippedTo ? (
        <button>
          <span>
            Equipped on <span className="intensify">{equippedTo.name}</span>
          </span>
        </button>
      ) : (
        <button disabled>
          <span>Not equipped</span>
        </button>
      )}
    </>
  )
}
const EquipActions = ({
  isEquipped,
  currentCharId,
  equippedTo,
  equipFunction,
}: {
  isEquipped: boolean
  currentCharId: number
  equippedTo?: Character
  equipFunction: () => void
}) => {
  if (isEquipped && equippedTo && currentCharId != equippedTo.inventoryId) {
    return (
      <button disabled>
        <span>
          Equipped on <span className="intensify">{equippedTo.name}</span>
        </span>
      </button>
    )
  }
  if (isEquipped && equippedTo && currentCharId == equippedTo.inventoryId) {
    return (
      <button onClick={equipFunction}>
        <span className="intensify-red">Unequip</span>
      </button>
    )
  }
  if (!isEquipped) {
    return (
      <button onClick={equipFunction}>
        <span className="intensify">Equip</span>
      </button>
    )
  }

  return null
}

const ItemPreview: FC<IProps> = ({ item, toEquip, charId }) => {
  const equippedTo = useAppSelector((state) => state.inventory.characters.find((x) => x.items.includes(item.inventoryId)))
  const dispatch = useAppDispatch()
  // We should always have a charId when trying to equip an item
  if (toEquip && !charId) {
    return null
  }
  return (
    <div className="item-preview">
      <div className="item-preview-main">
        <div className="item-preview-left">
          <ItemElement item={item} customWidth={80} />
        </div>
        <div className="item-preview-right">
          <div className="item-preview-name">{item.name}</div>
          <table className="stats-table">
            <tbody>
              <tr>
                <td className="icon">
                  <img src={VitalityIcon} />
                </td>
                <td className="stat-name">Vitality</td>
                <td className="stat-value">{item.statistics.vitality}</td>
              </tr>
              <tr>
                <td className="icon">
                  <img src={StrengthIcon} />
                </td>
                <td className="stat-name">Strength</td>
                <td className="stat-value">{item.statistics.strength}</td>
              </tr>
              <tr>
                <td className="icon">
                  <img src={IntelligenceIcon} />
                </td>
                <td className="stat-name">Intelligence</td>
                <td className="stat-value">{item.statistics.intelligence}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* End item-preview-main */}

      <SkillBox />
      <div className="preview-actions">
        {toEquip && charId ? (
          <EquipActions
            isEquipped={item.isEquiped}
            equippedTo={equippedTo}
            currentCharId={charId}
            equipFunction={() =>
              dispatch(
                inventoryActions.equipItem({
                  itemInventoryId: item.inventoryId,
                  charInventoryId: charId,
                })
              )
            }
          />
        ) : (
          <DetailsActions isEquipped={item.isEquiped} equippedTo={equippedTo} />
        )}
      </div>
    </div>
  )
}

export default ItemPreview
