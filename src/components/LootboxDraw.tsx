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

// Constant : Increase to make animation longer
const ANIMATION_STEPS_COUNT = 3

interface ILootboxDrawProps {
  active: boolean
  itemWon?: InventoryItem
  close: () => void
  itemsArray: InventoryItem[]
}

enum AnimationState {
  NOT_STARTED,
  ACTIVE,
  FINISHED,
}

const getAnimationState = (state: number) => {
  if (state < 0) {
    return AnimationState.NOT_STARTED
  } else if (state >= ANIMATION_STEPS_COUNT) {
    return AnimationState.FINISHED
  } else {
    return AnimationState.ACTIVE
  }
}

const LootboxDraw: FC<ILootboxDrawProps> = ({ active, close, itemsArray, itemWon }) => {
  //  How animationStep works :
  // <= -1 : not started
  // > ANIMATION_STEPS_COUNT : finished
  // otherwise : active
  const [animationStep, setAnimationStep] = useState(-1)

  useEffect(() => {
    // If animationStep has been updated, active, and interval has not been started yet :
    // animationStep is used to show animation : a new possible loot image every interval
    if (getAnimationState(animationStep) == AnimationState.ACTIVE) {
      const intervalId = setInterval(() => {
        // What to do every interval : increment animation step
        setAnimationStep((prevState) => prevState + 1)
      }, 700)

      // Important : clear interval after
      return () => {
        clearInterval(intervalId)
      }
    }
  }, [animationStep])

  useEffect(() => {
    // When switching from unactive to active, start draw.
    if (itemWon && getAnimationState(animationStep) == AnimationState.NOT_STARTED) {
      // Start animation by setting it to zero
      setAnimationStep(0)
    }
  }, [])

  // Get values every render
  const animationState = getAnimationState(animationStep)
  const itemToShow = animationState == AnimationState.FINISHED ? itemWon : itemsArray[animationStep % itemsArray.length]

  if (!itemWon) {
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
              <div className="py-1">{`${itemWon?.name ?? "Undefined"}`}</div>
              {itemWon && <Currency flat icon={{ src: powerIcon, alt: "Power Icon" }} value={itemWon.powerValue} />}
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
