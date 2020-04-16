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
import Colors from "../Colors"
import { stringToBytes } from 'convert-string';
import BleManager from "react-native-ble-manager"


import Icon from 'react-native-vector-icons/Ionicons';

const MAC = '00:1B:10:65:FA:CC'
const characteristicID = 'e3dd50bf-f7a7-4e99-838e-570a086c666b'
const serviceID = '9e5d1e47-5c13-43a0-8635-82ad38a1386f'

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
        const data = stringToBytes('1');

        BleManager.retrieveServices(MAC).then((peripheralInfo) => {
                  
            setTimeout(() => {
              BleManager.startNotification(MAC, serviceID, characteristicID).then(() => {
                console.log('Started notification on ' + MAC);
                setTimeout(() => {
                  BleManager.write(MAC, "ffe1", "ffe3", data).then(() => {
                    console.log("Success Write");
                    
                  }).catch((e) => {
                    console.log(e)
                  });
      
                }, 0);
              }).catch((error) => {
                console.log('Notification error', error);
              });
            }, 0);
          });
      }

      async clickLeft(){
        const data = stringToBytes('2');

        BleManager.retrieveServices(MAC).then((peripheralInfo) => {
                  
            setTimeout(() => {
              BleManager.startNotification(MAC, serviceID, characteristicID).then(() => {
                console.log('Started notification on ' + MAC);
                setTimeout(() => {
                  BleManager.write(MAC, "ffe1", "ffe3", data).then(() => {
                    console.log("Success Write");
                    
                  }).catch((e) => {
                    console.log(e)
                  });
      
                }, 0);
              }).catch((error) => {
                console.log('Notification error', error);
              });
            }, 0);
          });
        
      }

      async clickRight(){
        const data = stringToBytes('3');

        BleManager.retrieveServices(MAC).then((peripheralInfo) => {
                  
            setTimeout(() => {
              BleManager.startNotification(MAC, serviceID, characteristicID).then(() => {
                console.log('Started notification on ' + MAC);
                setTimeout(() => {
                  BleManager.write(MAC, "ffe1", "ffe3", data).then(() => {
                    console.log("Success Write");
                    
                  }).catch((e) => {
                    console.log(e)
                  });
      
                }, 0);
              }).catch((error) => {
                console.log('Notification error', error);
              });
            }, 0);
          });
          
      }

      async clickDown(){
        const data = stringToBytes('5');

        BleManager.retrieveServices(MAC).then((peripheralInfo) => {
                  
            setTimeout(() => {
              BleManager.startNotification(MAC, serviceID, characteristicID).then(() => {
                console.log('Started notification on ' + MAC);
                setTimeout(() => {
                  BleManager.write(MAC, "ffe1", "ffe3", data).then(() => {
                    console.log("Success Write");
                    
                  }).catch((e) => {
                    console.log(e)
                  });
      
                }, 0);
              }).catch((error) => {
                console.log('Notification error', error);
              });
            }, 0);
          });

      }

      async clickAuto(){

      }

    render(){
        return(
            <View style = {styles.container}>
                <View style = {styles.box}>

                </View>
                <View style = {styles.row}>
                    <StatusBar backgroundColor = {Colors.purple} />
                    
                    <View style={styles.upView}>
                        <TouchableOpacity onPress={this.clickUp}>
                            <Icon style={styles.upBtn} name={"ios-arrow-up"} color={Colors.white} size={2} />
                        </TouchableOpacity> 
                    </View>

                    <View style={styles.leftRightView} >

                        <TouchableOpacity onPress={this.clickRight}>
                            <Icon style={styles.rightBtn} name={"ios-arrow-forward"} color={Colors.white} size={2} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={this.clickLeft}>
                            <Icon style={styles.leftBtn} name={"ios-arrow-back"} color={Colors.white} size={2} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={this.clickAuto}>
                            <Text style={styles.autoBtn}> AUTO </Text>
                        </TouchableOpacity>
                        
                    </View>
                
                    <View style={styles.downView}>
                        <TouchableOpacity  onPress={this.clickDown}>
                            <Icon style={styles.downBtn} name={"ios-arrow-down"} color={Colors.white} size={2} />
                        </TouchableOpacity>                                           
                    </View>
                </View>
            </View>
        )
    }
};




const styles = StyleSheet.create({
    container: {
        flex: 1,        
    },
    box: {
        flex: 2,
        borderWidth: 2
    },
    row: {
        flex: 1,
        backgroundColor: "#f1f1f1"
    },
    leftRightView: {
        flexDirection: "row-reverse",
    },
    upView: {
        alignSelf: "flex-end",
        marginEnd: 85,
        marginTop: 20
    },
    downView: {
        alignSelf: "flex-end",
        marginEnd: 85,
    },
    leftBtn: {
        alignSelf: "flex-end",
        fontSize: 30,
        borderWidth: 2,
        borderColor: Colors.white,
        backgroundColor: Colors.lavender,
        width: 50,
        height: 50,
        textAlign: "center",
        borderRadius: 10,
        textAlignVertical: "center"
    },
    rightBtn: {
        alignSelf: "flex-end",
        fontSize: 30,
        borderWidth: 2,
        borderColor: Colors.white,
        backgroundColor: Colors.lavender,
        width: 50,
        height: 50,
        textAlign: "center",
        borderRadius: 10,
        textAlignVertical: "center",
        marginEnd: 40,
        marginStart: 40
    },
    upBtn: {
        fontSize: 30,
        borderWidth: 2,
        borderColor: Colors.white,
        backgroundColor: Colors.lavender,
        width: 50,
        height: 50,
        textAlign: "center",
        borderRadius: 10,
        marginTop: 20,
        textAlignVertical: "center"
    },
    downBtn: {
        fontSize: 30,
        borderWidth: 2,
        borderColor: Colors.white,
        backgroundColor: Colors.lavender,
        width: 50,
        height: 50,
        textAlign: "center",
        borderRadius: 10,
        textAlignVertical: "center",
        marginBottom: 20
    },
    autoBtn: {
        fontSize: 30,
        borderWidth: 2,
        height: 50,
        color: Colors.white,
        backgroundColor: Colors.lavender,
        textAlign: "center",
        textAlignVertical: "center",
        borderRadius: 10,
        borderColor: Colors.white,
        marginRight: 100
    }
  });
