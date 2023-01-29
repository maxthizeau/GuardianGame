import { FC, ReactNode } from "react"

interface IProps {
  icon?: {
    src: string
    alt?: string
  }
  value: number
  flat?: boolean
  extraClassName?: string
}

const Currency: FC<IProps> = ({ icon, value, flat, extraClassName }) => {
  return (
    <div className={`currency ${flat ? "flat" : ""} ${extraClassName ?? ""}`}>
      {icon && <img src={icon.src} className="currency-icon" alt={icon.alt} />}
      <span className="currency-value">{value}</span>
    </div>
  )
}

export default Currency
