import { FC, ReactNode } from "react"
import { moneyIcon } from "../assets/icons"
import ActionButton from "../components/ActionButton"
import Currency from "../components/Currency"

interface IProps {
  clickOnProfile: () => void
  clickOnCharacter: () => void
  clickOnGuardian: () => void
  clickOnItem: () => void
}

const Actions: FC<IProps> = ({ clickOnCharacter, clickOnGuardian, clickOnItem, clickOnProfile }) => {
  return (
    <>
      <div className="actions">
        <ActionButton
          title="Profile"
          // secondaryLine={<Currency flat icon={{ src: moneyIcon, alt: "Money Icon" }} value={1000} />}
          // Insert Profile Icon here
          onClick={clickOnProfile}
        />
        <ActionButton
          title="Buy Character"
          secondaryLine={<Currency flat icon={{ src: moneyIcon, alt: "Money Icon" }} value={1000} />}
          onClick={clickOnCharacter}
        />
        <ActionButton
          title="Buy Guardian"
          secondaryLine={<Currency flat icon={{ src: moneyIcon, alt: "Money Icon" }} value={500} />}
          onClick={clickOnGuardian}
        />
        <ActionButton title="Buy Item" secondaryLine={<Currency flat icon={{ src: moneyIcon, alt: "Money Icon" }} value={200} />} onClick={clickOnItem} />
      </div>
    </>
  )
}

export default Actions
