import React ,{useEffect,useState} from 'react';
import { Provider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from './src/core/theme';
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  AttendanceList,
  ScannerScreen,
  CustomHeader,
  History,
  Timeline,
  MenuDashboard,
  Departments
} from './src/screens';
import AdminDashboard from './src/screens/Admin/AdminDashboard';
import {WorkerDashboard,WorkerAttendance,WorkerProfile} from './src/screens/Worker';

import { Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Feed() {
<AdminDashboard/>
}

function Profile() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile!</Text>
    </View>
  );
}

function Notifications() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Notifications!</Text>
    </View>
  );
}



function MyTabs() {
  const [inputValue, setInputValue] = useState('');
  const [storedValue, setStoredValue] = useState(null);
  useEffect(() => {
    // Retrieve session data on app load
    const getSessionData = async () => {
      try {
        const value = await AsyncStorage.getItem('role');
        if (value !== null) {
          setStoredValue(value);
        }
      } catch (e) {
        console.error('Failed to fetch session data', e);
      }
    };

    getSessionData();
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarActiveTintColor: '#121A21',// Active tab icon color
        tabBarStyle: { backgroundColor: '#101b23' }, // Background color for the Tab Bar
        contentStyle: { backgroundColor: '#101b23' }, // Default background color for screen content
        headerStyle: { backgroundColor: '#101b23' }, // Header background color
        headerTintColor: '#fff', // Header text/icon color
      }}
    >
      <Tab.Screen
        name="Feed"
        component={AdminDashboard}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          header: (props) => (
            <CustomHeader {...props} title="Ulti-Met" role={storedValue && storedValue} />
          ),
        }}
        // options={{
          // tabBarLabel: 'Home',
          // tabBarIcon: ({ color, size }) => (
          //   <MaterialCommunityIcons name="home" color={color} size={size} />
          // ),
        // }}
      />

      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarLabel: 'Updates',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="StartScreen"
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#101b23' }, // Default background color
            headerStyle: { backgroundColor: '#101b23' }, // Optional: matching header background
            headerTintColor: '#fff', // Header text color
          }}
        >
          <Stack.Screen name="StartScreen" component={StartScreen}/>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="AttendanceList" component={AttendanceList} />
          <Stack.Screen name="ScannerScreen" component={ScannerScreen} />
          <Stack.Screen name="MenuDashboard" component={MenuDashboard} />
          <Stack.Screen name="WorkerAttendance" component={WorkerAttendance} />
          <Stack.Screen name="Departments" component={Departments} />
          <Stack.Screen name="History" component={History} />
          <Stack.Screen name="AdminDashboard" component={MyTabs} />
          <Stack.Screen name="WorkerDashboard" component={WorkerDashboard} />
          <Stack.Screen name="WorkerProfile" component={WorkerProfile} />
          <Stack.Screen name="Timeline" component={Timeline} />
          
        </Stack.Navigator>
      </NavigationContainer>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </Provider>
  );
}
