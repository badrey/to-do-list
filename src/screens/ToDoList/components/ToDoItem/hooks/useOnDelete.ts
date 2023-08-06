import {useCallback, useEffect, useState} from 'react';
import {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {SPRING_CONFIG} from '@constants/animations';
import {COLORS} from '@constants/colors';
import {emitSuccessHaptic} from '@services/haptics-service';

type Props = {
  onDelete: () => void;
};

export function useOnDelete({onDelete}: Props) {
  const [isMarkedForDelete, setIsMarkedForDelete] = useState(false);
  const sharedIsMarkedForDelete = useSharedValue(0);
  const onDeleteSwitch = useCallback(() => {
    setIsMarkedForDelete(v => !v);
  }, []);
  useEffect(() => {
    sharedIsMarkedForDelete.value = withSpring(
      isMarkedForDelete ? 1 : 0,
      SPRING_CONFIG,
    );
    if (isMarkedForDelete) {
      emitSuccessHaptic();
      const handle = setTimeout(onDelete, 1500);
      return () => clearTimeout(handle);
    }
  }, [isMarkedForDelete, onDelete, sharedIsMarkedForDelete]);

  const animatedOuterCircleStyle = useAnimatedStyle(
    () => ({
      borderColor: interpolateColor(
        sharedIsMarkedForDelete.value,
        [0, 1],
        [COLORS.secondary, COLORS.attention],
      ),
    }),
    [],
  );
  const animatedInnerCircleStyle = useAnimatedStyle(
    () => ({
      opacity: sharedIsMarkedForDelete.value,
    }),
    [],
  );
  const animatedInputStyle = useAnimatedStyle(
    () => ({
      color: interpolateColor(
        sharedIsMarkedForDelete.value,
        [0, 1],
        [COLORS.primary, COLORS.secondary],
      ),
    }),
    [],
  );

  return {
    onDeleteSwitch,
    animatedOuterCircleStyle,
    animatedInnerCircleStyle,
    animatedInputStyle,
  };
}
