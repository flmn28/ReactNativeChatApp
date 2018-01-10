import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image
} from 'react-native'
import { Actions } from 'react-native-router-flux'

class UserForm extends Component {

  constructor (props) {
    super(props)
    this.state = {
      name: '',
      pass: '',
      image: ''
    }
  }

  render () {
    return (
      <View style={styles.formContainer}>
        <TextInput value={this.state.name} style={styles.textInput} placeholder='ユーザー名(2~20文字)'
          onChangeText={(text) => this.setState({ name: text })} />
        <TextInput value={this.state.pass} style={styles.textInput} placeholder='パスワード(4~20文字)'
          onChangeText={(text) => this.setState({ pass: text })} secureTextEntry={true} />
        <TextInput value={this.state.pass} style={styles.textInput} placeholder='表示画像URL(8~250文字)'
          onChangeText={(text) => this.setState({ image: text })} />
        <Button title="登録" onPress={Actions.chatroom} />
      </View>
    )
  }
}

export default class UserManagement extends Component {

  render () {
    const users = [
      {
        name: 'user1',
        pass: 'password1',
        image: 'https://facebook.github.io/react-native/docs/assets/favicon.png',
        createdAt: new Date(2018, 1, 5, 15, 0, 0)
      },
      {
        name: 'user2',
        pass: 'password2',
        image: 'https://facebook.github.io/react-native/docs/assets/favicon.png',
        createdAt: new Date(2018, 1, 5, 15, 30, 0)
      },
      {
        name: 'user3',
        pass: 'password3',
        image: 'https://facebook.github.io/react-native/docs/assets/favicon.png',
        createdAt: new Date(2018, 1, 5, 16, 0, 0)
      }
    ]

    const sorted_users = users.sort((user1, user2) => {
      if (user1.createdAt < user2.createdAt) return 1
      if (user1.createdAt > user2.createdAt) return -1
      return 0
    })

    formatDate = (date) => {
      let format = 'YYYY/MM/DD'
      format = format.replace(/YYYY/g, date.getFullYear())
      format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2))
      format = format.replace(/DD/g, ('0' + date.getDate()).slice(-2))
      return format
    }

    const userList = sorted_users.map((e, i) => (
      <View key={i + 1} style={styles.userItem}>
        <View style={styles.userLeft}>
          <Image
            style={styles.userImage}
            source={{ uri: e.image }}
          />
          <Text style={styles.userName}>
            {e.name}
          </Text>
        </View>
        <View style={styles.userRight}>
          <Text style={styles.userCreatedAt}>
            {formatDate(e.createdAt)}
          </Text>
          <View style={styles.userDeleteBtn}>
            <Button title="削除" onPress={e => {return}} />
          </View>
        </View>
      </View>
    ))

    return (
      <View>
        <UserForm />
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