import { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TextInput, SafeAreaView, ScrollView } from 'react-native'

import DatePicker from 'react-native-date-picker'
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';


export const Formulario = () => {

    const baseUrl = 'http://localhost:7285/Api';
    // const baseUrl = 'https://jsonplaceholder.typicode.com/posts';


    const [Sede, setSede] = useState('01');
    const [Sedes, setSedes] = useState([]);

    const [Jornada, setJornada] = useState(1);
    const [Jornadas, setJornadas] = useState([]);

    const [Carrera, setCarrera] = useState(null);
    const [Carreras, setCarreras] = useState([]);

    const [FechaNacimiento, setFechaNacimiento] = useState(new Date())
    const [OpenDate, setOpenDate] = useState(false)

    const styles = StyleSheet.create({
        fondo: {
        },
        titulo: {
            paddingVertical: 10,
            fontSize: 20,
            textAlign: 'center',
            fontWeight: '700'
        },
        formulario: {
            paddingHorizontal: 20
        },
        inputs: {
            backgroundColor: '#FFF',
            borderRadius: 25,
            paddingHorizontal: 20,
            borderColor: '#4A5568',
            borderWidth: 1,
            fontSize: 15,
            paddingVertical: 13,
            marginBottom: 12
        },

        selects: {
            backgroundColor: '#FFF',
            borderRadius: 25,
            paddingVertical: 0,
            borderColor: '#4A5568',
            borderWidth: 1,
            fontSize: 15,
            marginBottom: 12
        }

    })

    
    

    const getSedes = async () => {
        const fullURL = `${baseUrl}/Sedes`;
        const configurationObject = {
            method: 'get',
            url: fullURL,
        };
        const response = await axios(configurationObject);
        setSedes(response.data);
    }

    const getJornadas = async () => {
        const fullURL = `${baseUrl}/Jornadums`;
        const configurationObject = {
            method: 'get',
            url: fullURL,
        };
        const response = await axios(configurationObject);
        setJornadas(response.data);
    }

    const getCarreraBySedeJornada = async () => {
        const fullURL = `${baseUrl}/Carreras/BySedeJornada/${Sede}/${Jornada}`;
        
        const configurationObject = {
            method: 'get',
            url: fullURL,
        };
        const response = await axios(configurationObject);
        setCarreras(response.data);
    }

    useEffect(() => {
        getSedes()
        getJornadas()
        getCarreraBySedeJornada()
    }, [])

    return (
        <>
            <View style={styles.fondo}>
                <Text style={styles.titulo}>Nueva Inscipcion</Text>

                <View style={styles.formulario}>


                    <View >

                        <TextInput
                            placeholder='Seleccione la fecha'
                            style={styles.inputs}
                            onFocus={
                                () => setOpenDate(true)
                            }
                        ></TextInput>

                        <DatePicker
                            modal
                            open={OpenDate}
                            date={FechaNacimiento}
                            onConfirm={(date) => {
                                setOpenDate(false)
                                setFechaNacimiento(date)
                            }}
                            onCancel={() => {
                                setOpenDate(false)
                            }}
                        />
                    </View>

                    <TextInput placeholder='Seleccione sede' style={styles.inputs}></TextInput>


                    <View style={styles.selects}>
                        <Picker
                            selectedValue={Sede}
                            onValueChange={
                                (itemValue, itemIndex) =>{
                                    setSede(itemValue);
                                    getCarreraBySedeJornada()
                                }
                                
                            }
                        >
                            <Picker.Item label='- Seleccione -' value='' />
                            {
                                Sedes.map(cripto => (
                                    <Picker.Item
                                        key={cripto.idSede}
                                        label={cripto.nombreSede}
                                        value={cripto.idSede}
                                    />
                                ))
                            }
                        </Picker>
                    </View>

                    <View style={styles.selects}>
                        <Picker
                            selectedValue={Jornada}
                            onValueChange={(itemValue, itemIndex) =>
                                {
                                    setJornada(itemValue)
                                    getCarreraBySedeJornada()
                                }
                            }
                        >
                            <Picker.Item label='- Seleccione -' value='' />
                            {
                                Jornadas.map(cripto => (
                                    <Picker.Item
                                        key={cripto.idJornada}
                                        label={cripto.nombreJornada}
                                        value={cripto.idJornada}
                                    />
                                ))
                            }
                        </Picker>
                    </View>

                    <View style={styles.selects}>
                        <Picker
                            selectedValue={Carrera}
                            onValueChange={(itemValue, itemIndex) =>
                                {
                                    setCarrera(itemValue)
                                    
                                }
                            }
                        >
                            <Picker.Item label='- Seleccione -' value='' />
                            {
                                Carreras.map(cripto => (
                                    <Picker.Item
                                        key={cripto.idCarrera}
                                        label={cripto.nomCarrera}
                                        value={cripto.idCarrera}
                                    />
                                ))
                            }
                        </Picker>
                    </View>

                </View>
            </View>
        </>
    )
}
