# 🎮 Guardians Game

🔗 [Test the current master branch](https://guardian-game-9t5m1h754-maxthizeau.vercel.app/)
(Keep in mind that it's still work in progress)

🎮 Guardians Game is a game I make to practice and learn some frontend skills.
The goal of this project is to link it with Twitch API, and be able to buy items and characters with channel points.

I might add some attack / defense mode in the future, but this is not the main focus atm.

Stack :

- React
- TypeScript
- **Vite.js**
- **SCSS**
- **Redux** (WiP)
- **REST API** (WiP)
- **Testing Library** / Vitest

**Bold** : Skills I'm focusing on for this project (+ React Suspsense + Git - that's why some commits may seem useless)

## Documentation :

**Project structure :**

- 📁 src
- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- 📁 assets (images, font)
- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- 📁 components (React Components)
- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- 📁 data (raw data (ex: items, characters, ...) and types)
- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- 📁 layouts (Header, Footer and big react components)
- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- 📁 libs (library config and utility files)
- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- 📁 styles (scss files)
- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- 📁 views (App views)

**Types explanation :**

- InventoryItem : Any lootable thing - Can be item, guardian or character. ItemType is specified as "type" prop
- Statistic & StatisticRange : An InventoryItem will have random statistics given by his StatisticRange (min, max) value.

**How Twitch Auth is handled ?**

Most of the logic is handled by the hook "useAuth.tsx"

- handleOAuthTwitch() is a function that generate a unique stateId (also called uuidState), and redirect to Twitch Auth page. After successful connection to Twitch, user will be redirected to /auth page (AuthHandler.tsx component). Since the response is returned with # (/auth#access_token=my_access_token&scope=the_scope&state=the_uuid_state), we cannot handle it with server and have to parse it on client side. This is why the logic is handle in a component.
- AuthHandler.tsx - Parse the result, return an error if the state (uuidState) mismatch or response is an error, and update the redux state with access_token if response is successful.
- useAuth().useEffect() with state.accessToken will dispatch an asynchronous action : Fetch Twitch API to retrieve user's display name and user's ID with the given access token. Doing so, the state will be uploaded with full information about the user.

Next steps :

- Create a mini-backend that store serialized state of the inventory for each user, and serve it when user login.
- Implement auto-save

## Images

Link to creators :

- https://www.vecteezy.com/members/klyaksun
- https://www.vecteezy.com/members/collaborapix
- https://www.vecteezy.com/members/socutelab
