import { FC, ReactNode } from "react"
import InventoryCard from "../components/InventoryCard"
import characters from "../data/characters"
import guardians from "../data/guardians"
import items from "../data/items"
import Actions from "../layouts/Actions"
import { InventoryItem } from "../data/types"
import { useAppSelector, useAppDispatch } from "../redux/store"
import { appActions, EViews } from "../redux/slices/appSlice"

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
        <InventoryCard title="Guardians" activeItems={[guardians[0], guardians[1]]} tableItems={inventory.guardians} maximumActiveItemsCount={2} />
        <InventoryCard
          title="Characters"
          onClickItem={(char: InventoryItem) => {
            dispatch(appActions.changeView({ type: EViews.CHARACTER, arg: char }))
          }}
          activeItems={[characters[0]]}
          tableItems={inventory.characters}
          maximumActiveItemsCount={2}
        />
      </div>
      {/* End Inventory */}
      <div className="card">
        <InventoryCard type="list" title="Items" activeItems={[]} tableItems={inventory.items} maximumActiveItemsCount={0} />
      </div>
    </>
  )
}

export default HomeView
