import React from 'react';
import { View, Text, TouchableOpacity,StyleSheet, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Header from '../components/Header';
import { Button, Icon } from 'react-native-paper';


const Timeline = ({ route ,navigation}) => {
    const { activity } = route.params;
    const onBackPressed = () => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'History' }],
      })
    }
    return (
      <>
        <View style={styles.headerContainer}>
          <Button onPress={onBackPressed}  icon={require('../assets/arrow_back.png')}/>
            <Header title="Attendance List" />
        </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsText}>Activity Details:</Text>
        <Text style={styles.detailsText}>Start Time: {activity.startTime}</Text>
        <Text style={styles.detailsText}>End Time: {activity.endTime}</Text>
        <Text style={styles.detailsText}>Activity Log: {activity.activityLog}</Text>
      </View>
      </>
    );
  };

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginTop:20,
    marginBottom:10,
    backgroundColor: '#fff'
  },
    detailsContainer: {
        padding: 20,
      },
      detailsText: {
        fontSize: 16,
        marginVertical: 5,
      }
});

export default Timeline;

