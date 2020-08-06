import React, {Component} from 'react';
import {ActivityIndicator} from 'react-native-paper';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {connect} from 'react-redux';

class EditInfoScreen extends Component {
  state = {
    username: this.props.username,
    email: this.props.email,
    phone: this.props.phone,
    animating: false,
  };

  resetState = () => {
    this.setState({
      username: this.props.username,
      email: this.props.email,
      phone: this.props.phone,
    });
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.infoLabel}>Edit User Profile</Text>
        <TextInput
          style={styles.username}
          value={this.state.username}
          placeholder="USERNAME"
          onChangeText={(username) => this.setState({...this.state, username})}
        />
        <TextInput
          style={styles.phone}
          placeholder="PHONE"
          value={this.state.phone}
          onChangeText={(phone) => this.setState({...this.state, phone})}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              this.setState({...this.state, animating: true});
              if (this.state.username === '' || this.state.phone === '') {
                alert('None of the field can be left empty');
                this.setState({...this.state, animating: false});
                return;
              }
              firestore()
                .collection('users')
                .doc(auth().currentUser.uid)
                .update({
                  username: this.state.username,
                  phone: this.state.phone,
                })
                .then(() => {
                  this.setState({...this.state, animating: false});
                  alert('User updated');
                  this.props.navigation.navigate('ViewInfoScreen');
                })
                .catch((error) => console.log(error));
              this.props.update(this.state);
            }}>
            <Text style={styles.saveButton}>SAVE</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.resetState();
              this.props.navigation.navigate('ViewInfoScreen');
            }}>
            <Text style={styles.cancelButton}>CANCEL</Text>
          </TouchableOpacity>
        </View>
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
    backgroundColor: '#e53935',
    flex: 1,
    justifyContent: 'center',
  },
  infoLabel: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    fontSize: 28,
    marginTop: 80,
    textAlign: 'center',
    width: '100%',
  },
  username: {
    backgroundColor: '#ffffff',
    borderRadius: 7,
    borderWidth: 2,
    fontSize: 20,
    marginTop: 20,
    paddingVertical: 3,
    textAlign: 'center',
    width: '85%',
  },
  password: {
    backgroundColor: '#ffffff',
    borderRadius: 7,
    borderWidth: 2,
    fontSize: 20,
    marginTop: 20,
    paddingVertical: 3,
    textAlign: 'center',
    width: '85%',
  },
  phone: {
    backgroundColor: '#ffffff',
    borderRadius: 7,
    borderWidth: 2,
    fontSize: 20,
    marginTop: 20,
    paddingVertical: 3,
    textAlign: 'center',
    width: '85%',
  },
  email: {
    backgroundColor: '#ffffff',
    borderRadius: 7,
    borderWidth: 2,
    fontSize: 20,
    marginTop: 20,
    paddingVertical: 3,
    textAlign: 'center',
    width: '85%',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 50,
  },
  saveButton: {
    backgroundColor: '#fbc02d',
    borderRadius: 8,
    fontSize: 20,
    textTransform: 'uppercase',
    paddingHorizontal: 40,
    paddingVertical: 2,
  },
  cancelButton: {
    backgroundColor: '#29b6f6',
    borderRadius: 8,
    fontSize: 20,
    marginLeft: 30,
    paddingHorizontal: 35,
    paddingVertical: 2,
    textTransform: 'uppercase',
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

export default connect(mapStateToProps, mapDispatchToProps)(EditInfoScreen);
