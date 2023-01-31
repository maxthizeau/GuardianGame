import { FC, useEffect, useState } from "react"
import PlaceholderImage from "../assets/placeholder.png"
import { MAX_ITEM_COUNT_PER_CHAR } from "../libs/constants"
import { useAppDispatch, useAppSelector } from "../redux/store"
import ItemCard from "../components/ItemCard"
import "../styles/character.scss"
import { Character, Item, Statistic } from "../data/types"
import { inventoryActions } from "../redux/slices/inventorySlice"
import AlertMessage from "../components/AlertMessage"
import { toast } from "react-toastify"

interface IProps {
  characterId: number
}

function getItemsStatistics(itemArray: (Item | undefined)[]): Statistic {
  const itemsStatistics: Statistic = {
    vitality: 0,
    intelligence: 0,
    strength: 0,
  }

  itemArray.map((item) => {
    if (item) {
      itemsStatistics.vitality += item.statistics.vitality
      itemsStatistics.intelligence += item.statistics.intelligence
      itemsStatistics.strength += item.statistics.strength
    }
  })
  return itemsStatistics
}

const CharacterView: FC<IProps> = ({ characterId }) => {
  const userItems = useAppSelector((state) => state.inventory.items)
  const character = useAppSelector((state) => state.inventory.characters.find((x) => x.inventoryId == characterId))
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

  const dispatch = useAppDispatch()

  if (!character) {
    return (
      <div className="card">
        <AlertMessage type="error" message="Error : Character does not exist" />
      </div>
    )
  }
  return (
    <>
      {/* <Actions /> */}
      <div className="card">
        <h2>{character.name}</h2>
        <div className="character-card">
          {/* Left column : Items equiped + Char image */}
          <div className="character-left">
            <div className="character-main">
              <img className={`character-main-image rarity-${character.rarity}`} src={character.image} />
              <div className="character-stuff">
                {new Array(MAX_ITEM_COUNT_PER_CHAR).fill(undefined).map((_, index) => {
                  // item.items[index] = inventoryId of item equiped
                  // const stuffItem = userItems.find((x) => x.inventoryId == character.items[index])
                  const stuffItem = equipedItems[index]
                  return (
                    <div key={`char-item-${index}`} className="item-slot">
                      {stuffItem && <img src={stuffItem.image} />}
                    </div>
                  )
                })}
              </div>
            </div>
            <h3>Level {character.level}</h3>
            <span>XP Bar</span>
          </div>

          <div className="character-stats">
            <h3>Stats</h3>
            <table>
              <tbody>
                <tr>
                  <td>
                    <b>Vitality</b>
                  </td>
                  <td>{characterFullStatistics.vitality}</td>
                </tr>
                <tr>
                  <td>
                    <b>Strength</b>
                  </td>
                  <td>{characterFullStatistics.strength}</td>
                </tr>
                <tr>
                  <td>
                    <b>Intelligence</b>
                  </td>
                  <td>{characterFullStatistics.intelligence}</td>
                </tr>
              </tbody>
            </table>

            <h3>Spells</h3>
            <table>
              <tbody>
                <tr>
                  <td>
                    <img src={PlaceholderImage} />
                  </td>
                  <td>
                    <p>
                      <b>Vitality Boost</b>
                    </p>
                    <p>
                      Increase vitality of all characters of 20% <span className="spell-value">(+5%)</span> for the next 2 rounds.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <img src={PlaceholderImage} />
                  </td>
                  <td>
                    <p>
                      <b>Vitality Boost</b>
                    </p>
                    <p>
                      Increase vitality of all characters of 20% <span className="spell-value">(+5%)</span> for the next 2 rounds.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <img src={PlaceholderImage} />
                  </td>
                  <td>
                    <p>
                      <b>Vitality Boost</b>
                    </p>
                    <p>
                      Increase vitality of all characters of 20% <span className="spell-value">(+5%)</span> for the next 2 rounds.
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="card">
        {/* Only show available items */}
        <ItemCard
          title="Items"
          items={userItems.filter((x) => !x.isEquiped)}
          equippedItems={character.items}
          onEquip={(itemInventoryId: number) => {
            if (character.items.length + 1 <= MAX_ITEM_COUNT_PER_CHAR) {
              dispatch(inventoryActions.equipItem({ charInventoryId: character.inventoryId, itemInventoryId }))
            } else {
              toast("You reached the maximum item count for this character. Remove one first before trying to equip a new one.", { type: "error" })
            }
          }}
        />
      </div>
    </>
  )
}

export default CharacterView
