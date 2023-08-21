# Blackjack Game Documentation

## Introduction
This document provides an overview of the Blackjack game implementation and how to run it. The code was design using [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) principles.

## Rules of Blackjack
Blackjack is a popular card game where players aim to achieve a hand value as close to 21 as possible without exceeding it. The player competes against a dealer, and the goal is to have a higher hand value than the dealer without busting (going over 21).

## Game Components
The Blackjack game consists of the following components:

-  **Card**: Represents a playing card with a suit and rank.
-  **Deck**: A collection of cards used in the game.
-  **Hand**: A player's or dealer's hand of cards.
-  **BlackjackGame**: The main game logic that handles dealing, player actions, and determining the winner.

## Running the Game
To run the Blackjack game, follow these steps:

1. Ensure you have [Node.js](https://nodejs.org/) installed on your system.
2. Open a terminal or command prompt.
3. Navigate to the root project directory.
4. Install the required dependencies: `npm install`
5.  Start the game: `npm start`
6. Follow the prompts in the terminal to play the game. You'll be presented with options to hit or stay in order to achieve the best hand value. 

## Running the API Server 
Start the API server: `npm run api`

## Available Endpoints 
- `GET /cards`: Returns all cards from the six decks (312 total).
- `GET /cards/:card_id`: Return a specific card by a given ID. 