import React, { Component } from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import jwt_decode from 'jwt-decode';
import { Card } from 'react-native-elements'



class Logout extends Component {
	constructor() {
		super()
		this.state = {
			username: '',
            email: '',
            mob:'',
		}
	}
	componentDidMount = async() => {
		const userToken = await SecureStore.getItemAsync('token');
		const decoded = jwt_decode(userToken);
		this.setState({
			username: decoded.Username,
            email: decoded.Email,
            mob: decoded.Phone,
		})
    }
  logOut = (event) =>{
    SecureStore.deleteItemAsync('token');
    const rootNav = this.props.screenProps.rootNavigation;
    rootNav.navigate('Main');
  }
  render(){
  	return(
		  	<View style={styles.container}>
		  		<Card
				  title=<Text style={{fontSize:30,}}>    {this.state.username}</Text>
				  image={require('../img/profile.png')}>
				  <Text style={{marginBottom: 10}}>{this.state.email}</Text>
				  <Text style={{marginBottom: 10}}>{this.state.mob}</Text>
				  <Button
				    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
				    title='Logout'
				    onPress={this.logOut} />
				</Card>
		  	</View>
  		);
  }
  }
  export default Logout;

  const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#524C54',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
  	height: '30%',
    borderColor: '#fff',
    borderWidth: 2,
    padding: 20,
    paddingLeft: 40, 
    paddingRight: 40,
    backgroundColor: 'rgba(255,255,255, .1)',
  },
});