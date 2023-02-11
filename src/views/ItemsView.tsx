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

const ItemsView: FC<IProps> = ({}) => {
  const inventory = useAppSelector((state) => state.inventory)
  // const selectedItems = inventory.items
  return (
    <MainLayout>
      <GameHeader title={"Items"} />
      <InventoryList itemsArray={[...inventory.items]} />
    </MainLayout>
  )
}

export default ItemsView
