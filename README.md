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
- Testing Library ? Jest ? (I did not decided yet)

**Bold** : Skills I'm focusing on for this project (+ React Suspsense + Git - that's why I made some unnecessary branches)

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

## Images

Link to creators :

- https://www.vecteezy.com/members/klyaksun
- https://www.vecteezy.com/members/collaborapix
- https://www.vecteezy.com/members/socutelab
