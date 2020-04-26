/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */

import React, { useState, useEffect } from 'react';
import 'react-native-gesture-handler';
// import { AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import MapContainer from './components/MapContainer';
import MarkerFormContainer from './components/MarkerFormContainer';
import UserContext from './UserContext';
import { getUserById } from './services';

const Tab = createBottomTabNavigator();
const App = () => {
  const [user, setUser] = useState();


  // havent tested this!
  // const getUserFromAsyncStorage = async () => {
  //   try {
  //     const userData = await AsyncStorage.getItem('user');
  //     if (userData) setUser(userData);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // TODO - replace this with getUserFromAsyncStorage
  const getUserFromBackend = async () => {
    const userData = await getUserById('5ea58198fd0b655a951bb461');
    setUser(userData);
  };

  useEffect(() => {
    getUserFromBackend();
  }, []);

  return (
    <UserContext.Provider value={user}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Marker"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;
              if (route.name === 'Map') {
                iconName = 'ios-map';
              } else {
                iconName = 'ios-list';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
          }}
        >
          <Tab.Screen name="Map">
            {(props) => <MapContainer {...props} />}
          </Tab.Screen>
          <Tab.Screen name="Marker">
            {(props) => <MarkerFormContainer {...props} />}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
};

export default App;
