import { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View, SafeAreaView, ImageBackground, FlatList, ActivityIndicator, StatusBar, Alert, Image, RefreshControl } from 'react-native';
import { Searchbar, IconButton, Button } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { TextInput } from 'react-native-paper';
export default function LoginPage({ navigation }) {
    const [text, setText] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [kullanicidata, setKullaniciData] = useState([])

    const buttonclick = async () => {
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
           if(kullanicidata.some(element => element.username == text && element.password == password)){
               const kullanici = kullanicidata.find(e => e.username == text)
               console.log(kullanici);
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
    return (
        <View style={{ marginTop: StatusBar.currentHeight, height: hp('100%'), backgroundColor: 'white', borderColor: 'red', borderWidth: 3 }}>
           <View style={{height:hp('25%'),borderColor:'green',borderWidth:3}}></View>
            <View style={{ height: hp('50%'), borderColor: 'red', borderWidth: 3, justifyContent: 'space-evenly' }}>
                <View style={{ borderColor: 'green', borderWidth: 3,alignItems:'center' }}>
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
                <Text onPress={()=> console.log("text")} style={{ textAlign: 'center' }}>Henüz Hesabın Yok mu ? Üye ol !</Text>
            </View>
            <View style={{height:hp('25%'),borderColor:'red',borderWidth:3}}>

            </View>
        </View>
    )
}