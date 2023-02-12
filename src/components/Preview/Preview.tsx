import { FC, ReactNode, useState } from "react"
import { usePreview } from "../../hook/usePreview"
import { useAppSelector } from "../../redux/store"
import { Character, Item } from "../../data/types"
import CharacterPreview from "./CharacterPreview"
import ItemPreview from "./ItemPreview"

interface IProps {
  mobile?: boolean
}

const Preview: FC<IProps> = ({ mobile }) => {
  const preview = useAppSelector((state) => state.app.preview)
  const { clearPreview } = usePreview()
  const isActive = (preview.itemToShow && preview.type == "selected" && mobile) || (preview.itemToShow && !mobile)
  return (
    <div data-testid="preview-container" className={`${mobile ? `preview-mobile` : `preview`} ${isActive ? "active" : ""}`}>
      {preview.type == "selected" && (
        <button data-testid="close-button" className="close-preview" onClick={clearPreview}>
          x
        </button>
      )}
      {!preview.itemToShow && (
        <p className="preview-placeholder" data-testid="preview-placeholder">
          Hover or select something to see details
        </p>
      )}
      {preview.itemToShow?.type == "string" && <p className="preview-placeholder">{preview.itemToShow.item.toString()}</p>}
      {/* <p className="preview-placeholder">{preview.itemToShow}</p> */}

      {preview.itemToShow?.type == "character" && <CharacterPreview character={preview.itemToShow.item as Character} />}
      {preview.itemToShow?.type == "item" && <ItemPreview item={preview.itemToShow.item as Item} />}
      {preview.itemToShow?.type == "item-selector" && <ItemPreview item={preview.itemToShow.item as Item} charId={preview.itemToShow.args} toEquip />}
    </div>
  )
}

export default Preview
