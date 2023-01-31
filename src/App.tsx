import { useState } from "react"
import reactLogo from "./assets/react.svg"
import energyIcon from "./assets/icons/energy.svg"
import moneyIcon from "./assets/icons/money.svg"
import "./styles/App.scss"
import Currency from "./components/Currency"
import ActionButton from "./components/ActionButton"
import InventoryCard from "./components/InventoryCard"
import characters from "./data/heroes"
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

  return (
    <div className="app">
      <Header />
      <div className="main">
        <Actions />
        {currentView.type == EViews.HOME && <HomeView />}
        {currentView.type == EViews.LOOTBOX && <LootboxView lootbox={currentView.arg} />}
        {currentView.type == EViews.CHARACTER && <CharacterView character={currentView.arg} />}
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
