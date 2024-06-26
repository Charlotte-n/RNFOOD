import React, { useEffect, useRef, useState } from 'react'
import { Alert, TouchableOpacity, View } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { useNavigation } from '@react-navigation/native'
import { useAppSelector } from '../../store'
import { shallowEqual } from 'react-redux'
import { useCameraPermission } from 'react-native-vision-camera'
import { Linking } from 'react-native'

const MyImagePicker = ({
    children,
    getImage,
    type,
}: {
    children: any
    getImage: any
    type?: string
}) => {
    const { content } = children
    const navigation = useNavigation()
    const { RecognizeFoodInfo } = useAppSelector((state) => {
        return {
            RecognizeFoodInfo: state.DietSlice.RecognizeFoodInfo,
        }
    }, shallowEqual)
    const { hasPermission, requestPermission } = useCameraPermission()
    //获取相机权限
    useEffect(() => {
        ;(async () => {
            //获取相机的权限
            if (!hasPermission) {
                await requestPermission()
            }
            // 获取相册权限
            const { status } =
                await ImagePicker.requestMediaLibraryPermissionsAsync()
            if (status !== 'granted') {
                // 提示用户前往系统设置界面手动启用权限
                Alert.alert(
                    '请求失败',
                    '此功能需要使用摄像头和访问图片,否则不能实现',
                    [
                        {
                            text: '取消',
                            style: 'cancel',
                        },
                        {
                            text: '跳转',
                            onPress: () => Linking.openSettings(),
                        },
                    ],
                )
                navigation.goBack()
            }
        })()
    }, [])
    const [image, setImage] = useState('')
    const result = useRef<any>()
    //获取图片
    const pickImage = async () => {
        let res = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [3, 3],
            quality: 1,
        })
        result.current = res
        if (!result.current.canceled) {
            setImage((prevState: any) => {
                return result.current.assets[0].uri as string
            })
        }
    }

    //获取到识别的食物
    useEffect(() => {
        if (image) {
            getImage(image)
            //判断是否有名字
            if (type === 'camera') {
                //@ts-ignore
                navigation.navigate('RecognizeFood')
            }
        }
    }, [image])

    return (
        <View>
            <TouchableOpacity onPress={() => pickImage()}>
                {content}
            </TouchableOpacity>
        </View>
    )
}

export default MyImagePicker
