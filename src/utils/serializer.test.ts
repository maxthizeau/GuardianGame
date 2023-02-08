import { describe, it } from "vitest"
import { IInventoryState } from "../redux/slices/inventorySlice"
import { serializeAndEncrypt, decrypt } from "./serializer"
import { mockData } from "./test-utils"

const inventoryState: IInventoryState = {
  money: 3000,
  characters: [...mockData.heroes, ...mockData.guardians],
  items: mockData.items,
}

describe("serializer - utility functions", () => {
  it("should return a string when calling serializeAndEncrypt", () => {
    const encrypted = serializeAndEncrypt(inventoryState)
    expect(encrypted).toBeDefined()
    expect(typeof encrypted).toBe(typeof "string")
  })

  it("should return null if decrypt a string that is not encrypted IInventoryState", () => {
    const decrypted = decrypt("invalid-state")
    expect(decrypted).toBeNull()
  })
  it("should return the IInventoryState when passing a valid encrypted state ", () => {
    const encrypted = serializeAndEncrypt(inventoryState)
    expect(encrypted).not.toBeNull()
    const decrypted = decrypt(encrypted!)
    expect(decrypted).toMatchObject(inventoryState)
  })
})
