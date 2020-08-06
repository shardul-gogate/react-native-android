import React, {Component} from 'react';

import {StyleSheet, View, Text} from 'react-native';

class IOSInfoScreen extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.ios}>IOS</Text>
        <Text style={styles.infoPanel}>
          Created by Apple in 2007{'\n\n'}
          Based on Darwin Kernel{'\n\n'}
          Latest release iOS13
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
  ios: {
    backgroundColor: '#000000',
    borderRadius: 7,
    color: 'white',
    fontSize: 22,
    marginTop: 20,
    paddingHorizontal: 50,
    paddingVertical: 3,
  },
  infoPanel: {
    backgroundColor: 'black',
    borderRadius: 7,
    color: 'white',
    fontSize: 20,
    marginTop: 30,
    padding: 10,
  },
});

export default IOSInfoScreen;
