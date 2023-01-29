import { FC, ReactNode } from "react"
import InventoryCard from "../components/InventoryCard"
import characters from "../data/characters"
import guardians from "../data/guardians"
import items from "../data/items"
import Actions from "../layouts/Actions"
import PlaceholderImage from "../assets/placeholder.png"
import "../styles/character.scss"

interface IProps {
  // children: ReactNode
}

const CharacterView: FC<IProps> = ({}) => {
  const character = characters[0]
  const stuff = [items[0], items[1], items[11]]
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
                <div className="item-slot">
                  <img src={stuff[2].image} />
                </div>
                <div className="item-slot">
                  <img src={stuff[0].image} />
                </div>
                <div className="item-slot">{/* <img src={stuff[1].image} /> */}</div>
              </div>
            </div>
            <h3>Level 19</h3>
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
                  <td>920</td>
                </tr>
                <tr>
                  <td>
                    <b>Strength</b>
                  </td>
                  <td>122</td>
                </tr>
                <tr>
                  <td>
                    <b>Intelligence</b>
                  </td>
                  <td>92</td>
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
        <InventoryCard type="list" title="Items" activeItems={[]} tableItems={[...items]} maximumActiveItemsCount={0} />
      </div>
    </>
  )
}

export default CharacterView
