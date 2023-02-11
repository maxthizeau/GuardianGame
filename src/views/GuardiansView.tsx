import { FC, ReactHTMLElement, ReactNode } from "react"
import Header from "../layouts/Header"
import Sidebar from "../layouts/Sidebar"
import { Character1, Character2, Character3 } from "../assets/characters"
import { powerIcon } from "../assets/icons"
import { usePreview } from "../hook/usePreview"
import { useAppDispatch, useAppSelector } from "../redux/store"
import { appActions, ItemInPreview } from "../redux/slices/appSlice"
import heroes from "../data/heroes"
import ItemElement from "../components/ItemElement"
import guardians from "../data/guardians"
import GameHeader from "../components/GameHeader"
import { ItemType } from "../data/types"
import { MAX_HERO_COUNT, MAX_GUARDIAN_COUNT } from "../libs/constants"
import SelectedCharactersList from "../components/SelectedCharactersList"
import Divider from "../components/UIKit/Divider"
import InventoryList from "../components/InventoryList"
import MainLayout from "../layouts/MainLayout"

interface IProps {
  // children: ReactNode
}

const GuardiansView: FC<IProps> = ({}) => {
  const inventory = useAppSelector((state) => state.inventory)
  const selectedItems = inventory.characters.filter((x) => x.isSelected && x.type === ItemType.GUARDIAN)
  return (
    <MainLayout>
      <GameHeader title={"Guardians"} />
      {/* GameActiveItems */}
      <SelectedCharactersList characterType="guardian" charactersArray={selectedItems} />
      {/* UIKit/Divider */}
      <Divider />
      {/* GameInventory */}
      <InventoryList itemsArray={inventory.characters.filter((x) => x.type == ItemType.GUARDIAN && !x.isSelected)} title="Inventory" />
    </MainLayout>
  )
}

export default GuardiansView
