import { useState,useEffect,useCallback } from "react";
import { StyleSheet, Text, View, SafeAreaView,ImageBackground, FlatList, ActivityIndicator, Alert,Image,RefreshControl } from 'react-native';
import { Searchbar,IconButton } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function DetailsPage() {
    return(
        <View style={{ marginTop: StatusBar.currentHeight, height: hp('100%'),backgroundColor:'white' }}>
            <Text>details</Text>
        </View>
    )
}