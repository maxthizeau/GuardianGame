import { useAppDispatch, useAppSelector } from "../redux/store"
import { appActions, ItemInPreview } from "../redux/slices/appSlice"
import { ReactEventHandler, useCallback, useEffect } from "react"

/**
 * A hook that facilitates the use of the preview providing preview state, function to get onClick/onHover props
 * @returns preview, setOnClickOnHoverPreview
 */
export const usePreview = () => {
  const dispatch = useAppDispatch()
  const previewSelector = useAppSelector((state) => state.app.preview)

  /**
   *
   * @param {
   * item: the item to display in preview if conditions matches (type ItemInPreview)
   * onClick: additional onClick action to perform after onClick preview logic
   * onHover: additional onMouseEnter action to perform after onMouseEnter preview logic
   * onHoverOut: additional onMouseLeave action to perform after onMouseLeave preview logic
   * onClickAgain: what to do if user click on an item that is already in preview ? can be undefined if nothing to do
   * }
   * @returns onClick, onMouseEnter, onMouseLeave props for a div html element
   */
  const setOnClickOnHoverPreview = useCallback(
    ({
      item,
      onClick,
      onHover,
      onHoverOut,
      onClickAgain,
    }: {
      item: ItemInPreview
      onClick?: () => void
      onHover?: () => void
      onHoverOut?: () => void
      onClickAgain?: () => void
    }): Partial<React.HTMLProps<HTMLDivElement>> => {
      return {
        onClick: (e) => {
          if (previewSelector.itemToShow?.item == item.item && previewSelector.type == "selected") {
            if (onClickAgain !== undefined) {
              onClickAgain()
            }
          } else {
            dispatch(
              appActions.selectPreview({
                type: "selected",
                itemToShow: item,
              })
            )
            onClick && onClick()
          }
        },
        onMouseEnter: (e) => {
          // console.log("Hover : ok")
          dispatch(
            appActions.selectPreview({
              type: "hover",
              itemToShow: item,
            })
          )
          onHover && onHover()
        },
        onMouseLeave: (e) => {
          // console.log("Hover : out")
          if (previewSelector.type == "hover") {
            dispatch(appActions.clearPreview())
            onHoverOut && onHoverOut()
          }
        },
      }
    },
    [previewSelector]
  )

  function clearPreview() {
    dispatch(appActions.clearPreview())
  }

  return { preview: previewSelector, setOnClickOnHoverPreview, clearPreview }
}
