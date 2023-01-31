import { FC, ReactNode } from "react"
import InventoryCard from "../components/InventoryCard"
import characters from "../data/characters"
import guardians from "../data/guardians"
import { InventoryItem } from "../data/types"
import { useAppSelector, useAppDispatch } from "../redux/store"
import { appActions, EViews } from "../redux/slices/appSlice"
import ItemCard from "../components/ItemCard"
import { MAX_CHARACTER_COUNT, MAX_GUARDIAN_COUNT } from "../libs/constants"
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
          activeItems={inventory.guardians.filter((x) => x.isSelected)}
          tableItems={inventory.guardians}
          maximumActiveItemsCount={MAX_GUARDIAN_COUNT}
          onClickTable={(inventoryId: number) => {
            dispatch(inventoryActions.selectGuardian({ inventoryId }))
          }}
        />
        <InventoryCard
          title="Characters"
          onClickItem={(char: InventoryItem) => {
            dispatch(appActions.changeView({ type: EViews.CHARACTER, arg: char }))
          }}
          activeItems={inventory.characters.filter((x) => x.isSelected)}
          tableItems={inventory.characters}
          maximumActiveItemsCount={MAX_CHARACTER_COUNT}
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
