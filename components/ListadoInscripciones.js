import React, { useState } from 'react'
import { Text, Pressable, View, StyleSheet, Modal } from 'react-native'
import { ModalListado } from './ModalListado'

const ListadoInscripciones = () => {
    const styles = StyleSheet.create({
        formulario: {
            paddingHorizontal: 20
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

    const [ShowListado, setShowListado] = useState(false)

    return (
        <>
            <View style={styles.formulario}>
                <Pressable
                    style={[styles.btn, styles.btnSimple]}
                    onPress={() => {
                         setShowListado(true)
                    }}
                >
                    <Text style={styles.txtSimple}>
                        Listado de inscripciones
                    </Text>
                </Pressable>

                <Modal
                    visible={ShowListado}
                >
                    <ModalListado
                        setShowListado={setShowListado}
                    ></ModalListado>
                    
                </Modal>
            </View>

        </>
    )
}

export default ListadoInscripciones