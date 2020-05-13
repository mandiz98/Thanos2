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
  ToastAndroid
} from 'react-native';
import Colors from "../Colors"
import { stringToBytes } from 'convert-string';
import BleManager from "react-native-ble-manager"
import Icon from 'react-native-vector-icons/Ionicons';
import {startSession, stopSession} from "../store/actions/sessions"
import {connect} from "react-redux"
import Svg, {
  Circle,
} from 'react-native-svg'

//MAC address, CHaracteristic id and service id of robot
const MAC = '00:1B:10:65:FA:CC'
const characteristicID = 'e3dd50bf-f7a7-4e99-838e-570a086c666b'
const serviceID = '9e5d1e47-5c13-43a0-8635-82ad38a1386f'


//Controller class is used to start a new session and navigate the robot
class Controller extends React.Component {
    
    constructor(props){
        super(props)
        props
        //Binding the function to "this" property
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
        //mode can either be a=auto or m=manual
        this.state = {
          mode: 'a'
        }
      }

      //Check if a session is running
      sessionRunning(){
        let currentId = this.props.sessions.currentSessionId

        if(currentId != ""){
          return true
        }else{
          return false
        }
      }
      //Check if the robot is in autonomous mode
      autoRunning(){
        if(this.state.mode != 'm'){
          return true
        }else{
          return false
        }
      }

      //Makes the robot go forward 
      async clickUp(){
        const data = stringToBytes('1');

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
      //Makes the robot go left
      async clickLeft(){
        const data = stringToBytes('2');

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
      //Makes the robot go right
      async clickRight(){
        const data = stringToBytes('3');

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
      //Makes the robot go backwards
      async clickDown(){
        const data = stringToBytes('4');

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
      //Start the auto mode of the robot
      async startAuto(){
        this.setState({mode: 'a'})
        const data = stringToBytes('a');
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
      //Start the manual mode of the robot
      async startManual(){
        this.setState({mode: 'm'})
        const data = stringToBytes('m');

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
      //Stop the robot from moving completely
      async stopAll(){
        const data = stringToBytes('s');

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
      //Stopp the session and post the end timestamp to backend
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
      //Create a new session in the backend and start the auto mode of the robot
      async clickStart(){
        this.props.startSession()
        ToastAndroid.show(`Session Started`, ToastAndroid.SHORT)
        this.startAuto()
      }
      //Break the robot which means that it stops moving for the moment
      async break(){
        const data = stringToBytes('b');

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

      
    render(){

      //takes the locations and collisions and calculates where to draw them, aspect ratio, etc.
      const fixCoordinates = (locations, collisions) => {
        if(locations.length < 2){
          //too few points causes scaling calculation issues. We could fix it i guess but this is the lazy solution.
            return({
                locations: [{}],
                collisions: [{}],
                aspectRatio: 1
            });
        }

        let xMin = Infinity;
        let xMax = -Infinity;
        let yMin = Infinity;
        let yMax = -Infinity;

        for(const location of locations){
            if(location.x < xMin){
                xMin = location.x;
            }
            if(location.x > xMax){
                xMax = location.x;
            }
            if(location.y < yMin){
                yMin = location.y;
            }
            if(location.y > yMax){
                yMax = location.y;
            }
        }
        for(const collision of collisions){
            if(collision.x < xMin){
                xMin = collision.x;
            }
            if(collision.x > xMax){
                xMax = collision.x;
            }
            if(collision.y < yMin){
                yMin = collision.y;
            }
            if(collision.y > yMax){
                yMax = collision.y;
            }
        }

        let xDiff = xMax-xMin;
        let yDiff = yMax-yMin;

        let aspectRatio = xDiff/yDiff;

        const width = 1000*Math.sqrt(aspectRatio);
        const height = 1000/Math.sqrt(aspectRatio);

        

        const xMargin = 0.1*width;
        const yMargin = 0.1*height;
        //on each side

        const xFactor = (width - 2*xMargin)/xDiff;
        const yFactor = (height - 2*yMargin)/yDiff;

        let newLocations = locations;
        let newCollisions = collisions;

        for(const location of newLocations){
            location.x = (location.x - xMin) * xFactor + xMargin;
            location.y = (location.y - yMin) * yFactor + yMargin;
        }
        for(const collision of newCollisions){
            collision.x = (collision.x - xMin) * xFactor + xMargin;
            collision.y = (collision.y - yMin) * yFactor + yMargin;
        }

        
        let returnObject = {
            locations: newLocations,
            collisions: newCollisions,
            aspectRatio: aspectRatio
        };
        return returnObject;
    };


    let locationsCopy = JSON.parse(JSON.stringify(this.props.sessions.currentSessionLocations));
    let collisionsCopy = JSON.parse(JSON.stringify(this.props.sessions.currentSessionCollisions));
    //Converting to JSON and back does a "deep copy" of the array, removing all references to the original. Per https://medium.com/javascript-in-plain-english/how-to-deep-copy-objects-and-arrays-in-javascript-7c911359b089
    let returnObject = fixCoordinates(locationsCopy, collisionsCopy);
        return(
            <View style = {styles.container}>

                <View style = {styles.box}>
                  <View>
                      <View style={{
                          width: '100%',
                          height: '100%',
                          alignItems: 'center'
                      }}
                      >       
                              {/* draws locations and collisisonsin real time */}
                              <Svg height="100%" width="100%" viewBox={`0 0 ${1000*Math.sqrt(returnObject.aspectRatio)} ${1000/Math.sqrt(returnObject.aspectRatio)}`}>
                                  {returnObject.locations.map((data, index) =>
                                      <Circle
                                          key={data._id}
                                          cx={data.x}
                                          cy={data.y}
                                          r="20"
                                          fill="black"
                                      />
                                  )}
                                  {returnObject.collisions.map((data, index) =>
                                      <Circle
                                          key={data._id}
                                          cx={data.x}
                                          cy={data.y}
                                          r="20"
                                          fill="red"
                                      />
                                  )}
                              </Svg>
                      </View>
                  </View>          
                </View>

                <View style={styles.menuBar}>
                  {/* Start and Stop button for the session */}
                  { this.sessionRunning() ? <TouchableOpacity onPress={this.clickStop}>
                      <Text style={styles.stopSession}> STOP </Text>
                  </TouchableOpacity> : <TouchableOpacity onPress={this.clickStart}>
                      <Text style={styles.startSession}> START </Text>
                  </TouchableOpacity> }
                  
                  {/* Switch between manual and auto mode button */}
                  { this.autoRunning() ? <TouchableOpacity onPress={this.startManual}>
                      <Text style={styles.manBtn}> MANUAL </Text>
                  </TouchableOpacity> : <TouchableOpacity onPress={this.startAuto}>
                      <Text style={styles.autoBtn}> AUTO </Text>
                  </TouchableOpacity> }


                </View>
                {/* Manual Controller buttons */}
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

//Map the state sessions to sessions
const mapStateToProps = state => ({
  sessions: state.sessions
})

export default connect(mapStateToProps, {startSession, stopSession})(Controller)

//Custom styles
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
