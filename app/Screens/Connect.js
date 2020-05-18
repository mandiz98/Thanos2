//Imports
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  NativeModules,
  NativeEventEmitter,
  AppState
} from 'react-native';
import Colors from "../Colors"

import {
  Header,
  LearnMoreLinks,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import BleManager from "react-native-ble-manager"
import { stringToBytes } from 'convert-string';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from "axios"
import {connect} from "react-redux"

import {postLocation, postCollision} from "../store/actions/sessions"




// MAC address of robot 
const MAC = '00:1B:10:65:FA:CC'
//Backend API link
const url = "http://thanos2api.herokuapp.com"
// Global constant variables 
var prevX, prevY, prevCollX, prevCollY
// BLE modules
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

//Connect class is used to connect to the robot over BLE
class Connect extends React.Component {

  constructor(props){
    super(props)
    //Binding the function to "this" property
    this.onClick = this.onClick.bind(this);
    this.startRead = this.startRead.bind(this);
    this.thanosClicked = this.thanosClicked.bind(this);
    this.handleUpdateValueForCharacteristic = this.handleUpdateValueForCharacteristic.bind(this);
  }


  //Event listener that listens for data from the robot
  handleUpdateValueForCharacteristic(data) {
    //console.log("Read success: ", String.fromCharCode.apply(null, data.value))
    //Fetch the current session id if it exists
    let currentId = this.props.sessions.currentSessionId
    //Only read the data if there is an active session 
    if(currentId != ""){
      //If the recieved data string starts with a 0 it is a normal location. E.g. "0,34,76"
      if(String.fromCharCode(data.value[0]) == '0'){
        var x,y
        var arr = String.fromCharCode.apply(null, data.value).split(",")
        x = arr[1]
        y = arr[2]
        //Post location to the backend if the robot is moving
        if(x != prevX && y != prevY && x != null && y != null){
          this.props.postLocation(currentId,x,y)
        }else{
          //console.log("Robot is not moving")
        }

        prevX = x
        prevY = y

        //If the recieved data string starts with a 1 it is a collision location. E.g. "1,34,76"
      } else if (String.fromCharCode(data.value[0]) == '1' ) {
        //Collision
        var x,y
        var arr = String.fromCharCode.apply(null, data.value).split(",")
        x = arr[1]
        y = arr[2]
        //Post location of the collision to the backend and alert the user
        if(x != prevCollX && y != prevCollY && x != null && y != null){
          //alert("Collision at X:"+x+", Y:"+y)
          this.props.postCollision(currentId,x,y)
          //this.oldPostCollision(x,y)
        }else{
          //console.log("Same collison")
        }

        prevCollX = x
        prevCollY = y
  
        }
    }else{
      //console.log("No session running!")
    }
  }

  //The robot starts playing Despacito to cheer up the people around it
  async thanosClicked(){
    const data = stringToBytes('6');

    BleManager.retrieveServices(MAC).then((peripheralInfo) => {
              
      setTimeout(() => {
        BleManager.startNotification(MAC, serviceID, characteristicID).then(() => {
          //console.log('Started notification on ' + MAC);
          setTimeout(() => {
            BleManager.write(MAC, "ffe1", "ffe3", data).then(() => {
              //console.log("Success Write");
              
            }).catch((e) => {
              //console.log(e)
            });

          }, 0);
        }).catch((error) => {
          //console.log('Notification error', error);
        });
      }, 0);
    });
  }
  //Starts the event listener thats reads data from the robot
  async startRead(){
    //console.log("----------------------------------------------------")

    AppState.addEventListener('change', this.handleAppStateChange);
    BleManager.start({showAlert: false});
    //Add event listener
    this.handlerUpdate = bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', this.handleUpdateValueForCharacteristic );
    //Start services for the MAC address
    BleManager.retrieveServices(MAC).then((peripheralInfo) => {
                  
      setTimeout(() => {
        BleManager.startNotification(MAC, "ffe1", "ffe2").then(() => {
          //console.log('Started notification on ' + MAC);
          
        }).catch((error) => {
          //console.log('Notification error', error);
        });
      }, 0);
    });
  }
  //Start the BLE connection with the robot
  async onClick(){
    //Start the module
    await BleManager.start({showAlert: false})
    .then(() => {
      // Success code
      //console.log('Module initialized');
    });
    //Connect
    await BleManager.connect(MAC)
    .catch((e) => {
      //console.log(e)
    })
    //Get peripherals
    await BleManager.isPeripheralConnected(MAC)
    .then((isConnected) => {
      //console.log(isConnected)
    })
    //Start Listener
    this.startRead();
  }

  render(){
    return (
      <View>
        {/* Thanos button */}
        <TouchableOpacity onPress={this.thanosClicked}>
        <Image source={require('../images/thanos.png')} style={styles.logo }/>
        </TouchableOpacity>

        {/* Connect button */}
        <TouchableOpacity style={styles.connectBtn} onPress={this.onClick}>
          <Text style={{fontSize: 40, color: Colors.white}}>Connect</Text>
          <Icon color={Colors.lightBlue} name={"ios-bluetooth"} size = {50} style= {styles.bt}/>
        </TouchableOpacity>
      </View>
      );
  }
  
};

//Map the state sessions to sessions
const mapStateToProps = state => ({
  sessions: state.sessions
})

export default connect(mapStateToProps, {postLocation, postCollision})(Connect)

//Custom styles
const styles = StyleSheet.create({
  connectBtn: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "5%",
    height: 200,
    width: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: Colors.white,
    backgroundColor: Colors.lavender
  },
  bt: { 
    alignSelf: "center"
  },
  logo: {
    width: 300,
    height: 300,
    alignSelf: "center",
    resizeMode: "center"
  }
});
