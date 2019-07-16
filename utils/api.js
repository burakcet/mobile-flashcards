import { AsyncStorage} from 'react-native'
export const MFC_STORAGE_KEY = 'MobileFlashCards:mfcstoragekey'

let initData = 
{
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
};

export function initialData() 
{
  AsyncStorage.setItem(MFC_STORAGE_KEY, JSON.stringify(initData));
  return initData;
}

export function getDecks()
{
  return AsyncStorage.getItem(MFC_STORAGE_KEY)
       .then((decks) => {
         return decks === null ? initialData()
           : JSON.parse(decks)
        });
}

export function getDeck(title)
{
  return AsyncStorage.getItem(MFC_STORAGE_KEY)
       .then((decks) => {
            return JSON.parse(decks)[title]
        }) 
}

export function createDeckTitle(title)
{
  return AsyncStorage.mergeItem(MFC_STORAGE_KEY, JSON.stringify({
    [title]: {
      title,
      questions : []
    }
  }))
}
export function addCardToDeck(title, question,answer)
{
  return AsyncStorage.getItem(MFC_STORAGE_KEY, (err, result) => {
    let allDecks = JSON.parse(result);

    let newQuestions = JSON.parse(JSON.stringify(allDecks[title].questions));
    newQuestions[newQuestions.length] = {question,answer};

    const value = JSON.stringify({
        [title]: {title, questions: newQuestions},
    });

    AsyncStorage.mergeItem(MFC_STORAGE_KEY, value);
});

}