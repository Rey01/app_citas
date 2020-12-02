
import React from 'react';
import {StyleSheet,Text,View, TouchableHighlight} from 'react-native'; 


const Cita = ({ item,eliminar_paciente }) => {
    const dialogo_eliminar = id => {
        console.log("Eliminar..."+id);
        eliminar_paciente(id);
    }
    return (
        <View style={ styles.cita }>
            <View>
                <Text style={ styles.label} >Paciente</Text>
                <Text  style={ styles.texto}>{item.paciente}</Text>
            </View>
            <View>
                <Text style={ styles.label} >Propietario</Text>
                <Text style={ styles.texto}>{item.propietario}</Text>
            </View>
            <View>
                <Text style={ styles.label} >Sintomas</Text>
                <Text style={ styles.texto}>{item.sintomas}</Text>
            </View>
            <TouchableHighlight onPress={ () => dialogo_eliminar(item.id) } style={ styles.botom_eliminar } >
                <Text style={styles.texto_eliminar}> Eliminar &times; </Text>
            </TouchableHighlight>
        </View>
    );
}

const styles = StyleSheet.create({
    cita:{
        backgroundColor:"#FFF",
        borderBottomColor:"#e1e1e1",
        borderStyle:"solid",
        borderBottomWidth:1,
        paddingVertical:20,
        paddingHorizontal:10,
    },
    label:{
        fontWeight:"bold",
        fontSize:18,
        marginTop:20
    },
    texto:{
        fontSize:20
    },
    botom_eliminar:{
        padding:10,
        backgroundColor:"red",
        marginVertical:10
    },
    texto_eliminar:{
        color:"#FFF",
        fontWeight:"bold",
        textAlign:"center"
    }
});

export default Cita;