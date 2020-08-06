import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';

class AndroidInfoScreen extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.android}>Android OS</Text>
        <Text style={styles.infoPanel}>
          Created by Google in 2008{'\n\n'}
          Based on Linux Kernel{'\n\n'}
          Latest release Android 10
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
  },
  android: {
    backgroundColor: '#4be336',
    borderRadius: 7,
    fontSize: 22,
    paddingHorizontal: 12,
    paddingVertical: 3,
  },
  infoPanel: {
    backgroundColor: '#4be336',
    borderRadius: 7,
    fontSize: 20,
    marginTop: 30,
    padding: 10,
  },
});

export default AndroidInfoScreen;
