import { FC, ReactNode } from "react"

interface IProps {
  title: string
  message: string
}

const ErrorView: FC<IProps> = ({ title, message }) => {
  return (
    <>
      <h2>{title}</h2>
      <div>{message}</div>
    </>
  )
}

export default ErrorView
