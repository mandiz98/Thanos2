import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList
} from 'react-native';
import Colors from "../Colors"

import Svg, {
    Circle,
} from 'react-native-svg'
import { connect } from "react-redux"
import { getSessions } from "../store/actions/sessions"

const Visualize = (state) => {
    useEffect(() => {
        state.getSessions()
    }, [state.getSessions])

    const [locations, setLocations] = useState([{
        _id: "",
        x: null,
        y: null,
    }])
    const [collisions, setCollisions] = useState([{
        _id: "",
        x: null,
        y: null
    }])


    const fixTimeFormat = (date) => {
        var finishedDate = "Date: " + date.getUTCFullYear() + "-" + date.getMonth() + "-" + date.getDate() + ". Time: " + date.getUTCHours() + ":" + date.getUTCMinutes();
        return finishedDate
    }

    const loadVisualization = (item) => {
        setLocations(item.locations)
        setCollisions(item.collisions)
    }

    return(
        <View style={styles.body}>
            <View style={styles.container}>
                <FlatList
                    data={state.sessions.sessions}
                    keyExtractor={item => item._id}
                    renderItem={({item}) =>(
                        <TouchableOpacity onPress={() => loadVisualization(item)}>
                            <View style={styles.item}>
                                <Text style = {styles.text}>{fixTimeFormat(new Date(item.startDate))}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />

            </View>
            <View style={styles.container2}>
                <Svg>
                    {locations.map((data, index) => 
                        <Circle
                            key={data._id}
                            cx={data.x}
                            cy={data.y}
                            r="5"
                            fill="black"
                        />
                    )}
                    {collisions.map((data, index) => 
                        <Circle
                            key={data._id}
                            cx={data.x}
                            cy={data.y}
                            r="10d"
                            fill="red"
                        />
                    )} 
                    </Svg>
            </View>
        </View>
    )
}

const mapStateToProps = state => ({
    sessions: state.sessions
})

export default connect(mapStateToProps, {getSessions})(Visualize)

const styles = StyleSheet.create({
    body: {
        flex: 1
    },
    container: {
        flex: 1,
        paddingTop: 10,
        borderWidth: 2,
        borderColor: Colors.purple,
    },
    container2: {
        flex: 2,
        paddingBottom: 10,
        borderWidth: 2,
        borderColor: Colors.purple,
    },
    item: {
        padding: 5,
        marginStart: 5,
        marginEnd: 5,
        borderWidth: 2,
        borderColor: Colors.lavender,
        borderRadius: 5,
        height: 45,
        paddingLeft: 10,
        marginBottom: 5,
        backgroundColor: Colors.lavender
    },
    text: {
        fontSize: 20,
        color: Colors.white,
        fontWeight: "bold",
        textAlignVertical: "center"
    }
})

