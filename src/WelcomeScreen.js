import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {connect} from 'react-redux';

class WelcomeScreen extends Component {
  state = {
    username: '',
    email: '',
    phone: '',
  };
  setUserData = () => {
    firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .get()
      .then((documentSnapshot) => {
        this.setState({
          username: documentSnapshot.get('username'),
          email: auth().currentUser.email,
          phone: documentSnapshot.get('phone'),
        });
        this.props.update(this.state);
      })
      .catch((error) => console.log(error));
  };
  render() {
    return (
      <View style={styles.mainContainer}>
        {this.setUserData()}
        <Text style={styles.textView}>Hello and Welcome to React Native</Text>
        <Button
          color="#fbc02d"
          labelStyle={styles.logoutText}
          mode="contained"
          style={styles.logoutButton}
          onPress={() => {
            auth()
              .signOut()
              .then(() => {
                this.props.navigation.reset({
                  index: 0,
                  routes: [{name: 'LoginScreen'}],
                });
              })
              .catch();
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
