import React, { Component } from 'react'
import { View, TouchableOpacity, TextInput,Text, StyleSheet, Platform } from 'react-native' 
import { purple,white,black } from '../utils/colors'
import { NavigationActions } from 'react-navigation'
import { createDeckTitle } from '../utils/api'
import { addDeck } from '../actions'
import { connect } from 'react-redux'

function SubmitBtn ({ onPress }) 
{
  return (
    <TouchableOpacity
    style={ styles.iosSubmitBtn
    }
    onPress={onPress}
  >
    <Text style={styles.submitBtnText}>SUBMIT</Text>
    </TouchableOpacity>
  );
}

class AddDeck extends Component 
{
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Add Deck'}
  }

  state=
   {
       text:''
   };

  submit = () => {
    
    if(this.state.text)
    {
      alert("You should enter deck name in order to create deck!")
    }
    else
    {
      // Save to "DB"
      createDeckTitle( this.state.text );

      // Update Redux
      const deck = {title : this.state.text,questions:[]}
      this.props.dispatch(addDeck(deck))

      this.setState(() => ({ text: '' }))

      // Navigate to deck
      this.toDeck(deck);
    }

    // Clear local notification
    //removeEntry(key)
  } 
  toDeck = (item) => 
  {
    this.props.navigation.navigate('DeckDetail', item);
    //this.props.navigation.dispatch(NavigationActions.back({key: 'AddEntry'}))
  }
  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.newDeckText}>What is the title of your new deck?</Text>
      <TextInput
        style={{margin: 15,height:40, paddingLeft:10, borderWidth:1,borderRadius:5, alignSelf : 'stretch'}}
        placeholder="Deck Title"
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
      />
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
  input: 
  {
    flex: 1,
    margin:30,
    backgroundColor : white
  },
  newDeckText: {
    color: black,
    fontSize: 50,
    margin:30,
    textAlign: 'center',
  },
row: {
  flexDirection: 'row',
  flex: 1,
  alignItems: "center"
},
iosSubmitBtn: {
  backgroundColor: black,
  borderColor: black,
  borderWidth: 0.5,
  padding: 10,
  borderRadius: 7,
  height: 50,
  margin: 20,
  alignSelf:'center',
},
AndroidSubmitBtn: {
  backgroundColor: purple,
  paddingRight: 30,
  height: 45,
  borderRadius: 2,
  alignSelf: "flex-end",
  justifyContent: "center",
  alignItems: "center"
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

export default connect(mapStateToProps)(AddDeck);
