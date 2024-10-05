import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export default function AdminDashboard({ navigation }) {


  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.greeting}>Hi, Shubham</Text>
      </View>
      <Image
        source={require('../../assets/bgimage.png')}
        style={styles.mainImage}
      />
      <View style={styles.gridContainer}>
      <TouchableOpacity style={styles.gridItem}
          onPress={() => navigation.replace('MenuDashboard')}>
          <Image
            source={require('../../assets/tileImage.png')}
            style={styles.gridImage}
          />
           <Text style={styles.gridText}>Dashboard</Text>
        </TouchableOpacity>
      <TouchableOpacity style={styles.gridItem}
          onPress={() => navigation.replace('History')}>
          <Image
            source={require('../../assets/tileImage.png')}
            style={styles.gridImage}
          />
           <Text style={styles.gridText}>History</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.gridItem}
          onPress={() => navigation.replace('AttendanceList')}
        >
          <Image
            source={require('../../assets/tileImage.png')}
            style={styles.gridImage}
          />
         <Text style={styles.gridText}> Attendance{'\n'}List</Text>

        </TouchableOpacity>
 
        <TouchableOpacity style={styles.gridItem}>
          <Image
            source={require('../../assets/tileImage.png')}
            style={styles.gridImage}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.gridItem}>
          <Image
            source={require('../../assets/tileImage.png')}
            style={styles.gridImage}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101b23',
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
     color: '#fff'
  },
  mainImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 40,
    marginLeft: 25,
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
    marginBottom: 20,
    right: '5%',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  gridImage: {
    width: '80%',
    height: 130,
    borderRadius: 10,
  },
  gridText: {
    position: 'absolute',
    top: '40%',
    // left: '5%',
   
    color: 'white',
    textAlign:'center',
    justifyContent: 'center', 
    alignItems: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 10,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
  },
});
