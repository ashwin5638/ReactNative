import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Camera } from 'expo-camera';
import CameraLiveness from '../components/CameraLiveness';

export default function LivenessScreen({ route, navigation }) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    Camera.requestCameraPermissionsAsync().then(({ status }) => setHasPermission(status === 'granted'));
  }, []);

  const handleLivenessPass = () => {
    navigation.navigate('selfie', {
      phoneNumber: route.params.phoneNumber,
      token: route.params.token,
    });
  };

  if (hasPermission === null)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#4169e1" />
        <Text style={{ marginTop: 18 }}>Requesting camera permission…</Text>
      </View>
    );

  if (!hasPermission)
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 16, color: 'red' }}>No access to camera</Text>
      </View>
    );

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginVertical: 16 }}>
        Liveness Check
      </Text>
      <CameraLiveness onPassed={handleLivenessPass} />
      <Text style={{ textAlign: 'center', margin: 18, color: '#555' }}>
        Follow the screen prompt to verify you are live (blink, smile, turn).
      </Text>
    </View>
  );
}
