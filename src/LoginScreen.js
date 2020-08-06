import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import {ActivityIndicator} from 'react-native-paper';

class LoginScreen extends Component {
  state = {
    localUsername: '',
    localPassword: '',
    animating: false,
  };
  render() {
    return (
      <View style={styles.mainContainer}>
        <TextInput
          keyboardType="email-address"
          mode="flat"
          label="Email"
          style={styles.emailInput}
          onChangeText={(localUsername) =>
            this.setState({...this.state, localUsername})
          }></TextInput>
        <TextInput
          secureTextEntry={true}
          mode="flat"
          label="Password"
          style={styles.passwordInput}
          onChangeText={(localPassword) =>
            this.setState({...this.state, localPassword})
          }></TextInput>
        <Button
          color="#fbc02d"
          labelStyle={styles.loginText}
          mode="contained"
          style={styles.loginButton}
          onPress={() => {
            this.setState({...this.state, animating: true});
            if (
              this.state.localUsername === '' ||
              this.state.localPassword === ''
            ) {
              alert('None of the field can be left empty');
              this.setState({...this.state, animating: false});
              return;
            }
            auth()
              .signInWithEmailAndPassword(
                this.state.localUsername,
                this.state.localPassword,
              )
              .then(() => {
                this.setState({...this.state, animating: false});
                this.props.navigation.reset({
                  index: 0,
                  routes: [{name: 'WelcomeScreen'}],
                });
              })
              .catch(() => this.setState({...this.state, animating: false}));
          }}>
          Login
        </Button>

        <Button
          onPress={() => {
            this.props.navigation.navigate('RegisterScreen');
          }}
          color="#fbc02d"
          labelStyle={styles.registerText}
          mode="contained"
          style={styles.registerButton}>
          Register
        </Button>
        <ActivityIndicator
          animating={this.state.animating}
          style={{marginTop: 20}}
          color="orange"
          size="large"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    backgroundColor: '#0d47a1',
    flex: 1,
    justifyContent: 'center',
  },
  emailInput: {
    fontSize: 20,
    width: '85%',
  },
  passwordInput: {
    fontSize: 20,
    marginTop: 20,
    width: '85%',
  },
  loginButton: {
    marginTop: 30,
  },
  loginText: {
    fontSize: 20,
  },
  registerButton: {
    marginTop: 30,
  },
  registerText: {
    fontSize: 20,
  },
});

export default LoginScreen;
