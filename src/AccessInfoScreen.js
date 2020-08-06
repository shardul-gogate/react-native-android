import React, {Component} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';

class WelcomeScreen extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('EditInfoScreen')}>
          <Text style={styles.textView}>Click here for user profile</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    flex: 1,
    justifyContent: 'center',
  },
  textView: {
    backgroundColor: 'red',
    borderRadius: 8,
    borderWidth: 2,
    paddingHorizontal: 30,
    paddingVertical: 20,
    fontSize: 20,
    textAlign: 'center',
    width: 250,
  },
});

export default WelcomeScreen;
