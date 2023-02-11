import { FC } from "react"
import { useAppSelector } from "../redux/store"
import GameHeader from "../components/GameHeader"
import SelectedCharactersList from "../components/SelectedCharactersList"
import { ItemType } from "../data/types"
import Divider from "../components/UIKit/Divider"
import InventoryList from "../components/InventoryList"
import MainLayout from "../layouts/MainLayout"

interface IProps {
  // children: ReactNode
}

const HeroesView: FC<IProps> = ({}) => {
  const inventory = useAppSelector((state) => state.inventory)
  const selectedItems = inventory.characters.filter((x) => x.isSelected && x.type === ItemType.HERO)
  return (
    <MainLayout>
      <GameHeader title={"Heroes"} />
      {/* GameActiveItems */}
      <SelectedCharactersList characterType="hero" charactersArray={selectedItems} />
      {/* UIKit/Divider */}
      <Divider />
      {/* GameInventory */}
      <InventoryList itemsArray={inventory.characters.filter((x) => x.type == ItemType.HERO && !x.isSelected)} title="Inventory" />
    </MainLayout>
  )
}

export default HeroesView
