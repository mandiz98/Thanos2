import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  FlatList
} from 'react-native';
import Colors from "../Colors"
import axios from "axios"

import Svg, {
    Circle,
    Line
} from 'react-native-svg'

//List of dates
const url = "http://thanos2api.herokuapp.com"

export class Visualize extends React.Component {
    
    constructor(props){
        super(props)
    
        this.loadVisualization = this.loadVisualization.bind(this);
        this.getSessions = this.getSessions.bind(this);

        this.state = {
            listData: [],
            locations: [],
            collisions: []
        }   
    }

    componentDidMount(){

        this.getSessions();

        this.props.navigation.addListener('focus', () => {
            this.getSessions()
        })
    }

    async getSessions(){
        axios.get(url + "/sessions")
        .then((result) => {
            console.log("1 ",result.data[0].startDate)
            console.log("2 ",result.data[1].startDate)
            console.log("test", new Date(result.data[2].startDate) - new Date(result.data[1].startDate))
             
            this.setState({listData: result.data.sort(function(a,b){return new Date(b.startDate) - new Date(a.startDate)})})
        })
        .catch((e) => {
            console.log(e)
        })
    }

    async postLocation(){
        axios.post(url + "/newLocation")
        .then((result) => {
            console.log(result.data[1]._id)
             
            this.setState({listData: result.data.reverse()})
        })
        .catch((e) => {
            console.log(e)
        })
    }

    async loadVisualization(session){
        console.log(session)
        let temp = url + "/session/" + session._id
        console.log(temp)
        axios.get(temp)
        .then((result) =>{
            console.log(result.data);
            this.setState({locations: result.data.locations});
            this.setState({collisions: result.data.collisions});
        })
        .catch((e) => {
            console.log(e)
        })
    }

    fixTimeFormat(date){

        var finishedDate = "Date: " + date.getUTCFullYear() + "-" + date.getMonth() + "-" + date.getDate() + ". Time: " + date.getUTCHours() + ":" + date.getUTCMinutes();
        //var finishedDate = date.replace('T','\t').replace()
        return finishedDate
    }
    
    //SVG help functions
    /*makeCircle = function(x,y,r,color){
        var circle = document.createElementNS(`http://www.w3.org/2000/svg`, `circle`);
        circle.setAttribute(`cx`, x);
        circle.setAttribute(`cy`, y);
        circle.setAttribute(`r`, r);
        circle.setAttribute(`fill`, color);
    
        return circle;
    }*/

    

    render(){
        return(
            <View style={styles.body}>
                <View style={styles.container}>
                
                    <ScrollView>
                        {this.state.listData.map((data, index) => 
                            <TouchableOpacity key={index} onPress={() => this.loadVisualization(data)}>
                                <View style={styles.item}>
                                    <Text style = {styles.text}>{this.fixTimeFormat(new Date(data.startDate))}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    </ScrollView>

                </View>
                <View style={styles.container2}>
                    <Svg>
                        {this.state.locations.map((data, index) => 
                            <Circle
                                key={data._id}
                                cx={data.x}
                                cy={data.y}
                                r="5"
                                fill="black"
                            />
                        )}
                        {this.state.collisions.map((data, index) => 
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
}

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