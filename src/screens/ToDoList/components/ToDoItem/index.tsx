import React, {useEffect, useRef, useState} from 'react';
import {ToDoItemData} from '@store/modules/ToDo/types';
import {Pressable, StyleSheet, TextInput, View} from 'react-native';
import {COLORS} from '@constants/colors';
import {DEFAULT_PADDING} from '@constants/layout';
import {useOnDelete} from '@screens/ToDoList/components/ToDoItem/hooks/useOnDelete';
import Animated from 'react-native-reanimated';

type Props = {
  item: ToDoItemData;
  onEndEditing: (item: ToDoItemData) => void;
  onDelete: () => void;
  onFocus: () => void;
  onBlur: () => void;
};

const ITEM_ROW_HEIGHT = 50;
const CHECK_SIZE = 24;
const CHECK_INNER_SIZE = 16;

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export function ToDoItem({
  item,
  onEndEditing,
  onDelete,
  onFocus,
  onBlur,
}: Props) {
  const [value, setValue] = useState(item.content);
  useEffect(() => {
    setValue(item.content);
  }, [item]);

  const ref = useRef<TextInput>(null);

  const {
    onDeleteSwitch,
    animatedOuterCircleStyle,
    animatedInnerCircleStyle,
    animatedInputStyle,
  } = useOnDelete({onDelete});

  return (
    <View style={styles.container}>
      <Pressable style={styles.checkContainer} onPress={onDeleteSwitch}>
        <Animated.View
          style={[styles.checkOuterCircle, animatedOuterCircleStyle]}>
          <Animated.View
            style={[styles.checkInnerCircle, animatedInnerCircleStyle]}
          />
        </Animated.View>
      </Pressable>
      <View style={styles.contentContainer}>
        <AnimatedTextInput
          onLayout={() => {
            if (!item.content && ref.current) {
              ref.current.focus();
            }
          }}
          multiline
          ref={ref}
          returnKeyType={'done'}
          style={[styles.content, animatedInputStyle]}
          value={value}
          onChangeText={setValue}
          onFocus={onFocus}
          onBlur={onBlur}
          onEndEditing={() => {
            onEndEditing({
              ...item,
              content: value.trim(),
            });
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    minHeight: ITEM_ROW_HEIGHT,
  },
  checkContainer: {
    height: ITEM_ROW_HEIGHT,
    justifyContent: 'center',
    paddingRight: DEFAULT_PADDING / 2,
    paddingLeft: DEFAULT_PADDING,
  },
  checkOuterCircle: {
    width: CHECK_SIZE,
    height: CHECK_SIZE,
    borderRadius: CHECK_SIZE / 2,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkInnerCircle: {
    width: CHECK_INNER_SIZE,
    height: CHECK_INNER_SIZE,
    borderRadius: CHECK_INNER_SIZE / 2,
    backgroundColor: COLORS.attention,
  },
  contentContainer: {
    justifyContent: 'center',
    borderBottomColor: COLORS.divider,
    borderBottomWidth: 1,
    flex: 1,
  },
  content: {
    color: COLORS.primary,
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 14,
    width: '100%',
  },
});
