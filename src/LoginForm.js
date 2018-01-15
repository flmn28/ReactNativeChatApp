import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button
} from 'react-native'
// import {
//   StackNavigator,
// } from 'react-navigation'
import { Actions } from 'react-native-router-flux'

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
      <View style={styles.formContainer}>
        <TextInput value={this.state.id} style={styles.textInput} placeholder='ユーザーID'
          onChangeText={ (text) => this.setState({id: text}) }  />
        <TextInput value={this.state.pass} style={styles.textInput} placeholder='パスワード'
          onChangeText={(text) => this.setState({ pass: text })} secureTextEntry={true} />
        <Button title="ログイン" onPress={() => Actions.tabbar({type: 'reset'})} />
        {/* <Button title="ログイン" onPress={() => this.props.navigation.navigate('Tab')} /> */}
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
  textInput: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#aaa',
    backgroundColor: '#fff',
    marginBottom: 10
  }
})