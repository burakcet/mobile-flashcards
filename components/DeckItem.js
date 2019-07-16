import React, { Component } from 'react'
import { Text,View,FlatList ,TouchableOpacity,StyleSheet} from 'react-native'
import { white,gray } from '../utils/colors'
import { connect } from 'react-redux'

export default class DeckItem extends Component 
{
  render() {
    const{ title, questions } = this.props
    return (      
      <View style={styles.box}>
        <Text style={{fontSize : 25 , color:'#696969'}} > {title}</Text>
        <Text style={{fontSize : 20 , color:'#A9A9A9'}}> {questions.length} cards</Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  box: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'center',
    borderRadius: 10,
    margin:5,
    height:100,
    backgroundColor: gray,
  }
});


