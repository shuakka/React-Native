import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const MenuDashboard = ({navigation}) => {

  const handleLogout = () => {
    // Handle logout logic here
    console.log('Logging out...');
    navigation.navigate('StartScreen')
   
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <Image source={require('../assets/pic1.png')} style={styles.profileImage} />
        <Text style={styles.name}>Catherine Smith</Text>
        <Text style={styles.role}>Admin</Text>
        <Text style={styles.email}>catherinesmith@company.com</Text>
      </View>
      
      <View style={styles.menuSection}>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText} onPress={() => navigation.navigate('Departments')}>Departments</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Members</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Invites</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Usage & Billing</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101b23',
    padding: 20,
    justifyContent: 'space-between',
    paddingTop: 40
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 5,
  },
  role: {
    fontSize: 16,
    color: '#888',
  },
  email: {
    fontSize: 14,
    color: '#888',
  },
  menuSection: {
    marginVertical: 20,
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#1f2937',
  },
  menuText: {
    color: '#fff',
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#1f2937',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 10,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default MenuDashboard;
