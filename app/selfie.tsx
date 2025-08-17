import React, { useRef, useState } from 'react';
import { View, Text, Image, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import ActionButton from '../components/ActionButton';
import { uploadSelfie } from '../lib/api';

export default function SelfieScreen({ route, navigation }) {
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const cameraRef = useRef<Camera>(null);

  const takePhoto = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({ quality: 0.85 });
        setPhotoUri(photo.uri);
      } catch {
        Alert.alert('Error', 'Camera error while capturing selfie');
      }
    }
  };

  const handleUpload = async () => {
    if (!photoUri) return;
    setLoading(true);
    const result = await uploadSelfie(photoUri, route.params.phoneNumber, route.params.token);
    setLoading(false);
    if (result.success) {
      navigation.navigate('home', {
        phoneNumber: route.params.phoneNumber,
        selfieUrl: result.imageUrl,
      });
    } else {
      Alert.alert('Error', result.message || "Failed to upload selfie");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 20 }}>Take a Selfie</Text>
      {!photoUri ? (
        <>
          <Camera
            style={{ width: 240, height: 320, borderRadius: 20, marginBottom: 24 }}
            type={Camera.Constants.Type.front}
            ref={cameraRef}
          />
          <ActionButton title="Capture Selfie" onPress={takePhoto} />
        </>
      ) : (
        <>
          <Image
            source={{ uri: photoUri }}
            style={{
              width: 200,
              height: 200,
              borderRadius: 100,
              borderWidth: 3,
              borderColor: '#4169e1',
              marginBottom: 18,
            }}
          />
          <ActionButton title="Upload Selfie" onPress={handleUpload} loading={loading} />
          <ActionButton title="Retake" onPress={() => setPhotoUri(null)} />
        </>
      )}
    </View>
  );
}
