# Bitcoin Prediction Game

## About

- The app is a fun and interactive Bitcoin price prediction game where users can guess if the price will go up or down, based on real-time price updates.
- The game keeps users engaged with the score system, predictions, countdown and a fun quiz prompts until the next price update.

Live demo: https://epilot-coding-assignment.vercel.app/

## Getting Started

Create `.env` file with environment variables specific to Amazon DynamoDB:

```
AWS_ACCESS_KEY_ID=***
AWS_REGION=***
AWS_SECRET_ACCESS_KEY=***
```

Run the development server `yarn dev` and open [http://localhost:3000](http://localhost:3000) with your browser to run the app locally.

In order to lint the source code, run `yarn lint`.

For tests coverage, run `yarn test`.

## Project Structure

This project separates components, hooks and utilities.

Here’s a breakdown of the key directories and files:

### App Directory (`src/app`)

- **page.tsx** is the main entry point of the application. This component contains the logic to either show the entry page or the main game view based on whether the player has typed their name.

### Components Directory (`src/components`)

- **Main.tsx**: This is the core component that handles the main functionality of the app. It displays the buttons for predicting the price of Bitcoin (Up or Down) and handles the game logic.
- **View.tsx**: Layout component used to structure various views, encapsulating the `headingElement`, `contentElement`, `actionElement` and `footerElement` to render a consistent UI.
- **Button.tsx**: Reusable button component extending Ant Design’s `Button` component.
- **Countdown.tsx**: Component to display the countdown.
- **Score.tsx**: Simple component to display the current score and username.
- **PasttimeQuiz.tsx**: Component to display fun quiz prompts.
- **RealtimePriceIndicator.tsx**: Component to display real-time price indicators.

### Hooks Directory (`src/hooks`)

- **useCryptoWebSocket.tsx**: Custom hook that provides real-time overview of the BTC price in USD based on recent trades.
- **useDatabase.tsx**: Custom hook that provides interaction with the database, handling methods like `getScoreFromDatabase` and `saveScoreToDatabase`. This modular approach simplifies database interactions and makes it easier to mock the functions in tests.

### Helpers Directory (`src/helpers`)

- **localStorage.ts**: Contains functions for reading, writing and removing data from `localStorage`. The app uses this to persist the user’s score and username across browser sessions.

### Constants File (`src/constants`)

- Holds static values such as colors (`colorUp`, `colorDown`, etc) and other game-specific constants like `delayInSeconds`. This improves maintainability by keeping reusable important values in one place.

## Key Technologies and Libraries

### 1. Next.js Framework

- The app is built with **Next.js**, a popular React framework that provides server-side rendering (SSR) and API routes.
- **Client-side rendering** is used in this app, which is typical for interactive UIs like this game.
- Next.js simplifies API handling and optimizations like code-splitting.

### 2. React & React Hooks

- **State Management**: `useState` is used to manage the current score, username and other states like the Bitcoin price and prediction.
- **Side Effects**: `useEffect` handles side effects like fetching data from `localStorage` on component mount.
- **Transitions**: `useTransition` provides a smooth user experience during asynchronous updates, improving responsiveness.

### 3. Ant Design (UI Library)

- The project uses **Ant Design**, a popular UI framework, for consistent and beautiful UI components like `Button`, `Input`, `Typography` and more.
- Custom tokens are used using `ConfigProvider` to provide a unique look for the app (e.g., using `colorUp` and `colorDown` to dynamically color buttons based on the user’s choice).

### 4. Modular CSS

- Styling is handled via Ant Design’s **component-level styling**, but it also leverages **CSS-in-JS** where needed through the use of **Styled Components**. The idea is to avoid CSS files that are detached from the component.

### 5. Web Socket

- The app uses a WebSocket connection, subscribing to **stream of trades** in Binance to get real-time overview of the BTC price in USD.

### 6. API Integration

- The app makes use of **REST API calls** to fetch the current Bitcoin price from Binance, helping to validate the user’s prediction.
- Asynchronous functions fetch these values and **Promises** are handled using `async/await` for cleaner, more readable code.

### 7. Local Storage

- The app persists user data (like the score and username) using the `localStorage` API.
- Helper functions (`getFromLocalStorage`, `saveToLocalStorage` and `removeFromLocalStorage`) abstract the complexity of interacting with `localStorage`, making the codebase more modular and maintainable.

### 8. Test Coverage

- The project uses **Jest** and **React Testing Library** for unit testing.
- The tests focus on user interactions (e.g., making predictions, restarting the game) and expected outcomes, ensuring that the core functionality works as intended.
- Components are tested for correct rendering (e.g., buttons and score) and interaction (e.g., handling button clicks).
