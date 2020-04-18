import React, { Component } from 'react'
import { Text, Platform } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import DeckList from '../components/DeckList'
import AddDeck from '../components/AddDeck'
import DeckDetail from '../components/DeckDetail'
import Quiz from '../components/Quiz'
import AddCard from '../components/AddCard'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { purple, gray, white } from '../utils/colors'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

function Tabs() {
  return (
    <Tab.Navigator 
      tabBarOptions={{
        activeTintColor: purple,
        inactiveTintColor: gray,
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          if (route.name === 'Decks') {
            return <Ionicons name='ios-bookmarks' size={30} color={color}/>
          } else if (route.name === 'AddDeck') {
            return <FontAwesome name='plus-square' size={30} color={color} />
          } 
        },
        tabBarLabel: () => {
          if (route.name === 'Decks') {
            return <Text>Decks</Text>
          } else if (route.name === 'AddDeck') {
            return <Text>Add Decks</Text>
          }
        },
      })}
    >
      <Tab.Screen name='Decks' component={DeckList}/>
      <Tab.Screen name='AddDeck' component={AddDeck}/>
    </Tab.Navigator>
  )
}

class AppNavigation extends Component {

  render() {
    return(
      <NavigationContainer>
        <Stack.Navigator 
          screenOptions={{
            headerStyle: {
              backgroundColor: purple
            },
            headerTitleStyle: {
              color: white
            },
            headerBackTitleStyle: {
              color: white
            },
          }}>
          <Stack.Screen name='Home'>
            {Tabs}
          </Stack.Screen>
          <Stack.Screen name='DeckDetail' component={DeckDetail} 
            options={({ route }) => {
              console.log(route.params.title)
              return {
                title: route && route.params.title ? route.params.title : ''
              }
            }}></Stack.Screen>
          <Stack.Screen name='AddCard' component={AddCard} 
            options={() => {
              return {
                title: 'Add Card'
              }
            }}></Stack.Screen>
          <Stack.Screen name='Quiz' component={Quiz} 
            options={() => {
              return {
                title: 'Quiz'
              }
            }}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

export default AppNavigation