# Wrost Movies GRA (Golden Raspberry Awards)

Wrost Movies GRA is a web application that provides information about the worst movies ever nominated for the Golden Raspberry Awards. It allows users to explore and filter through a list of movies based on different criteria.

\*\*NOTE: This project is hosted at: <a href="https://main--resplendent-belekoy-c1d83e.netlify.app/"> NETLIFY - Wrost Movie G.R.A</a>

## Features

- View a list of worst movies nominated for the Golden Raspberry Awards.
- Filter movies by year and winner status.
- Pagination support for easy navigation through the list of movies.
- Clear filters option to reset the applied filters.
- Responsive design for optimal viewing experience across different devices.

## Technologies Used

- React.js: Frontend JavaScript library for building user interfaces.
- React Bootstrap: UI framework for React applications.
- Axios: Promise-based HTTP client for making API requests.
- Jest: JavaScript testing framework for unit testing React components.
- Cypress: JavaScript testing E2E for React view testing.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/carlosgui/wrost-movies-gra.git
   ```

2. Navigate into the project directory:

   ```bash
   cd wrost-movies-gra
   ```

3. Install dependencies:

   ```bash
   yarn
   ```

   NOTE: Before install dependencies be sure that you are using node 21.x.x this project was create in this version of node.

4. Start the development server:

   ```bash
   yarn dev
   ```

5. Open your browser and visit `http://localhost:3000` to view the application.

## Testing elements

### cypress

- To run all cypress test at this project you need to run the project and after that run the command to lauch cypress:

  ```bash
  yarn dev
  yarn run cy:open
  ```

### Jest

- To run all jest tests you can simple run this command

  ```bash
  yarn test
  ```

## Usage

- Once acessing the application, you'll see all four table shouling the information about the movies.
- On dashboard page is possible to search at the last table, you can search the winners for a given year.
- You can navigate for a movie list page by the menu buttom at the top of the nav bar.
- Once acessing the movie list page you can see all movies registred at our data base.
- In this page you can fill free to search by year and see if that movie win or not in that year.
- Last but not lest, you can clear all filters and navigate through different pages using the pagination controls.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

- Fork the repository.
- Create a new branch (git checkout -b feature/your-feature-name).
- Make your changes.
- Commit your changes (git commit -am 'Add new feature').
- Push to the branch (git push origin feature/your-feature-name).
- Submit a pull request.

### License

This project is licensed under the MIT License.
