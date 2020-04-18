import React, { Component } from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native'
import TouchButton from './TouchButton'
import { purple } from '../utils/colors'
import { connect } from 'react-redux'
import { handleAddCardToDeck } from '../actions'
import { CommonActions } from '@react-navigation/native'

class AddCard extends Component {

  state = {
    question: '',
    answer: ''
  }
  handleQuestionChange = question => {
    this.setState({question})
  }
  handleAnswerChange = answer => {
    this.setState({answer})
  }
  handleSubmit = () => {
    const { question, answer } = this.state
    const { title, dispatch, navigation } = this.props

    dispatch(handleAddCardToDeck(title, { question, answer }))

    navigation.dispatch(
      CommonActions.goBack({
          key: 'AddCard',
      }))
  }
  render() {
    const { question, answer } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.block}>
          <Text style={styles.title}>Add a question</Text>
        </View>
        <View style={[styles.block]}>
            <TextInput
              style={styles.input}
              value={question}
              onChangeText={this.handleQuestionChange}
              placeholder="Question"
              autoFocus={true}
              returnKeyType="next"
              // onSubmitEditing={() => this.answerTextInput.focus()}
              blurOnSubmit={false}
            />
          </View>
          <View style={[styles.block]}>
            <TextInput
              style={styles.input}
              value={answer}
              onChangeText={this.handleAnswerChange}
              placeholder="Answer"
              // ref={input => {
              //   this.answerTextInput = input;
              // }}
              returnKeyType="done"
              onSubmitEditing={this.handleSubmit}
            />
          </View>
          <TouchButton
            btnStyle={{ backgroundColor: purple, borderColor: '#fff' }}
            onPress={this.handleSubmit}
            disabled={this.state.question === '' || this.state.answer === ''}
          >
            Submit
          </TouchButton>
          <View style={{ height: '30%' }} />
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
    paddingBottom: 16,
    justifyContent: 'space-around'
  },
  block: {
    marginBottom: 20
  },
  title: {
    textAlign: 'center',
    fontSize: 32
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    fontSize: 20,
    height: 40
  }
})

function mapStateToProps(state, { route }) {
  const { title } = route.params
  return {
      title
  }
}

export default connect(mapStateToProps)(AddCard)