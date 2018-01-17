import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button,
  AsyncStorage
} from 'react-native'
import {
  Actions
} from 'react-native-router-flux'

export default class LogoutButton extends Component {

  constructor (props) {
    super (props)
    this.state = {
      name: '',
      password: ''
    }
  }

  Logout () {
    AsyncStorage.setItem('currentUser', JSON.stringify(''))
    Actions.login({ type: 'reset' })
  }

  render () {
    return (
      <View style={styles.buttonContainer}>
        <Button title="ログアウト" onPress={(e) => this.Logout(e)} />
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