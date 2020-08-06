import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';

class ViewInfoScreen extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.infoLabel}>User Profile</Text>
        <Text style={styles.username}>USERNAME: {this.props.username}</Text>
        <Text style={styles.phone}>PHONE: {this.props.phone}</Text>
        <Text style={styles.email}>EMAIL: {this.props.email}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    backgroundColor: '#64b5f6',
    flex: 1,
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
    borderWidth: 2,
    fontSize: 20,
    marginTop: 80,
    paddingHorizontal: 30,
    paddingVertical: 4,
    textAlign: 'center',
  },
  phone: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    fontSize: 20,
    marginTop: 40,
    paddingHorizontal: 30,
    paddingVertical: 4,
    textAlign: 'center',
  },
  email: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    fontSize: 20,
    marginTop: 40,
    paddingHorizontal: 30,
    paddingVertical: 4,
    textAlign: 'center',
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

export default connect(mapStateToProps, mapDispatchToProps)(ViewInfoScreen);
