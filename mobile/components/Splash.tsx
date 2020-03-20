import React from 'react';
import { View, Image } from 'react-native';

export default function Splash() {
  return (
    <View>
      <Image source={require('../assets/splash.gif')} width={50} />
    </View>
  );
}
