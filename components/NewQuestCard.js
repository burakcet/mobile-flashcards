import React, { Component } from 'react'
import { View, TouchableOpacity, TextInput, Text, StyleSheet, Platform } from 'react-native'
import { white, black } from '../utils/colors'
import { NavigationActions } from 'react-navigation'
import { addCardToDeck } from '../utils/api'
import { connect } from 'react-redux'
import { addQuestion } from '../actions'

function SubmitBtn({ onPress }) {
  return (
    <TouchableOpacity
      style={ 
        styles.iosSubmitBtn
      }
      onPress={onPress}
    >
      <Text style={styles.submitBtnText}>SUBMIT</Text>
    </TouchableOpacity>
  );
}


class NewQuestCard extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Add Card'
    }
  }

  state =
    {
      question: '',
      answer: '',
      title: '',
      ready: false,
    };

  componentDidMount() {
    const { title, questions } = this.props.navigation.state.params;
    this.setState({ title })
    this.setState({ ready: true })
  }

  submit = () => 
  {
    const question = this.state.question
    const answer = this.state.answer
    if(question === '' || answer === '')
    {
      alert("Question and answer should not be empty!")
    }
    else
    {
      const title = this.state.title
      //Update DB
      addCardToDeck
        (
          title,
          question,
          answer
        )
      // Update Redux
      const { questions } = this.props.navigation.state.params;
      const info = { title, questions, question, answer };
      this.props.dispatch(addQuestion(info))
      this.props.navigation.goBack();
    }
    // Clear local notification
    //removeEntry(key)
  }
  toDeck = () => {
    //this.props.navigation.dispatch(NavigationActions.back({key: 'AddEntry'}))
  }
  render() {
    const { title, questions } = this.props.navigation.state.params;
    const { ready } = this.state
    return (
      <View style={styles.container}>
            <View>
            <TextInput
              style={{margin: 15,height:40, paddingLeft:10, borderWidth:1,borderRadius:5, alignSelf : 'stretch'}}
              placeholder="What is a question?"
              onChangeText={(text) => this.setState({ question: text })}
              value={this.state.question}
            />
            <TextInput
             style={{margin: 15,height:40, paddingLeft:10, borderWidth:1,borderRadius:5, alignSelf : 'stretch'}}
              placeholder="What is a answer?"
              onChangeText={(text) => this.setState({ answer: text })}
              value={this.state.answer}
            />
            </View>
            <SubmitBtn onPress={this.submit} />
      </View>
    )
  }
}

const styles = StyleSheet.create
  ({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      backgroundColor: white
    },
    iosSubmitBtn:
    {
      backgroundColor: black,
      borderColor: black,
      borderWidth: 0.5,
      padding: 10,
      borderRadius: 7,
      height: 50,
      margin: 20,
      alignSelf:'center',
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
      marginRight: 30
    }
  });

function mapStateToProps(state) {
  return {
    decks: state,
  };
}

export default connect(mapStateToProps)(NewQuestCard);
