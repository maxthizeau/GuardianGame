import { FC, useState } from "react"
import { moneyIcon } from "../assets/icons"
import AlertMessage from "../components/AlertMessage"
import Currency from "../components/Currency"
import LootboxDraw from "../components/LootboxDraw"
import { InventoryItem, Lootbox } from "../data/types"
import { shuffleArray } from "../libs/utils"
import { inventoryActions } from "../redux/slices/inventorySlice"
import { useAppDispatch, useAppSelector } from "../redux/store"
import "../styles/lootbox.scss"

interface IProps {
  // children: ReactNode
  lootbox: Lootbox
}

const LootboxView: FC<IProps> = ({ lootbox }) => {
  const dispatch = useAppDispatch()
  const money = useAppSelector((state) => state.inventory.money)
  const [drawing, setDrawing] = useState<{ active: boolean; itemWon?: InventoryItem }>({ active: false, itemWon: undefined })

  // Shuffle on render so animation get different everytime (json stuff is to make a hard copy)
  const itemsArray: typeof lootbox.data = shuffleArray(JSON.parse(JSON.stringify(lootbox.data)))

  function startDrawing(itemWon: InventoryItem) {
    setDrawing({ active: true, itemWon })
  }

  const handleBuy = () => {
    // TODO : Refactor and put this code  (draw function) to util function
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

    dispatch(inventoryActions.buyLootbox({ lootboxId: lootbox.id, itemWonId: idDrawn }))
    // // Set the item user get
    const itemWon = itemsArray.find((x) => x.id == idDrawn)
    itemWon && startDrawing(itemWon)
  }

  return (
    <>
      {/* <Actions /> */}

      <div className="card">
        <h2>{lootbox.name}</h2>

        {drawing.active ? (
          <LootboxDraw
            active={drawing.active}
            itemWon={drawing.itemWon}
            close={() => setDrawing({ active: false, itemWon: undefined })}
            itemsArray={itemsArray}
          />
        ) : (
          <>
            {money < lootbox.cost && <AlertMessage type="warning" message="You don't have enough money to buy this lootbox." />}
            <div className="clickable-lootbox">
              <img src={lootbox.image} onClick={() => money >= lootbox.cost && handleBuy()} />
            </div>
          </>
        )}

        {!drawing.active && (
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
