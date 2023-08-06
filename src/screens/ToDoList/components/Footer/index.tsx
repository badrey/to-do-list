import {Pressable, StyleSheet, Text, View} from 'react-native';
import {DEFAULT_PADDING} from '@constants/layout';
import {COLORS} from '@constants/colors';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useIsKeyboardShown} from '@hooks/useIsKeyboardShown';

const ICON_SIZE = 30;

const PlusIcon = () => (
  <Icon name="add-circle" size={ICON_SIZE} color={COLORS.attention} />
);

type Props = {
  onPress: () => void;
};

export function Footer({onPress}: Props) {
  const {keyboardWillShow, keyboardDidShow} = useIsKeyboardShown();
  const isKeyboardShown = keyboardWillShow || keyboardDidShow;
  return (
    <Pressable style={styles.mainContainer} onPress={onPress}>
      <SafeAreaView edges={isKeyboardShown ? [] : ['bottom']}>
        <View style={styles.container}>
          <PlusIcon />
          <Text style={styles.text}>New To-Do Item</Text>
        </View>
      </SafeAreaView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: COLORS.ternary,
  },
  container: {
    width: '100%',
    paddingHorizontal: DEFAULT_PADDING,
    paddingVertical: DEFAULT_PADDING / 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    paddingLeft: DEFAULT_PADDING,
    color: COLORS.attention,
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 22.5,
  },
});
