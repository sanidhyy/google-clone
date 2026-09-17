# Googl - A React TypeScript Google Search Engine Clone

![React JS Google Clone](https://user-images.githubusercontent.com/71302066/175765913-09fb0722-9969-4682-bfa2-9581fcc0c5a2.png)

[![Ask Me Anything !](https://img.shields.io/badge/Ask%20me-anything-1abc9c.svg)](https://github.com/sanidhyy)
[![GitHub license](https://img.shields.io/github/license/sanidhyy/google-clone)](https://github.com/sanidhyy/google-clone/blob/main/LICENSE.md)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/sanidhyy/google-clone/commits/main)
[![GitHub branches](https://badgen.net/github/branches/sanidhyy/google-clone/)](https://github.com/sanidhyy/google-clone/branches)
[![Github commits](https://badgen.net/github/commits/sanidhyy/google-clone/main)](https://github.com/sanidhyy/google-clone/commits)
[![Netlify Status](https://api.netlify.com/api/v1/badges/bf93cac6-4dc2-4c59-b010-ad1360481009/deploy-status)](https://react-googl-clone.netlify.app)
[![GitHub issues](https://img.shields.io/github/issues/sanidhyy/google-clone)](https://github.com/sanidhyy/google-clone/issues)

## ⚠️ Before you start

1. Make sure **Git** and **Node.js 22.12+** are installed.
2. Create `.env` file in root folder.
3. Contents of **.env**

```
RAPID_API_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

4. Now, to setup API, go to [Rapid API Website](https://rapidapi.com/) and create an account.

5. Subscribe to this API to fetch search results: [API: Real-Time SERP Data](https://rapidapi.com/letscrape-6bRBa3QguO5/api/real-time-serp-data).

![Copy API Key](https://user-images.githubusercontent.com/71302066/175766174-58a0779b-71ea-4f64-af87-2e23fedd0a7b.png)

6. After subscribing, copy your RapidAPI app key and paste it in `.env` as `RAPID_API_KEY`. Also set the same `RAPID_API_KEY` in the Netlify UI with Functions scope. Do not prefix it with `VITE_` or `REACT_APP_` — those prefixes would expose the key in the client bundle.

The app calls `/api/search` (a Netlify Function). That endpoint is public; the RapidAPI key stays on the server.

**NOTE:** Make sure you don't share these keys publically.

## 📌 How to use this App?

1. Clone this **repository** to your local computer.
2. Open **terminal** in root directory.
3. Run `pnpm install`.
4. Start the app with `pnpm start` (or `pnpm dev`).
5. Check the project with `pnpm lint` and `pnpm build`.
6. Now the app is fully configured and you can start using it.

### Need Help?

If you run into issues during installation or setup:

- **GitHub Discussions** — [Open a Q&A discussion](https://github.com/sanidhyy/google-clone/discussions/new?category=q-a) for setup and troubleshooting help.
- **Email** — [sanidhyyy@gmail.com](mailto:sanidhyyy@gmail.com)
- **Discord** — `@sanidhyy`

## 📃 Built with

[<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" width="150" height="40" />](https://www.typescriptlang.org/)

[<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" width="150" />](https://vite.dev/)

[<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" width="150" />](https://react.dev/)

[<img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" width="150" />](https://tailwindcss.com/)

[<img src="https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white" width="150" />](https://www.netlify.com/)

[<img src="https://user-images.githubusercontent.com/71302066/174567516-824b1967-5954-4ac7-9446-14a3b2ab825d.svg" alt="Rapid API">](https://rapidapi.com/)

[<img src="http://ForTheBadge.com/images/badges/built-with-love.svg" alt="Built with Love">](https://github.com/sanidhyy)

## 🔧 Stats

![Stats for this App](https://user-images.githubusercontent.com/71302066/175766396-a33b67dc-57d3-4fe6-8b5a-4072066b70d5.svg)

## 🙌🏼 Contribute

You might encounter some bugs while using this app. You are more than welcome to contribute. Just submit changes via pull request and I will review them before merging. Make sure you follow community guidelines.

## Buy Me a Coffee 🍺

[<img src="https://img.shields.io/badge/Buy_Me_A_Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black" width="200" />](https://www.buymeacoffee.com/sanidhy "Buy me a Coffee")

## 🚀 Follow Me

[![GitHub followers](https://img.shields.io/github/followers/sanidhyy?style=social&label=Follow&maxAge=2592000)](https://github.com/sanidhyy)
[![Twitter](https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Fx.com%2F_sanidhyy)](https://x.com/intent/tweet?text=Wow:&url=https%3A%2F%2Fgithub.com%2Fsanidhyy%2Fmedical-chat-app)

## ⭐ Give A Star

You can also give this repository a star to show more people and they can use this repository.
