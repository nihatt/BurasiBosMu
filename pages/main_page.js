import { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View, SafeAreaView, ImageBackground, FlatList, ActivityIndicator, Alert, Image, RefreshControl, StatusBar, Dimensions } from 'react-native';
import { Searchbar, IconButton } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import BigCard from "../components/big_card";
import SmallCard from "../components/small_card";
import { 
    useFonts,
    Coustard_400Regular,
    Coustard_900Black 
  } from '@expo-google-fonts/coustard'

  import { 
    CoveredByYourGrace_400Regular 
  } from '@expo-google-fonts/covered-by-your-grace'

  import { 
    Exo2_100Thin,
    Exo2_100Thin_Italic,
    Exo2_200ExtraLight,
    Exo2_200ExtraLight_Italic,
    Exo2_300Light,
    Exo2_300Light_Italic,
    Exo2_400Regular,
    Exo2_400Regular_Italic,
    Exo2_500Medium,
    Exo2_500Medium_Italic,
    Exo2_600SemiBold,
    Exo2_600SemiBold_Italic,
    Exo2_700Bold,
    Exo2_700Bold_Italic,
    Exo2_800ExtraBold,
    Exo2_800ExtraBold_Italic,
    Exo2_900Black,
    Exo2_900Black_Italic 
  } from '@expo-google-fonts/exo-2'


export default function MainPage(props) {
    let [fontsLoaded] = useFonts({
        Coustard_400Regular,
        Coustard_900Black,
        CoveredByYourGrace_400Regular,
        Exo2_100Thin,
        Exo2_100Thin_Italic,
        Exo2_200ExtraLight,
        Exo2_200ExtraLight_Italic,
        Exo2_300Light,
        Exo2_300Light_Italic,
        Exo2_400Regular,
        Exo2_400Regular_Italic,
        Exo2_500Medium,
        Exo2_500Medium_Italic,
        Exo2_600SemiBold,
        Exo2_600SemiBold_Italic,
        Exo2_700Bold,
        Exo2_700Bold_Italic,
        Exo2_800ExtraBold,
        Exo2_800ExtraBold_Italic,
        Exo2_900Black,
        Exo2_900Black_Italic 

      });




    const arkaplansec = (sayi) => {
        console.log(sayi);
        if(sayi<5 && sayi>0){
            return "green"
        }
        else if (sayi>5 && sayi<=8){
            return "orange"
        }
        else 
        return "red"
    }
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryData, setCategoryData] = useState([]);
    const [temporaryData, setTemporaryData] = useState([]);
    const onChangeSearch = query => {
        setSearchQuery(query), console.log(query),
            setTemporaryData(categoryData.filter(e => {
                if (query === '') {
                    return e;
                } else
                    return e.kafename.toLowerCase().includes(query.toLowerCase())
            }))
    };

    const getData = async () => {
        await fetch('https://6249f9b1852fe6ebf882de48.mockapi.io/api/v1/kafeler', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response2 => response2.json())
            .then(data2 => {
                setCategoryData(data2);
                console.log(data2);
            })
            .catch(err => console.error(err));
    }

    if (categoryData.length == 0) {
        console.log("girdi");
        getData();
        return <ActivityIndicator size="large" color='red' style={{
            flex: 1,
            justifyContent: "center"
        }} />;

    }

    // if(searchQuery.length != 0){
    //     return <ActivityIndicator size="large" color='red' style={{
    //         flex: 1,
    //         justifyContent: "center"
    //     }} />;
    // }


    return (
        <View style={{  marginTop: StatusBar.currentHeight, height: hp('100%'),backgroundColor:'white' }}>
            <View style={{ height: hp('12%'),  justifyContent: 'center' }}>
                <Searchbar
                    style={{ borderRadius: 20 ,width:wp('90%'),alignSelf:'center'}}
                    placeholder="Cafe Adına Göre Arama "
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                />
            </View>
            <View style={{ height: hp('8%'), justifyContent: 'center' }}>
                <Text style={{fontFamily: 'Exo2_900Black',fontSize:20,textAlign:'auto',marginLeft:wp('3%')}}>Konumuna En Yakın Boş Cafeler</Text>
            </View>
            <View style={{ height: hp('18%'),flexDirection: 'row' }}>
                <FlatList horizontal={true}
                    data={categoryData}
                    renderItem={({ item }) => <SmallCard arkarenk={arkaplansec(item.kafebosmasasayisi)} resim={item.kaferesim} kafeadi={item.kafename} dolulukorani={"%"+item.kafebosmasasayisi*10}></SmallCard>}
                    keyExtractor={item => item.id}
                />
            </View>
            <View style={{height: hp('53%'),marginTop:hp('3%')}}>
            <View style={{ height: hp('8%'),  justifyContent: 'center' }}>
                <Text  style={{fontFamily: 'Exo2_900Black',fontSize:20,marginLeft:wp('3%')}}>En çok Tercih Edilen Kafeler</Text>
            </View>

            <View style={{ height: hp('45%'),  justifyContent: 'center' }}>
            <FlatList horizontal={true}
                    data={temporaryData.length != 0 ? temporaryData : categoryData}
                    contentContainerStyle={{    flexGrow: 1,
                    justifyContent: 'space-around',
                    alignItems:"center"}}
                    renderItem={({ item }) => <BigCard url={item.kafelinkkonum}  arkaplanrenk={arkaplansec(item.kafebosmasasayisi)} kafeil={item.kafeil} kafeilce={item.kafeilce} arkarenk={arkaplansec(item.kafebosmasasayisi)} resim={item.kaferesim} kafeadi={item.kafename} dolulukorani={"%"+item.kafebosmasasayisi*10}></BigCard>}
                    keyExtractor={item => item.id}
                />
            </View>
            </View>
        </View>
    )
}