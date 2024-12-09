# IndoGitHubers

[![E2E](https://github.com/depapp/IndoGitHubers/actions/workflows/e2e.yml/badge.svg)](https://github.com/depapp/IndoGitHubers/actions/workflows/e2e.yml) [![Playwight Report](https://img.shields.io/badge/Playwright%20Report-222222?logo=github-pages&logoColor=white)](https://depapp.github.io/IndoGitHubers/)

Live: [www.indogithubers.com](https://www.indogithubers.com/)

| Desktop | Mobile |
| ------- | ------ |
| ![IndoGitHubers_latest](./screenshots/desktop.png) | ![IndoGitHubers_latest](./screenshots/mobile.png) |

## 📋 Description

IndoGitHubers is an application that displays the GitHub rank of users in Indonesia. It provides detailed information about each user, including their number of followers and contributions.
The IndoGitHubers app fetches data from the GitHub API and displays it in a user-friendly format. The app allows users to sort the list of users by different criteria and search for specific users.

## 💡 Features

- **Badge**: You can embed your GitHub rank. [more details](https://github.com/depapp/IndoGitHubers/blob/main/BADGE_USAGE.md)
- **GitHub Rank**: The app displays the GitHub rank of users in Indonesia. This includes their number of followers and contributions.
- **Sorting**: Users can sort the list of users by different criteria, such as the number of followers or contributions.
- **Search**: Users can search for specific users using the search bar.

## 🖼️ Showcases

Check out the GitHub users who are standing out with the [IndoGitHubers-badge](https://github.com/depapp/IndoGitHubers/blob/main/BADGE_USAGE.md) on their public profiles:

<details>
<summary>Click to expand!</summary>

* [depapp](https://github.com/depapp)
* [sendomoka](https://github.com/sendomoka)
* [taradevio](https://github.com/taradevio)
* [chandrabezzo](https://github.com/chandrabezzo)
* [crosbydoo](https://github.com/crosbydoo)
* [yaffalhakim1](https://github.com/yaffalhakim1)
* [syofyanzuhad](https://github.com/syofyanzuhad)
* [AsadSaleh](https://github.com/AsadSaleh)

</details>


## 🧑‍💻 How to setup

### Prerequisites

- Node.js, minimum v20.18.0
- NPM (included in Node.js), minimum v10.8.2

### Clone the repo

```bash
git clone https://github.com/depapp/indogithubers.git
```

Then navigate to the project directory

```bash
cd indogithubers
```

### Install the dependencies

```bash
npm run install
```

### Run the app

```bash
npm run dev
```

### Run E2E Test

We have several command to working with E2E:

- `npm run test:setup`, You need to run at least once (if needed).
- `npm run test:e2e`, Run all the test case inside this project.
- `npm run test:e2e:smoke`, Run all the test case that is included as smoke test group.
- `npm run test:e2e:desktop`, Run using desktop device only.
- `npm run test:e2e:mobile`, Run using mobile device only.
- `npm run test:e2e:report`, Run the latest playwright report.

### E2E for Visual Test

When developing E2E test that is require visual test snapshot, we need to run in the exact same operating system with the CIs. Since our CI using Ubuntu, we need to run our E2E inside Docker to mimick the same system.

- Make sure you have `Docker` installed
- Run command: `npm run docker`
- If you facing error, it because some of optional dependencies are needs to be installed in the proper operating system. You can re-run command `npm i` inside the bash terminal in your Docker command.
- Run the test: `npm run e2e`
- To regenerate the new snapshot, you need to run command: `npm run test:e2e -- --update-snapshots`

## 💪 Support me

<a href="https://www.nihbuatjajan.com/depapp" target="_blank"><img src="https://d4xyvrfd64gfm.cloudfront.net/buttons/default-cta.png" alt="Nih buat jajan" height="30px"></a>

<a href="https://saweria.co/depapp" target="_blank"><img src="https://github-production-user-asset-6210df.s3.amazonaws.com/6134774/278801090-c4efd5c9-c0a7-43dc-9ea1-c21bc1a55203.png" width="70px" height="70px"></a>

<a href="https://www.paypal.me/depapp" target="_blank"><img src="https://www.paypalobjects.com/digitalassets/c/website/marketing/apac/C2/logos-buttons/optimize/44_Yellow_PayPal_Pill_Button.png" height="35px"></a>


## 👥 Contributors

If you'd like to contribute to the IndoGitHubers app, you can fork the repository, make your changes, and submit a pull request. Please make sure to follow the existing code style and add tests for any new functionality.

<a href="https://github.com/depapp/IndoGitHubers/graphs/contributors"><img src="https://contrib.rocks/image?repo=depapp/IndoGitHubers" alt="All the amazing contributors of IndoGitHubers"></a>
