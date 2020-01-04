import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from "react-native-vector-icons/FontAwesome";
import Logout from './Logout'
import PDF from './PDF'
import DOCS from './Docs'
import Link from './Link'



class Application extends Component {
  render(){
    return (
    <AppContainers screenProps={{ rootNavigation: this.props.navigation }}/>
    );
  }
}

class Appmain extends Component{
  render(){
    return (
      <View style={styles.container}>
        <Text style={{fontSize:40,color:'#fff'}}>Extract Images from</Text>
        <View style={{alignItems: 'center',}}>
          <TouchableHighlight underlayColor='#A569BD' onPress={() => this.props.navigation.navigate('Pdf')} style={styles.containerSize} >
            <Image source={require('../img/pdf.png')} />
          </TouchableHighlight>
          <Text style={{color:'#fff'}}>Pdf</Text>
          <TouchableHighlight underlayColor='#A569BD' onPress={() => this.props.navigation.navigate('Docs')} style={styles.containerSize}>
            <Image source={require('../img/docs.png')} />
          </TouchableHighlight>
          <Text style={{color:'#fff'}}>Docs</Text>
          <TouchableHighlight underlayColor='#A569BD' onPress={() => this.props.navigation.navigate('Link')} style={styles.containerSize}>
            <Image source={require('../img/link.png')} />
          </TouchableHighlight>
          <Text style={{color:'#fff'}}>Link</Text>
        </View>
      </View>
    );
  }
}

const bottomTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen:Appmain,
      navigationOptions:{
        tabBarIcon:({ tintColor }) => (
          <Icon name="home" size={25} color={tintColor}/>
          )
      }
    },
    Pdf:{
      screen:PDF,
      navigationOptions:{
        tabBarIcon:({ tintColor }) => (
          <Icon name="file-pdf-o" size={25} color={tintColor}/>
          )
      }
    },
    Docs:{
      screen:DOCS,
      navigationOptions:{
        tabBarIcon:({ tintColor }) => (
          <Icon name="file-word-o" size={25} color={tintColor}/>
          )
      }
    },
    Link:{
      screen:Link,
      navigationOptions:{
        tabBarIcon:({ tintColor }) => (
          <Icon name="hand-pointer-o" size={25} color={tintColor}/>
          )
      }
    },
    Profile:{
      screen:Logout,
      navigationOptions:{
        tabBarIcon:({ tintColor }) =>(
          <Icon name="user" size={25} color={tintColor}/>
          )
      }
    },
  },
  {
    initialRouteName: 'Home',
    tabBarOptions: {
      activeTintColor: '#eb6e3d'
    }
  }
);

const AppContainers = createAppContainer(bottomTabNavigator);

export default Application;
  


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8041E4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerSize: {
    marginTop: 40,
    width: '60%',
    height: '13%',
  }
});
