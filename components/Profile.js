import React,{ Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { NavigationEvents } from 'react-navigation';

class Profile extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      email: '',
      password: '',
    };
  }

  onLogin = (event) => {
    event.preventDefault()
    fetch('http://192.168.43.13:5000/users/login', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      })
    })
    .then(response => response.json())
    .then(resp => {
      if(resp.token) {
        SecureStore.setItemAsync('token',resp.token);
        this.props.navigation.navigate('Application');
      }
      else {
        alert('Enter Valid Data');
      }
    })
    .catch(err => {
      console.log(err);
    })
  }
  render(){
    return (
      <View style={styles.container}>
      <NavigationEvents onWillFocus={ () => { this.Email.clear(),this.Password.clear(); } } />
        <Text style={{fontSize:70,paddingBottom:50,textAlign: 'center',}}>Sign In</Text>
        <View style={{alignItems: 'center',widht:'100%'}}>
          <TextInput
            value={this.state.email}
            onChangeText={(email) => this.setState({ email })}
            placeholder={'Email'}
            ref={(u) => this.Email = u}
            style={styles.input}
          />
          <TextInput
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
            placeholder={'Password'}
            secureTextEntry={true}
            ref={(u) => this.Password = u}
            style={styles.input}
          />
        
          <Button
            title={'Login'}
            onPress={this.onLogin.bind(this)}
          />
        </View>
        <View style={{width:'90%'}}>
        <Text style={{textAlign:'center',paddingTop:40,}}>Don't have account?</Text>
        <Button onPress={()=>this.props.navigation.navigate('Feed')} title="register Here!" />
        <Text style={{textAlign:'center'}}>or</Text>
        <Text style={{paddingTop:20,textAlign:'center'}}>For different Login Method</Text>
        <Button onPress={()=>this.props.navigation.navigate('Main')} title="Click Here!" />
        </View>
      </View>
    );
  }
}


export default Profile;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF875B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 290,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
});
