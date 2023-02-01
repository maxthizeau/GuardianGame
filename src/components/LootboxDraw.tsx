import { FC, useEffect, useState } from "react"
import { powerIcon } from "../assets/icons"
import { Lootbox3 } from "../assets/lootbox"
import Currency from "../components/Currency"
import items from "../data/items"
import { InventoryItem } from "../data/types"
import { shuffleArray } from "../utils/utils"
import { useAppDispatch } from "../redux/store"
import "../styles/lootbox.scss"
import { inventoryActions } from "../redux/slices/inventorySlice"
import { AnimationState } from "../hook/useLootbox"

interface ILootboxDrawProps {
  active: boolean
  itemToShow?: InventoryItem
  close: () => void
  animationState: AnimationState
}

const LootboxDraw: FC<ILootboxDrawProps> = ({ active, close, itemToShow, animationState }) => {
  // That means we draw but did not have an item : Should never happen (add to test)
  if (!itemToShow && animationState == AnimationState.FINISHED) {
    return null
  }
  return (
    <>
      <div className={`active-lootbox`}>
        <div className={`drawing-container ${itemToShow ? `rarity-${itemToShow.rarity}` : ``}`}>
          <img className={animationState == AnimationState.ACTIVE ? "drawing" : ""} src={itemToShow ? itemToShow.image : Lootbox3} />
        </div>
      </div>
      <button
        onClick={() => {
          active && close()
        }}
        disabled={animationState == AnimationState.ACTIVE}
      >
        {/* Label of the button : */}
        {animationState == AnimationState.FINISHED && active ? (
          // If Animation finished :
          <>
            <div className="item-won">
              <div className="py-1">{`${itemToShow?.name ?? "Undefined"}`}</div>
              {itemToShow && <Currency flat icon={{ src: powerIcon, alt: "Power Icon" }} value={itemToShow.powerValue} />}
            </div>
            <div className="collect-label">Click to collect</div>
          </>
        ) : animationState == AnimationState.ACTIVE ? (
          <div className="collect-label">Drawing... </div>
        ) : (
          <div className="collect-label">Draw</div>
        )}
      </button>
    </>
  )
}
export default LootboxDraw
