import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  AsyncStorage
} from 'react-native'
import { Actions } from 'react-native-router-flux'

class UserForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      password: '',
      image: '',
      users: this.props.users,
      validateMessages: []
    }
  }

  formatDate = (date) => {
    let format = 'YYYY/MM/DD'
    format = format.replace(/YYYY/g, date.getFullYear())
    format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2))
    format = format.replace(/DD/g, ('0' + date.getDate()).slice(-2))
    return format
  }

  createNewUser = () => {
    if (this.validationCheck()) return

    let users = this.props.users
    const newUser = {
      name: this.state.name,
      password: this.state.password,
      image: this.state.image,
      createdAt: this.formatDate(new Date())
    }
    users.unshift(newUser)
    AsyncStorage.setItem('users', JSON.stringify(users))

    this.props.setUser()
    this.setState({
      name: '',
      password: '',
      image: '',
    })
  }

  validationCheck =  () => {
    let messages = []
    if (this.state.name.length < 2) messages.push('ユーザー名は2文字以上入力してください')
    if (this.state.name.length > 20) messages.push('ユーザー名は20文字以内で入力してください')
    if (this.state.password.length < 4) messages.push('パスワードは4文字以上入力してください')
    if (this.state.password.length > 20) messages.push('パスワードは20文字以内で入力してください')
    if (this.state.image.length < 8) messages.push('表示画像URLは8文字以上入力してください')
    if (this.state.image.length > 250) messages.push('表示画像URLは250文字以内で入力してください')
    this.setState({
      validateMessages: messages
    })
    return messages.length > 0
  }

  render () {
    const validateMessages = this.state.validateMessages.map((message, i) => (
      <Text key={i + 1} style={styles.validateMessage}>
        {message}
      </Text>
    ))

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.formContainer}>
          {validateMessages}
          <TextInput value={this.state.name} style={styles.textInput} placeholder='ユーザー名(2~20文字)'
            onChangeText={(text) => this.setState({ name: text })} />
          <TextInput value={this.state.password} style={styles.textInput} placeholder='パスワード(4~20文字)'
            onChangeText={(text) => this.setState({ password: text })} secureTextEntry={true} />
          <TextInput value={this.state.image} style={styles.textInput} placeholder='表示画像URL(8~250文字)'
            onChangeText={(text) => this.setState({ image: text })} />
          <Button title="登録" onPress={e => this.createNewUser(e)} />
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

export default class UserManagement extends Component {

  constructor(props) {
    super()
    this.state = {
      users: [],
    }
  }

  componentWillMount() {
    this.setUserData()
  }

  setUserData = async() => {
    try {
      let data = await AsyncStorage.getItem('users')
      let users = JSON.parse(data)
      this.setState ({
        users: users
      })
    } catch (error) {
      alert(error)
    }
  }

  deleteUser = async(e, user) => {
    try {
      let data = await AsyncStorage.getItem('users')
      let users = JSON.parse(data)
      users.some((v, i) => {
        if (v.name == user.name) users.splice(i, 1);
      })
      AsyncStorage.setItem('users', JSON.stringify(users))
      this.setState({
        users: users
      })
      
    } catch (error) {
      alert(error)
    }
  }

  render () {

    const userList = this.state.users.map((user, i) => (
      <View key={i + 1} style={styles.userItem}>
        <View style={styles.userLeft}>
          <Image
            style={styles.userImage}
            source={{ uri: user.image }}
          />
          <Text style={styles.userName}>
            {user.name}
          </Text>
        </View>
        <View style={styles.userRight}>
          <Text style={styles.userCreatedAt}>
            {user.createdAt}
          </Text>
          <View style={styles.userDeleteBtn}>
            <Button title="削除" onPress={e => this.deleteUser(e, user)} />
          </View>
        </View>
      </View>
    ))

    return (
      <View style={{ flex: 1 }}>
        <UserForm users={this.state.users} setUser={e => this.setUserData(e)} />
        <Text style={styles.listLabel}>
          ユーザー一覧
        </Text>
        <ScrollView>
          {userList}
         </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  formContainer: {
    marginTop: 25,
    padding: 20,
    paddingTop: 30,
  },
  validateMessage: {
    color: '#f00'
  },
  textInput: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#aaa',
    backgroundColor: '#fff',
    marginBottom: 10
  },
  listLabel: {
    marginLeft: 20
  },
  userItem: {
    flexDirection: 'row',
    padding: 10,
    paddingLeft: 20,
  },
  userLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  userImage: {
    width: 40,
    height: 40
  },
  userName: {
    marginLeft: 15
  },
  userRight: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  userCreatedAt: {
    flex: 1
  },
  userDeleteBtn: {
    flex: 1
  }
});