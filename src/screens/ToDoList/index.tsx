import {KeyboardAvoidingView, Platform, StyleSheet, View} from 'react-native';
import {COLORS} from '@constants/colors';
import {useDispatch, useSelector} from 'react-redux';
import {toDoItemsSelector} from '@store/modules/ToDo/selectors';
import {ToDoActions} from '@store/modules/ToDo/actions';
import {ToDoItemData} from '@store/modules/ToDo/types';
import {FlashList} from '@shopify/flash-list';
import {EmptyToDoList} from '@screens/ToDoList/components/EmptyToDoList';
import React, {useCallback, useEffect, useRef} from 'react';
import {Title} from '@screens/ToDoList/components/Title/Title';
import {Footer} from '@screens/ToDoList/components/Footer';
import {ToDoItem} from '@screens/ToDoList/components/ToDoItem';
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {Header} from '@screens/ToDoList/components/Header';
import {useIsKeyboardShown} from '@hooks/useIsKeyboardShown';

const ITEM_ROW_HEIGHT = 100;

const AnimatedFlashList = Animated.createAnimatedComponent(
  FlashList<ToDoItemData>,
);

export function ToDoList() {
  const animatedRef = useAnimatedRef<FlashList<ToDoItemData>>();
  const items = useSelector(toDoItemsSelector);
  const dispatch = useDispatch();
  const currentlyFocusedItemIdRef = useRef<string | null>(null);
  const addNewItem = useCallback(() => {
    dispatch(
      ToDoActions.ADD_ITEM.START.create({
        content: '',
        previousItemId: currentlyFocusedItemIdRef.current,
      }),
    );
  }, [dispatch]);
  const {keyboardDidShow} = useIsKeyboardShown();
  useEffect(() => {
    if (
      animatedRef.current &&
      keyboardDidShow &&
      currentlyFocusedItemIdRef.current
    ) {
      const itemWithNoContentIndex = items.findIndex(
        item => item.id === currentlyFocusedItemIdRef.current,
      );
      // Scroll to a focused item
      if (itemWithNoContentIndex >= 0) {
        animatedRef.current.scrollToIndex({
          animated: true,
          index: itemWithNoContentIndex,
        });
      }
    }
  }, [animatedRef, items, keyboardDidShow]);
  const onEndEditing = useCallback(
    (item: ToDoItemData) => {
      if (item.content) {
        dispatch(
          ToDoActions.UPDATE_ITEM.START.create({
            item,
          }),
        );
      } else {
        dispatch(ToDoActions.REMOVE_ITEM.START.create({id: item.id}));
      }
    },
    [dispatch],
  );
  const renderItem = useCallback(
    ({item}: {item: ToDoItemData}) => {
      return (
        <ToDoItem
          key={item.id}
          item={item}
          onEndEditing={onEndEditing}
          onDelete={() => {
            dispatch(ToDoActions.REMOVE_ITEM.START.create({id: item.id}));
          }}
          onBlur={() => {
            currentlyFocusedItemIdRef.current = null;
          }}
          onFocus={() => {
            currentlyFocusedItemIdRef.current = item.id;
          }}
        />
      );
    },
    [dispatch, onEndEditing],
  );

  const sharedOffset = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    sharedOffset.value = event.contentOffset.y;
  });
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Header sharedOffset={sharedOffset} />
      <View style={styles.container}>
        <AnimatedFlashList
          ref={animatedRef}
          contentContainerStyle={styles.contentContainerStyle}
          data={items}
          renderItem={renderItem}
          onScroll={scrollHandler}
          estimatedItemSize={ITEM_ROW_HEIGHT}
          keyboardShouldPersistTaps="handled"
          ListEmptyComponent={<EmptyToDoList />}
          ListHeaderComponent={<Title />}
        />
      </View>
      <Footer onPress={addNewItem} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  contentContainerStyle: {
    backgroundColor: COLORS.background,
  },
});
