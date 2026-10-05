# MediBuddy Medicine Search

A clean and simple React application to search medicines using the FDA Drug Label API. Built as part of the machine coding round.

## How to run

1. Ensure Node.js is installed.
2. Run `npm install` to install dependencies.
3. Run `npm run dev` to start the development server.
4. Open the link provided in the terminal (usually `http://localhost:5173/`).

## Features & Optimisations
- **Debouncing**: Search API calls are delayed by 400ms after user stops typing to reduce network load.
- **Request Cancellation**: Used `AbortController` to cancel earlier requests when user types fast, making sure old responses don't overwrite the latest one.
- **Caching**: Stored search results locally so returning to the same search string does not cause a new API hit.
- **Direct URL access**: The Detail page handles direct links and page reloads by checking if the data came from state, and if not, it fetches it via the ID.

## Trade-offs: 
- Using standard local state for caching instead of a heavy library like React Query to keep the bundle simple and small.
- Simple grid styling with plain CSS without any external UI library to keep it fast and dependency-free.
