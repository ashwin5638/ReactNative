const API_BASE = 'https://flashback.inc:9000/api/mobile/sendOTP';
const API_BASE1 = 'https://flashback.inc:9000/api/mobile/verifyOTP';
const API_BASE2 = 'https://flashback.inc:9000/api/mobile/uploadUserPortrait'

// Send OTP (WhatsApp)
export async function sendOTP(phone: string) {
  try {
    const res = await fetch(`${API_BASE}/send-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone }),
    });
    return await res.json();
  } catch (e) {
    return { success: false, message: "Network error. Please try again." };
  }
}

// Verify OTP
export async function verifyOTP(phone: string, otp: string) {
  try {
    const res = await fetch(`${API_BASE1}/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, otp }),
    });
    return await res.json();
  } catch (e) {
    return { success: false, message: "Verification failed. Please try again." };
  }
}

// Upload selfie (uri: file path, phone, token)
export async function uploadSelfie(uri: string, phone: string, token: string) {
  try {
    const formData = new FormData();
    formData.append('phone', phone);
    formData.append('token', token);
    formData.append('selfie', {
      uri,
      name: 'selfie.jpg',
      type: 'image/jpeg',
    } as any);

    const res = await fetch(`${API_BASE2}/upload-selfie`, {
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      body: formData,
    });
    return await res.json();
  } catch (e) {
    return { success: false, message: "Failed to upload selfie." };
  }
}
