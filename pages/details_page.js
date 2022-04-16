import { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View, SafeAreaView, ImageBackground, FlatList, ActivityIndicator, StatusBar, Alert, Image, RefreshControl } from 'react-native';
import { Searchbar, IconButton, Button } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { TextInput } from 'react-native-paper';
export default function DetailsPage({ navigation }) {
    const [name, setName] = useState("");
    const [surname, setsurName] = useState("");
    const [username, setuserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [status,setStatus] = useState(0)
    const [kullanicidata, setKullaniciData] = useState([])
    const validate = (text) => {
        
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(text) === false) {
         
          setEmail(text)
          return false;
        }
        else {
          setEmail(text)
        }
      }

    const buttonclick = async () => {
        if (name == '' || surname == '' || username == '' || password == '' || validate(email)==true || email == '') {
            Alert.alert("Alanlarda hata var , lütfen kontrol edin")
        }
        else if(validate(email)==false){
            Alert.alert("Wrong Email","Please enter an e-mail in correct format")
        }
        else if(name==''){
            Alert.alert("İsim alanı boş olamaz")
        }
        else if(surname ==''){
            Alert.alert("Soyisim alanı boş olamaz")
        }else if(password==''){
            Alert.alert("Şifre alanı boş olamaz")
        }else if(username==''){
            Alert.alert("Kullanıcı Adı alanı boş olamaz")
        }
      

        else {
            try {
                fetch("https://6249f9b1852fe6ebf882de48.mockapi.io/api/v1/kullanici", {
                    method: "POST",
                    body: JSON.stringify({
                        "name": name,
                        "surname": surname,
                        "email": email,
                        "password": password,
                        "username": username,
                    }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                })
                    .then(response => {response.json(),setStatus(response.status)})
                    .then(json => console.log(json));
                    if(status==201){
                        Alert.alert(
                            "Aramıza Hoşgeldin "+ name,
                            "Şimdi Ana Sayfaya Yönlendiriliyorsun",
                            [
                              { text: "Devam", onPress: () => {navigation.navigate('Home'),setEmail(""),setsurName(""),setName(""),setPassword(""),setuserName("")} }
                            ]
                          );
                    }
              
            } catch (error) {
                Alert.alert(error + "API Error")
            }
        }

    }
    
    return (

        <View style={{ marginTop: StatusBar.currentHeight, height: hp('100%'), backgroundColor: 'white' }}>
            <ImageBackground source={require("../assets/back.png")} resizeMode="stretch" style={{ height: hp('102%') }}>
            <View style={{height:hp('25%'),alignItems:'center',paddingTop:hp('4%')}}>
                <Image source={{uri:"https://i.hizliresim.com/9uak3jf.png"}} style={{height:hp('25%'),width:wp('80%'),alignSelf:'center'}} />
                </View>
                <View style={{ height: hp('70%'), justifyContent: 'space-evenly' }}>
                    <View style={{ alignItems: 'center',height:hp('50%'),justifyContent:'space-around' }}>
                        <TextInput
                            style={{ width: wp('80%') }}
                            label="İsim"
                            mode="outlined"
                            value={name}
                            onChangeText={name => setName(name)}
                        />
                        <TextInput
                            style={{ width: wp('80%') }}
                            label="Soyisim"
                            mode="outlined"
                            value={surname}
                            onChangeText={surname => setsurName(surname)}
                        />
                        <TextInput
                            style={{ width: wp('80%') }}
                            label="Kullanıcı Adı"
                            mode="outlined"
                            value={username}
                            onChangeText={username => setuserName(username)}
                        />
                        <TextInput
                            style={{ width: wp('80%') }}
                            label="E-mail"
                            mode="outlined"
                            value={email}
                            onChangeText={email => setEmail(email)}
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
                    <Button style={{ width: wp('80%'), alignSelf: 'center' }} loading={loading} mode="contained" onPress={() => buttonclick()}>
                        Üye ol 
                    </Button>
                    <Text onPress={() => navigation.navigate('Login')} style={{ borderRadius: 20, alignSelf: 'center', width: wp('60%'), textAlign: 'center', color: 'white', backgroundColor: 'purple' }}>Zaten Hesabın Var mı ? Giriş Yap</Text>
                </View>
                <View style={{ height: hp('25%') }}>

                </View>
            </ImageBackground>
        </View>

    )
}