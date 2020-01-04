import React, { Component } from 'react';
import {StyleSheet, Text, View, Button, Image, ActivityIndicator} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as WebBrowser from 'expo-web-browser';

class DOCS extends Component {
  constructor() {
    super();
    this.state = {
      load: false,
    }
  }

  upload = async() =>{    
    this.setState({load: true});
    const file = await DocumentPicker.getDocumentAsync({type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'});
    if (!file.cancelled) {
      const localUri = file.uri;
      const filename = file.name;
      const formData = new FormData();
      const type = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      formData.append('doc',{uri:localUri, name: filename, type});
      fetch('http://192.168.43.13:5000/upload',{
        method: 'POST',
        body: formData,
        header: {
        'content-type': 'multipart/form-data',
        },
      }).then(res => res.json())
        .then(res => {
        if(res.data === 1) {
          WebBrowser.openBrowserAsync('http://192.168.43.13:5000/imag')
          this.setState({load: false});
        }
      })
    }
    
  }
  render(){
  	return(
    		<View>
          {
            this.state.load
            ?
            <ActivityIndicator size="large" color="#0000ff" />
            :
            <View style={styles.container}>
              <Image style={styles.imagestyle} source={require('../img/word.png')} />
              <Text style={{paddingTop:50,}}>Upload .doc file</Text>
              <Button title="Select" onPress={()=>this.upload()}/>              
            </View>
          }
    		</View>
  		);
    }
  }
  export default DOCS;

  const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagestyle:{
    height:100,
    width:100,
  },
});