import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import * as Google from 'expo-google-app-auth';
import { SocialIcon } from 'react-native-elements';


class Main extends Component {
  signInWithGoogleAsync = async() => {
  try {
    const { type, accessToken, user } = await Google.logInAsync({
      androidClientId: 'your_android_client_id',
      //iosClientId: YOUR_CLIENT_ID_HERE,
      scopes: ['profile', 'email'],
    });
    console.log(user);
    if (type === 'success') {
      this.props.navigation.navigate('Application');
      //return result.accessToken;
    } else {
      console.log('Try Again');
    }
  } catch (e) {
    console.log('error');
  }
}

  render(){
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <Text style={styles.header}>H O M E</Text>
        </View>
        <Image style={styles.bottom} source={require("../img/img2.png")} style={{ width: 110, height: 110 }} />
        <TouchableOpacity style={{width:'90%'}}>
        <View style={{paddingTop:40}}>
          <Button onPress={() => this.props.navigation.navigate('Profile')} title="Sign in"/>
        </View>
        <View style={{paddingTop:20,paddingBottom:20}}>
          <Button onPress={() => this.props.navigation.navigate('Feed')} title="Sign up"/>
        </View>
        </TouchableOpacity>
        <SocialIcon
          title='Sign in with Google!'
          button
          type='google'
          onPress={()=>this.signInWithGoogleAsync()}
        />
      </View>
    );
  }
}

export default Main;
  


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8041E4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    color: '#fff',
    fontSize: 28,
    borderColor: '#fff',
    borderWidth: 2,
    padding: 20,
    paddingLeft: 40, 
    paddingRight: 40,
    backgroundColor: 'rgba(255,255,255, .1)',
  },
  top:{
    height: '30%',
    alignItems: 'center', 
  },
  bottom:{
    paddingTop: 80,
    marginBottom:60,
  },
  last:{
    paddingTop:10,
    backgroundColor:'#8041E4',
  },
});
