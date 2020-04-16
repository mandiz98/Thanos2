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

//List of dates
const url = "http://thanos2api.herokuapp.com"

export class Visualize extends React.Component {
    
    constructor(props){
        super(props)
    
        this.loadVisualization = this.loadVisualization.bind(this);
        this.getSessions = this.getSessions.bind(this);

        this.state = {
            listData: []
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
            console.log(result.data[1]._id)
             
            this.setState({listData: result.data.reverse()})
        })
        .catch((e) => {
            console.log(e)
        })
    }

    async loadVisualization(){
        console.log("hej")
    }

    fixTimeFormat(date){

        var finishedDate = "Date: " + date.getUTCFullYear() + "/" + date.getMonth() + "/" + date.getDay() + ". Time: " + date.getUTCHours() + ":" + date.getUTCMinutes();
        
        return finishedDate
    }

    render(){
        return(
            <View style={styles.body}>
                <View style={styles.container}>
                
                    <ScrollView>
                        {this.state.listData.map((data, index) => 
                            <TouchableOpacity key={index} onPress={this.loadVisualization}>
                                <View style={styles.item}>
                                    <Text style = {styles.text}>{this.fixTimeFormat(new Date(Date.parse(data.startDate)))}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    </ScrollView>

                </View>
                <View style={styles.container2}>

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