import { FC, ReactNode } from "react"
import InventoryCard from "../components/InventoryCard"
import { Character, InventoryItem, ItemType } from "../data/types"
import { useAppSelector, useAppDispatch } from "../redux/store"
import { appActions, EViews } from "../redux/slices/appSlice"
import ItemCard from "../components/ItemCard"
import { MAX_HERO_COUNT, MAX_GUARDIAN_COUNT } from "../libs/constants"
import { inventoryActions } from "../redux/slices/inventorySlice"

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
