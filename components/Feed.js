import React,{ Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

class Feed extends Component {
  state = {
    username: '', password: '', email: '', phone_number: ''
  }
  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }

  signUp = (event) => {
    event.preventDefault()

    fetch('http://192.168.43.13:5000/users/register', {
      method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          username: this.state.username,
          email: this.state.email,
          password: this.state.password,
          phone: this.state.phone_number,
        })
    })
    .then(response => response.json())
    .then(resp => {
      if(resp.status === 1) {  
        console.log(resp);
        this.props.navigation.navigate('Profile');
      }
      else {
        alert('Wrong Credentials');
      }
    })
    .catch(err => {
      console.log(err)
    })
  }

  render(){
    return (
      <View style={styles.container}>
        <Text style={{fontSize:50,paddingBottom:20,textAlign: 'center',}}>Sign Up!</Text>
        <Text>*Manadatory Fields</Text>
        <View style={{paddingBottom:20,}}>
          <TextInput
            style={styles.input}
            placeholder='Username'
            onChangeText={val => this.onChangeText('username', val)}
          />
          <TextInput
            style={styles.input}
            placeholder='Password*'
            secureTextEntry={true}
            onChangeText={val => this.onChangeText('password', val)}
          />
          <TextInput
            style={styles.input}
            placeholder='Unique Email*'
            onChangeText={val => this.onChangeText('email', val)}
          />
          <TextInput
            style={styles.input}
            placeholder='Phone Number*'
            onChangeText={val => this.onChangeText('phone_number', val)}
          />
          <Button
            title='Sign Up'
            onPress={this.signUp}
          />
      </View>
        <Text style={{paddingTop:60,}}>Lazy? Try another login methods here</Text>
        <Button onPress={()=>this.props.navigation.navigate('Main')} title="Home"/>
      </View>
    );
  }
}


export default Feed;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFBD49',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 350,
    height: 55,
    backgroundColor: '#fff',
    margin: 10,
    padding: 8,
    color: 'black',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
  },
});
