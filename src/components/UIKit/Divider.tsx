import { FC, ReactNode } from "react"

interface IProps {
  vertical?: boolean
}

const Divider: FC<IProps> = ({ vertical }) => {
  return <div className={vertical ? `vertical-divider` : `divider`} />
}

export default Divider
