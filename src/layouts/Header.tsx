import { FC, ReactNode } from "react"
import { moneyIcon, powerIcon } from "../assets/icons"
import Currency from "../components/Currency"

interface IProps {}

const Header: FC<IProps> = ({}) => {
  return (
    <header>
      <button>Menu</button>
      <div className="currencies">
        <Currency icon={{ src: moneyIcon, alt: "Money Icon" }} value={1000} />
        <Currency icon={{ src: powerIcon, alt: "Power Icon" }} value={524} />
      </div>
    </header>
  )
}

export default Header
