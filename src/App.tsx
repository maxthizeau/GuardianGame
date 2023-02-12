import { useAppSelector, useAppDispatch } from "./redux/store"
import { appActions } from "./redux/slices/appSlice"
import { ToastContainer } from "react-toastify"
import Preview from "./components/Preview/Preview"
import { useEffect } from "react"
import "react-toastify/dist/ReactToastify.css"
import "./styles/App.scss"
import { inventoryActions } from "./redux/slices/inventorySlice"
import { fetchUser } from "./redux/slices/profileSlice"
import { useNavigate, useNavigation } from "react-router"
import { useLocation } from "react-router-dom"

function App({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const profile = useAppSelector((state) => state.profile)

  // Clear the preview when press "Escape"
  useEffect(() => {
    // Fetch current user on load
    async function fetchUserAndRedirect() {
      // console.log(profile)
      // console.log("Fetch")
      await dispatch(fetchUser())

      // console.log(location.pathname)
      // console.log(profile)
    }
    fetchUserAndRedirect()
    // Listen to escape to clear preview on press
    document.addEventListener("keydown", (e) => {
      if (e.key == "Escape") {
        e.preventDefault()
        dispatch(appActions.clearPreview())
      }
    })
  }, [])

  useEffect(() => {
    // Redirect the home page to /heroes if user logged in
    if (location.pathname == "/" && profile.accessToken && profile.twitchId) {
      navigate("/heroes")
    }

    if (location.pathname != "/" && (!profile.accessToken || !profile.twitchId)) {
      navigate("/")
    }
  }, [profile.accessToken, profile.twitchId, location.pathname])

  return (
    <div className="app">
      <div className="background-elipsis-1" />
      <div className="background-elipsis-2" />

      {children}

      {/* Toast Container */}
      <Preview mobile />
      <ToastContainer
        position="top-right"
        limit={0}
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  )
}

export default App
