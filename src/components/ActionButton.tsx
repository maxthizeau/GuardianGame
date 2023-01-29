import React, { FC, ReactNode } from "react"
import Currency from "./Currency"

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  secondaryLine?: ReactNode
}

const ActionButton: FC<IProps> = ({ title, secondaryLine, ...props }) => {
  return (
    <button className="big center" {...props}>
      {title}
      {secondaryLine && <div className="py-1 secondary-line">{secondaryLine}</div>}
    </button>
  )
}

export default ActionButton
