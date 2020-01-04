import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, Button} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as WebBrowser from 'expo-web-browser';


class PDF extends Component {
  upload = async() =>{  
    const file = await DocumentPicker.getDocumentAsync({type: 'application/pdf'});
    if (!file.cancelled) {
      const localUri = file.uri;
      const filename = file.name;
      const formData = new FormData();
      const type = 'application/pdf';
      formData.append('pdf',{uri:localUri, name: filename, type});
      fetch('http://192.168.43.13:5000/uploadPDF',{
        method: 'POST',
        body: formData,
        header: {
        'content-type': 'multipart/form-data',
        },
      }).then(res => res.json())
        .then(res => {
        if(res.data === 1) {
          WebBrowser.openBrowserAsync('http://192.168.43.13:5000/imagPDF')
        }
      })
    }
    
  }
  render(){
  	return(
  		<View style={styles.container}>
            <Image style={styles.imagestyle} source={require('../img/pdf2.png')} />
            <Text style={{paddingTop:50,}}>Upload .pdf file</Text>
            <Button title="Select" onPress={()=>this.upload()}/>
        </View>
  		);
  }
  }
  export default PDF;

  const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagestyle:{
    height:'45%',
    width:'60%',
  },
});