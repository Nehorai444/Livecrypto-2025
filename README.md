# LiveCrypto

LiveCrypto is a cryptocurrency tracking and analysis platform that provides users with real-time data on various cryptocurrencies, now styled with Tailwind CSS for a modern, responsive design.

## Features

* 🌐 **Real-Time Data**: Fetch and display live cryptocurrency data.
* 🔍 **Search Functionality**: Search for detailed information about specific coins.
* 📊 **Interactive UI**: Responsive and user-friendly interface built with React.js and styled using Tailwind CSS.
* 💾 **Database Integration**: MongoDB backend for secure and efficient data management.
* 🎨 **Modern Styling**: Tailwind CSS for utility-first, customizable design.
* 📦 **Containerization (Optional)**: Docker & Docker Compose support for easy deployment.

## Tech Stack

* **Frontend**:

  * React.js
  * Tailwind CSS (replacing/augmenting previous Bootstrap styles)
  * HTML5, CSS
* **Backend**:

  * Node.js, Express.js
  * Script: `coins.js` (e.g., data-fetching or preprocessing script)
  * Main server: `server.js`
* **Database**: MongoDB
* **API Integration**:

  * Binance WebSocket API for live data
  * Other external cryptocurrency APIs as needed
* **Deployment**: DigitalOcean (or any cloud/VPS)
* **Containerization**: Docker & Docker Compose (if configured)

## Prerequisites

* Node.js (v14+ recommended) and npm installed
* MongoDB instance (local or cloud)
* (Optional) Docker & Docker Compose for containerized setup

## Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/Nehorai444/livecrypto.git
   cd livecrypto
   ```

2. **Install dependencies**
   Depending on your structure, you may have separate folders for backend and frontend; if so, run the following in each. Otherwise, run in project root if dependencies are aggregated.

   * **Backend** (if in `server/` folder):

     ```bash
     cd server
     npm install
     ```
   * **Frontend** (if in `client/` folder):

     ```bash
     cd client
     npm install
     ```
   * **If a single package.json**:

     ```bash
     npm install
     ```

3. **Configure environment variables**
   In the backend directory (`server/`), create a `.env` file with:

   ```env
   MONGO_URI=mongodb://localhost:27017/trivia
   PORT=5000
   API_KEY=your_api_key_here
   ```

   Adjust values as needed (e.g., remote MongoDB URI, different port).

4. **Tailwind CSS setup (Frontend)**
   If not already configured, ensure:

   * `tailwind.config.js` is present in the frontend directory.
   * PostCSS is set up to process Tailwind directives in your CSS.
   * In your main CSS (e.g., `src/index.css`), include:

     ```css
     @tailwind base;
     @tailwind components;
     @tailwind utilities;
     ```
   * Your `package.json` scripts include a build step that processes Tailwind (e.g., `npm run build`).

5. **Build the Frontend**
   From the frontend directory (or project root if scripts are centralized):

   ```bash
   npm run build
   ```

   This generates optimized static assets (e.g., in a `build/` or `dist/` folder) with Tailwind CSS included.

6. **Run Data Script & Server**
   After building:

   ```bash
   # If a separate data-fetching/preprocessing script is needed:
   node coins.js

   # Start the main server
   node server.js
   ```

   * Ensure `coins.js` is in the correct path (project root or specified folder). Adjust the command if it lives in `server/` (e.g., `node server/coins.js`).
   * `server.js` should serve the built frontend (e.g., using Express static middleware) and expose API endpoints.

7. **Access the Application**
   Open your browser at `http://localhost:5000` (or the configured PORT). The React frontend should load, styled with Tailwind CSS, and connect to the backend for live data.

8. **Docker & Docker Compose (Optional)**
   If a `docker-compose.yml` is present/configured:

   ```bash
   docker-compose up --build
   ```

   Ensure environment variables are set in `.env` or in the Compose file.

## API Endpoints

* **Search Coin Data**
  `GET /api/searchCoinData?query=<coinName>`
  Example:

  ```
  http://localhost:5000/api/searchCoinData?query=bitcoin
  ```
* **Other Endpoints**

  * Define additional CRUD or data endpoints in `server.js` or route files as needed.
  * Ensure CORS is configured if frontend is served separately in development.

## Project Structure (Example)

```
livecrypto/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── index.css       # Includes Tailwind directives
│   │   └── ... 
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── package.json
│   └── ...
├── server/                 # Backend
│   ├── coins.js            # Data-fetching/preprocessing script
│   ├── server.js           # Main Express server
│   ├── routes/             # Route handlers (optional)
│   ├── controllers/        # Logic for endpoints (optional)
│   ├── models/             # Mongoose models (optional)
│   ├── .env                # Env vars (not committed)
│   ├── package.json
│   └── ...
├── docker-compose.yml      # Optional
└── README.md
```

Adjust paths if your setup differs.

## Development

* **Local Development**

  * Run backend and frontend separately with hot-reload:

    ```bash
    # In server/
    npm run dev   # e.g., using nodemon

    # In client/
    npm start     # React dev server with Tailwind JIT
    ```
  * Configure proxy in frontend `package.json` (e.g., `"proxy": "http://localhost:5000"`) so API calls forward to backend.

* **Search & Filtering**

  * The frontend uses a search bar component to filter the displayed coins by trading pair.
  * Consider adding debounce (e.g., lodash.debounce) for performance if the data set is large.

* **Styling**

  * Tailwind CSS utility classes replace Bootstrap classes.
  * Customize colors, spacing, and typography via `tailwind.config.js` theme extensions.
  * Use dark mode classes (`dark:`) if needed; configure `darkMode` in Tailwind config (e.g., `'class'` or `'media'`).

## Contributing

1. Fork the repository.
2. Create a new branch:

   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:

   ```bash
   git commit -m "Description of your feature"
   ```
4. Push to the branch:

   ```bash
   git push origin feature-name
   ```
5. Submit a pull request.

Please follow existing code style (ESLint/Prettier), and update or add tests/documentation where appropriate.

## Running Tests

* Add test scripts for backend (e.g., Jest, Mocha) and frontend (e.g., React Testing Library) as needed.
* Example:

  ```bash
  # In server/
  npm test

  # In client/
  npm test
  ```

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

* Cryptocurrency data source: Binance WebSocket API
* Tailwind CSS for styling
* Special thanks to all contributors.
