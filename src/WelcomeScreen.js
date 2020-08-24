import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';
import {connect} from 'react-redux';

class WelcomeScreen extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.textView}>Hello and Welcome to React Native</Text>
        <Button
          color="#fbc02d"
          labelStyle={styles.logoutText}
          mode="contained"
          style={styles.logoutButton}
          onPress={() => {
            this.props.navigation.reset({
              index: 0,
              routes: [{name: 'LoginScreen'}],
            });
          }}>
          Logout
        </Button>
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
    fontSize: 20,
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  logoutButton: {
    marginTop: 30,
  },
  logoutText: {
    fontSize: 20,
  },
});

const mapStateToProps = (state) => {
  return {
    username: state.reducer.username,
    email: state.reducer.email,
    phone: state.reducer.phone,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    update: (data) => dispatch({type: 'UPDATE_USER', data: data}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen);
