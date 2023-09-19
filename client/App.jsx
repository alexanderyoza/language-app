import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import StudySet from './screens/StudySet';
import FlashCards from './screens/FlashCards';
import { Animated } from 'react-native';

const Stack = createStackNavigator();

const App = () => {
    const av = new Animated.Value(0);
    av.addListener(() => {return});

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home" screenOptions={{gestureEnabled: false}}>
                <Stack.Screen name="Home" component={HomeScreen}  options={{ headerShown: false }} />
                <Stack.Screen name="StudySet" component={StudySet} options={{ headerShown: false }} />
                <Stack.Screen name="FlashCards" component={FlashCards}  options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
