import { FC, ReactNode } from "react"
import InventoryCard from "../components/InventoryCard"
import characters from "../data/characters"
import guardians from "../data/guardians"
import items from "../data/items"
import Actions from "../layouts/Actions"
import { InventoryItem } from "../data/types"

interface IProps {
  // children: ReactNode
  setCharacterView: () => void
}

const HomeView: FC<IProps> = ({ setCharacterView }) => {
  return (
    <>
      {/* <Actions /> */}

      {/* Start Inventory */}
      <div className="inventory">
        <InventoryCard title="Guardians" activeItems={[guardians[0], guardians[1]]} tableItems={[...guardians]} maximumActiveItemsCount={2} />
        <InventoryCard
          title="Characters"
          onClickItem={(char: InventoryItem) => {
            setCharacterView()
          }}
          activeItems={[characters[0]]}
          tableItems={[...characters]}
          maximumActiveItemsCount={2}
        />
      </div>
      {/* End Inventory */}
      <div className="card">
        <InventoryCard type="list" title="Items" activeItems={[]} tableItems={[...items]} maximumActiveItemsCount={0} />
      </div>
    </>
  )
}

export default HomeView
