import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  AsyncStorage,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Router, Route, Link, Redirect } from 'react-router-native';

import HomeView from './Home/homeView.js';
import FixedMenu from './Landing_Page/fixedMenu.js';
import * as authActions from '../actions/authActions.js';



class App extends Component {
	constructor(props) {
		super(props);
    this.state = {
      loggedIn: false
    }
	}

  render = () => {
    let page = <HomeView history={this.props.history} />
    AsyncStorage.getItem('userid').then((userId) => {
      if (userId !== null) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    }).catch((err) => console.log(err));
    if (this.state.loggedIn === true) {
      return (
        <View>
          <HomeView history={this.props.history} />
        </View>
      )
    } else {
      return (
        <View>
          <Image 
            style={{width: 360, height: 480, backgroundColor: '#3B86D2', flex:1 }}
            source={{uri: 'https://greatist.com/sites/default/files/fridge-of-food.jpg'}}
          >
            <FixedMenu history={this.props.history} />
          </Image>
        </View>
      )
    }
	}
}

const appState = (store) => {
  return {
    username: store.auth.username,
  }
};

const appDispatch =(dispatch) => {
  return {
    actions: bindActionCreators(authActions, dispatch)
  }
};

export default connect(appState, appDispatch)(App);