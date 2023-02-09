import { FC, useState } from "react"
import { moneyIcon } from "../assets/icons"
import AlertMessage from "../components/AlertMessage"
import Currency from "../components/Currency"
import LootboxDraw from "../components/LootboxDraw"
import { InventoryItem, Lootbox } from "../data/types"
import { useLootbox } from "../hook/useLootbox"
import { shuffleArray } from "../utils/utils"
import { inventoryActions } from "../redux/slices/inventorySlice"
import { useAppDispatch, useAppSelector } from "../redux/store"
import "../styles/lootbox.scss"
import LazyImage from "../components/LazyImage"
import Spinner from "../components/Spinner"

interface IProps {
  // children: ReactNode
  lootbox: Lootbox
}

const LootboxView: FC<IProps> = ({ lootbox }) => {
  const money = useAppSelector((state) => state.inventory.money)
  const { buy, close, itemToShow, animationState, active, loaded } = useLootbox(lootbox)

  return (
    <>
      {/* <Actions /> */}

      <div className="card">
        <h2>{lootbox.name}</h2>

        {active ? (
          <LootboxDraw loaded={loaded} active={active} itemToShow={itemToShow} close={close} animationState={animationState} />
        ) : (
          <>
            {money < lootbox.cost && <AlertMessage type="warning" message="You don't have enough money to buy this lootbox." />}
            <div className="clickable-lootbox">
              <LazyImage src={lootbox.image} onClick={() => money >= lootbox.cost && buy()} />
            </div>
          </>
        )}

        {!active && (
          <div className="center">
            <p>
              <i>Click on the chest to buy.</i>
            </p>
            <Currency flat icon={{ src: moneyIcon, alt: "Money Icon" }} value={lootbox.cost} />
          </div>
        )}
      </div>
    </>
  )
}

export default LootboxView
