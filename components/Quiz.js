import React, { Component, Fragment } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { connect } from 'react-redux'
import TouchButton from './TouchButton'
import TextButton from './TextButton'
import { purple, white, green, red, orange, gray } from '../utils/colors'
import { CommonActions } from '@react-navigation/native'
import { clearLocalNotification, setLocalNotification} from '../utils/notifications'

class Quiz extends Component {
  state = {
    index: 0,
    showAnswer: false,
    score: 0
  }
  toggleShowAnswer() {
    const { showAnswer } = this.state
    this.setState({
      showAnswer: !showAnswer
    })
  }
  handleCorrect() {
    let {index, score} = this.state
    score += 1
    index += 1
    this.setState({
      index,
      score,
      showAnswer: false,
    })
  }
  handleIncorrect() {
    let {index} = this.state
    index += 1
    this.setState({
      index,
      showAnswer: false,
    })
  }
  restartQuiz() {
    this.setState({
      index: 0,
      showAnswer: false,
      score: 0
    })
  }
  backToDeck() {
    const { navigation } = this.props
    navigation.dispatch(
      CommonActions.goBack({
          key: 'Quiz',
      }))
  }
  componentDidMount() {
    clearLocalNotification().then(setLocalNotification)
  }
  render() {
    const { index, showAnswer, score } = this.state
    const { deck } = this.props
    const questions = deck.questions
    console.log(index)
    if (!questions.length) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>You cannot take a quiz because there are no cards in the deck.</Text>
          <View style={{ height: '30%' }} />
        </View>
      )
    } else if (index < questions.length){
      return (
        <View style={styles.container}>
          <View style={styles.block}>
            <Text style={[styles.title, {color: purple}]}>Question {index + 1} / {questions.length}</Text>
            <Text style={styles.title}>{questions[index].question}</Text>
          </View>
          <View style={styles.block}>
            {
              showAnswer 
              ? 
                <Fragment>
                  <Text style={[styles.title, {color: purple}]}>Answer</Text>
                  <Text style={styles.title}>{questions[index].answer}</Text>
                  <View style={styles.row}>
                    <TouchButton
                      btnStyle={{ backgroundColor: green, borderColor: white }}
                      onPress={() => this.handleCorrect()}
                    >
                      Correct
                    </TouchButton>
                    <TouchButton
                      btnStyle={{ backgroundColor: red, borderColor: white }}
                      onPress={() => this.handleIncorrect()}
                    >
                      Incorrect
                    </TouchButton>
                  </View>
                </Fragment>
              : <TextButton
                  txtStyle={{ color: orange }}
                  onPress={() => this.toggleShowAnswer()}
                >
                  Show Answer
                </TextButton>
            }
          </View>
        </View>
      )
    } else if (index === questions.length) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Score: {(score / questions.length).toFixed(3) * 100}%</Text>
          <View style={styles.row}>
            <TouchButton
                btnStyle={{ backgroundColor: purple, borderColor: white }}
                onPress={() => this.restartQuiz()}
              >
                Restart Quiz
              </TouchButton>
              <TouchButton
                btnStyle={{ backgroundColor: gray, borderColor: white }}
                onPress={() => this.backToDeck()}
              >
                Back to Deck
              </TouchButton>

          </View>
        </View>
      )
    }
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
    marginBottom: 20,
    height: '30%'
  },
  title: {
    textAlign: 'center',
    fontSize: 32
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
}
})

function mapStateToProps(state, { route }) {
  const { title } = route.params
  return {
      title,
      deck: state[title]
  }
}

export default connect(mapStateToProps)(Quiz)