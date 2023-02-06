import "./styles/App.scss"
import Header from "./layouts/Header"
import Actions from "./layouts/Actions"
import HomeView from "./views/Home"
import LootboxView from "./views/Lootbox"
import CharacterView from "./views/Character"
import { useAppSelector } from "./redux/store"
import { EViews } from "./redux/slices/appSlice"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function App() {
  const currentView = useAppSelector((state) => state.app.view)

  return (
    <div className="app">
      <Header />
      <div className="main">
        <Actions />
        {currentView.type == EViews.HOME && <HomeView />}
        {currentView.type == EViews.LOOTBOX && <LootboxView lootbox={currentView.arg} />}
        {currentView.type == EViews.CHARACTER && <CharacterView characterId={currentView.arg} />}
      </div>
      {/* Toast Container */}
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
