import * as redux from "react-redux"
import { act, CreateWrapper, mockData, render, renderHook, renderWithProviders, screen } from "../utils/test-utils"
import { AnimationState, useLootbox } from "./useLootbox"
import { vi } from "vitest"
import { setupStore } from "../redux/store"
import { inventoryActions } from "../redux/slices/inventorySlice"
import { testRootState } from "../utils/test-data"

// return { buy, close, itemToShow, animationState, active }
const testLootbox = mockData.lootboxes[0]

describe("useLookbox - hook", () => {
  it("should start animation when buying a lootbox ", () => {
    const { result } = renderHook(() => useLootbox(testLootbox), { wrapper: CreateWrapper })
    expect(result.current.active).toBe(false)
    // Buy to start animation and stuff
    act(() => {
      result.current.buy()
    })
    expect(result.current.active).toBe(true)
    expect(result.current.animationState).toBe(AnimationState.ACTIVE)
    expect(result.current.itemToShow).toBeDefined()
  })

  it("should reset completly when calling close function", () => {
    const { result } = renderHook(() => useLootbox(testLootbox), { wrapper: CreateWrapper })

    // Init : Expect it to be as default
    expect(result.current.active).toBe(false)
    expect(result.current.animationState).toBe(AnimationState.NOT_STARTED)
    expect(result.current.itemToShow).toBe(undefined)

    // Buy to start animation and stuff
    act(() => {
      result.current.buy()
    })

    // Expect state to be different after buy
    expect(result.current.active).toBe(true)
    expect(result.current.animationState).toBe(AnimationState.ACTIVE)
    expect(result.current.itemToShow).not.toBe(undefined)

    // Call close function
    act(() => {
      result.current.close()
    })

    // Expect it to be as default
    expect(result.current.active).toBe(false)
    expect(result.current.animationState).toBe(AnimationState.NOT_STARTED)
    expect(result.current.itemToShow).toBe(undefined)
  })
})
