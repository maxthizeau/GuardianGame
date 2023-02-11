import { FC } from "react"
import { moneyIcon } from "../../assets/icons"
import AlertMessage from "../AlertMessage"
import Currency from "../Currency"
import LootboxDraw from "./LootboxDraw"
import { Lootbox, LootboxType } from "../../data/types"
import { useLootbox } from "../../hook/useLootbox"
import { useAppSelector } from "../../redux/store"
import LazyImage from "../LazyImage"
import HeroIcon from "../../assets/icons/hero.png"
import GuardianIcon from "../../assets/icons/guardian.png"
import ItemsIcon from "../../assets/icons/item.png"
import "../../styles/lootbox.scss"

interface IProps {
  // children: ReactNode
  lootbox: Lootbox
}

const LootboxComponent: FC<IProps> = ({ lootbox }) => {
  const money = useAppSelector((state) => state.inventory.money)
  const { buy, close, itemToShow, animationState, active, loaded } = useLootbox(lootbox)
  const icon = lootbox.type == LootboxType.GUARDIANS ? GuardianIcon : lootbox.type == LootboxType.HEROES ? HeroIcon : ItemsIcon
  return (
    <div className="lootbox-container">
      <div className="lootbox-label">
        <img src={icon} /> <span>{lootbox.name}</span>
      </div>
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
          <p className="my-1">
            <i>Click on the chest to buy.</i>
          </p>
          <Currency flat icon={{ src: moneyIcon, alt: "Money Icon" }} value={lootbox.cost} />
        </div>
      )}
    </div>
  )
}

export default LootboxComponent
