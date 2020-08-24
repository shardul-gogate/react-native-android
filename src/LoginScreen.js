import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import axios from 'axios';
import {ActivityIndicator} from 'react-native-paper';
import {openDatabase} from 'react-native-sqlite-storage';
import {connect} from 'react-redux';

var db = openDatabase({name: 'userDatabase.db'});

class LoginScreen extends Component {
  state = {
    localUsername: '',
    localPassword: '',
    animating: false,
  };

  validateUser = () => {
    axios
      .get('https://api.npoint.io/ee2990b790b87e18fcdb/users')
      .then((response) => {
        let users = response.data;
        let loginFlag = 0;

        //login via db
        db.transaction((txn) => {
          txn.executeSql('SELECT * FROM user', [], (txn, res) => {
            for (let i = 0; i < res.rows.length; i++) {
              let user = res.rows.item(i);
              if (
                this.state.localUsername === user.email &&
                this.state.localPassword === user.password
              ) {
                loginFlag = 1;
                this.props.update({
                  username: user.username,
                  email: user.email,
                  phone: user.phone,
                });
                this.setState({...this.state, animating: false});
                this.props.navigation.reset({
                  index: 0,
                  routes: [{name: 'WelcomeScreen'}],
                });
              }
              if (loginFlag === 0) {
                this.setState({...this.state, animating: false});
                alert(
                  'Uername and password did not match any existing records',
                );
              }
            }
          });
          return;
        });

        //login via axios
        for (let i = 0; i < users.length; i++) {
          let user = users[i];
          if (
            this.state.localUsername === user.email &&
            this.state.localPassword === user.password
          ) {
            loginFlag = 1;
            db.transaction((txn) => {
              txn.executeSql('DROP TABLE IF EXISTS user', [], (txn, res) => {
                console.log(res);
              });
              txn.executeSql(
                'CREATE TABLE IF NOT EXISTS user(email varchar(50) PRIMARY KEY, name varchar(50) NOT NULL, password varchar(50) NOT NULL, phone varchar(10) NOT NULL) ',
                [],
                (txn, res) => {
                  console.log(res);
                },
              );
              txn.executeSql(
                'INSERT INTO users (email, name, password, phone) VALUES (?, ?, ?, ?)',
                [user.email, user.username, user.password, user.phone],
                (txn, res) => {
                  console.log(res.rowsAffected);
                },
              );
            });
            this.props.update({
              username: user.username,
              email: user.email,
              phone: user.phone,
            });
            this.setState({...this.state, animating: false});
            this.props.navigation.reset({
              index: 0,
              routes: [{name: 'WelcomeScreen'}],
            });
          }
        }
        if (loginFlag === 0) {
          this.setState({...this.state, animating: false});
          alert('Uername and password did not match any existing records');
        }
      })
      .catch((error) => console.log(error));
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
            this.validateUser();
          }}>
          Login
        </Button>

        <Button
          onPress={() => {
            alert('under construction');
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
