import { FC } from "react"
import TwitchLogo from "../assets/icons/twitch.png"
import GithubLogo from "../assets/icons/github.png"
import LinkedinLogo from "../assets/icons/linkedin.png"
import useAuth from "../hook/useAuth"
import { useAppDispatch } from "../redux/store"
import { profileActions } from "../redux/slices/profileSlice"
interface IProps {
  // children: ReactNode
}

const LoginView: FC<IProps> = ({}) => {
  const { isAuthenticated, logout, handleOAuthTwitch } = useAuth()
  const dispatch = useAppDispatch()
  return (
    <div className="container-center">
      <h1>Welcome to Guardians Game</h1>
      <div className="login-buttons-wrapper">
        <button
          className="login twitch-login"
          onClick={(e) => {
            // setLoad ?
            e.preventDefault()
            !isAuthenticated && handleOAuthTwitch()
          }}
        >
          <img src={TwitchLogo} alt="twitch-logo" className="button-icon" />
          <span>Login with Twitch</span>
        </button>
        <button
          className="login"
          onClick={(e) => {
            // setLoad ?
            e.preventDefault()
            !isAuthenticated && handleOAuthTwitch(true)
          }}
        >
          Login as Guest
        </button>
      </div>
      <p className="headline">Please sign in using Twitch or access the game as a guest</p>
      <p className="warning-info">/!\ As a guest, you won't be able to save your progress /!\</p>
      <div className="logos-wrapper">
        <a href="https://github.com/maxthizeau/GuardianGame" target="_blank">
          <img src={GithubLogo} alt="Github - Maxime Thizeau" />
        </a>
        <a href="https://fr.linkedin.com/in/maxime-thizeau-845840170" target="_blank">
          <img src={LinkedinLogo} alt="Lindekin - Maxime Thizeau" />
        </a>
      </div>
    </div>
  )
}

export default LoginView
