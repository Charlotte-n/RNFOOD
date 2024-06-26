import React from 'react'
import { CommonActions, NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import TabBar from './src/route/tab-bar'
import LoginRegisterHomeScreen from './src/route/login'
import { Icon } from '@rneui/themed'
import { MineOtherScreen } from './src/data/app-path'
import { Provider, useDispatch } from 'react-redux'
import store, { persistor } from './src/store'
import { PersistGate } from 'redux-persist/es/integration/react'
import UserAgree from './src/views/mine/profile/c-pages/user-agree'
import Search from './src/views/diet/search'
import MyCamera from './src/components/camera'
import FoodDetail from './src/views/diet/c-pages/food-detail/food-detail'
import theme from './src/styles/theme/color'
import { Image } from 'react-native'
import MyShare from './src/components/share'
import FoodNutrients from './src/views/diet/c-pages/food-nutrients/food-nutritents'
import FoodCategory from './src/views/diet/c-pages/food-category'
import CommentsComply from './src/views/diet/c-pages/food-detail/c-pages/commentsComply'
import RecipeCollect from './src/views/mine/collect/c-pages/recipe-collect'
import RecognizeFood from './src/views/recognize-food'
import AI from './src/views/more/c-pages/ai'
import DietCommunicate from './src/route/diet-communicate'
import UserPage from './src/views/user/c-pages/user-page'
import Group from './src/views/more/c-pages/group'
import GroupRoute from './src/route/group'

//回到顶层
export const navigationRef = React.createRef()
export function navigateToTop() {
    if (navigationRef.current) {
        navigationRef.current.dispatch(
            CommonActions.reset({
                index: 1,
                actions: [
                    navigationRef.current.navigate({
                        routeName: 'LoginRegisterHomeScreen',
                    }),
                ],
            }),
        )
    }
}

export default function App() {
    const Stack = createStackNavigator()
    const moreFunction = [
        {
            name: 'ai',
            title: 'AI小助手',
            component: AI,
        },
    ]

    return (
        <Provider store={store}>
            <PersistGate persistor={persistor} loading={null}>
                <NavigationContainer ref={navigationRef}>
                    <Stack.Navigator
                        initialRouteName={
                            store.getState().LoginRegisterSlice.token
                                ? 'tabs'
                                : 'LoginRegisterHomeScreen'
                        }
                        screenOptions={{
                            headerShadowVisible: false,
                        }}
                    >
                        <Stack.Screen
                            name={'LoginRegisterHomeScreen'}
                            component={LoginRegisterHomeScreen}
                            options={{
                                headerShown: false,
                            }}
                        ></Stack.Screen>
                        <Stack.Screen
                            name={'tabs'}
                            component={TabBar}
                            options={{
                                headerShown: false, // 隐藏StackNavigator的导航栏
                            }}
                        ></Stack.Screen>
                        {/*个人中心页面:一个页面中跳转到其他的详情页面*/}
                        {MineOtherScreen.map((item) => {
                            return (
                                <Stack.Screen
                                    key={item.name}
                                    name={item.name}
                                    component={item.component}
                                    options={{
                                        headerShadowVisible: false,
                                        headerTitle: item.headerTitle,
                                        headerTitleAlign: 'center',
                                        headerBackImage: () => (
                                            <Icon
                                                name={'left'}
                                                type={'antdesign'}
                                            ></Icon>
                                        ),
                                    }}
                                ></Stack.Screen>
                            )
                        })}
                        <Stack.Screen
                            name={'userAgreeScreen'}
                            component={UserAgree}
                            options={{
                                headerShadowVisible: false,
                                headerTitleAlign: 'center',
                                headerTitle: '用户协议',
                                headerBackImage: () => (
                                    <Icon
                                        name={'left'}
                                        type={'antdesign'}
                                    ></Icon>
                                ),
                            }}
                        ></Stack.Screen>
                        <Stack.Screen
                            name={'RecipeCollect'}
                            component={RecipeCollect}
                            options={{
                                headerShadowVisible: false,
                                headerTitleAlign: 'center',
                                headerTitle: '食谱收藏',
                                headerBackImage: () => (
                                    <Icon
                                        name={'left'}
                                        type={'antdesign'}
                                    ></Icon>
                                ),
                            }}
                        ></Stack.Screen>
                        {/*    饮食页面*/}
                        <Stack.Screen
                            name={'search'}
                            component={Search}
                            options={{
                                headerTitle: '搜索',
                                headerTitleAlign: 'center',
                                headerBackImage: () => (
                                    <Icon
                                        name={'left'}
                                        type={'antdesign'}
                                    ></Icon>
                                ),
                            }}
                        ></Stack.Screen>
                        <Stack.Screen
                            name={'category'}
                            component={FoodCategory}
                            options={{
                                headerTitle: '食物分类',
                                headerTitleAlign: 'center',
                                headerBackImage: () => (
                                    <Icon
                                        name={'left'}
                                        type={'antdesign'}
                                    ></Icon>
                                ),
                            }}
                        ></Stack.Screen>

                        <Stack.Screen
                            name={'camera'}
                            component={MyCamera}
                            options={{
                                headerShown: false,
                            }}
                        ></Stack.Screen>
                        <Stack.Screen
                            name={'food-detail'}
                            component={FoodDetail}
                            initialParams={{ id: 0 }}
                            options={{
                                headerTitle: '',
                                headerStyle: {
                                    height: 40,
                                    backgroundColor: theme.colors.primary,
                                },

                                headerBackImage: () => (
                                    <Icon
                                        name={'left'}
                                        type={'antdesign'}
                                        size={25}
                                    ></Icon>
                                ),
                                headerRight: () => {
                                    return (
                                        <MyShare>
                                            {{
                                                content: (
                                                    <Image
                                                        source={require('./assets/icon/share.png')}
                                                        style={{
                                                            width: 25,
                                                            height: 25,
                                                            marginRight: 10,
                                                        }}
                                                    ></Image>
                                                ),
                                            }}
                                        </MyShare>
                                    )
                                },
                            }}
                        ></Stack.Screen>
                        {/*    评论回复*/}
                        <Stack.Screen
                            name={'commentsComply'}
                            component={CommentsComply}
                            options={{
                                headerTitle: '评论详情',
                                headerTitleAlign: 'center',
                                headerBackImage: () => (
                                    <Icon
                                        name={'left'}
                                        type={'antdesign'}
                                        size={25}
                                    ></Icon>
                                ),
                            }}
                        ></Stack.Screen>
                        <Stack.Screen
                            name={'food-nutrients'}
                            component={FoodNutrients}
                            options={{
                                headerTitle: '食物详情',
                                headerTitleAlign: 'center',
                                headerBackImage: () => (
                                    <Icon
                                        name={'left'}
                                        type={'antdesign'}
                                    ></Icon>
                                ),
                                headerRight: () => {
                                    return (
                                        <MyShare>
                                            {{
                                                content: (
                                                    <Image
                                                        source={require('./assets/icon/share.png')}
                                                        style={{
                                                            width: 25,
                                                            height: 25,
                                                            marginRight: 10,
                                                        }}
                                                    ></Image>
                                                ),
                                            }}
                                        </MyShare>
                                    )
                                },
                            }}
                        ></Stack.Screen>
                        <Stack.Screen
                            name={'RecognizeFood'}
                            component={RecognizeFood}
                            options={{
                                headerTitle: '查询食物',
                                headerTitleAlign: 'center',
                                headerBackImage: () => (
                                    <Icon
                                        name={'left'}
                                        type={'antdesign'}
                                    ></Icon>
                                ),
                                headerRight: () => {
                                    return (
                                        <MyShare>
                                            {{
                                                content: (
                                                    <Image
                                                        source={require('./assets/icon/share.png')}
                                                        style={{
                                                            width: 25,
                                                            height: 25,
                                                            marginRight: 10,
                                                        }}
                                                    ></Image>
                                                ),
                                            }}
                                        </MyShare>
                                    )
                                },
                            }}
                        ></Stack.Screen>
                        {/*  其他功能  */}
                        {/*小助手*/}
                        {moreFunction.map((item) => {
                            return (
                                <Stack.Screen
                                    key={item.name}
                                    name={item.name}
                                    component={item.component}
                                    options={{
                                        headerTitle: item.title,
                                        headerTitleAlign: 'center',
                                        headerBackImage: () => (
                                            <Icon
                                                name={'left'}
                                                type={'antdesign'}
                                            ></Icon>
                                        ),
                                    }}
                                ></Stack.Screen>
                            )
                        })}
                        {/*饮食圈广场*/}
                        <Stack.Screen
                            name={'communicate'}
                            component={DietCommunicate}
                            options={{
                                headerShown: false,
                            }}
                        ></Stack.Screen>
                        {/*组队监督*/}
                        <Stack.Screen
                            name={'group'}
                            component={GroupRoute}
                            options={{
                                headerShown: false,
                            }}
                        ></Stack.Screen>
                        {/*    用户页面*/}
                        <Stack.Screen
                            name={'userPage'}
                            component={UserPage}
                            options={{
                                headerTitle: '用户详情',
                            }}
                        ></Stack.Screen>
                    </Stack.Navigator>
                </NavigationContainer>
            </PersistGate>
        </Provider>
    )
}
