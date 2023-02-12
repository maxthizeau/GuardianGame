import { FC, ReactNode } from "react"
import { Character } from "../data/types"
import { usePreview } from "../hook/usePreview"
import { MAX_GUARDIAN_COUNT, MAX_HERO_COUNT } from "../libs/constants"
import ItemElement from "./ItemElement"
import { useNavigate } from "react-router"

interface IProps {
  characterType: "guardian" | "hero"
  charactersArray: Character[]
}

/**
 *
 * @param characterType : "guardian" or "hero"
 * @param characterArray : Array with only the character to show (already filtered)
 * @returns
 */

const SelectedCharactersList: FC<IProps> = ({ characterType, charactersArray }) => {
  const { setOnClickOnHoverPreview } = usePreview()
  const navigate = useNavigate()
  const maxCount = characterType == "guardian" ? MAX_GUARDIAN_COUNT : MAX_HERO_COUNT
  return (
    <div className="game-active-items ">
      {new Array(maxCount).fill(undefined).map((_, index) => {
        const item = charactersArray[index] ?? undefined
        const onClickProps = setOnClickOnHoverPreview(
          item
            ? {
                item: { type: "character", item: item },
                onClickAgain: () => {
                  navigate(`/character/${item.inventoryId}`)
                },
              }
            : {
                item: { type: "string", item: "Empty slot : Select one in your inventory to add it your team" },
              }
        )
        return <ItemElement key={index} item={item} {...onClickProps} extraContent={item ? <p>Lvl {item.level ?? "?"}</p> : undefined} />
      })}
    </div>
  )
}

export default SelectedCharactersList
