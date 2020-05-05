import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ToastAndroid
} from 'react-native';
import Colors from "../Colors"
import { stringToBytes } from 'convert-string';
import BleManager from "react-native-ble-manager"
import Icon from 'react-native-vector-icons/Ionicons';
import {startSession, stopSession} from "../store/actions/sessions"
import {connect} from "react-redux"


//Robot
const MAC = '00:1B:10:65:FA:CC'
const characteristicID = 'e3dd50bf-f7a7-4e99-838e-570a086c666b'
const serviceID = '9e5d1e47-5c13-43a0-8635-82ad38a1386f'



class Controller extends React.Component {
    
    constructor(props){
        super(props)
        props
        this.clickUp = this.clickUp.bind(this);
        this.clickLeft = this.clickLeft.bind(this);
        this.clickDown = this.clickDown.bind(this);
        this.clickRight = this.clickRight.bind(this);
        this.clickStart= this.clickStart.bind(this);
        this.clickStop= this.clickStop.bind(this);
        this.sessionRunning= this.sessionRunning.bind(this);
        this.startAuto= this.startAuto.bind(this);
        this.startManual= this.startManual.bind(this);
        this.autoRunning= this.autoRunning.bind(this);

        this.state = {
          mode: 'a'
        }
      }

      sessionRunning(){
        let currentId = this.props.sessions.currentSessionId

        if(currentId != ""){
          return true
        }else{
          return false
        }
      }

      autoRunning(){
        if(this.state.mode != 'm'){
          return true
        }else{
          return false
        }
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
        const data = stringToBytes('4');

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

      async startAuto(){
        this.setState({mode: 'a'})
        const data = stringToBytes('a');

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

      async startManual(){
        this.setState({mode: 'm'})
        const data = stringToBytes('m');

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

      async stopAll(){
        const data = stringToBytes('s');

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

      async clickStop(){
        let currentId = this.props.sessions.currentSessionId
        if(currentId != ""){
          this.stopAll()
          this.props.stopSession(currentId)
          ToastAndroid.show(`Session Stopped`, ToastAndroid.SHORT)
        }else{
          ToastAndroid.show(`Start a session first`, ToastAndroid.SHORT)
        }
      }
      async clickStart(){
        this.props.startSession()
        ToastAndroid.show(`Session Started`, ToastAndroid.SHORT)
        this.startAuto()
      }

      async break(){
        const data = stringToBytes('b');

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


    render(){
        return(
            <View style = {styles.container}>

                
                <View style = {styles.box}>
                                    
                </View>

                <View style={styles.menuBar}>
                
                  { this.sessionRunning() ? <TouchableOpacity onPress={this.clickStop}>
                      <Text style={styles.stopSession}> STOP </Text>
                  </TouchableOpacity> : <TouchableOpacity onPress={this.clickStart}>
                      <Text style={styles.startSession}> START </Text>
                  </TouchableOpacity> }
                  
                  
                  { this.autoRunning() ? <TouchableOpacity onPress={this.startManual}>
                      <Text style={styles.manBtn}> MANUAL </Text>
                  </TouchableOpacity> : <TouchableOpacity onPress={this.startAuto}>
                      <Text style={styles.autoBtn}> AUTO </Text>
                  </TouchableOpacity> }


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

                      <TouchableOpacity onPress={this.break}>
                            <Text style={styles.stopBtn}>STOP</Text>
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

const mapStateToProps = state => ({
  sessions: state.sessions
})

export default connect(mapStateToProps, {startSession, stopSession})(Controller)

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
    menuBar:{
        flexDirection: "row",
        backgroundColor: Colors.purple,
        height: 60,
        justifyContent:"center"
    },
    upView: {
        alignSelf: "flex-end",
        marginTop: "5%"
    },
    downView: {
        alignSelf: "flex-end",
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
        marginEnd: "5%",
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
        marginEnd: "20%"
    },
    upBtn: {
        fontSize: 30,
        borderWidth: 2,
        borderColor: Colors.white,
        backgroundColor: Colors.lavender,
        width: 50,
        height: 50,
        textAlign: "center",
        marginEnd: "20%",
        borderRadius: 10,
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
        marginBottom: "15%",
        marginEnd: "20%"
    },
    autoBtn: {
      fontSize: 22,
      borderWidth: 2,
      height: 50,
      color: Colors.white,
      backgroundColor: Colors.lavender,
      textAlign: "center",
      textAlignVertical: "center",
      borderRadius: 10,
      borderColor: Colors.white,
      margin: "2%",
      paddingLeft: "10%",
      paddingRight: "10%",
    },
    manBtn: {
      fontSize: 22,
      borderWidth: 2,
      height: 50,
      color: Colors.white,
      backgroundColor: Colors.lavender,
      textAlign: "center",
      textAlignVertical: "center",
      borderRadius: 10,
      borderColor: Colors.white,
      margin: "2%",
      paddingLeft: "6%",
      paddingRight: "6%",
    },
    startSession: {
      fontSize: 22,
      borderWidth: 2,
      height: 50,
      color: Colors.white,
      backgroundColor: Colors.lavender,
      textAlign: "center",
      textAlignVertical: "center",
      borderRadius: 10,
      borderColor: Colors.white,
      margin: "2%",
      paddingLeft: "10%",
      paddingRight: "10%"
    },
    stopSession:{
      fontSize: 22,
      borderWidth: 2,
      height: 50,
      color: Colors.white,
      backgroundColor: Colors.lavender,
      textAlign: "center",
      textAlignVertical: "center",
      borderRadius: 10,
      borderColor: Colors.white,
      margin: "2%",
      paddingLeft: "10%",
      paddingRight: "10%"
    },
    stopBtn: {
      fontSize: 22,
      borderWidth: 2,
      height: 50,
      color: Colors.white,
      backgroundColor: Colors.lavender,
      textAlign: "center",
      textAlignVertical: "center",
      borderRadius: 10,
      borderColor: Colors.white,
      marginEnd: "20%"
    }
  });
