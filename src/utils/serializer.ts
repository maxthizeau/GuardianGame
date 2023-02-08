import CryptoJS from "crypto-js"
import { IInventoryState } from "../redux/slices/inventorySlice"

const ENCRYPT_KEY = import.meta.env.VITE_ENCRYPT_KEY

function typeChecker(objectToCheck: any): objectToCheck is IInventoryState {
  return objectToCheck.money !== undefined && objectToCheck.characters && objectToCheck.items
}

export const serializeAndEncrypt = (saveObject: IInventoryState) => {
  try {
    const saveJson = JSON.stringify(saveObject)
    const encrypted = CryptoJS.AES.encrypt(saveJson, ENCRYPT_KEY)
    return encrypted.toString()
  } catch (e) {
    // console.error("SAVE ERROR", e)
    return null
  }
}

export const decrypt = (encrypted: string) => {
  try {
    const decrypted = CryptoJS.AES.decrypt(encrypted, ENCRYPT_KEY)
    const saveJsonDecrypted = decrypted.toString(CryptoJS.enc.Utf8)
    const saveObject = JSON.parse(saveJsonDecrypted)
    if (typeChecker(saveObject)) return saveObject
    else {
      throw new Error("Types don't match")
    }
  } catch (e: any) {
    // console.error("decrypt error :", e.message)
    return null
  }
}
