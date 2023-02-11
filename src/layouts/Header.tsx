import { FC, ReactNode } from "react"
import { moneyIcon, powerIcon } from "../assets/icons"
import Currency from "../components/Currency"
import { useAppSelector, useAppDispatch } from "../redux/store"
import { inventoryActions } from "../redux/slices/inventorySlice"
import { toast } from "react-toastify"
import { useLocation, useNavigate } from "react-router-dom"

import useAuth from "../hook/useAuth"
import AuthButtons from "./AuthButtons"

interface IProps {}

const Header: FC<IProps> = ({}) => {
  const money = useAppSelector((state) => state.inventory.money)

  return (
    <header>
      <div className="container">
        <button
          className="nav-mobile-icon"
          onClick={(e) => {
            e.preventDefault()
            let sidebarClassnames = document.getElementById("sidebar")?.classList
            if (sidebarClassnames?.contains("active")) {
              sidebarClassnames.remove("active")
            } else {
              sidebarClassnames?.add("active")
            }
          }}
        >
          <div className="bar" />
          <div className="bar" />
          <div className="bar" />
        </button>
        <AuthButtons />
        <div className="currencies">
          <Currency icon={{ src: moneyIcon, alt: "Money Icon" }} value={money} />
          <Currency icon={{ src: powerIcon, alt: "Power Icon" }} value={524} />
        </div>
      </div>
    </header>
  )
}

export default Header
