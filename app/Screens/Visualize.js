//Imports
import React, {ToastAndroid, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import Colors from "../Colors"

import Svg, {
    Circle,
    Line
} from 'react-native-svg'
import { connect } from "react-redux"
import { getSessions, deleteSession } from "../store/actions/sessions"
import { SwipeListView } from 'react-native-swipe-list-view';

const Visualize = (state) => {
    // Calls the redux action "getSessions"
    useEffect(() => {
        state.getSessions()
    }, [state.getSessions])

    // Initial states of locations and collisions
    const [locations, setLocations] = useState([{
    }])
    const [collisions, setCollisions] = useState([{
    }])
    

    const fixTimeFormat = (date) => {
        var finishedDate = "Date: " + date.getUTCFullYear() + "-" + date.getMonth() + "-" + date.getDate() + ". Time: " + date.getUTCHours() + ":" + date.getUTCMinutes();
        return finishedDate
    }

    // This will update the locations and collisions state of this react component
    const loadVisualization = (item) => {
        setLocations(item.locations)
        setCollisions(item.collisions)
    }

    // Removes a session
    const deleteItem = (item) => {
        state.deleteSession(item._id)
    }

    // This is the delete button and the logic to remove when sliding a session in the list.
    const renderHiddenItem = (data) => (
        <View style={styles.rowBack}>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                onPress={() => deleteItem(data.item)}
            >
                <Text style={styles.backTextWhite}>Delete</Text>
            </TouchableOpacity>
        </View>
    );

    // This is a single session in the list.
    const renderItem = data => (
        <TouchableHighlight
            onPress={() => loadVisualization(data.item)}
            underlayColor={'#fff'}
        >
            <View style={styles.item}>
                <Text style={styles.text}>{fixTimeFormat(new Date(data.item.startDate))}</Text>
            </View>
        </TouchableHighlight>
    );


    const fixCoordinates = (locations, collisions) => {
        if(locations.length < 2){
            return({
                locations: [{}],
                collisions: [{}],
                aspectRatio: 1
            });
        }

        let xMin = Infinity;
        let xMax = -Infinity;
        let yMin = Infinity;
        let yMax = -Infinity;

        for(const location of locations){
            if(location.x < xMin){
                xMin = location.x;
            }
            if(location.x > xMax){
                xMax = location.x;
            }
            if(location.y < yMin){
                yMin = location.y;
            }
            if(location.y > yMax){
                yMax = location.y;
            }
        }
        for(const collision of collisions){
            if(collision.x < xMin){
                xMin = collision.x;
            }
            if(collision.x > xMax){
                xMax = collision.x;
            }
            if(collision.y < yMin){
                yMin = collision.y;
            }
            if(collision.y > yMax){
                yMax = collision.y;
            }
        }


        let xDiff = xMax-xMin;
        let yDiff = yMax-yMin;

        let aspectRatio = xDiff/yDiff;

        const width = 1000*Math.sqrt(aspectRatio);
        const height = 1000/Math.sqrt(aspectRatio);

        

        const xMargin = 0.1*width;
        const yMargin = 0.1*height;
        //on each side

        const xFactor = (width - 2*xMargin)/xDiff;
        const yFactor = (height - 2*yMargin)/yDiff;

        let newLocations = locations;
        let newCollisions = collisions;

        for(const location of newLocations){
            location.x = (location.x - xMin) * xFactor + xMargin;
            location.y = (location.y - yMin) * yFactor + yMargin;
        }
        for(const collision of newCollisions){
            collision.x = (collision.x - xMin) * xFactor + xMargin;
            collision.y = (collision.y - yMin) * yFactor + yMargin;
        }

        
        let returnObject = {
            locations: newLocations,
            collisions: newCollisions,
            aspectRatio: aspectRatio
        };
        //console.log("returnObject from viz", returnObject);
        return returnObject;
    };

    let locationsCopy = JSON.parse(JSON.stringify(locations));
    let collisionsCopy = JSON.parse(JSON.stringify(collisions));
    //Converting to JSON and back does a "deep copy" of the array, removing all references to the original. Per https://medium.com/javascript-in-plain-english/how-to-deep-copy-objects-and-arrays-in-javascript-7c911359b089
    let returnObject = fixCoordinates(locationsCopy, collisionsCopy);

    let lines = [];
    for(let i = 1; i < returnObject.locations.length; i++){
        lines.push(<Line x1={returnObject.locations[i-1].x} y1={returnObject.locations[i-1].y} x2={returnObject.locations[i].x} y2={returnObject.locations[i].y} stroke="black" strokeWidth="30"/>)
    }
    return(
        <View style={styles.body}>
            <View style={styles.container}>
                {/* Will render a scrollable and swipable list with data */}
                <SwipeListView
                    data={state.sessions.sessions}
                    renderItem={renderItem}
                    renderHiddenItem={renderHiddenItem}
                    rightOpenValue={-75}
                    keyExtractor={item => item._id}
                    
                />

                </View>
            <View style={styles.container2}>
                <View>
                    <View style={{
                        width: '100%',
                        height: '100%',
                        alignItems: 'center'
                    }}
                    >
                        {/* Draws locations (black svg circles) and collisions (red svg circles) using the state that was updated when a session is clicked in the list  */}
                            <Svg height="100%" width="100%" viewBox={`0 0 ${1000*Math.sqrt(returnObject.aspectRatio)} ${1000/Math.sqrt(returnObject.aspectRatio)}`}>
                                {lines}
                                {returnObject.locations.map((data, index) =>
                                    <Circle
                                        key={data._id}
                                        cx={data.x}
                                        cy={data.y}
                                        r="20"
                                        fill="black"
                                    />
                                )}
                                {returnObject.collisions.map((data, index) =>
                                    <Circle
                                        key={data._id}
                                        cx={data.x}
                                        cy={data.y}
                                        r="20"
                                        fill="red"
                                    />
                                )}
                            </Svg>
                    </View>
                </View>
            </View>
        </View>
    )
}

// This enables access to the variables in the redux reducers to this react component.
const mapStateToProps = state => ({
    sessions: state.sessions
})

// This connects this react component to the redux store
export default connect(mapStateToProps, {getSessions, deleteSession})(Visualize)

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
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnRight: {
        marginEnd: 5,
        backgroundColor: 'red',
        right: 0,
    },
    backTextWhite: {
        color: '#FFF',
    },
    rowBack: {
        margin: 5,
        borderRadius: 5,
        alignItems: 'center',
        backgroundColor: 'red',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
})

