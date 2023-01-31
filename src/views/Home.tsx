import { FC, ReactNode } from "react"
import InventoryCard from "../components/InventoryCard"
import { Character, InventoryItem, ItemType } from "../data/types"
import { useAppSelector, useAppDispatch } from "../redux/store"
import { appActions, EViews } from "../redux/slices/appSlice"
import ItemCard from "../components/ItemCard"
import { MAX_HERO_COUNT, MAX_GUARDIAN_COUNT } from "../libs/constants"
import { inventoryActions } from "../redux/slices/inventorySlice"

interface IProps {
  // children: ReactNode
}

const HomeView: FC<IProps> = ({}) => {
  const dispatch = useAppDispatch()
  const inventory = useAppSelector((state) => state.inventory)
  return (
    <>
      {/* <Actions /> */}

      {/* Start Inventory */}
      <div className="inventory">
        <InventoryCard
          title="Guardians"
          activeItems={inventory.characters.filter((x) => x.isSelected && x.type === ItemType.GUARDIAN)}
          tableItems={inventory.characters.filter((x) => x.type === ItemType.GUARDIAN)}
          maximumActiveItemsCount={MAX_GUARDIAN_COUNT}
          onClickTable={(inventoryId: number) => {
            dispatch(inventoryActions.selectCharacter({ inventoryId }))
          }}
          onClickItem={(char: Character) => {
            dispatch(appActions.changeView({ type: EViews.CHARACTER, arg: char.inventoryId }))
          }}
        />
        <InventoryCard
          title="Heroes"
          onClickItem={(char: Character) => {
            dispatch(appActions.changeView({ type: EViews.CHARACTER, arg: char.inventoryId }))
          }}
          activeItems={inventory.characters.filter((x) => x.isSelected && x.type === ItemType.HERO)}
          tableItems={inventory.characters.filter((x) => x.type === ItemType.HERO)}
          maximumActiveItemsCount={MAX_HERO_COUNT}
          onClickTable={(inventoryId: number) => {
            dispatch(inventoryActions.selectCharacter({ inventoryId }))
          }}
        />
      </div>
      {/* End Inventory */}
      <div className="card">
        <ItemCard title="Items" items={inventory.items} />
      </div>
    </>
  )
}

export default HomeView
