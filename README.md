# React Weather Block

This is an **experimental** decoupled module for Drupal that I am developing as a learning experience. Not intended for use in the real world.

## Requirements

- Drupal 8.x
- Node.js 13.10.x or higher
- npm 6.14.x or higher
- An Open Weather API key

### Requirement resources

- [Learn how to install Node.js and npm](https://www.npmjs.com/get-npm).
- [Get an Open Weather API key by creating a free account](https://home.openweathermap.org/users/sign_up).

## Installation

- Download the module to the `modules/custom` folder of your Drupal region
- On the command line, cd into `react_weather_block`
- Run `npm install`
- Run `npm dev` to build your app for production
- In your Drupal _admin > block > structure_, place the **React Weather Block** into a theme region
- In your block configuration provide:
  - Your Open Weather API key in the block configuration.
  - The zip code of the city for which you would like to display weather data (defaults to Boston, MA if not provided).
