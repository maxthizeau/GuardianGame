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

function App() {
  const currentView = useAppSelector((state) => state.app.view)

  return (
    <div className="app">
      <Header />
      <div className="main">
        {/* Views are setted up like to simplify navigation atm, but should be handled by state management (redux) later */}
        <Actions />
        {currentView.type == EViews.HOME && <HomeView />}
        {currentView.type == EViews.LOOTBOX && <LootboxView lootbox={currentView.arg} />}
        {currentView.type == EViews.CHARACTER && <CharacterView />}
      </div>
    </div>
  )
}

export default App
