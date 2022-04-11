import { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View, SafeAreaView, ImageBackground, FlatList, ActivityIndicator, Alert, Image, RefreshControl, StatusBar, Dimensions } from 'react-native';
import { Searchbar, IconButton } from 'react-native-paper';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";


export default function SmallCard (props) {
  const image = { uri: props.resim };
    return(
    <View style={{height:hp('18%'),width:wp('23%'),alignItems:'center',marginHorizontal:wp('2%')}}>
            <ImageBackground blurRadius={5} imageStyle={{ borderRadius: 10}} source={image} resizeMode="cover" style={{flex:1,height:hp('18%'),width:wp('23%')}}>
                <View style={{height:hp('18%'),alignItems:'center',justifyContent:'space-around'}}>
        <View>
            <Text style={{color:'white',backgroundColor:'purple'}}>{props.kafeadi}</Text>
        </View>
        <View style={{backgroundColor:props.arkarenk,height:hp('6%'),width:wp('10%'),borderRadius:50,justifyContent:'center',alignItems:'center'}}>
        <Text style={{color:'white'}}>{props.dolulukorani}</Text>
        </View>
        </View>
        </ImageBackground>
    </View>
    )
}
