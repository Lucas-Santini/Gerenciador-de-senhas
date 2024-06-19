import React, { useState } from 'react';
import { Alert, Button, FlatList, Text, View, StyleSheet } from 'react-native';
import { create } from './Create.js';

export function AllContacts() {
    let [flatListItems, setFlatListItems] = useState([]);
    let [flatListItems2, setFlatListItems2] = useState([]);

    const getUltimaSenha = async () => {
        try {
            db = await create();
            let allRows = await db.getAllAsync('SELECT * from senhas ORDER BY id DESC LIMIT 1;');
            setFlatListItems(allRows);
            console.log("[LOG] Data retrieved from tables senhas");
            if (allRows.length == 0) {
                Alert.alert(
                    'Alerta',
                    'Nenhuma senha salva',
                    [{ text: 'Ok' }],
                    { cancelable: false }
                );
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getAllSenhas = async () => {
        try {
            db = await create();
            let allRows = await db.getAllAsync('select * from senhas;');
            setFlatListItems2(allRows);
            console.log("[LOG] Data retrieved from tables senhas");
            if (allRows.length == 0) {
                Alert.alert(
                    'Alerta',
                    'Nenhuma senha salva',
                    [{ text: 'Ok' }],
                    { cancelable: false }
                );
            }
        } catch (error) {
            console.log(error);
        }
    }

    let listItemView = (item) => {
        return (
            <View key={item.id} style={styles.listItem}>
                <Text style={styles.textheader}>Senha</Text>
                <Text style={styles.textbottom}>{item.senha}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Button title="Última Senha criada" onPress={getUltimaSenha} color="#d32f2f" />
            <View style={styles.listContainer}>
                <FlatList
                    style={{ marginTop: 20 }}
                    contentContainerStyle={{ paddingHorizontal: 20 }}
                    data={flatListItems}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => listItemView(item)}
                />
            </View>
            <Button title="Todas as Senhas" onPress={getAllSenhas} color="#d32f2f" />
            <View style={styles.listContainer}>
                <FlatList
                    style={{ marginTop: 20 }}
                    contentContainerStyle={{ paddingHorizontal: 20 }}
                    data={flatListItems2}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => listItemView(item)}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        marginTop: 20,
        
    },
    listContainer: {
        flex: 1,
        backgroundColor: '#f5f5f5', // Fundo cinza claro
        borderRadius: 10,
        marginTop: 20,
        width: '100%',
    },
    listItem: {
        backgroundColor: '#ffffff', // Fundo branco
        marginTop: 10,
        padding: 20,
        borderRadius: 100,
    },
    textheader: {
        color: '#d32f2f', // Texto vermelho
        fontSize: 14,
        fontWeight: '700',
    },
});
