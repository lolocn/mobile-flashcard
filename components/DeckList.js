import React, { Component } from 'react'
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/index'
import { purple } from '../utils/colors'
import Deck from './Deck'

class DeckList extends Component {
  componentDidMount() {
    this.props.handleInitialData()
  }

  render() {
    const { decks, navigation } = this.props
    return(
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Mobile Flashcards</Text>
        {
          Object.values(decks).map(deck => {
            return(
              <TouchableOpacity key={deck.title} onPress={() => {
                navigation.navigate('DeckDetail', {title: deck.title})
              }
              }>
                <Deck title={deck.title} />
              </TouchableOpacity>
          )})
        }
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16
  },
  title: {
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 16,
    color: purple
  }
})

const mapStateToProps = state => ({ decks: state })

export default connect(mapStateToProps, { handleInitialData })(DeckList)