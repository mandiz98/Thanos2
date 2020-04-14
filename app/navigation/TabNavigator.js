import React from "react"
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import {ConnectScreenStack, ControllerScreenStack, VisualizeScreenStack} from "./appStack"

const Tabs = createBottomTabNavigator()

export default function TabNavigator(){
    return(
        <Tabs.Navigator>
            <Tabs.Screen name="connect" component={ConnectScreenStack}/>
            <Tabs.Screen name="controller" component={ControllerScreenStack}/>
            <Tabs.Screen name="visuasfads" component={VisualizeScreenStack}/>
        </Tabs.Navigator>
    )
}