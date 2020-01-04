import React, { Component } from 'react';
import {StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator} from 'react-native';
import * as WebBrowser from 'expo-web-browser';


class Link extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      link: '',
      load: false,
    };
  }

  link = (event) =>{
    event.preventDefault()
    this.setState({load: true});
    fetch('http://192.168.43.13:5000/imagLink', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        link: this.state.link,
      })
    })
    .then(response => response.json())
    .then(resp => {
      if(resp.data===1) {
        this.setState({load: false});
        WebBrowser.openBrowserAsync('http://192.168.43.13:5000/imagZip')
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
  	return(
  		<View style={styles.container}>
        {
          this.state.load
          ?
          <ActivityIndicator size="large" color="#fff" />
          :
          <View>
            <TextInput
              value={this.state.link}
              onChangeText={(link) => this.setState({ link })}
              placeholder={'Enter link here'}
              placeholderTextColor='#89878A'
              style={styles.input}
            />
            <Button title="Submit" onPress={this.link}/>
          </View>
        }
  		</View>
  		);
  }
  }
  export default Link;

  const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8041E4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 290,
    height: 44,
    padding: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
});