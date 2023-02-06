import { FC, ReactNode } from "react"
import { moneyIcon, powerIcon } from "../assets/icons"
import Currency from "../components/Currency"
import { useAppSelector, useAppDispatch } from "../redux/store"
import { inventoryActions } from "../redux/slices/inventorySlice"
import { toast } from "react-toastify"
import { useLocation, useNavigate } from "react-router-dom"

import useAuth from "../hook/useAuth"

interface IProps {}

const Header: FC<IProps> = ({}) => {
  const money = useAppSelector((state) => state.inventory.money)
  const profile = useAppSelector((state) => state.profile)
  const dispatch = useAppDispatch()
  const { isAuthenticated, logout, handleOAuthTwitch } = useAuth()

  return (
    <header>
      <div>
        <a
          className="link-button"
          // href={isAuthenticated ? "#" :}
          onClick={(e) => {
            // setLoad ?
            e.preventDefault()
            !isAuthenticated && handleOAuthTwitch()
          }}
        >
          {isAuthenticated ? profile.name : `Connect with Twitch`}
        </a>
        {isAuthenticated && (
          <button className="mx-1" onClick={logout}>
            Logout
          </button>
        )}
      </div>
      <div className="currencies">
        <Currency icon={{ src: moneyIcon, alt: "Money Icon" }} value={money} />
        <Currency icon={{ src: powerIcon, alt: "Power Icon" }} value={524} />
        {/* A button to test store - will disappear in the future. */}
        <button onClick={() => dispatch(inventoryActions.earnMoney(300))}>Earn money</button>
        <button
          onClick={() => {
            // if (confirm("Enabling test mode will erase the current state and generating a fake advanced account")) {
            dispatch(inventoryActions.enableTestMode())
            // }
          }}
        >
          TEST MODE
        </button>
      </div>
    </header>
  )
}

export default Header
