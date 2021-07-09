import React from 'react';
import { Text, View ,TouchableOpacity,StyleSheet} from 'react-native';
import * as Permissions from 'expo-permissions'
import {BarCodeScanner} from 'expo-barcode-scanner'

export default class TransactionScreen extends React.Component {

    constructor() {
        super();
        this.state = {
            hasCamPermission: null,
            scanned : false,
            scannedData: "",
            buttonState : "normal"
        }
    }

getCamPermissions= async()=>{
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({
        hasCamPermission: status === 'granted',
        scanned : false
    })
    }
    
handleBarCodeScanner= async({type,data})=> {
    this.setState({
        scanned: true,
        scannedData: data,
        buttonState : 'normal'
    })
}

    render() {
        var hasCamPermission = this.state.hasCamPermission
        var scanned = this.state.scanned
        var buttonState = this.state.buttonState
        
        if (buttonState === "clicked" && hasCamPermission) {
            return (
                <BarCodeScanner
                onBarCodeScanned={scanned? undefined: this.handleBarCodeScanner}
                style= {StyleSheet.absoluteFillObject} 
                />
            )
       }
       
       else if (buttonState === "normal") {
            return (
                <View style={styles.container}>
                    <Text style={styles.displayText}>
                        {hasCamPermission === true ? this.state.scannedData : "Please allow your camera"}
                    </Text>
               
                    <TouchableOpacity style={styles.scanButton} onPress={this.getCamPermissions}>
                        <Text style={styles.buttonText}>
                            Scan QR code
                        </Text>
                    </TouchableOpacity>
                    
                </View>
    
            );
        }
       
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    displayText:{
      fontSize: 15,
      textDecorationLine: 'underline'
    },
    scanButton:{
      backgroundColor: '#2196F3',
      padding: 10,
      margin: 10
    },
    buttonText:{
      fontSize: 20,
    }
  });