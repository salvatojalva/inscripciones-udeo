import React, { useEffect, useState } from 'react'
import { FlatList, Pressable, Text, View } from 'react-native'
import InscripcionItem from './InscripcionItem';
import axios from 'axios';

export const ModalListado = ({ setShowListado }) => {

    const baseUrl = 'http://localhost:7285/Api';

    
    const [inscripciones, setinscripciones] = useState([]);

    const getInscripciones = async () => {
        const fullURL = `${baseUrl}/PreinscripcionAlumnoes`;
        const configurationObject = {
            method: 'get',
            url: fullURL,
        };
        const response = await axios(configurationObject);
        setinscripciones(response.data);
    }

    useEffect(() => {
        getInscripciones()
    }, [])
    


    return (
        <>
            <View>
                <Pressable
                    onPress={()=>setShowListado(false)}
                >
                    <Text>cerrar</Text>
                </Pressable>
                <Text>
                    ESTO ES EL LISTADO
                </Text>

                <FlatList
                    data={inscripciones}
                    renderItem={InscripcionItem}
                ></FlatList>

            </View>
        </>
    )
}
