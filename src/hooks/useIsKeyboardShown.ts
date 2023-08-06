import {useEffect, useState} from 'react';
import {Keyboard} from 'react-native';

export function useIsKeyboardShown() {
  const [keyboardWillShow, setKeyboardWillShow] = useState(false);
  const [keyboardDidShow, setKeyboardDidShow] = useState(false);

  useEffect(() => {
    // Triggered only for ios
    const willShowSubscription = Keyboard.addListener(
      'keyboardWillShow',
      () => {
        setKeyboardWillShow(true);
      },
    );
    const didShowSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardDidShow(true);
    });
    // Triggered only for ios
    const willHideSubscription = Keyboard.addListener(
      'keyboardWillHide',
      () => {
        setKeyboardWillShow(false);
      },
    );
    const didHideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardDidShow(false);
    });
    return () => {
      didShowSubscription.remove();
      didHideSubscription.remove();
      willShowSubscription.remove();
      willHideSubscription.remove();
    };
  }, []);

  return {keyboardWillShow, keyboardDidShow};
}
