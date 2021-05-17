import React, { Component } from 'react';
import {Alert, TextInput, StyleSheet, View, Text, Button, Image, DatePickerAndroid} from "react-native";
import { render } from 'react-dom';
import Loading from "./Loading";
import * as Location from "expo-location";
import axios from "axios";
window.DOMParser = require('xmldom').DOMParser;

const API_KEY = "p6mEdnswPYTWHfGIMh0kJsI5ziin5NaamfvTqXAHZjeyyPORGKbXEc8%2BzauIN%2BgH1Kku5a6FAprxq0ox%2FhZFvg%3D%3D";

export default class extends React.Component {
  state = {
    isLoading: true,
  }

  /*
  //버스 도착 정보 목록 조회
  getBusArrivalList = async (stationId) => {
    var Url5 = `http://apis.data.go.kr/6410000/busarrivalservice/getBusArrivalList?serviceKey=${API_KEY}&stationId=${stationId}`

  }

  //버스 위치 정보 조회
  getBusLocationList = async (routeId) => {
    var Url4 = `http://apis.data.go.kr/6410000/buslocationservice/getBusLocationList?serviceKey=${API_KEY}&routeId=${routeId}`

  }

  //버스 노선 목록 조회
  getBusRouteStationList = async (routeId) => {
    var Url3 = `http://apis.data.go.kr/6410000/busrouteservice/getBusRouteStationList?serviceKey=${API_KEY}&routeId=${routeId}}`

  }

  //버스 정류장 목록 조회
  getBusStationList = async (keyword) => {
    var Url2 = `http://apis.data.go.kr/6410000/busstationservice/getBusStationList?serviceKey=${API_KEY}&keyword=${keyword}`

  }
  */

  //주변 버스 정류장 목록 조회
  getBusStationAroundList = async (latitude, longitude) => {  
    var Url = `http://apis.data.go.kr/6410000/busstationservice/getBusStationAroundList?serviceKey=${API_KEY}&x=${longitude}&y=${latitude}`
    
    const { data } = await axios.get(Url);
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data);
    var BusStationAroundList = [];
    for(var i=0; i< xmlDoc.getElementsByTagName("stationId").length; i++)
    {
      if(xmlDoc.getElementsByTagName("stationId")[i].childNodes[0].nodeValue == null)
      {
        break;
      }
      BusStationAroundList[i] = xmlDoc.getElementsByTagName("stationId")[i].childNodes[0].nodeValue;
    }
  }

  getLocation = async () => {
    try {
      await Location.requestForegroundPermissionsAsync();
      const {
        coords: { latitude, longitude }
      } = await Location.getCurrentPositionAsync();
      this.getBusStationAroundList(latitude, longitude);
      this.setState({ isLoading: false });
    } catch (error) {
      Alert.alert("사용자의 위치를 찾을 수 없습니다");
    }
  }

  componentDidMount() {
    this.getLocation();
  }

  render() {
    const { isLoading } = this.state;
    return isLoading ? <Loading /> : null;
  }
};