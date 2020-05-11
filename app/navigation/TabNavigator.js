import React from "react"
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import {ConnectScreenStack, ControllerScreenStack, VisualizeScreenStack} from "./appStack"
import Icon from 'react-native-vector-icons/Ionicons';


const Tabs = createBottomTabNavigator()
//The function for the bottom tab navigator
export default function TabNavigator(){
    return(
        <Tabs.Navigator
            //Style of tabs
            initialRouteName="connect"
            tabBarOptions={{
                activeTintColor: 'white',
                inactiveTintColor: "#A788A8",
                activeBackgroundColor: "#6F3C89",
                inactiveBackgroundColor: "#6F3C89"
            }}
        >
            {/* Three buttons in bottom navigation bar with icons */}
            <Tabs.Screen name="connect" component={ConnectScreenStack} options={{
                tabBarLabel: 'Connect',
                tabBarIcon: ({ color, size }) => (
                <Icon name={"ios-bluetooth"} color={color} size={size} />
                ),
                }}/>
            <Tabs.Screen name="controller" component={ControllerScreenStack} options={{
                tabBarLabel: 'Controller',
                tabBarIcon: ({ color, size }) => (
                <Icon name={"logo-game-controller-b"} color={color} size={size} />
                ),
                }}
                />
            <Tabs.Screen name="visualize" component={VisualizeScreenStack} options={{
                tabBarLabel: 'Visualize',
                tabBarIcon: ({ color, size }) => (
                <Icon name={"ios-map"} color={color} size={size} />
                ),
                }}
                />
        </Tabs.Navigator>
    )
}