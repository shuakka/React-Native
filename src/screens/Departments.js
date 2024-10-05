import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const Departments = () => {
  const departments = [
    { name: 'Sales', members: 1, image: 'https://example.com/sales-pic-url' },
    { name: 'Engineering', members: 5, image: 'https://example.com/engineering-pic-url' },
    { name: 'Design', members: 2, image: 'https://example.com/design-pic-url' }
  ];

  return (
    <View style={styles.container}>
      {departments.map((dept, index) => (
        <TouchableOpacity key={index} style={styles.departmentItem}>
          <Image source={{ uri: dept.image }} style={styles.departmentImage} />
          <View>
            <Text style={styles.departmentName}>{dept.name}</Text>
            <Text style={styles.departmentMembers}>{dept.members} members</Text>
          </View>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101b23',
    padding: 20,
    paddingTop: 60
  },
  departmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  departmentImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  departmentName: {
    fontSize: 18,
    color: '#fff',
  },
  departmentMembers: {
    fontSize: 14,
    color: '#888',
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#1f2937',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 30,
  },
});

export default Departments;
