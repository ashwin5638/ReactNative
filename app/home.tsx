import React from 'react';
import { View, Text, Image } from 'react-native';

export default function HomeScreen({ route }) {
  const { phoneNumber, selfieUrl } = route.params || {};

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 24,
      backgroundColor: '#fff'
    }}>
      <Text style={{
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#4169e1'
      }}>
        Welcome!
      </Text>
      <Text style={{
        fontSize: 16,
        marginBottom: 24,
        color: '#555',
        textAlign: 'center'
      }}>
        Signed in as <Text style={{ fontWeight: 'bold', color: '#222' }}>{phoneNumber}</Text>
      </Text>
      {selfieUrl && (
        <Image
          source={{ uri: selfieUrl }}
          style={{
            width: 220,
            height: 220,
            borderRadius: 110,
            borderWidth: 4,
            borderColor: '#4169e1'
          }}
        />
      )}
      <Text style={{
        fontSize: 17,
        marginTop: 28,
        color: '#222',
        textAlign: 'center'
      }}>
        You have successfully uploaded your selfie.
      </Text>
    </View>
  );
}
