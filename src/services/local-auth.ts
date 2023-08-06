import * as LocalAuthentication from 'expo-local-authentication';

export async function authenticateAsync() {
  const [isAvailable, isEnrolled] = await Promise.all([
    LocalAuthentication.hasHardwareAsync(),
    LocalAuthentication.isEnrolledAsync(),
  ]);
  if (isAvailable && isEnrolled) {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Please authenticate',
    });
    return result.success;
  }
  return true;
}
