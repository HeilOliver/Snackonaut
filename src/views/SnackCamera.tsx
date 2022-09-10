import { useNavigation } from "@react-navigation/native";
import { Camera, PermissionStatus, requestCameraPermissionsAsync } from 'expo-camera'
import { CameraCapturedPicture } from "expo-camera/src/Camera.types";
import { manipulateAsync } from "expo-image-manipulator";
import { StatusBar } from 'expo-status-bar'
import { useToast } from "native-base";
import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from "react-i18next";
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native'
import CameraPreview from "../components/CameraPreview";
import { StatsContext } from "../providers/StatsProvider";

let camera: Camera

const SnackCamera = ({ navigation: { navigate }}): JSX.Element => {
    const toast = useToast();
    const { t } = useTranslation();
    const { stats, setEnergy } = useContext(StatsContext);
    const [startCamera, setStartCamera] = useState<boolean>(false)
    const [previewVisible, setPreviewVisible] = useState<boolean>(false)
    const [capturedImage, setCapturedImage] = useState<CameraCapturedPicture|null>(null)

    useEffect(() => {
        __startCamera();
    }, [])

    const __startCamera = async (): Promise<void> => {
        const {status} = await requestCameraPermissionsAsync()

        if (PermissionStatus.GRANTED === status) {
            setStartCamera(true)
        } else {
            Alert.alert('Access denied')
        }
    }

    const takePicture = async (): Promise<void> => {
        const photo: CameraCapturedPicture = await camera.takePictureAsync({base64: true})

        setPreviewVisible(true)
        setCapturedImage(photo)
    }

    const analyzePhoto = async (): Promise<void> => {
        if (null === capturedImage) {
            return;
        }

        const resizedImage = await manipulateAsync(
            capturedImage?.uri,
            [{
                resize: {
                    width: 512,
                },
            }],
            {
                compress: 0.0,
                base64: true,
            }
        );

        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ imageBase64: resizedImage?.base64 })
            };
            let response = await fetch(
                'https://snackonaut.jentschmann.services/Prediction', requestOptions
            );
            let json = await response.json();

            toast.show({description: t("eat_toast", { response: json.label }), placement: "top"})
            setEnergy(stats.energy + json.energy)
            navigate("Home")
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
                        <CameraPreview photo={capturedImage} savePhoto={analyzePhoto} retakePicture={__retakePicture} />
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
                                            onPress={takePicture}
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

export default SnackCamera;
