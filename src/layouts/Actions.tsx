import { FC, ReactNode } from "react"
import { moneyIcon } from "../assets/icons"
import ActionButton from "../components/ActionButton"
import Currency from "../components/Currency"
import lootboxes from "../data/lootboxes"
import { appActions, EViews } from "../redux/slices/appSlice"
import { useAppDispatch } from "../redux/store"

interface IProps {}

const Actions: FC<IProps> = ({}) => {
  const dispatch = useAppDispatch()
  return (
    <>
      <div className="actions">
        <ActionButton
          title="Profile"
          // secondaryLine={<Currency flat icon={{ src: moneyIcon, alt: "Money Icon" }} value={1000} />}
          // Insert Profile Icon here
          onClick={() => dispatch(appActions.changeView({ type: EViews.HOME }))}
        />
        <ActionButton
          title="Buy Hero"
          secondaryLine={<Currency flat icon={{ src: moneyIcon, alt: "Money Icon" }} value={1000} />}
          onClick={() => dispatch(appActions.changeView({ type: EViews.LOOTBOX, arg: lootboxes[2] }))}
        />
        <ActionButton
          title="Buy Guardian"
          secondaryLine={<Currency flat icon={{ src: moneyIcon, alt: "Money Icon" }} value={500} />}
          onClick={() => dispatch(appActions.changeView({ type: EViews.LOOTBOX, arg: lootboxes[1] }))}
        />
        <ActionButton
          title="Buy Item"
          secondaryLine={<Currency flat icon={{ src: moneyIcon, alt: "Money Icon" }} value={200} />}
          onClick={() => dispatch(appActions.changeView({ type: EViews.LOOTBOX, arg: lootboxes[0] }))}
        />
      </div>
    </>
  )
}

export default Actions
