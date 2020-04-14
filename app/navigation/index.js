import React from "react"
import {NavigationContainer} from "@react-navigation/native"
import TabNavigator from "./TabNavigator"

export default function AppContainer() {
    return(
        <NavigationContainer>
            <TabNavigator/>
        </NavigationContainer>
    )
}