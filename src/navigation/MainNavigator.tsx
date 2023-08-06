import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DEFAULT_SCREEN_OPTIONS} from '@navigation/constants';
import {ToDoList} from '@screens/ToDoList';

const Stack = createNativeStackNavigator();

export function MainNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={'ToDoList'}
      screenOptions={DEFAULT_SCREEN_OPTIONS}>
      <Stack.Screen name="ToDoList" component={ToDoList} />
    </Stack.Navigator>
  );
}
