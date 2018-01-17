import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  AsyncStorage
} from 'react-native'
import { Actions } from 'react-native-router-flux'

class UserForm extends Component {

  formatDate = (date) => {
    let format = 'YYYY/MM/DD'
    format = format.replace(/YYYY/g, date.getFullYear())
    format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2))
    format = format.replace(/DD/g, ('0' + date.getDate()).slice(-2))
    return format
  }

  createNewUser = () => {
    let users = this.props.users
    const newUser = {
      id: this.state.name,
      password: this.state.pass,
      image: this.state.image,
      createdAt: this.formatDate(new Date())
    }
    users.unshift(newUser)
    AsyncStorage.setItem('users', JSON.stringify(users))

    this.props.setUser()
    this.setState({
      name: '',
      pass: '',
      image: '',
    })
      
  }

  constructor (props) {
    super(props)
    this.state = {
      name: '',
      pass: '',
      image: '',
      users: this.props.users
    }
  }

  // createUser () {
  //   const newUser = {
  //     id: this.state.name,
  //     password: this.state.pass,
  //     image: this.state.image,
  //     createdAt: this.formatDate(new Date())
  //   }
  //   let users = [newUser]
  //   alert(JSON.stringify(users));
  //   AsyncStorage.setItem('users', JSON.stringify(users))
  // }

  render () {
    return (
      <View style={styles.formContainer}>
        <TextInput value={this.state.name} style={styles.textInput} placeholder='ユーザー名(2~20文字)'
          onChangeText={(text) => this.setState({ name: text })} />
        <TextInput value={this.state.pass} style={styles.textInput} placeholder='パスワード(4~20文字)'
          onChangeText={(text) => this.setState({ pass: text })} secureTextEntry={true} />
        <TextInput value={this.state.image} style={styles.textInput} placeholder='表示画像URL(8~250文字)'
          onChangeText={(text) => this.setState({ image: text })} />
        <Button title="登録" onPress={e => this.createNewUser(e)} />
      </View>
    )
  }
}

export default class UserManagement extends Component {

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
        if (v.id == user.id) users.splice(i, 1);
      })
      AsyncStorage.setItem('users', JSON.stringify(users))
      this.setState({
        users: users
      })
      
    } catch (error) {
      alert(error)
    }
  }

  constructor (props) {
    super()
    this.state = {
      users: [],
    }
  }

  componentWillMount () {
    this.setUserData()
  }

  render () {

    const userList = this.state.users.map((user, i) => (
      <View key={i} style={styles.userItem}>
        <View style={styles.userLeft}>
          <Image
            style={styles.userImage}
            source={{ uri: user.image }}
          />
          <Text style={styles.userName}>
            {user.id}
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
      <View>
        <UserForm users={this.state.users} setUser={e => this.setUserData(e)} />
        <View>
          <Text style={styles.listLabel}>
            ユーザー一覧
          </Text>
          {userList}
        </View>
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