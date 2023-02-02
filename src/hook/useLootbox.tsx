import { useEffect, useMemo, useState } from "react"
import { InventoryItem, Lootbox } from "../data/types"
import { ANIMATION_STEPS_COUNT } from "../libs/constants"
import { shuffleArray } from "../utils/utils"
import { inventoryActions } from "../redux/slices/inventorySlice"
import { useAppDispatch } from "../redux/store"

//  How animationStep works :
// <= -1 : not started
// > ANIMATION_STEPS_COUNT : finished
// otherwise : active

export enum AnimationState {
  NOT_STARTED,
  ACTIVE,
  FINISHED,
}

export const useLootbox = (lootbox: Lootbox) => {
  const dispatch = useAppDispatch()
  const [itemsArray, setItemsArray] = useState<typeof lootbox.data>(shuffleArray([...lootbox.data]))
  const [animationStep, setAnimationStep] = useState(-1)
  const [itemWon, setItemWon] = useState<InventoryItem | undefined>(undefined)
  const [active, setActive] = useState<boolean>(false)

  const animationState = useMemo(() => {
    // console.debug("useMemo animationState")
    if (animationStep < 0) {
      return AnimationState.NOT_STARTED
    } else if (animationStep >= ANIMATION_STEPS_COUNT) {
      return AnimationState.FINISHED
    } else {
      return AnimationState.ACTIVE
    }
  }, [animationStep])

  const itemToShow = useMemo(() => {
    // console.debug("useMemo itemToShow")
    return animationState == AnimationState.FINISHED ? itemWon : itemsArray[animationStep % itemsArray.length]
  }, [itemsArray, animationState, itemWon, animationStep])

  // Init / reset when lootbox changes
  useEffect(() => {
    // console.debug("useEffect lootbox")
    // Happen when user changes view : Reset the view by calling close
    close()
    // Shuffle itemsArray that is used in animation and draw
    setItemsArray(shuffleArray([...lootbox.data]))
  }, [lootbox])

  // Create interval to change image (animation) every x miliseconds
  useEffect(() => {
    // console.debug("useEffect animationStep")
    // If animationStep has been updated, active, and interval has not been started yet :
    // animationStep is used to show animation : a new possible loot image every interval
    if (animationState == AnimationState.ACTIVE) {
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

  // return an item won
  const draw = (): InventoryItem | undefined => {
    // console.debug("draw")
    let tmpArray: { id: number; lootRate: number }[] = []
    let lootRateSum: number = 0
    // Fill the rarity table with possible loot (item id)
    itemsArray.map((x) => {
      const lootRate = 10 - x.rarity * 2
      tmpArray.push({ id: x.id, lootRate })
      lootRateSum += lootRate
    })

    // Select a random number between 0 and lootRateSum
    const rng = Math.floor(Math.random() * lootRateSum)
    let rngSum = 0
    let idDrawn = 1
    // Loop over tmpArray until rngSum (which is the sum of loot rate added every loop) is above rng number;
    for (let i = 0; rngSum < rng; i++) {
      rngSum += tmpArray[i].lootRate
      idDrawn = tmpArray[i].id
    }

    // // Set the item user get
    const itemWon = itemsArray.find((x) => x.id == idDrawn)
    return itemWon
  }

  //
  const buy = () => {
    // console.debug("buy")
    // No need to verify user's money, since it's already protected in reducer actions + front
    const won = draw()
    if (won) {
      dispatch(inventoryActions.buyLootbox({ lootboxId: lootbox.id, itemWonId: won.id }))
      setActive(true)
      setItemWon(won)
      setAnimationStep(0)
    }
  }

  const close = () => {
    // console.debug("close")
    setActive(false)
    setItemWon(undefined)
    setAnimationStep(-1)
  }

  return { buy, close, itemToShow, animationState, active }
}
