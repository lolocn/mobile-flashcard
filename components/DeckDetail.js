import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import Deck from './Deck'
import TouchButton from './TouchButton'
import TextButton from './TextButton'
import { purple, white, red, lightPurp } from '../utils/colors'
import { handleRemoveDeck } from '../actions'
import { CommonActions } from '@react-navigation/native'

class DeckDetail extends Component {

  deleteDeck() {
    console.log(this.props)
    const { title, dispatch, navigation } = this.props

    dispatch(handleRemoveDeck(title))

    navigation.dispatch(
      CommonActions.goBack({
          key: 'DeckDetail',
      }))
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.deck !== undefined
  }
  render() {
    const { deck, navigation } = this.props
    return (
      <View style={styles.container}>
        <Deck title={deck.title}/>
        <TouchButton 
          btnStyle={{ backgroundColor: purple, borderColor: white }}
          onPress={() => {
            navigation.navigate('AddCard', { title: deck.title})
          }}
        >
          Add Card
        </TouchButton>
        <TouchButton
          btnStyle={{ backgroundColor: lightPurp, borderColor: white }}
          onPress={() => {
            navigation.navigate('Quiz', { title: deck.title})
          }}
        >Start Quiz</TouchButton>
        <TextButton
          txtStyle={{color: red}}
          onPress={() => this.deleteDeck()}
        >Delete Deck</TextButton>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    // backgroundColor: gray
  }
})

function mapStateToProps(state, { route }) {
  const { title } = route.params
  return {
      title,
      deck: state[title]
  }
}

export default connect(mapStateToProps)(DeckDetail)