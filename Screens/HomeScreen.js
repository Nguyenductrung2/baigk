import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import firestore from '@react-native-firebase/firestore';
import { useMyContextProvider, logout } from '../src/MyContextControllerProvider';
import { Appbar, Button } from 'react-native-paper'; 

const extractNameFromEmail = (email) => email.substring(0, email.indexOf('@')) || email;

const HomeScreen = () => {
    const [job, setJob] = useState(""); 
    const [jobs, setJobs] = useState([]); 
    const [controller, dispatch] = useMyContextProvider();
    const { userLogin } = controller;
    const navigation = useNavigation();

    useEffect(() => {
        if (userLogin == null)
          navigation.navigate("Login")
      }, [userLogin]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const snapshot = await firestore().collection('jobs').get();
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setJobs(data);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    const handleSaveData = async () => {
        if (!job) {
            alert("Please enter some data");
            return;
        }

        try {
            await firestore().collection('jobs').add({ job });
            setJob("");
            fetchData();
        } catch (error) {
            console.error('Error saving data: ', error);
            alert("An error occurred while saving data");
        }
    };

    const handleDeleteJob = async (id) => {
        try {
            await firestore().collection('jobs').doc(id).delete();
            fetchData();
        } catch (error) {
            console.error('Error deleting data: ', error);
            alert("An error occurred while deleting data");
        }
    };

    const addJob = () => job && handleSaveData();

    const Job = ({ id, job }) => (
        <View style={styles.jobContainer}>
            <Text style={styles.jobText}>{job}</Text>
            <TouchableOpacity onPress={() => handleDeleteJob(id)} style={styles.deleteButton}>
                <Text style={{ color: 'white' }}>Delete</Text>
            </TouchableOpacity>
        </View>
    );

    const handleLogout = () => logout(dispatch);

    return (
        <View style={styles.container}>
            <Text style={styles.greeting}>Hello, {userLogin ? extractNameFromEmail(userLogin.email) : userLogin }</Text>
            <Appbar.Header>
                <TextInput style={styles.input} label={'Add New Entity'} value={job} onChangeText={setJob} />
                <Button color="pink" onPress={addJob} disabled={!job}>ADD</Button>
            </Appbar.Header>
            <FlatList style={styles.list} data={jobs} keyExtractor={(item) => item.id} renderItem={({ item }) => <Job id={item.id} job={item.job} />} />
            <View style={styles.bottomContainer}>
                <Button icon="logout" mode="contained" onPress={handleLogout}>Logout</Button>
            </View>
        </View>
    );    
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    jobContainer: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginHorizontal: 20, marginVertical: 10, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5, borderWidth: 1, borderColor: "#ddd", backgroundColor: "#f9f9f9" },
    jobText: { flex: 1 },
    deleteButton: { backgroundColor: 'red', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5 },
    greeting: { fontSize: 20, textAlign: 'center', paddingVertical: 10 },
    input: { flex: 1, marginRight: 10 },
    bottomContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 20 },
    list: { flex: 1 },
});

export default HomeScreen;
