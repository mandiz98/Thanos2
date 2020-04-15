import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import BleManager from "react-native-ble-manager"
import { stringToBytes } from 'convert-string';
import Icon from 'react-native-vector-icons/Ionicons';


const MAC = '00:1B:10:65:FA:CC'
const characteristicID = 'e3dd50bf-f7a7-4e99-838e-570a086c666b'
const serviceID = '9e5d1e47-5c13-43a0-8635-82ad38a1386f'
const baudRate = 115200;

export class Connect extends React.Component {

  constructor(props){
    super(props)

    this.onClick = this.onClick.bind(this);
    this.writeBtn = this.writeBtn.bind(this);
  }

  async writeBtn(){

    const data = [1]
    console.log(data)

    BleManager.retrieveServices(MAC).then((peripheralInfo) => {
      //console.log(peripheralInfo)

      setTimeout(() => {
        BleManager.startNotification(MAC, serviceID, characteristicID).then(() => {
          console.log('Started notification on ' + MAC);
          setTimeout(() => {
            BleManager.write(MAC, serviceID, characteristicID, data).then(() => {
              console.log("Success Write");
              
            }).catch((e) => {
              console.log(e)
            });

          }, 500);
        }).catch((error) => {
          console.log('Notification error', error);
        });
      }, 200);
    });


    BleManager.read(MAC, serviceID, characteristicID).then((result) => {
      console.log(result, "hakdnka")
    })
    .catch((e) => {
      console.log(e)
    })

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

  }

  render(){
    return (
      <View>
        <TouchableOpacity onPress={this.writeBtn}>
        <Image source={require('../images/thanos.png')} style={styles.logo }/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.connectBtn} onPress={this.onClick}>
          <Text style={{fontSize: 40, color: "white"}}>Connect</Text>
          <Icon color={"#306493"} name={"ios-bluetooth"} size = {50} style= {styles.bt}/>
        </TouchableOpacity>
      </View>
      );
  }
  
};

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
    borderColor: "white",
    backgroundColor: "#A788A8"
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
