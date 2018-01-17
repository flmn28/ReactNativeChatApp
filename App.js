/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  Scene,
  Router,
} from 'react-native-router-flux';
import LoginForm from './src/LoginForm'
import ChatRoom from './src/ChatRoom'
import UserManagement from './src/UserManagement'
import LogoutButton from './src/LogoutButton'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Router>
          <Scene key="root">
            <Scene key="login" initial component={LoginForm} title="ログイン" hideNavBar={true} />
            <Scene key="tabbar" tabs={true}>
              <Scene key="chat" initial component={ChatRoom} title="チャットルーム" hideNavBar={true} />
              <Scene key="user" component={UserManagement} title="ユーザー管理" hideNavBar={true} />
              <Scene key="logout" component={LogoutButton} title="ログアウト" hideNavBar={true} />
            </Scene>
          </Scene>
        </Router>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
