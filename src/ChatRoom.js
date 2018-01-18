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

class ChatForm extends Component {

  formatDate = (date) => {
    let format = 'YYYY/MM/DD hh:mm'
    format = format.replace(/YYYY/g, date.getFullYear())
    format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2))
    format = format.replace(/DD/g, ('0' + date.getDate()).slice(-2))
    format = format.replace(/hh/g, ('0' + date.getHours()).slice(-2))
    format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2))
    return format
  }

  createNewPost = () => {
    let posts = this.props.posts
    const newPost = {
      userName: this.props.user.name,
      body: this.state.text,
      image: this.props.user.image,
      createdAt: this.formatDate(new Date())
    }
    posts.unshift(newPost)
    AsyncStorage.setItem('posts', JSON.stringify(posts))

    this.props.setPosts()
    this.setState({
      text: ''
    })

  }

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
            source={{ uri: this.props.user.image }}
          />
          <Text>
            {this.props.user.name}
           </Text>
        </View>
        <View style={styles.formRight}>
          <View>
          <TextInput style={styles.textInput} value={this.state.text} 
              multiline={true} onChangeText={text => this.setState({text})} />
          </View>
          <View style={styles.buttonContainer}>
            <Button title='投稿' onPress={e => this.createNewPost(e)} />
          </View>
        </View>
      </View>
    )
  }
}

export default class ChatRoom extends Component {

  constructor (props) {
    super(props)
    this.state = {
      currentUser: '',
      posts: [{
        userName: 'user1',
        body: 'メッセージ1メッセージ1メッセージ1メッセージ1メッセージ1メッセージ1メッセージ1メッセージ1メッセージ1',
        userImage: 'https://facebook.github.io/react-native/docs/assets/favicon.png',
        createdAt: 'aaa'
      }]
    }
  }

  componentWillMount () {
    this.setCurrentUser()
    this.setPosts()
  }

  setPosts = async () => {
    try {
      let data = await AsyncStorage.getItem('posts')
      let posts = JSON.parse(data)
      this.setState({
        posts: posts
      })
    } catch (error) {
      alert(error)
    }
  }

  setCurrentUser = async () => {
    try {
      let data = await AsyncStorage.getItem('currentUser')
      let user = JSON.parse(data)
      this.setState({
        currentUser: user
      })
    } catch (error) {
      alert(error)
    }
  }

  render () {
    const postList = this.state.posts.map((e, i) => (
      <View key={i + 1} style={styles.messageItem}>
        <View style={styles.messageLeft}>
          <Image
            style={styles.userImage}
            source={{ uri: e.userImage }}
          />
        </View>
        <View style={styles.messageRight}>
          <Text>
            {e.userName}  {e.createdAt}
          </Text>
          <Text>
            {e.body}
          </Text>
        </View>
      </View>
    ))

    return (
      <View>
        <ChatForm posts={this.state.posts} user={this.state.currentUser} setPosts={e => this.setPosts(e)} />
        <View>
          {postList}
        </View>
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