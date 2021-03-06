
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

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import BleManager from "react-native-ble-manager"
import { stringToBytes } from 'convert-string';
//import {BleManager} from "react-native-ble-plx"




export default class Appp extends React.Component {
  constructor(props){
    super(props)

    this.onClick = this.onClick.bind(this);
    this.writeBtn = this.writeBtn.bind(this);
  }

  async writeBtn(){
    const id = '00:1B:10:65:FA:CC'
    //const characteristicID = '347f7608-2e2d-47eb-913b-75d4edc4de3b'
    const characteristicID = 'e3dd50bf-f7a7-4e99-838e-570a086c666b'
    //const characteristicID = '92e86c7a-d961-4091-b74f-2409e72efe36'
    const serviceID = '9e5d1e47-5c13-43a0-8635-82ad38a1386f'
    const baudRate = 115200;
    

    const data = stringToBytes('1');
    console.log(data)

    BleManager.retrieveServices(id).then((peripheralInfo) => {
      //console.log(peripheralInfo);

      setTimeout(() => {
        BleManager.startNotification(id, serviceID, characteristicID).then(() => {
          console.log('Started notification on ' + id);
          setTimeout(() => {
            BleManager.write(id, serviceID, characteristicID, data).then(() => {
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

  }



  async onClick(){

    await BleManager.start({showAlert: false})
    .then(() => {
      // Success code
      console.log('Module initialized');
    });


 /*     await BleManager.scan([], 5, true)
    .then(() => {
      // Success code
      console.log('Scan started');
    }); */

    //await new Promise(r => setTimeout(r, 10000));


    /* await BleManager.getBondedPeripherals([])
    .then((result) => {
      console.log(result)
    })  */

     await BleManager.connect('00:1B:10:65:FA:CC')
    .catch((e) => {
      console.log(e)
    })


    await BleManager.isPeripheralConnected('00:1B:10:65:FA:CC')
    .then((isConnected) => {
      console.log(isConnected)
    })

  }

  render(){
    return (
      <View>
        <TouchableOpacity style={styles.connectBtn} onPress={this.onClick}>
          <Text style={{fontSize: 40}}>Connect</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.connectBtn} onPress={this.writeBtn}>
          <Text style={{fontSize: 40}}>Write</Text>
        </TouchableOpacity>
      </View>
      );
  }
  
};

const styles = StyleSheet.create({
  connectBtn: {
    alignSelf: "center",
    borderColor: "red",
    borderWidth: 1,
    marginTop: "50%",
    
  }
});

