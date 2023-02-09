import { FC, ReactNode } from "react"

interface IProps {
  text?: string
}

const Spinner: FC<IProps> = ({ text }) => {
  return (
    <div className="spinner">
      <div className="spinner-loader1" />
      <div className="spinner-loader2" />
      <div className="spinner-text">{text}</div>
    </div>
  )
}

export default Spinner
