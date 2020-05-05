import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import Connect from '../Screens/Connect';
import Controller from '../Screens/Controller';
import Visualize from '../Screens/Visualize';

const stack = createStackNavigator()

export function ConnectScreenStack(){
    return(
        <stack.Navigator>
            <stack.Screen name="Connect" component={Connect} options={{
          headerStyle: {
            backgroundColor: '#6F3C89',
          },
          headerTintColor: '#fff',
        }}/>
        </stack.Navigator>
    )
}

export function ControllerScreenStack(){
    return(
        <stack.Navigator>
            <stack.Screen name="Controller" component={Controller} options={{
          headerStyle: {
            backgroundColor: '#6F3C89',
          },
          headerTintColor: '#fff',
        }}/>
        </stack.Navigator>
    )
}

export function VisualizeScreenStack(){
    return(
        <stack.Navigator>
            <stack.Screen name="Visualize" component={Visualize} options={{
          headerStyle: {
            backgroundColor: '#6F3C89',
          },
          headerTintColor: '#fff',
        }}/>
        </stack.Navigator>
    )
}