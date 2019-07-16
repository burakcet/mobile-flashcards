import React from 'react';
import { View,Platform,StatusBar,Text } from 'react-native';
import { createStore } from 'redux'
import { connect } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import AddDeck from './components/AddDeck'
import { decks } from './reducers'
import Decks from './components/Decks'
import NewQuestCard from './components/NewQuestCard'
import Quiz from './components/Quiz'
import DeckDetail from './components/DeckDetail'
import { purple, white } from './utils/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { createStackNavigator,createBottomTabNavigator, createMaterialTopTabNavigator, createAppContainer } from 'react-navigation'
import { Constants } from 'expo'
import { setLocalNotification } from './utils/notifapi'

function MFCStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
} 
const RouteConfigs = 
{
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    },
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    },
  },
};

const TabNavigatorConfig = 
{
  navigationOptions: {
  header: null
  },
  tabBarOptions: {
  activeTintColor: Platform.OS === "ios" ? purple : white,
  style: {
  height: 56,
  backgroundColor: Platform.OS === "ios" ? white : purple,
  shadowColor: "rgba(0, 0, 0, 0.24)",
  shadowOffset: {
  width: 0,
  height: 3
  },
  shadowRadius: 6,
  shadowOpacity: 1
  }
  }
};
  
const Tabs =
  Platform.OS === "ios"
  ? createBottomTabNavigator(RouteConfigs, TabNavigatorConfig)
  : createMaterialTopTabNavigator(RouteConfigs, TabNavigatorConfig);

const TabsContainer = createAppContainer(Tabs)

const MainNavigator = createAppContainer(createStackNavigator({
  home: {
    screen: Tabs,
    navigationOptions: {
      title: '',
    },
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: white,
      title: 'Deck',
      headerStyle: {
        backgroundColor: purple,
      },
    }),
  },
  NewQuestCard: {
    screen: NewQuestCard,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: white,
      title: 'Add Question',
      headerStyle: {
        backgroundColor: purple,
      },
    }),
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: white,
      title: 'Quiz',
      headerStyle: {
        backgroundColor: purple,
      },
    }),
  },
}));

export default class App extends React.Component 
{
  store = createStore(reducer);

  componentDidMount()
  {
    setLocalNotification();
  }
  render() {
    return (
      <Provider store={createStore(reducer)}>
      <View style={{flex: 1}} >
        <MFCStatusBar backgroundColor={purple} barStyle="light-content" />
        <MainNavigator/>
      </View>
      </Provider>
    )
  }
}



