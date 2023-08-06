import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from '@constants/colors';
import {DEFAULT_PADDING} from '@constants/layout';

export function EmptyToDoList() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>No To-Do Items</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: DEFAULT_PADDING * 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: COLORS.secondary,
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 26,
  },
});
