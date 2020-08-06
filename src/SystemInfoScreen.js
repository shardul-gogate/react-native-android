import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
class SystemInfoScreen extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('androidInfoScreen');
          }}>
          <Text style={styles.androidButton}>Android OS Information</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('iosInfoScreen')}>
          <Text style={styles.iosButton}>iOS Information</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
  },
  androidButton: {
    backgroundColor: '#4be336',
    borderRadius: 7,
    fontSize: 22,
    paddingHorizontal: 12,
    paddingVertical: 3,
  },
  iosButton: {
    backgroundColor: '#000000',
    borderRadius: 7,
    color: 'white',
    fontSize: 22,
    marginTop: 20,
    paddingHorizontal: 50,
    paddingVertical: 3,
  },
});

export default SystemInfoScreen;
