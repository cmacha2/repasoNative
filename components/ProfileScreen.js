import { Button, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import * as ImagePicker from 'expo-image-picker';
import { CLOUD_NAME, UPLOAD_PRESET } from '@env';

const ProfileScreen = () => {
    const [picture, setPicture] = React.useState('');
    console.log(picture);

    const pickImage = async () => {
        if(Platform.OS !== 'web') {
            const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if(status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
                return;
            }
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: .1,
            base64: true,
        });

        let base64Img = `data:image/jpeg;base64,${result.base64}`;
        let apiURL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
        const data = new FormData();
        data.append('file', base64Img);
        data.append('upload_preset', UPLOAD_PRESET);

        if(!result.cancelled) {
           setPicture(result.uri);
           try{
                let response = await fetch(apiURL, {
                     method: 'POST',
                     body:data,
                });
                let responseData = await response.json();
                console.log(responseData);
           }catch{
                console.log('error');
           }
        }
    }

  return (
    <View>
      <Text>ProfileScreen</Text>
      <Image source={{uri: picture}} style={{width: 200, height: 200}}/>
      <Button title="Open Image" onPress={pickImage}/>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})