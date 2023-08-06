import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from '@constants/colors';
import {DEFAULT_PADDING} from '@constants/layout';

const LINE_HEIGHT = 40;
export const TITLE_HEIGHT = LINE_HEIGHT + DEFAULT_PADDING * 2;

export const TO_DO_LIST_TITLE_TEXT = 'To-Do List';

export function Title() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>To-Do List</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: TITLE_HEIGHT,
    paddingHorizontal: DEFAULT_PADDING,
    justifyContent: 'center',
  },
  text: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: LINE_HEIGHT / 1.4,
    lineHeight: LINE_HEIGHT,
  },
});
