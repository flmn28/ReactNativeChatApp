import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native'
import {
  Actions
} from 'react-native-router-flux'

export default class LoginForm extends Component {

  constructor (props) {
    super (props)
    this.state = {
      id: '',
      pass: ''
    }
  }

  render () {
    return (
      <View style={styles.buttonContainer}>
        <Button title="ログアウト" onPress={ () => Actions.login({type: 'reset'}) } />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
})