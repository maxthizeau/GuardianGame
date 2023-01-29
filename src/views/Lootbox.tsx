import { FC, ReactNode, useEffect, useState } from "react"
import { moneyIcon, powerIcon } from "../assets/icons"
import { Lootbox3, Lootbox4 } from "../assets/lootbox"
import Currency from "../components/Currency"
import LootboxDraw from "../components/LootboxDraw"
import characters from "../data/characters"
import guardians from "../data/guardians"
import items from "../data/items"
import { InventoryItem, Lootbox, LootboxType } from "../data/types"
import Actions from "../layouts/Actions"
import { shuffleArray } from "../libs/utils"
import "../styles/lootbox.scss"

interface IProps {
  // children: ReactNode
  lootbox: Lootbox
}

const LootboxView: FC<IProps> = ({ lootbox }) => {
  const [active, setActive] = useState(false)
  const itemsArray = shuffleArray(lootbox.data)
  return (
    <>
      {/* <Actions /> */}

      <div className="card">
        <h2>{lootbox.name}</h2>

        {active ? (
          <LootboxDraw active={active} setActive={setActive} itemsArray={itemsArray} />
        ) : (
          <div className="clickable-lootbox">
            <img
              src={lootbox.image}
              onClick={() => {
                setActive(true)
              }}
            />
          </div>
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
