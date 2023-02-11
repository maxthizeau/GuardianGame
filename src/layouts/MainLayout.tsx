import { FC, ReactNode } from "react"
import Header from "./Header"
import Sidebar from "./Sidebar"

interface IProps {
  children: ReactNode
}

const MainLayout: FC<IProps> = ({ children }) => {
  return (
    <>
      <Header />

      <div className="container">
        <div id="main">
          <Sidebar />
          <div className="game-view">{children}</div>
        </div>
      </div>
    </>
  )
}

export default MainLayout
