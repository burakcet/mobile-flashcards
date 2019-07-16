export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const RECEIVE_DECK = 'RECEIVE_DECK'
export const ADD_QUESTION = 'ADD_QUESTION'

export function receiveDecks (decks) 
{
  return {
          type: RECEIVE_DECKS,
          decks,  
      }
}

export function receiveDeck (deck) 
{
  return {
          type: RECEIVE_DECK,
          deck,  
      }
}

export function addDeck (deck) {
  return {
    type: ADD_DECK,
    deck,
  }
} 
export function addQuestion (info) {
  return {
    type: ADD_QUESTION,
    info,
  }
} 