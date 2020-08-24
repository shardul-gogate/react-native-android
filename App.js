import React, {Component} from 'react';
import {StyleSheet, StatusBar, Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {Provider} from 'react-redux';
import LoginScreen from './src/LoginScreen';
import WelcomeScreen from './src/WelcomeScreen';
import ViewInfoScreen from './src/ViewInfoScreen';
import EditInfoScreen from './src/EditInfoScreen';
import AccessInfoScreen from './src/AccessInfoScreen';
import AndroidInfoScreen from './src/AndroidInfoScreen';
import IOSInfoScreen from './src/IosInfoScreen';
import SystemInfoScreen from './src/SystemInfoScreen';
import RegisterUserScreen from './src/RegisterUserScreen';
import store from './src/ReduxStore';
import axios from 'axios';

const BottomTabNav = createBottomTabNavigator();
const StackNav = createStackNavigator();
const MaterialBottomNav = createMaterialBottomTabNavigator();
const MaterialTopNav = createMaterialTopTabNavigator();

export default class App extends Component {
  createLoginStackNav = () => (
    <StackNav.Navigator headerMode="none">
      <StackNav.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{title: 'Login'}}
      />
      <StackNav.Screen
        name="RegisterScreen"
        component={RegisterUserScreen}
        options={{title: 'Register'}}
      />
      <StackNav.Screen
        name="WelcomeScreen"
        component={this.createMainTabNav}
        options={{title: 'Home'}}
      />
    </StackNav.Navigator>
  );

  createMainTabNav = () => (
    <MaterialBottomNav.Navigator>
      <MaterialBottomNav.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={{title: 'Home'}}
      />
      <MaterialBottomNav.Screen
        name="SystemInfoScreen"
        component={this.createSystemStackNav}
        options={{title: 'Systems'}}
      />
      <MaterialBottomNav.Screen
        name="AccessInfoScreen"
        component={this.createUserStackNav}
        options={{title: 'User Info'}}
      />
    </MaterialBottomNav.Navigator>
  );

  createUserStackNav = () => (
    <StackNav.Navigator>
      <StackNav.Screen
        name="AccessInfoScreen"
        component={AccessInfoScreen}
        options={{title: 'User Info'}}
      />

      <StackNav.Screen
        name="EditInfoScreen"
        children={this.createUserTabNav}
        options={{title: 'User Info'}}
      />
    </StackNav.Navigator>
  );

  createUserTabNav = () => (
    <MaterialTopNav.Navigator>
      <MaterialTopNav.Screen
        name="ViewInfoScreen"
        component={ViewInfoScreen}
        options={{title: 'View User'}}
      />
      <MaterialTopNav.Screen
        name="EditInfoScreen"
        component={EditInfoScreen}
        options={{title: 'Edit User'}}
      />
    </MaterialTopNav.Navigator>
  );

  createSystemTabNav = () => (
    <BottomTabNav.Navigator>
      <BottomTabNav.Screen
        name="androidInfoScreen"
        component={AndroidInfoScreen}
        options={{title: 'Android OS'}}
      />
      <BottomTabNav.Screen
        name="iosInfoScreen"
        component={IOSInfoScreen}
        options={{title: 'Apple iOS'}}
      />
    </BottomTabNav.Navigator>
  );

  createSystemStackNav = () => (
    <StackNav.Navigator>
      <StackNav.Screen
        name="systemInfoScreen"
        component={SystemInfoScreen}
        options={{title: 'Systems'}}
      />
      <StackNav.Screen
        name="androidInfoScreen"
        component={this.createSystemTabNav}
        options={{title: 'Systems'}}
      />
      <StackNav.Screen
        name="iosInfoScreen"
        component={IOSInfoScreen}
        options={{title: 'Apple iOS'}}
      />
    </StackNav.Navigator>
  );

  render() {
    return (
      <Provider store={store}>
        <StatusBar barStyle="light-content" backgroundColor="black" />
        <NavigationContainer>{this.createLoginStackNav()}</NavigationContainer>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    flex: 1,
  },
});
