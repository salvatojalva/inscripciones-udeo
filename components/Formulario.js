import { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TextInput, SafeAreaView, ScrollView, Pressable } from 'react-native'

import DatePicker from 'react-native-date-picker'
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import uuid from 'react-native-uuid';

export const Formulario = () => {

    const baseUrl = 'http://localhost:7285/Api';

    const [Sede, setSede] = useState('01');
    const [Sedes, setSedes] = useState([]);

    const [Jornada, setJornada] = useState(1);
    const [Jornadas, setJornadas] = useState([]);

    const [Carrera, setCarrera] = useState(null);
    const [Carreras, setCarreras] = useState([]);

    const [Sexo, setSexo] = useState(null);
    const [EstadoCivil, setEstadoCivil] = useState(null);

    const [FechaNacimiento, setFechaNacimiento] = useState(new Date())
    const [fechaToValidate, setfechaToValidate] = useState(new Date())

    const [OpenDate, setOpenDate] = useState(false)

    const [Document, setDocument] = useState('')
    const [PrimerNombre, setPrimerNombre] = useState('')
    const [SegundoNombre, setSegundoNombre] = useState('')
    const [PrimerApellido, setPrimerApellido] = useState('')
    const [SegundoApellido, setSegundoApellido] = useState('')
    const [Correo, setCorreo] = useState('')
    const [Direccion, setDireccion] = useState('')

    const [SeEnvio, setSeEnvio] = useState(false)
    const [SeGuardo, setSeGuardo] = useState(false)


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
            paddingVertical: 2,
            marginBottom: 13
        },

        selects: {
            backgroundColor: '#FFF',
            borderRadius: 25,
            borderColor: '#4A5568',
            borderWidth: 1,
            fontSize: 15,
            marginBottom: 13,
            height: 35
        },
        picker: {
            marginTop: -10
        },

        fechaBtn: {
            textAlign: 'left',
            fontSize: 15,
            color: '#4A5568',
            fontWeight: '400',
            paddingHorizontal: 10,
            paddingVertical: 5
        },

        btn: {

            borderRadius: 25,
            borderColor: '#FFF',
            borderWidth: 1,

            marginBottom: 13,
            height: 50
        },

        btnSimple: {
            backgroundColor: '#A0AEC0',
        },
        txtSimple: {
            color: '#FFF',
            textAlign: 'center',
            fontSize: 20,
            marginVertical: 10
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

    const guardarInscripcion = async () => {

        setSeEnvio(true)
        setSeGuardo(false)

        const fullURL = `${baseUrl}/PreinscripcionAlumnoes`;
        const nuevaInscripcion = {
            "id": uuid.v4().slice(0, 9),
            "nombre1": PrimerNombre,
            "nombre2": SegundoNombre,
            "apellido1": PrimerApellido,
            "apellido2": SegundoApellido,
            "estadoCivil": EstadoCivil,
            "genero": Sexo,
            "fechanac": FechaNacimiento,
            "fechaPre": new Date(),
            "celular": "123234234",
            "correoPersonal": Correo,
            "direccion": Direccion,
            "estado": true,
            "dpi": Document,
            "idSedeCarreraJornada": Carrera
        };
        

        try {
            const response = await axios.post(fullURL, nuevaInscripcion);
            setSeGuardo(true)

            setTimeout(() => {
                setSeEnvio(false)
                setSeGuardo(false)
                setSede('01')
                setJornada(1)
                setCarrera(null)
                setDocument('')
                setPrimerNombre('')
                setSegundoNombre('')
                setPrimerApellido('')
                setSegundoApellido('')
                setSexo(null)
                setEstadoCivil(null)
                setFechaNacimiento(new Date())
                setCorreo('')
                setDireccion('')
            }, 4000)

        } catch (error) {
            if (error.response) {
                // Request made but the server responded with an error
                console.log(error.response.data);
                console.log(error.response.status);
            } else if (error.request) {
                // Request made but no response is received from the server.
                console.log(error.request);
            } else {
                // Error occurred while setting up the request
                console.log('Error', error.message);
            }
        }

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

                    <View style={styles.selects}>
                        <Picker
                            style={styles.picker}
                            selectedValue={Sede}
                            onValueChange={
                                (itemValue, itemIndex) => {
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
                            style={styles.picker}
                            selectedValue={Jornada}
                            onValueChange={(itemValue, itemIndex) => {
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
                            style={styles.picker}
                            selectedValue={Carrera}
                            onValueChange={(itemValue, itemIndex) => {
                                setCarrera(itemValue)

                            }
                            }
                        >
                            <Picker.Item label='- Seleccione -' value='' />
                            {
                                Carreras.map(cripto => (
                                    <Picker.Item
                                        key={cripto.idSedeCarreraJornada}
                                        label={cripto.nomCarrera}
                                        value={cripto.idSedeCarreraJornada}
                                    />
                                ))
                            }
                        </Picker>
                    </View>

                    <TextInput placeholder='DPI' style={styles.inputs} onChangeText={t => setDocument(t)} defaultValue={Document}></TextInput>
                    <TextInput placeholder='Primer nombre' style={styles.inputs} onChangeText={t => setPrimerNombre(t)} defaultValue={PrimerNombre}></TextInput>
                    <TextInput placeholder='Segundo nombre' style={styles.inputs} onChangeText={t => setSegundoNombre(t)} defaultValue={SegundoNombre}></TextInput>
                    <TextInput placeholder='Primer apellido' style={styles.inputs} onChangeText={t => setPrimerApellido(t)} defaultValue={PrimerApellido}></TextInput>
                    <TextInput placeholder='Segundo apellido' style={styles.inputs} onChangeText={t => setSegundoApellido(t)} defaultValue={SegundoApellido}></TextInput>

                    <View style={styles.selects}>
                        <Picker
                            style={styles.picker}
                            selectedValue={Sexo}
                            onValueChange={(itemValue, itemIndex) => {
                                setSexo(itemValue)

                            }
                            }
                        >

                            <Picker.Item label='- Seleccione su sexo-' value='' />
                            <Picker.Item label='F' value='Mujer' />
                            <Picker.Item label='M' value='Hombre' />

                        </Picker>
                    </View>

                    <View style={styles.selects}>
                        <Picker
                            style={styles.picker}
                            selectedValue={EstadoCivil}
                            onValueChange={(itemValue, itemIndex) => {
                                setEstadoCivil(itemValue)

                            }
                            }
                        >

                            <Picker.Item label='- Seleccione su estado civil-' value='' />
                            <Picker.Item label='Soltero/a' value='Soltero' />
                            <Picker.Item label='Casado/a' value='Casado' />

                        </Picker>
                    </View>

                    <View style={styles.selects}>

                        <Pressable
                            onPress={() => {
                                setOpenDate(true)
                            }}
                        >
                            <Text style={styles.fechaBtn}>
                                {
                                    (FechaNacimiento.toUTCString() !== fechaToValidate.toUTCString())
                                        ? FechaNacimiento.toUTCString()
                                        : "Fecha de nacimiento"
                                }
                            </Text>
                        </Pressable>

                        <DatePicker
                            modal
                            mode='date'
                            format="YYYY-MM-DD"
                            maxDate="2010-06-01"
                            confirmBtnText="Seleccionar"
                            cancelBtnText="Cancelar"
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

                    <TextInput placeholder='Correo electronico' style={styles.inputs} onChangeText={t => setCorreo(t)} defaultValue={Correo}></TextInput>
                    <TextInput placeholder='Direccion' style={styles.inputs} onChangeText={t => setDireccion(t)} defaultValue={Direccion}></TextInput>

                    <Pressable 
                        style={[styles.btn, styles.btnSimple]} 
                        onPress={() => {
                            if(!SeEnvio) guardarInscripcion()
                        }}
                    >
                        <Text style={styles.txtSimple}>
                            Guardar
                        </Text>
                    </Pressable>

                    
                    <Text>
                        {
                            (SeEnvio && SeGuardo)
                            ? 'Se Guardo todo bien'
                            : ''
                        }
                    </Text>
                </View>
            </View>
        </>
    )
}
