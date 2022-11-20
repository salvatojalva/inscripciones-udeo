import React from 'react'
import { Text, View } from 'react-native';

const InscripcionItem = ({item}) => {
    const {
        id,
        nombre1,
        nombre2,
        apellido1,
        apellido2,
        estadoCivil,
        genero,
        fechanac,
        fechaPre,
        celular,
        correoPersonal,
        direccion,
        estado,
        dpi,
        idSedeCarreraJornada,
        idSedeCarreraJornadaNavigation
      } = item;
  return (
    <>
        <View>
            <Text>{nombre1} {apellido1}</Text>
        </View>
    </>
  )
}

export default InscripcionItem