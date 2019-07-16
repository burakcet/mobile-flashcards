import React, { Component } from 'react'
import { Text,View,FlatList ,TouchableOpacity,Animated,StyleSheet} from 'react-native'
import { purple,white } from '../utils/colors'
import { receiveDecks } from '../actions'
import { getDecks } from '../utils/api'
import { connect } from 'react-redux'
import DeckDetail from './DeckDetail';
import DeckItem from './DeckItem';

class Decks extends Component 
{
  state={
    readyToLoad : 'false',
  }

  componentDidMount () 
  {
    const {dispatch} = this.props;
        getDecks()
        .then(decks => dispatch(receiveDecks(decks)))
        .then(() => this.setState(() => ({ready: true})));
  }
  
 

  renderItem = ({item}) => 
  (
    <View style={[styles.container, { opacity: this.state.opacity }]} >
        <TouchableOpacity  onPress={() =>
              this.props.navigation.navigate('DeckDetail', item)
            }>
              <DeckItem title={item.title} questions={item.questions}>
              </DeckItem>
        </TouchableOpacity>
    </View>
);
  render() {
    const{readyToLoad} = this.state
    return (
      <View>
      {readyToLoad ?       
      <FlatList
              data={Object.values(this.props.decks).sort((a, b) => a.title > b.title)}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => index}/>
              : null }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent:'center',
  }
});

function mapStateToProps(state) {
  return {
      decks: state,
  };
}
export default connect(mapStateToProps)(Decks)

