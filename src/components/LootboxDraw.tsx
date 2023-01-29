import { FC, useEffect, useState } from "react"
import { powerIcon } from "../assets/icons"
import { Lootbox3 } from "../assets/lootbox"
import Currency from "../components/Currency"
import items from "../data/items"
import { InventoryItem } from "../data/types"
import { shuffleArray } from "../libs/utils"
import "../styles/lootbox.scss"

// Constant : Increase to make animation longer
const ANIMATION_STEPS_COUNT = 10

interface ILootboxDrawProps {
  active: boolean
  setActive: (arg: boolean) => void
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

const LootboxDraw: FC<ILootboxDrawProps> = ({ active, setActive, itemsArray }) => {
  // Item won is defined at draw time
  const [itemWon, setItemWon] = useState<InventoryItem | undefined>(undefined)
  //   const [active, setActive] = useState(false)
  //  How animationStep works :
  // <= -1 : not started
  // > ANIMATION_STEPS_COUNT : finished
  // otherwise : active
  const [animationStep, setAnimationStep] = useState(-1)

  const draw = () => {
    // // Active = display
    // setActive(true)

    // Start animation by setting it to 0
    setAnimationStep(0)
    let tmpArray: number[] = []

    // Fill the rarity table with possible loot (item id)
    itemsArray.map((x) => {
      for (let i = 0; i < 10 - x.rarity * 2; i++) {
        tmpArray.push(x.id)
      }
    })

    // Select a random index of tmpArray. The value at this index is id of item won
    const idDrawn = tmpArray[Math.floor(Math.random() * tmpArray.length)]

    // Set the item user get
    setItemWon(itemsArray.find((x) => x.id == idDrawn))
  }

  useEffect(() => {
    // If animationStep has been updated, active, and interval has not been started yet :
    // animationStep is used to show animation : a new possible loot image every interval
    if (getAnimationState(animationStep) == AnimationState.ACTIVE) {
      const intervalId = setInterval(() => {
        // What to do every interval : increment animation step
        setAnimationStep(animationStep + 1)
      }, 700)

      // Important : clear interval after
      return () => {
        clearInterval(intervalId)
      }
    }
  }, [animationStep])

  useEffect(() => {
    // When switching from unactive to active, start draw.
    if (active && getAnimationState(animationStep) == AnimationState.NOT_STARTED) {
      draw()
    }
  }, [active])

  // Get values every render
  const animationState = getAnimationState(animationStep)
  const itemToShow = animationState == AnimationState.FINISHED ? itemWon : itemsArray[animationStep % itemsArray.length]

  return (
    <>
      <div className={`active-lootbox`}>
        <div className={`drawing-container ${itemToShow ? `rarity-${itemToShow.rarity}` : ``}`}>
          <img className={animationState == AnimationState.ACTIVE ? "drawing" : ""} src={itemToShow ? itemToShow.image : Lootbox3} />
        </div>
      </div>
      <button
        onClick={() => {
          active ? setActive(false) : draw()
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
