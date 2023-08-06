import * as Haptics from 'expo-haptics';

export function emitSuccessHaptic() {
  return Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
}
