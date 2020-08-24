import React, {Component} from 'react';
import {ActivityIndicator} from 'react-native-paper';
import {openDatabase} from 'react-native-sqlite-storage';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';

var db = openDatabase({name: 'userDatabase.db'});

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
      animating: false,
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
              db.transaction((txn) => {
                txn.executeSql(
                  'UPDATE user SET name=?, phone=? where email=?',
                  [this.state.username, this.state.phone, this.state.email],
                  (txn, res) => {
                    console.log(res.rowsAffected);
                  },
                );
              });
              this.props.update(this.state);
              this.setState({...this.state, animating: false});
              this.props.navigation.navigate('ViewInfoScreen');
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
