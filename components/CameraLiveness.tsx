import React, { useEffect, useRef, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';

type Challenge = 'BLINK' | 'SMILE' | 'TURN_LEFT' | 'TURN_RIGHT';
function pickChallenge(): Challenge {
  const items: Challenge[] = ['BLINK', 'SMILE', 'TURN_LEFT', 'TURN_RIGHT'];
  return items[Math.floor(Math.random() * items.length)];
}

export default function CameraLiveness({ onPassed }: { onPassed: () => void }) {
  const [ready, setReady] = useState(false);
  const [faceOk, setFaceOk] = useState(false);
  const [challenge, setChallenge] = useState<Challenge>(pickChallenge());
  const [countdown, setCountdown] = useState(8);
  const satisfiedRef = useRef(false);

  useEffect(() => {
    const id = setInterval(() => setCountdown(c => (c > 0 ? c - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (countdown === 0 && !satisfiedRef.current) {
      satisfiedRef.current = false;
      setChallenge(pickChallenge());
      setCountdown(8);
    }
  }, [faceOk, countdown]);

  const onFacesDetected = ({ faces }: FaceDetector.FacesDetectedEvent) => {
    if (!faces?.length) { setFaceOk(false); return; }
    const f = faces[0];
    const boxOk = f.bounds.size.width > 120 && f.bounds.size.height > 120;
    setFaceOk(boxOk);
    if (!boxOk || satisfiedRef.current) return;
    const probSmile = f.smilingProbability ?? 0;
    const leftEye = f.leftEyeOpenProbability ?? 1;
    const rightEye = f.rightEyeOpenProbability ?? 1;
    const yaw = f.yawAngle ?? 0;
    const blinked = leftEye < 0.2 && rightEye < 0.2;
    const smiling = probSmile > 0.7;
    const turnedLeft = yaw < -15;
    const turnedRight = yaw > 15;
    const pass = (
      (challenge === 'BLINK' && blinked) ||
      (challenge === 'SMILE' && smiling) ||
      (challenge === 'TURN_LEFT' && turnedLeft) ||
      (challenge === 'TURN_RIGHT' && turnedRight)
    );
    if (pass) {
      satisfiedRef.current = true;
      onPassed();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Center your face. Then: <Text style={styles.challenge}>{challenge.replace('_', ' ')}</Text>
      </Text>
      <Text style={styles.subtitle}>Time left: {countdown}s</Text>
      <Camera
        style={styles.camera}
        type={CameraType.front}
        ratio="16:9"
        onCameraReady={() => setReady(true)}
        onFacesDetected={onFacesDetected}
        faceDetectorSettings={{
          mode: FaceDetector.FaceDetectorMode.fast,
          detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
          runClassifications: FaceDetector.FaceDetectorClassifications.all,
        }}
      />
      {!ready && <Text>Initializing camera…</Text>}
      {!faceOk && <Text style={{ marginTop: 8 }}>Align face within frame</Text>}
    </View>
  );
}
const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'flex-start', },
  title: { marginTop: 8, fontSize: 18, textAlign: 'center' },
  challenge: { fontWeight: 'bold', color: '#4169e1' },
  subtitle: { marginTop: 4, fontSize: 14, opacity: 0.7 },
  camera: { marginTop: 12, width: 320, height: 320, borderRadius: 20, overflow: 'hidden' },
});
