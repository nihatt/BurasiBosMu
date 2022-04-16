import { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View, SafeAreaView, ImageBackground, FlatList, ActivityIndicator, StatusBar, Alert, Image, RefreshControl } from 'react-native';
import { Searchbar, IconButton, Button } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { TextInput } from 'react-native-paper';
export default function LoginPage({ navigation }) {
    const [text, setText] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(true);
    const [kullanicidata, setKullaniciData] = useState([])
    

    const getData = async() => {
        setLoading(!loading)
        await fetch('https://6249f9b1852fe6ebf882de48.mockapi.io/api/v1/kullanici', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response2 => response2.json())
            .then(data2 => {
                setKullaniciData(data2);
                console.log(data2);
            })
            .catch(err => console.error(err));
    }


    const buttonclick = async () => {
       
           if(kullanicidata.some(element => element.username == text && element.password == password)){
               const kullanici = kullanicidata.find(e => e.username == text)
               console.log(kullanici);
               setLoading(false);
               setPassword("");
               setText("");
            Alert.alert(
                "Hoşgeldin "+ kullanici.name,
                "Ana Sayfaya Yönlendiriliyorsun",
                [
                  { text: "Devam", onPress: () => navigation.navigate('Home') }
                ]
              );
           } 
           else{
            console.log("hata")
            Alert.alert(
                "Kullanıcı Adı veya Şifreniz Hatalı !"
              );
              setLoading(false)
           }
    }

    if (loading) {
        console.log("girdi");
        getData();
        return <ActivityIndicator size="large" color='red' style={{
            flex: 1,
            justifyContent: "center"
        }} />;

    }
    return (
       
        <View style={{ marginTop: StatusBar.currentHeight, height: hp('100%'), backgroundColor: 'white' }}>
          <ImageBackground source={require("../assets/back.png")} resizeMode="stretch" style={{height:hp('102%')}}>
           <View style={{height:hp('25%'),alignItems:'center',paddingTop:hp('4%')}}>
               <Image source={{uri:"https://i.hizliresim.com/9uak3jf.png"}} style={{height:hp('25%'),width:wp('80%'),alignSelf:'center'}} />
           </View>
            <View style={{ height: hp('50%'), justifyContent: 'space-evenly' }}>
                <View style={{alignItems:'center' }}>
                    <TextInput
                        style={{ width: wp('80%') }}
                        label="Kullanıcı Adı"
                        mode="outlined"
                        value={text}
                        onChangeText={text => setText(text)}
                    />
                    <TextInput
                    secureTextEntry={true}
                        style={{ width: wp('80%') }}
                        label="Şifre"
                        mode="outlined"
                        value={password}
                        onChangeText={password => setPassword(password)}
                    />
                    
                </View>
                <Button style={{width:wp('80%'),alignSelf:'center'}} loading={loading} mode="contained" onPress={() => buttonclick()}>
                    Giriş Yap
                </Button>
                <Text onPress={()=> navigation.navigate('Details')} style={{ borderRadius:20,alignSelf:'center',width:wp('60%'),textAlign: 'center',color:'white',backgroundColor:'purple' }}>Henüz Hesabın Yok mu ? Üye ol !</Text>
            </View>
            <View style={{height:hp('25%')}}>

            </View>
            </ImageBackground>
        </View>
      
    )
}