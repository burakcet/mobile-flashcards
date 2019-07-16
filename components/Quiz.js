import React, { Component } from 'react'
import { View, TouchableOpacity, TextInput, Text, StyleSheet, Platform } from 'react-native'
import { purple, white, black, green, red } from '../utils/colors'
import { NavigationActions } from 'react-navigation'
import TextButton from './TextButton'
import QuizHeader from './QuizHeader';
import { Ionicons } from "@expo/vector-icons";
import {
  getDailyReminderValue,
  clearLocalNotification,
  setLocalNotification
} from '../utils/notifapi'

function CorrectBtn({ onPress }) {
  return (
    <TouchableOpacity
      style={
        styles.iosCorrectBtn
      }
      onPress={onPress}
    >
      <Text style={styles.submitBtnText}>Correct</Text>
    </TouchableOpacity>
  );
}
function IncorrectBtn({ onPress }) {
  return (
    <TouchableOpacity
      style={
        styles.iosIncorrectBtn
      }
      onPress={onPress}
    >
      <Text style={styles.submitBtnText}>Incorrect</Text>
    </TouchableOpacity>
  );
}


export default class Quiz extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Quiz'
    }
  }

  state = {
    title: '',
    showAnswer: false,
    showScore: false,
    currentQuestion: 0,
    numOfCorrectAnswer: 0,
  };

  componentDidMount() {
    const { title, questions } = this.props.navigation.state.params;
  }

  correct = () => {
    this.setState((prevState) => {
      return {
        numOfCorrectAnswer: prevState.numOfCorrectAnswer + 1,
        showAnswer: false
      };
    });
    this.nextQuestOperations();
  }
  incorrect = () => {
    this.nextQuestOperations();
  }
  nextQuestOperations = () => {
    const { title, questions } = this.props.navigation.state.params;
    if (this.state.currentQuestion === questions.length - 1) {
      this.showScore();
    }
    else {
      this.setState((prevState) => {
        return {
          currentQuestion: prevState.currentQuestion + 1,
          showAnswer: false
        };
      });
    }
  }
  showAnswer = () => {
    this.setState((prevState) => {
      return { showAnswer: !prevState.showAnswer }
    })

  }
  showScore = () => {
    clearLocalNotification()
      .then(setLocalNotification).then(
        this.setState((prevState) => {
          return { showScore: !prevState.showScore }
        }))

  }
  restartQuiz = () => {
    this.setState
      ({
        showAnswer: false,
        showScore: false,
        currentQuestion: 0,
        numOfCorrectAnswer: 0,
      })

  }

  toDeck = () => {
    this.props.navigation.goBack()
  }
  render() {

    const { questions } = this.props.navigation.state.params;
    const { currentQuestion, numOfCorrectAnswer, showAnswer, ready, showScore } = this.state;
    if (questions.length === 0) {
      return (
        <View style={styles.center}>
          <Ionicons
            name={Platform.OS === "ios" ? "ios-sad" : "md-sad"}
            size={100} />
          <Text>No questions in this card!</Text>
        </View>
      );
    }


    return (
      <View style={styles.container}>
        {!showScore
          ?
          <View style={styles.container}>
            <View style={{ alignSelf: 'flex-start',justifyContent:'flex-start' }}>
            <QuizHeader style={{ alignSelf: 'flex-start',justifyContent:'flex-start' }} pageInfo={`${currentQuestion + 1} / ${questions.length}`} ></QuizHeader>
            </View>
            <View>
            <Text style={styles.newDeckText}>{showAnswer ? questions[currentQuestion].answer : questions[currentQuestion].question}</Text>
            <TextButton style={{ color: red, padding: 10, fontSize:20 ,fontWeight:'bold'}} onPress={this.showAnswer}>
              {!showAnswer ? 'Answer' : 'Question'}
            </TextButton>
            </View>
            <View style={{justifyContent:'flex-end', padding : 20 }}>
            <CorrectBtn style={{ flex: 1 }} onPress={this.correct} />
            <IncorrectBtn onPress={this.incorrect} />
            </View>
          </View>
          : <View style={styles.score}>
            <Text style={styles.newDeckText}>Correct Answers</Text>
            <Text style={styles.newDeckText}>{`${numOfCorrectAnswer} / ${questions.length}`}</Text>
            <TextButton style={{ color: red, padding: 10,fontSize:20 ,fontWeight:'bold' }} onPress={this.restartQuiz}>
              Restart Quiz
            </TextButton>
            <TextButton style={{ color: red, padding: 10, fontSize:20 ,fontWeight:'bold' }} onPress={this.toDeck}>
              Back to Deck
            </TextButton>
          </View>
        }

      </View>
    )
  }
}

const styles = StyleSheet.create
  ({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'stretch',
      backgroundColor: white
    },
    score: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: white
    },
    input:
    {
      flex: 1,
      padding: 20,
      backgroundColor: white
    },
    newDeckText: {
      color: black,
      fontSize: 50,
      textAlign: 'center',
    },
    row: {
      flexDirection: 'row',
      flex: 1,
      alignItems: "center"
    },
    column: {
      flexDirection: 'column',
      flex: 1,
      alignItems: "center"
    },
    iosCorrectBtn: {
      backgroundColor: green,
      padding: 10,
      borderRadius: 7,
      height: 45,
      margin: 10,
    },
    iosIncorrectBtn: {
      backgroundColor: red,
      padding: 10,
      borderRadius: 7,
      height: 45,
      margin: 10,
    },
    submitBtnText: {
      color: white,
      fontSize: 22,
      textAlign: 'center',
      textAlign: "center"
    },
    center: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    }
  });

