import { FC, ReactNode } from "react"
import { moneyIcon, powerIcon } from "../assets/icons"
import Currency from "../components/Currency"
import { useAppSelector } from "../redux/store"

interface IProps {}

const Header: FC<IProps> = ({}) => {
  const money = useAppSelector((state) => state.profile.money)

  return (
    <header>
      <button>Menu</button>
      <div className="currencies">
        <Currency icon={{ src: moneyIcon, alt: "Money Icon" }} value={money} />
        <Currency icon={{ src: powerIcon, alt: "Power Icon" }} value={524} />
      </div>
    </header>
  )
}

export default Header
