import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import otpInput from "../components/otpInput";
import ActionButton from '../components/ActionButton';
import { verifyOTP } from '../lib/api';

export default function OTPScreen({ route, navigation }) {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const { phoneNumber } = route.params;

  const handleVerify = async () => {
    setLoading(true);
    const result = await verifyOTP(phoneNumber, otp);
    setLoading(false);
    if (result.success) {
      navigation.navigate('liveness', { phoneNumber, token: result.token });
    } else {
      Alert.alert('Error', result.message || 'Failed to verify OTP');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 16 }}>
        Enter OTP
      </Text>
      <Text style={{ fontSize: 16, color: '#888', textAlign: 'center', marginBottom: 28 }}>
        OTP sent to <Text style={{ fontWeight: 'bold', color: '#4169e1' }}>{phoneNumber}</Text>
      </Text>
      <otpInput value={otp} onChange={setOtp} length={6} />
      <ActionButton title="Verify OTP" onPress={handleVerify} disabled={otp.length !== 6 || loading} loading={loading} />
    </View>
  );
}
