import { useAppSelector, useAppDispatch } from "./redux/store"
import { appActions } from "./redux/slices/appSlice"
import { ToastContainer } from "react-toastify"
import Preview from "./components/Preview/Preview"
import { useEffect } from "react"
import "react-toastify/dist/ReactToastify.css"
import "./styles/App.scss"

function App({ children }: { children: React.ReactNode }) {
  const currentView = useAppSelector((state) => state.app.view)
  const dispatch = useAppDispatch()

  // Clear the preview when press "Escape"
  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key == "Escape") {
        e.preventDefault()
        dispatch(appActions.clearPreview())
      }
    })
  }, [])

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
