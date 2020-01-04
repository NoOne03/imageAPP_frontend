import React,{ Component } from 'react';
import { View, ActivityIndicator, StatusBar, } from 'react-native';
import * as SecureStore from 'expo-secure-store';


class Splash extends Component {
  componentDidMount(){
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    const usertoken = await SecureStore.getItemAsync('token');
    this.props.navigation.navigate(usertoken?'Application':'Main');
  };
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
export default Splash;