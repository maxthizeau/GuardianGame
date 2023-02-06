import axios from "axios"
import MockAdapter from "axios-mock-adapter"

const fetchUserResponse = {
  data: [
    {
      id: "123",
      display_name: "maximethizeau",
    },
  ],
}

const mockNetWorkResponse = () => {
  const mock = new MockAdapter(axios)
  //   mock.onGet(`https://api.twitch.tv/helix/users`).reply(200, fetchUserResponse)
  mock.onGet(`https://api.twitch.tv/helix/users`).reply((config) => {
    if (config.headers?.Authorization) {
      return [200, fetchUserResponse]
    }
    return [401, "Not Authorized"]
  })
}

export { fetchUserResponse, mockNetWorkResponse }
