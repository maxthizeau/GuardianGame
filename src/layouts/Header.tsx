import { FC, ReactNode } from "react"
import { moneyIcon, powerIcon } from "../assets/icons"
import Currency from "../components/Currency"
import { useAppSelector, useAppDispatch } from "../redux/store"
import { inventoryActions } from "../redux/slices/inventorySlice"

interface IProps {}

const Header: FC<IProps> = ({}) => {
  const money = useAppSelector((state) => state.inventory.money)
  const dispatch = useAppDispatch()
  return (
    <header>
      <button>Menu</button>
      <div className="currencies">
        <Currency icon={{ src: moneyIcon, alt: "Money Icon" }} value={money} />
        <Currency icon={{ src: powerIcon, alt: "Power Icon" }} value={524} />
        {/* A button to test store - will disappear in the future. */}
        <button onClick={() => dispatch(inventoryActions.earnMoney(300))}>Earn money</button>
      </div>
    </header>
  )
}

export default Header
