import { FC, ReactNode } from "react"
import "../styles/alerts.scss"

interface IProps {
  type: "success" | "error" | "info" | "warning"
  title?: string
  message: string | ReactNode
}

const AlertMessage: FC<IProps> = ({ type, title, message }) => {
  return (
    <div role="alert" className={`alert ${type}`}>
      {title && <div className="alert-title">{title}</div>}
      {message}
    </div>
  )
}

export default AlertMessage
