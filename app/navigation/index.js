import React from "react"
import {NavigationContainer} from "@react-navigation/native"
import TabNavigator from "./TabNavigator"

//Create the app container
export default function AppContainer() {
    return(
        <NavigationContainer>
            <TabNavigator/>
        </NavigationContainer>
    )
}