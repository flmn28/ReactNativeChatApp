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

class ChatForm extends Component {

  constructor (props) {
    super(props),
    this.state = {
      text: ''
    }
  }

  render () {
    return (
      <View style={styles.formContainer}>
        <View style={styles.formLeft}>
          <Image
            style={styles.userImage}
            source={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }}
          />
          <Text>
            SampleUser
           </Text>
        </View>
        <View style={styles.formRight}>
          <View>
          <TextInput style={styles.textInput} value={this.state.text} 
              multiline={true} onChangeText={text => this.setState({text})} />
          </View>
          <View style={styles.buttonContainer}>
            <Button title='投稿' onPress={e => {return}} />
          </View>
        </View>
      </View>
    )
  }
}

export default class ChatRoom extends Component {

  render () {
    const posts = [
      {
        name: 'user1',
        body: 'メッセージ1メッセージ1メッセージ1メッセージ1メッセージ1メッセージ1メッセージ1メッセージ1メッセージ1',
        userImage: 'https://facebook.github.io/react-native/docs/assets/favicon.png',
        createdAt: new Date(2018, 1, 7, 10, 0, 0)
      },
      {
        name: 'user2',
        body: 'メッセージ2メッセージ2メッセージ2メッセージ2メッセージ2メッセージ2メッセージ2メッセージ2メッセージ2メッセージ2メッセージ2',
        userImage: 'https://facebook.github.io/react-native/docs/assets/favicon.png',
        createdAt: new Date(2018, 1, 7, 10, 30, 0)
      },
      {
        name: 'user3',
        body: 'メッセージ3メッセージ3メッセージ3メッセージ3メッセージ3メッセージ3',
        userImage: 'https://facebook.github.io/react-native/docs/assets/favicon.png',
        createdAt: new Date(2018, 1, 7, 11, 0, 0)
      }
    ]

    const sorted_posts = posts.sort((post1, post2) => {
      if (post1.createdAt < post2.createdAt) return 1
      if (post1.createdAt > post2.createdAt) return -1
      return 0
    })

    formatDate = (date) => {
      let format = 'YYYY/MM/DD hh:mm'
      format = format.replace(/YYYY/g, date.getFullYear())
      format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2))
      format = format.replace(/DD/g, ('0' + date.getDate()).slice(-2))
      format = format.replace(/hh/g, ('0' + date.getHours()).slice(-2))
      format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2))
      return format
    }

    const messages = sorted_posts.map((e, i) => (
      <View key={i + 1} style={styles.messageItem}>
        <View style={styles.messageLeft}>
          <Image
            style={styles.userImage}
            source={{ uri: e.userImage }}
          />
        </View>
        <View style={styles.messageRight}>
          <Text>
            {e.name}  {formatDate(e.createdAt)}
          </Text>
          <Text>
            {e.body}
          </Text>
        </View>
      </View>
    ))

    return (
      <View>
        <ChatForm />
        <View>
          {messages}
        </View>
        <Button title="トップへ" onPress={Actions.login} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  formContainer: {
    flexDirection: 'row',
    marginTop: 25,
    padding: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '#aaa',
  },
  formLeft: {
    flex: 1,
    paddingRight: 5
  },
  userImage: {
    width: 50,
    height: 50
  },
  formRight: {
    flex: 4,
  },
  buttonContainer: {
    alignItems: 'flex-end'
  },
  textInput: {
    height: 70,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#aaa',
    backgroundColor: '#fff',
  },
  messageItem: {
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '#aaa',
  },
  messageLeft: {
    flex: 1
  },
  messageRight: {
    flex: 4
  }
});