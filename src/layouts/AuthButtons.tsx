import { FC, ReactNode } from "react"
import useAuth from "../hook/useAuth"
import { inventoryActions } from "../redux/slices/inventorySlice"
import { useAppDispatch, useAppSelector } from "../redux/store"

interface IProps {}

const AuthButtons: FC<IProps> = ({}) => {
  const money = useAppSelector((state) => state.inventory.money)
  const profile = useAppSelector((state) => state.profile)
  const dispatch = useAppDispatch()
  const { isAuthenticated, logout, handleOAuthTwitch } = useAuth()
  return (
    <div className="nav-buttons">
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
      {isAuthenticated && <button onClick={logout}>Logout</button>}
      <button onClick={() => dispatch(inventoryActions.earnMoney(300))}>Earn money</button>
    </div>
  )
}

export default AuthButtons
