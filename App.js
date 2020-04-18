import React, { Component } from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import Constants from 'expo-constants'
import { purple } from './utils/colors'
import AppNavigation from './navigation/AppNavigation'
import { setLocalNotification } from './utils/notifications'

const store = createStore(
  reducer,
  applyMiddleware(thunk, logger)
)

function FlashcardStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default class App extends Component {
  componentDidMount() {
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={ store }>
        <FlashcardStatusBar
              backgroundColor={purple}
              barStyle="light-content"
            />
        <View style={styles.container}>
          <AppNavigation/>
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
