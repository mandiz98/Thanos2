import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity 
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';


export class Controller extends React.Component {
    
    constructor(props){
        super(props)
    
        this.clickUp = this.clickUp.bind(this);
        this.clickLeft = this.clickLeft.bind(this);
        this.clickDown = this.clickDown.bind(this);
        this.clickRight = this.clickRight.bind(this);
        this.clickAuto = this.clickAuto.bind(this);
      }

      // är det rätt?
      async clickUp(){

      }

      async clickLeft(){

      }

      async clickRight(){
          
      }

      async clickDown(){

      }

      async clickAuto(){

      }

    render(){
        return(
            
            <View style = {styles.row}>
                <StatusBar backgroundColor = '#6F3C89' />
                
                <View>
                    <TouchableOpacity style={styles.upView} onPress={this.clickUp}>
                        <Icon style={styles.upBtn} name={"ios-arrow-up"} color={"white"} size={2} />
                    </TouchableOpacity> 
                </View>

                <View style={styles.leftRightView} >
                    <TouchableOpacity onPress={this.clickAuto}>
                        <Text style={styles.autoBtn}> AUTO </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.clickLeft}>
                        <Icon style={styles.leftBtn} name={"ios-arrow-back"} color={"white"} size={2} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.clickRight}>
                        <Icon style={styles.rightBtn} name={"ios-arrow-forward"} color={"white"} size={2} />
                    </TouchableOpacity>
                </View>
            
                <View>
                    <TouchableOpacity style={styles.downView} onPress={this.clickDown}>
                        <Icon style={styles.downBtn} name={"ios-arrow-down"} color={"white"} size={2} />
                    </TouchableOpacity>                                           
                </View>

            </View>
        )
    }
};

const styles = StyleSheet.create({
    row: {
        flex: 1,
        backgroundColor: "#f1f1f1"
    },
    leftRightView: {
        flex:1,
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: "10%",
    },
    upView: {
        flex: 1,
        marginTop: "95%",
        alignSelf: "flex-end",
        marginEnd: "20%"
    },
    downView: {
        marginBottom: "2%",
        alignSelf: "flex-end",
        marginEnd: "20%"
    },
    leftBtn: {
        fontSize: 30,
        borderWidth: 2,
        borderColor: "white",
        backgroundColor: "#A788A8",
        width: 50,
        height: 50,
        textAlign: "center",
        borderRadius: 10,
        marginTop: "5%",
        marginStart: "27%",
        textAlignVertical: "center"
    },
    rightBtn: {
        fontSize: 30,
        borderWidth: 2,
        borderColor: "white",
        backgroundColor: "#A788A8",
        width: 50,
        height: 50,
        textAlign: "center",
        borderRadius: 10,
        marginEnd: "14%",
        marginTop: "7%",
        textAlignVertical: "center"
    },
    upBtn: {
        fontSize: 30,
        borderWidth: 2,
        borderColor: "white",
        backgroundColor: "#A788A8",
        width: 50,
        height: 50,
        textAlign: "center",
        borderRadius: 10,
        marginTop: "-2%",
        textAlignVertical: "center"
    },
    downBtn: {
        fontSize: 30,
        borderWidth: 2,
        borderColor: "white",
        backgroundColor: "#A788A8",
        width: 50,
        height: 50,
        textAlign: "center",
        borderRadius: 10,
        textAlignVertical: "center"
    },
    autoBtn: {
        fontSize: 30,
        borderWidth: 2,
        height: 50,
        borderColor: "white",
        color: "white",
        backgroundColor: '#A788A8',
        textAlign: "center",
        textAlignVertical: "center",
        marginStart: "20%",
        marginTop: "5%",
        borderRadius: 10,
        borderColor: "white"
    }
  });
