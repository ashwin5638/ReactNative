   import React, { useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableWithoutFeedback } from 'react-native';

interface OTPInputProps {
  value: string;
  onChange: (val: string) => void;
  length?: number;
}

export default function OTPInput({ value, onChange, length = 6 }: OTPInputProps) {
  const inputRef = useRef<TextInput>(null);
  const digits = value.split('');

  return (
    <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
      <View style={styles.container}>
        {/* Hidden TextInput where user actually types the OTP */}
        <TextInput
          ref={inputRef}
          value={value}
          onChangeText={(text) => {
            // restrict input length
            if (text.length <= length && /^\d*$/.test(text)) {
              onChange(text);
            }
          }}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          maxLength={length}
          style={styles.hiddenInput}
          autoFocus
        />

        {/* Visual OTP Boxes */}
        {Array.from({ length }).map((_, i) => (
          <View key={i} style={styles.box}>
            <Text style={styles.text}>{digits[i] || ''}</Text>
          </View>
        ))}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    alignSelf: 'center',
    marginVertical: 20,
  },
  box: {
    borderBottomWidth: 2,
    borderColor: '#999',
    width: 40,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    width: 1,
    height: 1,
  },
});
