    import React from 'react';
    import { NavigationContainer } from '@react-navigation/native';
    import { createNativeStackNavigator } from '@react-navigation/native-stack';
    import Login from './components/login/Login'; // Adjust the import path as necessary
    import Home from './components/home/Home'; // Adjust the import path as necessary
    import Register from './components/register/Register'
    import Profile from './components/profile/Profile'
    import Appointments from './components/appointments/Appointments'
    import Messages from './components/messages/Messages'
    import Settings from './components/settings/Settings'
    import DoctorProfile from './components/doctorProfile/DoctorProfile'
    import DoctorAppointments from './components/doctorAppointments/DoctorAppointments'
    import PaymentOption from './components/paymentOption/PaymentOption'
   

    const Stack = createNativeStackNavigator();

    const AppNavigator = () => {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login">
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="Register" component={Register} />
                    <Stack.Screen name="Profile" component={Profile} />
                    <Stack.Screen name="Appointments" component={Appointments} />
                    <Stack.Screen name="Messages" component={Messages} />
                    <Stack.Screen name="Settings" component={Settings} />
                    <Stack.Screen name="DoctorProfile" component={DoctorProfile} />
                    <Stack.Screen name="DoctorAppointments" component={DoctorAppointments} />
                    <Stack.Screen name="PaymentOption" component={PaymentOption} />
                   
                
                    
                </Stack.Navigator>
            </NavigationContainer>
        );
    };

    export default AppNavigator;