import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  AsyncStorage
} from 'react-native'
import { Actions } from 'react-native-router-flux'

export default class LoginForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      password: '',
      users: [],
      validationMessage: ''
    }
  }

  componentWillMount() {
    this.setUserData()
    this.currentUserCheck()
  }

  setUserData = async () => {
    try {
      let data = await AsyncStorage.getItem('users')
      let users = JSON.parse(data)
      if (users !== null && users.length > 0) {
        this.setState({
          users: users
        })
      } else {
        this.createInitialUser()
      }
    } catch (error) {
      alert(error)
    }
  }

  createInitialUser () {
    let initialUser = [
      {
        name: 'Admin',
        password: 'password',
        image: 'http://img1.ak.crunchyroll.com/i/spire1/95883bc9bf1d7b12d572e8dd62e5ce711468942321_full.jpg',
        createdAt: this.formatDate(new Date())
      }
    ]
    AsyncStorage.setItem('users', JSON.stringify(initialUser))
    this.setState({
      users: initialUser
    })
  }

  formatDate = (date) => {
    let format = 'YYYY/MM/DD'
    format = format.replace(/YYYY/g, date.getFullYear())
    format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2))
    format = format.replace(/DD/g, ('0' + date.getDate()).slice(-2))
    return format
  }

  currentUserCheck = async () => {
    try {
      let data = await AsyncStorage.getItem('currentUser')
      let user = JSON.parse(data)
      if (user !== null && user.length !== 0 ) {
        Actions.tabbar({ type: 'reset' }) 
      }
    } catch (error) {
      alert(error)
    }
  }

  Login () {
    let user = ''
    this.state.users.forEach((v, i) => {
      if (v.name === this.state.name) user = v
    })

    if (this.loginCheck(user)) return

    AsyncStorage.setItem('currentUser', JSON.stringify(user))
    Actions.tabbar({ type: 'reset' })
  }

  loginCheck = (user) => {
    if (user === '') {
      this.setState({
        validationMessage: 'ユーザーが存在しません'
      })
      return true
    }

    if (this.state.password !== user.password) {
      this.setState({
        validationMessage: 'パスワードが間違っています'
      })
      return true
    }

    return false
  }

  render () {

    return (
      <View style={styles.formContainer}>
        <Text style={styles.validationMessage}>
          {this.state.validationMessage}
        </Text>
        <TextInput value={this.state.name} style={styles.textInput} placeholder='ユーザー名'
          onChangeText={(text) => this.setState({ name: text })} />
        <TextInput value={this.state.password} style={styles.textInput} placeholder='パスワード'
          onChangeText={(text) => this.setState({ password: text })} secureTextEntry={true} />
        <Button title="ログイン" onPress={(e) => this.Login(e)} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  formContainer: {
    margin: 30,
    marginTop: 200,
    padding: 20,
    paddingTop: 30,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#aaa'
  },
  validationMessage: {
    color: '#f00',
    marginBottom: 10
  },
  textInput: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#aaa',
    backgroundColor: '#fff',
    marginBottom: 10
  }
})