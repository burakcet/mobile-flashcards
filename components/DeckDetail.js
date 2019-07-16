import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import { purple, white, black } from '../utils/colors'
import { receiveDecks } from '../actions'
import { getDecks } from '../utils/api'
import { connect } from 'react-redux'
import TextButton from './TextButton'
import NewQuestCard from './NewQuestCard'

class DeckDetail extends Component {
  state =
    {
      opacity: new Animated.Value(0),
      width: new Animated.Value(0),
      height: new Animated.Value(0)
    }
  componentDidMount() {
    const { opacity, width, height } = this.state;

    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 1000,
    }).start();

    Animated.spring(width, { toValue: 300, Speed: 5 }).start()
    Animated.spring(height, { toValue: 300, speed: 5 }).start()

  }

  static navigationOptions = ({ navigation }) => 
  {
    return {
      title: 'Add Card'
    }
  }
  render() {
    let { title, questions } = this.props.navigation.state.params;
    const { opacity, width, height } = this.state
    return (
      <View style={styles.container}>
        <Animated.View style={{ opacity, height, width }}>
          <Text style={{ fontSize:30, alignSelf : 'center',textAlign:'center'}}>{title}</Text>
          <Text style={{ fontSize:20, alignSelf : 'center',textAlign:'center',color:'#A9A9A9'} }>{questions.length} cards</Text>
        </Animated.View>
        <TouchableOpacity
          style={ [styles.iosAddCardBtn, {alignSelf : 'stretch'} ] }
          onPress={() =>
            this.props.navigation.navigate('NewQuestCard', { title, questions })}
        >
          <Text style={[styles.submitBtnText, {color: black}]}>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            [styles.iosQuizBtn, {alignSelf : 'stretch'} ]
          }
          onPress={() =>
            this.props.navigation.navigate('Quiz', {
              title, questions
            })}>
          <Text style={styles.submitBtnText}>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create
  ({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: white
    },
    butCont: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'stretch',
      backgroundColor: white
    },
    iosQuizBtn: 
    {
      backgroundColor: black,
      borderColor: black,
      borderWidth: 0.5,
      padding: 10,
      borderRadius: 7,
      height: 50,
      margin: 10,
    },
    iosAddCardBtn: {
      backgroundColor: white,
      borderColor: black,
      borderWidth: 0.5,
      padding: 10,
      borderRadius: 7,
      height: 50,
      margin:10,
    },
    submitBtnText: 
    {
      color: white,
      fontSize: 22,
      textAlign: 'center',
      textAlign: "center"
    },
    center: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 30
    }
  });

function mapStateToProps(state) {
  return {
    decks: state,
  }
}
export default connect(mapStateToProps)(DeckDetail)

