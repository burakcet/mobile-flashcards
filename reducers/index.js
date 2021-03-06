import { RECEIVE_DECKS, ADD_DECK, RECEIVE_DECK,ADD_QUESTION } from '../actions'

function decks (state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS :
      return{
        ...state,
        ...action.decks,
    }  
    case RECEIVE_DECK :
      return{
        ...state,
        ...action.deck,
    } 
    case ADD_DECK :
        return {
            ...state,
            [action.deck.title] : 
            {title : action.deck.title,
               questions : action.deck.questions
            },
        }
   case ADD_QUESTION :
        const {title, questions, question, answer} = action.info;
        const lastVersQuestions = JSON.parse(JSON.stringify(questions))
                                  .concat([ { question, answer } ]);
        return {
            ...state,
            [title]: 
            {...state[title],
               questions: lastVersQuestions
            },
        }
    default :
      return state
  }
}

export default decks 