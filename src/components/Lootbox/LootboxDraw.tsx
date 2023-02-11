import { FC } from "react"
import { powerIcon } from "../../assets/icons"
import { Lootbox3 } from "../../assets/lootbox"
import Currency from "../Currency"
import { InventoryItem } from "../../data/types"
import { AnimationState } from "../../hook/useLootbox"
import Spinner from "../Spinner"
import "../../styles/lootbox.scss"

interface ILootboxDrawProps {
  active: boolean
  itemToShow?: InventoryItem
  close: () => void
  animationState: AnimationState
  loaded: boolean
}

const LootboxDraw: FC<ILootboxDrawProps> = ({ active, close, itemToShow, animationState, loaded }) => {
  // That means we draw but did not have an item : Should never happen (add to test)
  if (!itemToShow && animationState == AnimationState.FINISHED) {
    return null
  }
  if (!loaded) {
    return <Spinner text={"loading"} />
  }
  return (
    <>
      <div className={`active-lootbox`}>
        <div className={`drawing-container ${itemToShow ? `rarity-${itemToShow.rarity}` : ``}`}>
          <img className={animationState == AnimationState.ACTIVE ? "drawing" : ""} src={itemToShow ? itemToShow.image : Lootbox3} />
          {/* <img className={animationState == AnimationState.ACTIVE ? "drawing" : ""} src={itemToShow ? itemToShow.image : Lootbox3} /> */}
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
