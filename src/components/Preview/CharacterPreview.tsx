import { FC, ReactNode } from "react"
import { powerIcon } from "../../assets/icons"
import { Character, ItemType } from "../../data/types"
import ItemElement from "../ItemElement"

import { MAX_GUARDIAN_COUNT, MAX_HERO_COUNT } from "../../libs/constants"
import { useAppSelector, useAppDispatch } from "../../redux/store"
import { inventoryActions } from "../../redux/slices/inventorySlice"
import { useNavigate } from "react-router"
import StatisticTable from "../StatisticTable"

interface IProps {
  character: Character
}

const CharacterPreview: FC<IProps> = ({ character }) => {
  const navigate = useNavigate()
  const slotMax = character.type == ItemType.GUARDIAN ? MAX_GUARDIAN_COUNT : MAX_HERO_COUNT
  const slotTaken = useAppSelector((state) => state.inventory.characters.filter((x) => x.type == character.type && x.isSelected).length)
  const dispatch = useAppDispatch()
  return (
    <div className="item-preview">
      <div className="item-preview-main">
        <div className="item-preview-left">
          <ItemElement
            item={character}
            customWidth={80}
            extraContent={
              <div className="xp-bar">
                <div className="bar-completion" style={{ width: "80%" }}></div>
                <div className="xp-bar-text">Lvl {character.level}</div>
              </div>
            }
          />
        </div>
        <div className="item-preview-right">
          <div className="item-preview-name">{character.name}</div>
          <StatisticTable statistics={character.statistics} />
        </div>
      </div>
      <div className="preview-actions">
        {character.isSelected ? (
          <>
            <button onClick={() => dispatch(inventoryActions.selectCharacter({ inventoryId: character.inventoryId }))}>
              <span className="intensify-red">Remove from team</span>
            </button>
            <button onClick={() => navigate(`/character/${character.inventoryId}`)}>
              <span>Details</span>
            </button>
          </>
        ) : (
          <>
            <button
              onClick={slotTaken >= slotMax ? () => {} : () => dispatch(inventoryActions.selectCharacter({ inventoryId: character.inventoryId }))}
              disabled={slotTaken >= slotMax}
              title={slotTaken >= slotMax ? "Your team can't take on any more members. Remove one first. " : ""}
            >
              <span className="intensify">Add in team</span>
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default CharacterPreview
