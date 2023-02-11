import { FC, ReactHTMLElement, ReactNode, useState, useMemo } from "react"
import Header from "../layouts/Header"
import Sidebar from "../layouts/Sidebar"
import { Character1, Character2, Character3 } from "../assets/characters"
import { moneyIcon, powerIcon } from "../assets/icons"
import { usePreview } from "../hook/usePreview"
import { useAppDispatch, useAppSelector } from "../redux/store"
import { appActions, ItemInPreview } from "../redux/slices/appSlice"
import heroes from "../data/heroes"
import ItemElement from "../components/ItemElement"
import guardians from "../data/guardians"
import GameHeader from "../components/GameHeader"
import { ItemType, LootboxType } from "../data/types"
import { MAX_HERO_COUNT, MAX_GUARDIAN_COUNT } from "../libs/constants"
import SelectedCharactersList from "../components/SelectedCharactersList"
import Divider from "../components/UIKit/Divider"
import InventoryList from "../components/InventoryList"
import lootboxes from "../data/lootboxes"
import { useLootbox } from "../hook/useLootbox"
import LootboxComponent from "../components/Lootbox/LootboxComponent"
import HeroIcon from "../assets/icons/hero.png"
import GuardianIcon from "../assets/icons/guardian.png"
import ItemsIcon from "../assets/icons/item.png"
import LootboxesIcon from "../assets/icons/lootbox.png"
import Currency from "../components/Currency"
import MainLayout from "../layouts/MainLayout"

interface IProps {
  // children: ReactNode
}

const LootboxView: FC<IProps> = ({}) => {
  const inventory = useAppSelector((state) => state.inventory)
  const [selectedLootboxIndex, setSelectedLootboxIndex] = useState<number | undefined>(undefined)

  const isValidIndex = useMemo(() => {
    return selectedLootboxIndex !== undefined && selectedLootboxIndex >= 0 && selectedLootboxIndex < lootboxes.length
  }, [selectedLootboxIndex])
  return (
    <MainLayout>
      <GameHeader title={"Lootbox"} previousAction={selectedLootboxIndex !== undefined ? () => setSelectedLootboxIndex(undefined) : undefined} />
      {/* GameActiveItems */}
      {/* <SelectedCharactersList characterType="guardian" charactersArray={selectedItems} /> */}
      {/* <LootboxComponent lootbox={lootboxes[0]} /> */}
      {!isValidIndex && (
        <div className="lootboxes-list">
          {lootboxes.map((lootbox, index) => {
            const icon = lootbox.type == LootboxType.GUARDIANS ? GuardianIcon : lootbox.type == LootboxType.HEROES ? HeroIcon : ItemsIcon
            const name = lootbox.name.toLowerCase().replace(" lootbox", "")
            return (
              <div key={`lootbox-${index}`} className="lootboxes-list-item">
                <div className="lootbox-label">
                  <img src={icon} />
                  <span>{name}</span>
                </div>
                <img className="lootbox-image" src={lootbox.image} onClick={() => setSelectedLootboxIndex(index)} />
                <div className="center">
                  <Currency flat icon={{ src: moneyIcon, alt: "Money Icon" }} value={lootbox.cost} />
                </div>
              </div>
            )
          })}
        </div>
      )}
      {isValidIndex && selectedLootboxIndex !== undefined && <LootboxComponent lootbox={lootboxes[selectedLootboxIndex]} />}
      {/* UIKit/Divider */}
      {!isValidIndex && <Divider />}
      {/* GameInventory */}
      {!isValidIndex && (
        <InventoryList
          itemsArray={[...inventory.characters, ...inventory.items].sort((a, b) => b.inventoryId - a.inventoryId).slice(0, 10)}
          defaultSort={{ orderBy: "date", sort: "desc" }}
          title="Last items won"
        />
      )}
    </MainLayout>
  )
}

export default LootboxView
