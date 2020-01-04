import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Main from './components/Main'
import Profile from './components/Profile'
import Feed from './components/Feed'
import Application from './components/Application'
import Splash from './components/Splash'

const RootStack = createStackNavigator(
  {
    Splash: Splash,
    Main: Main,
    Profile: Profile,
    Feed: Feed,
    Application: Application,
  },
  {
    headerMode: 'none',
  },
  {
    initialRouteName: 'Splash',
  }
);


const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer/>;
  }
}