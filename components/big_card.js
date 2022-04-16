import { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View, SafeAreaView, ImageBackground,Linking, FlatList, ActivityIndicator, Alert, Image, RefreshControl, StatusBar, Dimensions } from 'react-native';
import { Searchbar, IconButton,Colors } from 'react-native-paper';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
//props.resim
//props.kafeadi
//props.arkarenk
//props.dolulukorani

export default function BigCard(props) {
    const image = { uri: props.resim };
    return (
        <View style={{ height: hp('45%'), width: wp('80%'), alignItems: 'center', marginHorizontal: wp('2%') }}>
            <ImageBackground blurRadius={5} imageStyle={{ borderRadius: 10 }} source={image} resizeMode="cover" style={{ flex: 1, height: hp('43%'), width: wp('80%') }}>
                <View style={{ height: hp('45%'), alignItems: 'center', justifyContent: 'space-around' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: wp('70%') }}>
                        <Text style={{
                            fontFamily: 'CoveredByYourGrace_400Regular', color: 'white', fontSize: 20, textShadowColor: 'rgba(0, 0, 128, 0.90)',
                            textShadowOffset: { width: -1, height: 1 },
                            textShadowRadius: 10
                        }}>{props.kafeadi}</Text>
                        <Text style={{ fontFamily: 'Exo2_600SemiBold_Italic', color: 'white', backgroundColor: props.arkaplanrenk, borderRadius: 30, width: wp('20%'), textAlign: 'center', justifyContent: 'center', alignItems: 'center', textAlignVertical: 'center' }}>{props.dolulukorani}</Text>
                    </View>
                    <View style={{height:hp('20%'),justifyContent:'space-evenly'}}>
                    <View style={{ flexDirection:'row',alignSelf:'center',width: wp('50%'), height:hp('8%'),justifyContent:'center' }}>
                    <IconButton
    icon="whatsapp"
    color={Colors.green500}
    size={30}
    onPress={() =>  {
        Linking.canOpenURL(props.url).then(supported => {
          if (supported) {
            Linking.openURL(props.url);
          } else {
            console.log("Linkte hata var gibi duruyor , server tarafına sorun iletildi. " + props.url);
          }
        });
      }}
  />
    <IconButton
    icon="comment-search-outline"
    color={Colors.white}
    size={30}
    onPress={() =>  {
        Linking.canOpenURL(props.yorumurl).then(supported => {
          if (supported) {
            Linking.openURL(props.yorumurl);
          } else {
            console.log("Linkte hata var gibi duruyor , server tarafına sorun iletildi. " + props.yorumurl);
          }
        });
      }}
  />
    <IconButton
    icon="map-marker-circle"
    color={Colors.yellow400}
    size={30}
    onPress={() =>  {
        Linking.canOpenURL(props.kafekonumurl).then(supported => {
          if (supported) {
            Linking.openURL(props.kafekonumurl);
          } else {
            console.log("Linkte hata var gibi duruyor , server tarafına sorun iletildi. " + props.kafekonumurl);
          }
        });
      }}
  />
                    </View>
                    <View style={{ backgroundColor: 'grey', height: hp('6%'),width: wp('60%'), borderRadius: 50, justifyContent: 'space-evenly', alignItems: 'center' }}>
                        <Text style={{ color: 'white' }}>{props.kafeil + " / " + props.kafeilce}</Text>
                    </View>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}
