import { FC, ReactNode } from "react"
import { useNavigate } from "react-router"

interface IProps {
  title: string
  previousAction?: () => void
}

const GameHeader: FC<IProps> = ({ title, previousAction }) => {
  return (
    <div className="game-header">
      <div
        data-testid="previous-button"
        className={`arrow left ${previousAction !== undefined ? "" : "disabled"}`}
        onClick={() => {
          previousAction && previousAction()
        }}
      />

      <h2>{title}</h2>

      <div className="arrow right disabled" />
    </div>
  )
}

export default GameHeader
