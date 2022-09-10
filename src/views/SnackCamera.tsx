import { Camera, PermissionStatus, requestCameraPermissionsAsync } from 'expo-camera'
import { CameraCapturedPicture } from "expo-camera/src/Camera.types";
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native'
import CameraPreview from "../components/CameraPreview";

let camera: Camera

export default function SnackCamera() {
    const [startCamera, setStartCamera] = useState<boolean>(false)
    const [previewVisible, setPreviewVisible] = useState<boolean>(false)
    const [capturedImage, setCapturedImage] = useState<CameraCapturedPicture|null>(null)

    useEffect(() => {
        __startCamera();
    }, [])

    const __startCamera = async (): Promise<void> => {
        const {status} = await requestCameraPermissionsAsync()

        console.log(status)
        if (PermissionStatus.GRANTED === status) {
            setStartCamera(true)
        } else {
            Alert.alert('Access denied')
        }
    }

    const __takePicture = async () => {
        const photo: CameraCapturedPicture = await camera.takePictureAsync({base64: true})

        setPreviewVisible(true)
        setCapturedImage(photo)
    }
    const __savePhoto = async () => {
        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ imageBase64: capturedImage?.base64 })
            };
            let response = await fetch(
                'https://snackonaut.jentschmann.services/Prediction', requestOptions
            );
            let json = await response.json();
            console.log(json);
        } catch (error) {
            console.error(error);
        }
    };

    const __retakePicture = () => {
        setCapturedImage(null)
        setPreviewVisible(false)
        __startCamera()
    }

    return (
        <View style={styles.container}>
            {startCamera ? (
                <View
                    style={{
                        flex: 1,
                        width: '100%'
                    }}
                >
                    {previewVisible && capturedImage ? (
                        <CameraPreview photo={capturedImage} savePhoto={__savePhoto} retakePicture={__retakePicture} />
                    ) : (
                        <Camera
                            type="back"
                            style={{flex: 1}}
                            ref={(r) => {
                                camera = r
                            }}
                        >
                            <View
                                style={{
                                    flex: 1,
                                    width: '100%',
                                    backgroundColor: 'transparent',
                                    flexDirection: 'row'
                                }}
                            >
                                <View
                                    style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        flexDirection: 'row',
                                        flex: 1,
                                        width: '100%',
                                        padding: 20,
                                        justifyContent: 'space-between'
                                    }}
                                >
                                    <View
                                        style={{
                                            alignSelf: 'center',
                                            flex: 1,
                                            alignItems: 'center'
                                        }}
                                    >
                                        <TouchableOpacity
                                            onPress={__takePicture}
                                            style={{
                                                width: 85,
                                                height: 85,
                                                bottom: 0,
                                                borderRadius: 50,
                                                backgroundColor: '#fff',
                                                marginBottom: 30,
                                            }}
                                        />
                                    </View>
                                </View>
                            </View>
                        </Camera>
                    )}
                </View>
            ) : (<></>) }

            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

