import { SaveAPI } from "./saveApi"
import { describe, it } from "vitest"
import { getSaveResponse, mockNetWorkResponse } from "./mocks/apiCalls.data"

/**
 *
 */
const saveApi = new SaveAPI()
describe("", () => {
  beforeAll(() => {
    mockNetWorkResponse()
  })
  it("should return a valid SaveFromApi Response when fetching save of correct id", async () => {
    const save = await saveApi.fetchSave(getSaveResponse.twitchId)
    expect(save.data).toMatchObject(getSaveResponse)
  })
  it("should fail when fetching save of unknown/invalid Id", async () => {
    // with invalid Id
    const saveWithInvalidId = await saveApi.fetchSave("m")
    expect(saveWithInvalidId.error).toBeDefined()
    expect(saveWithInvalidId.data).not.toBeDefined()
    // with unknown Id
    const save = await saveApi.fetchSave("50000")
    expect(save.error).toBeDefined()
    expect(save.data).not.toBeDefined()
  })
  it("should send post request on saveApi", async () => {
    const save = await saveApi.postSave(getSaveResponse.twitchId, getSaveResponse.serializedState)
    expect(save.data).toBeDefined()
    // date returned in post request should be more recent
    expect(save.data?.date).toBeGreaterThan(getSaveResponse.date)
  })
})
