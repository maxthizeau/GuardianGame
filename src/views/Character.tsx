import { FC, ReactNode } from "react"
import InventoryCard from "../components/InventoryCard"
import characters from "../data/characters"
import guardians from "../data/guardians"
import items from "../data/items"
import Actions from "../layouts/Actions"
import PlaceholderImage from "../assets/placeholder.png"
import "../styles/character.scss"
import { Character, Guardian } from "../data/types"
import { MAX_ITEM_COUNT_PER_CHAR } from "../libs/constants"
import { useAppSelector } from "../redux/store"
import ItemCard from "../components/ItemCard"

interface IProps {
  // children: ReactNode
  character: Guardian | Character
}

const CharacterView: FC<IProps> = ({ character }) => {
  const userItems = useAppSelector((state) => state.inventory.items)
  // const stuff = [items[0], items[1], items[11]]
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
                  const stuffItem = userItems.find((x) => x.inventoryId == character.items[index])
                  return <div className="item-slot">{stuffItem && <img src={stuffItem.image} />}</div>
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
                  <td>{character.statistics.vitality}</td>
                </tr>
                <tr>
                  <td>
                    <b>Strength</b>
                  </td>
                  <td>{character.statistics.strength}</td>
                </tr>
                <tr>
                  <td>
                    <b>Intelligence</b>
                  </td>
                  <td>{character.statistics.intelligence}</td>
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
        <ItemCard title="Items" items={userItems} />
      </div>
    </>
  )
}

export default CharacterView
