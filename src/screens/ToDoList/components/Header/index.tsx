import React from 'react';
import {Keyboard, Pressable, StyleSheet, Text, View} from 'react-native';
import {COLORS} from '@constants/colors';
import {DEFAULT_PADDING} from '@constants/layout';
import {useIsKeyboardShown} from '@hooks/useIsKeyboardShown';
import Animated, {
  interpolate,
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {
  TITLE_HEIGHT,
  TO_DO_LIST_TITLE_TEXT,
} from '@screens/ToDoList/components/Title/Title';
import {SafeAreaView} from 'react-native-safe-area-context';

type Props = {
  sharedOffset: SharedValue<number>;
};

export function Header({sharedOffset}: Props) {
  const {keyboardWillShow, keyboardDidShow} = useIsKeyboardShown();
  const isKeyboardShown = keyboardWillShow || keyboardDidShow;
  const animatedStyle = useAnimatedStyle(
    () => ({
      backgroundColor: interpolateColor(
        sharedOffset.value,
        [0, 10],
        [COLORS.background, COLORS.ternary],
      ),
    }),
    [],
  );
  const animatedTitleStyle = useAnimatedStyle(
    () => ({
      opacity: interpolate(
        sharedOffset.value,
        [0, TITLE_HEIGHT * 1.2],
        [0, 1],
        'clamp',
      ),
    }),
    [],
  );
  return (
    <Animated.View style={animatedStyle}>
      <SafeAreaView edges={['top']}>
        <View style={styles.container}>
          <Animated.Text style={[styles.title, animatedTitleStyle]}>
            {TO_DO_LIST_TITLE_TEXT}
          </Animated.Text>
          <View style={styles.rightButtonContainer}>
            {isKeyboardShown ? (
              <Pressable hitSlop={16} onPress={Keyboard.dismiss}>
                <Text style={styles.text}>Done</Text>
              </Pressable>
            ) : null}
          </View>
        </View>
      </SafeAreaView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: DEFAULT_PADDING,
    paddingVertical: DEFAULT_PADDING / 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 30 + DEFAULT_PADDING,
  },
  rightButtonContainer: {
    position: 'absolute',
    justifyContent: 'center',
    top: 0,
    right: DEFAULT_PADDING,
    height: 30 + DEFAULT_PADDING,
  },
  title: {
    color: COLORS.primary,
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 22.5,
  },
  text: {
    color: COLORS.attention,
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 22.5,
  },
});
