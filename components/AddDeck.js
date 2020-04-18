import React, { Component } from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native'
import { purple, grey, white } from '../utils/colors'
import TouchButton from './TouchButton'
import { connect } from 'react-redux'
import { handleAddDeck } from '../actions'
import { CommonActions } from '@react-navigation/native'

class AddDeck extends Component {
  state = {
    text: ''
  }
  handleChange = text => {
    this.setState({ text })
  }
  handleSubmit = () => {
    const { text } = this.state
    const { dispatch } = this.props

    dispatch(handleAddDeck(text))

    this.props.navigation.dispatch(
      CommonActions.goBack({
          key: 'AddDeck',
      }))
      
    this.setState({ text: '' })
  }
  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.title}>What is the new title of your new deck?</Text>
        <TextInput
            style={styles.input}
            value={this.state.text}
            onChangeText={this.handleChange}
            placeholder="Deck Name"
            autoFocus={true}
            returnKeyType="done"
            // onSubmitEditing={this.handleSubmit}
          />
        <TouchButton
          btnStyle={{ backgroundColor: purple, borderColor: white }}
          txtStyle={{ color: white}}
          onPress={this.handleSubmit}
          disabled={this.state.text === ''}
        >
          Create Deck
        </TouchButton>
      </View>
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
  },
  input: {
    borderWidth: 1,
    borderColor: grey,
    backgroundColor: white,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    fontSize: 20,
    height: 40,
    marginBottom: 20
  }
})

export default connect()(AddDeck)