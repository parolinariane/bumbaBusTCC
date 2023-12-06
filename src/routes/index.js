import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {createDrawerNavigator} from '@react-navigation/drawer';

import SignIn from '../pages/SignIn'
import PageMap  from '../pages/PageMap';
import Register from '../pages/Register';
import BusSimulator from '../pages/BusSimulator';
import SideBar from '../pages/SideBar';
import TicketPrice from '../pages/TicketPrice';
import LineBus from '../pages/LineBus';
import Line212 from '../pages/Line212';
import Line213 from '../pages/Line213';
import Line210 from '../pages/Line210';
import Line134 from '../pages/Line134';
import RateApp from '../pages/RateApp';
import Profile from '../pages/Profile';


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();



export default function Routes(){


    return(

        <Stack.Navigator>
            
            <Stack.Screen
                name='SignIn'
                component={SignIn}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name='Register'
                component={Register}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name='PageMap'
                component={PageMap}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name='BusSimulator'
                component={BusSimulator}
                options={{ headerShown: false }}
            />

            
            <Stack.Screen
                name='SideBar'
                component={SideBar}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name='TicketPrice'
                component={TicketPrice}
                options={{ headerShown: false }}
            />
            
            <Stack.Screen
                name='LineBus'
                component={LineBus}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name='Line212'
                component={Line212}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name='Line213'
                component={Line213}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name='Line210'
                component={Line210}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name='Line134'
                component={Line134}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name='RateApp'
                component={RateApp}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name='Profile'
                component={Profile}
                options={{ headerShown: false }}
            />

        </Stack.Navigator>
    )
}
