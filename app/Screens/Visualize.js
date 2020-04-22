import React, {useEffect, useState} from 'react';
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
} from 'react-native-svg'
import { connect } from "react-redux"
import { getSessions } from "../store/actions/sessions"
import { SwipeListView } from 'react-native-swipe-list-view';

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

    const adjustCoordinates = (layout) => {
        
        console.log(layout);
        let viewProportions = layout.height/layout.width;

        let xMin = Infinity;
        let xMax = -Infinity;
        let yMin = Infinity;
        let yMax = -Infinity;

        for(const location of locations){
            if(location.x < xMin){
                xMin = location.x
            }
            if(location.x > xMax){
                xMax = location.x
            }
            if(location.y < yMin){
                yMin = location.y
            }
            if(location.y > yMax){
                yMax = location.y
            }
        }
        for(const collision of collisions){
            if(collision.x < xMin){
                xMin = collision.x
            }
            if(collision.x > xMax){
                xMax = collision.x
            }
            if(collision.y < yMin){
                yMin = collision.y
            }
            if(collision.y > yMax){
                yMax = collision.y
            }
        }

        let coordHeight = yMax-yMin;
        let coordWidth = xMax-xMin;
        let coordProportions = coordHeight/coordWidth;

        let factor;

        if(viewProportions > coordProportions){
            //view wider than coords
            factor = layout.height/coordHeight;
        }
        else{
            //view narrower than coords
            factor = layout.width/coordWidth;
        }

        for(const location of locations){
            location.x = factor*location.x - xMin;
            location.y = factor*location.y - yMin;
        }
        for(const collision of collisions){
            collision.x = factor*collision.x - xMin;
            collision.y = factor*collision.y - yMin;
        }
    }
    const loadVisualization = (item) => {
        setLocations(item.locations)
        setCollisions(item.collisions)
    }
    // TODO
    const deleteItem = (item) => {
        console.log("DELETED", item._id)
    }

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

    return(
        <View style={styles.body}>
            <View style={styles.container}>
                <SwipeListView
                    data={state.sessions.sessions}
                    renderItem={renderItem}
                    renderHiddenItem={renderHiddenItem}
                    rightOpenValue={-75}
                    keyExtractor={item => item._id}
                    
                />

                </View>
                <View style={styles.container2} /*onLayout={(event) => {adjustCoordinates(event.nativeEvent.layout)}}*/>
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
                                r="10"
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

