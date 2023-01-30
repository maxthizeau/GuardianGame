import { useState } from "react"
import reactLogo from "./assets/react.svg"
import energyIcon from "./assets/icons/energy.svg"
import moneyIcon from "./assets/icons/money.svg"
import "./styles/App.scss"
import Currency from "./components/Currency"
import ActionButton from "./components/ActionButton"
import InventoryCard from "./components/InventoryCard"
import characters from "./data/characters"
import guardians from "./data/guardians"
import items from "./data/items"
import Header from "./layouts/Header"
import Actions from "./layouts/Actions"
import HomeView from "./views/Home"
import LootboxView from "./views/Lootbox"
import lootboxes from "./data/lootboxes"
import CharacterView from "./views/Character"
import { useAppSelector } from "./redux/store"
import { EViews } from "./redux/slices/appSlice"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
function App() {
  const currentView = useAppSelector((state) => state.app.view)
  const notify = () => toast("Push notification test", { type: "success" })

  return (
    <div className="app">
      <Header />
      <div className="main">
        <Actions />
        <button onClick={notify}>[Test] Send push</button>
        {currentView.type == EViews.HOME && <HomeView />}
        {currentView.type == EViews.LOOTBOX && <LootboxView lootbox={currentView.arg} />}
        {currentView.type == EViews.CHARACTER && <CharacterView />}
      </div>
      {/* Toast Container */}
      <ToastContainer
        position="top-right"
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
