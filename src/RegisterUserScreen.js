import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {ActivityIndicator} from 'react-native-paper';

class RegisterUserScreen extends Component {
  state = {
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    phone: '',
    animating: false,
  };
  render() {
    return (
      <View style={styles.mainContainer}>
        <TextInput
          keyboardType="email-address"
          mode="flat"
          onChangeText={(email) => this.setState({...this.state, email})}
          label="Email"
          style={styles.emailInput}
        />
        <TextInput
          secureTextEntry={true}
          autoCapitalize={false}
          mode="flat"
          onChangeText={(password) => this.setState({...this.state, password})}
          label="Password"
          style={styles.passwordInput}
        />
        <TextInput
          autoCapitalize={false}
          label="Confirm Password"
          mode="flat"
          onChangeText={(confirmPassword) =>
            this.setState({...this.state, confirmPassword})
          }
          secureTextEntry={true}
          style={styles.passwordInput}
        />
        <TextInput
          mode="flat"
          onChangeText={(username) => this.setState({...this.state, username})}
          label="Username"
          style={styles.usernameInput}
        />
        <TextInput
          keyboardType="numeric"
          mode="flat"
          onChangeText={(phone) => this.setState({...this.state, phone})}
          label="Phone"
          style={styles.phoneInput}
        />
        <Button
          onPress={() => {
            this.setState({...this.state, animating: true});
            let pattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(\)<>,./?]).{8,32}$/;
            if (!pattern.test(this.state.password)) {
              alert(
                'Password must contain atleast 1 capital letter, small letter, special character, and digit, and must be minimum 8 characters in length',
              );
              this.setState({...this.state, animating: false});
              return;
            }
            if (
              this.state.email === '' ||
              this.state.password === '' ||
              this.state.confirmPassword === '' ||
              this.state.username === '' ||
              this.state.phone === ''
            ) {
              alert('None of the field can be left empty');
              this.setState({...this.state, animating: false});
              return;
            }
            if (this.state.password !== this.state.confirmPassword) {
              alert('Passwords do not match');
              this.setState({...this.state, animating: false});
              return;
            }
            auth()
              .createUserWithEmailAndPassword(
                this.state.email,
                this.state.password,
              )
              .then(() => {
                firestore()
                  .collection('users')
                  .doc(auth().currentUser.uid)
                  .set({
                    username: this.state.username,
                    phone: this.state.phone,
                  })
                  .then(() => {
                    this.setState({...this.state, animating: false});
                    this.props.navigation.reset({
                      index: 0,
                      routes: [{name: 'WelcomeScreen'}],
                    });
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              })
              .catch((error) => {
                console.log(error);
              });
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
  usernameInput: {
    fontSize: 20,
    marginTop: 20,
    width: '85%',
  },
  passwordInput: {
    fontSize: 20,
    marginTop: 20,
    width: '85%',
  },
  emailInput: {
    fontSize: 20,
    width: '85%',
  },
  phoneInput: {
    fontSize: 20,
    marginTop: 20,
    width: '85%',
  },
  registerButton: {
    marginTop: 50,
  },
  registerText: {
    fontSize: 20,
  },
});

export default RegisterUserScreen;
