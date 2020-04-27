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



//Robot
const MAC = '00:1B:10:65:FA:CC'
const characteristicID = '347f7608-2e2d-47eb-913b-75d4edc4de3b'
const serviceID = '9e5d1e47-5c13-43a0-8635-82ad38a1386f'
const baudRate = 115200;
const url = "http://thanos2api.herokuapp.com"
var prevX, prevY, prevCollX, prevCollY



const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);


class Connect extends React.Component {

  constructor(props){
    super(props)

    this.onClick = this.onClick.bind(this);
    this.startRead = this.startRead.bind(this);
    this.thanosClicked = this.thanosClicked.bind(this);

    this.handleUpdateValueForCharacteristic = this.handleUpdateValueForCharacteristic.bind(this);

  }

  handleUpdateValueForCharacteristic(data) {
    console.log("Read success: ", String.fromCharCode.apply(null, data.value))

    let currentId = this.props.sessions.currentSessionId

    if(currentId != ""){
      if(String.fromCharCode(data.value[0]) == '0'){
        //Coordinates
        console.log("Coordinates: ", data.value)
        var x,y
        var arr = String.fromCharCode.apply(null, data.value).split(",")
        x = arr[1]
        y = arr[2]

        if(x != prevX && y != prevY){
          this.postLocation(x,y)
        }else{
          console.log("Robot is not moving")
        }

        prevX = x
        prevY = y

  
      } else if (String.fromCharCode(data.value[0]) == '1' ) {
        //Collision
        console.log("Collision: ", data.value)
        var x,y
        var arr = String.fromCharCode.apply(null, data.value).split(",")
        x = arr[1]
        y = arr[2]
        
        if(x != prevCollX && y != prevCollY){
          this.postCollision(x,y)
        }else{
          console.log("Same collison")
        }

        prevCollX = x
        prevCollY = y
  
      }
    }else{
      console.log("No session running!")
    }


  }

  async postLocation(x, y){
    var id = this.props.sessions.currentSessionId;
    axios.post(url + "/session/"+id+"/locations", {
      x: x,
      y: y
    })
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })
            
  }

  async postCollision(x, y){
    var id = this.props.sessions.currentSessionId;
    axios.post(url + "/session/"+id+"/collisions", {
      x: x,
      y: y
    })
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  async thanosClicked(){
    console.log("hallååå")
  }

  async startRead(){
    console.log("----------------------------------------------------")


    AppState.addEventListener('change', this.handleAppStateChange);

    BleManager.start({showAlert: false});

    this.handlerUpdate = bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', this.handleUpdateValueForCharacteristic );



    BleManager.retrieveServices(MAC).then((peripheralInfo) => {
                  
      setTimeout(() => {
        BleManager.startNotification(MAC, "ffe1", "ffe2").then(() => {
          console.log('Started notification on ' + MAC);
          
        }).catch((error) => {
          console.log('Notification error', error);
        });
      }, 0);
    });

  
}

  async onClick(){

    await BleManager.start({showAlert: false})
    .then(() => {
      // Success code
      console.log('Module initialized');
    });

     await BleManager.connect(MAC)
    .catch((e) => {
      console.log(e)
    })

    await BleManager.isPeripheralConnected(MAC)
    .then((isConnected) => {
      console.log(isConnected)
    })

    this.startRead();

  }

  render(){
    return (
      <View>
        <TouchableOpacity onPress={this.thanosClicked}>
        <Image source={require('../images/thanos.png')} style={styles.logo }/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.connectBtn} onPress={this.onClick}>
          <Text style={{fontSize: 40, color: Colors.white}}>Connect</Text>
          <Icon color={Colors.lightBlue} name={"ios-bluetooth"} size = {50} style= {styles.bt}/>
        </TouchableOpacity>
      </View>
      );
  }
  
};


const mapStateToProps = state => ({
  sessions: state.sessions
})

export default connect(mapStateToProps)(Connect)

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
