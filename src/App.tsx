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

enum EViews {
  HOME,
  CHARACTER,
  LOOTBOX,
}

type View = {
  type: EViews
  arg?: any
}

function App() {
  const [count, setCount] = useState(0)
  const [view, setView] = useState<View>({ type: EViews.HOME })

  return (
    <div className="app">
      <Header />
      <div className="main">
        {/* Views are setted up like to simplify navigation atm, but should be handled by state management (redux) later */}
        <Actions
          clickOnProfile={() => {
            setView({ type: EViews.HOME })
          }}
          clickOnCharacter={() => {
            setView({ type: EViews.LOOTBOX, arg: lootboxes[2] })
          }}
          clickOnGuardian={() => {
            setView({ type: EViews.LOOTBOX, arg: lootboxes[1] })
          }}
          clickOnItem={() => {
            setView({ type: EViews.LOOTBOX, arg: lootboxes[0] })
          }}
        />
        {view.type == EViews.HOME && (
          <HomeView
            setCharacterView={() => {
              setView({ type: EViews.CHARACTER })
            }}
          />
        )}
        {view.type == EViews.LOOTBOX && <LootboxView lootbox={view.arg} />}
        {view.type == EViews.CHARACTER && <CharacterView />}
      </div>
    </div>
  )
}

export default App
