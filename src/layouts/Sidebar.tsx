import { FC, ReactNode } from "react"
import HeroIcon from "../assets/icons/hero.png"
import GuardianIcon from "../assets/icons/guardian.png"
import ItemsIcon from "../assets/icons/item.png"
import LootboxesIcon from "../assets/icons/lootbox.png"
import AuthButtons from "./AuthButtons"
import Preview from "../components/Preview/Preview"
import { useNavigate } from "react-router"
interface IProps {}

const Sidebar: FC<IProps> = ({}) => {
  const navigate = useNavigate()
  return (
    <aside id="sidebar">
      <AuthButtons />
      <button className="sidebar-button" onClick={() => navigate("/heroes")}>
        <img src={HeroIcon} alt="Heroes Icon" />
        <span>Heroes</span>
      </button>
      <button className="sidebar-button" onClick={() => navigate("/guardians")}>
        <img src={GuardianIcon} alt="Guardians Icon" />
        <span>Guardians</span>
      </button>
      <button className="sidebar-button" onClick={() => navigate("/items")}>
        <img src={ItemsIcon} alt="Items Icon" />
        <span>Items</span>
      </button>
      <button className="sidebar-button" onClick={() => navigate("/lootboxes")}>
        <img src={LootboxesIcon} alt="Loot boxes Icon" />
        <span>Loot boxes</span>
      </button>
      <Preview />
    </aside>
  )
}

export default Sidebar
