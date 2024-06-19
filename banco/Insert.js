import * as SQLite from 'expo-sqlite';
import { create } from './Create.js';
import { Alert, View, Button, StyleSheet } from 'react-native';
import { useState } from 'react';

export function Insert() {
    const [senha, setSenha] = useState('');

    function gerarSenhaAleatoria() {
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let senha = '';
        for (let i = 0; i < 8; i++) {
            const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
            senha += caracteres.charAt(indiceAleatorio);
        }
        setSenha(senha);
        return senha;
    }

    const insert = async () => {
        try {
            db = await create();
            let senha = gerarSenhaAleatoria();
            let result = await db.runAsync(`INSERT INTO senhas (senha) VALUES (?);`, senha);
            if (result.changes > 0) {
                Alert.alert(
                    'Sucesso',
                    `A senha criada é: ${senha}`,
                    [{ text: 'Ok' }],
                    { cancelable: false }
                );
            } else alert('Erro registando senhas');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.container}>
            <Button title="Criar uma Senha" onPress={insert} color="#d32f2f" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5', // Fundo cinza claro
        padding: 20,
        marginTop: 20,
        borderRadius: 100,
        alignItems: 'center',
        width: '100%',
    },
});
