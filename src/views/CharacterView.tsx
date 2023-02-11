import { FC, useEffect, useState } from "react"
import { useAppSelector } from "../redux/store"
import GameHeader from "../components/GameHeader"
import { Item, ItemType, Statistic } from "../data/types"
import Divider from "../components/UIKit/Divider"
import MainLayout from "../layouts/MainLayout"
import { MAX_ITEM_COUNT_PER_CHAR } from "../libs/constants"
import { getItemsStatistics } from "../utils/gameFunctions"
import "../styles/character.scss"
import Spinner from "../components/Spinner"
import ItemElement from "../components/ItemElement"
import StatisticTable from "../components/StatisticTable"
import SkillBox from "../components/SkillBox"
import InventoryListSelector from "../components/InventoryListSelector"
import { usePreview } from "../hook/usePreview"
import { useNavigate } from "react-router"

interface IProps {
  // children: ReactNode
}

const CharacterView: FC<IProps> = ({}) => {
  const { setOnClickOnHoverPreview } = usePreview()
  const userItems = useAppSelector((state) => state.inventory.items)
  const characters = useAppSelector((state) => state.inventory.characters)
  const character = characters[0]
  const navigate = useNavigate()
  const [equipedItems, setEquipedItems] = useState<(Item | undefined)[]>([])
  const [characterFullStatistics, setCharacterFullStatistics] = useState<Statistic>({
    vitality: 0,
    intelligence: 0,
    strength: 0,
  })

  useEffect(() => {
    // Update equipedItems state
    const newEquipedItems = character?.items.map((x) => userItems.find((y) => y.inventoryId == x)) ?? []
    setEquipedItems(newEquipedItems)

    // Update characterFullStatistics state
    const itemsStatistics = getItemsStatistics(newEquipedItems)
    if (character) {
      setCharacterFullStatistics({
        vitality: character.statistics.vitality + itemsStatistics.vitality,
        intelligence: character.statistics.intelligence + itemsStatistics.intelligence,
        strength: character.statistics.strength + itemsStatistics.strength,
      })
    }
  }, [character, userItems])

  if (!character) {
    return <Spinner />
  }
  return (
    <MainLayout>
      <GameHeader
        title={character.name}
        previousAction={() => {
          character.type == ItemType.GUARDIAN ? navigate("/guardians") : navigate("/heroes")
        }}
      />

      <div className="character-card">
        {/* Left column : Items equiped + Char image */}
        <div className="character-left">
          <div className="character-main">
            <ItemElement
              item={character}
              customWidth={80}
              extraContent={
                <div className="xp-bar">
                  <div className="bar-completion" style={{ width: "80%" }}></div>
                  <div className="xp-bar-text">Lvl {character.level}</div>
                </div>
              }
            />
            <StatisticTable statistics={characterFullStatistics} />
          </div>
          <div className="character-stuff">
            {new Array(MAX_ITEM_COUNT_PER_CHAR).fill(undefined).map((_, index) => {
              // item.items[index] = inventoryId of item equiped
              // const stuffItem = userItems.find((x) => x.inventoryId == character.items[index])
              const stuffItem = equipedItems[index]
              const onClickProps = stuffItem
                ? setOnClickOnHoverPreview({
                    item: {
                      type: "item-selector",
                      item: stuffItem,
                      args: character.inventoryId,
                    },
                  })
                : {}
              return (
                <div key={`char-item-${index}`} className="item-slot">
                  <ItemElement item={stuffItem} customWidth={60} {...onClickProps} />
                  <div className="border-arrow right" />
                  {stuffItem ? <SkillBox /> : <p>Empty slot : You can equip an item here.</p>}
                </div>
              )
            })}
          </div>
        </div>

        <Divider vertical />
        <div className="character-right">
          <InventoryListSelector title={"Items"} charId={character.inventoryId} itemsArray={[...userItems].filter((x) => !x.isEquiped)} />
        </div>
      </div>
    </MainLayout>
  )
}

export default CharacterView
