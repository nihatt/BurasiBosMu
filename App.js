import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainPage from './pages/main_page';
import DetailsPage from './pages/details_page';
import LoginPage from './pages/login_page';
import { NavigationContainer } from '@react-navigation/native';


const Stack = createNativeStackNavigator();

export default function App(props) {
  

  return (
    <NavigationContainer>
    <Stack.Navigator
     
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name="Login" component={LoginPage}/>
      <Stack.Screen name="Home" component={MainPage} />
      <Stack.Screen name="Details" component={DetailsPage} />

    </Stack.Navigator>
  </NavigationContainer>
)};
