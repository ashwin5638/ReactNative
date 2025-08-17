import React, { useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import ActionButton from '../components/ActionButton';
import { sendOTP } from '../lib/api';

export default function IndexScreen({ navigation }) {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async () => {
    if (!/^\+\d{10,15}$/.test(phone)) {
      Alert.alert('Error', 'Enter phone in E.164 format, e.g., +91XXXXXXXXXX');
      return;
    }
    setLoading(true);
    const result = await sendOTP(phone);
    setLoading(false);
    if (result.success) {
      navigation.navigate('otp', { phoneNumber: phone });
    } else {
      Alert.alert('Error', result.message || 'Could not send OTP');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 24 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>Enter your mobile</Text>
      <TextInput
        placeholder="+91XXXXXXXXXX"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        style={{ borderWidth: 1, borderColor: '#aaa', borderRadius: 8, padding: 12, fontSize: 16, marginBottom: 24 }}
      />
      <ActionButton title={loading ? "Sending..." : "Send OTP"} onPress={handleSendOTP} disabled={loading} />
    </View>
  );
}
