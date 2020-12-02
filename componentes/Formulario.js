
import React, { useState } from 'react';
import {StyleSheet,Text,View, TextInput,Button,TouchableHighlight,Alert,ScrollView} from 'react-native'; 
import DateTimePickerModal from "react-native-modal-datetime-picker";
import shortid from 'shortid';

const Formulario = ({ Citas,setCitas,mostrar_formulario }) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    const [paciente, guardarPaciente] =useState('');
    const [propietario, guardarPropietario] =useState('');
    const [Telefono, guardarTelefono] =useState('');
    const [fecha, guardarFecha] =useState('');
    const [hora, guardarHora] =useState('');
    const [sintomas, guardarSintomas] =useState('');

    //muestra u oculta el datepicker
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    const confirmar_fecha = (date) => {
        const opciones = {year:'numeric', month:'long', day:'2-digit'}
        guardarFecha(date.toLocaleDateString('es-ES',opciones));  
        hideDatePicker();
    };

    
    //muestra u oculta el time piker
    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };
    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };
    const confirmar_hora = (hora) => {
        const opciones = {hour:'numeric', minute:'2-digit'}
        guardarHora(hora.toLocaleString('en-US',opciones));  
        hideDatePicker();
    };
    const crear_nueva_cita=()=>{
        if(paciente.trim()==='' || propietario.trim()==='' || Telefono.trim()==='' || fecha.trim()==='' || hora.trim()==='' || sintomas.trim()==='' ){
            mostrar_Alerta();
            return false;
        }
        const cita = { paciente,propietario,Telefono, fecha, hora,sintomas};
        cita.id = shortid.generate();
        console.log(cita);

        //agregar al state
        const  citas_new  = [...Citas, cita];
        setCitas(citas_new);
        mostrar_formulario(false);

    }
    const mostrar_Alerta = () =>{
        Alert.alert(
            'Error',
            'Todos los campos son hobligatorios',
            [{
                text:'Ok'
            }]
        );
    }
    const dialogo_eliminar = id => {
        console.log("Eliminar..."+id);
        eliminar_paciente(id);
    }
    return (
        <>
            <ScrollView>
                <View style={styles.formulario}>
                    <View style={styles.formulario}>
                        <Text style={styles.label}> Paciente </Text>
                        <TextInput 
                            style={styles.input}
                            onChangeText={ (texto) => guardarPaciente(texto)}
                        />
                    </View>
                    <View style={styles.formulario}>
                        <Text style={styles.label}> Dueño </Text>
                        <TextInput 
                            style={styles.input}
                            onChangeText={ (texto) => guardarPropietario(texto)}
                        />
                    </View>
                    <View style={styles.formulario}>
                        <Text style={styles.label}> Telefono Contacto </Text>
                        <TextInput 
                            style={styles.input}
                            onChangeText={ (texto) => guardarTelefono(texto)}
                            keyboardType='numeric'
                        />
                    </View>
                    <View style={styles.formulario}>
                        
                        <Text style={styles.label}> Fecha </Text>
                        <Button title="Seleccionar fecha" onPress={showDatePicker} />
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={confirmar_fecha}
                            onCancel={hideDatePicker}
                            locale="es_ES"
                            headerTextIOS="Seleccionar fecha"
                            cancelTextIOS="Cancelar"
                            confirmTextIOS="Confirmar"
                        />
                        <Text>{fecha}</Text>
                    </View>
                    <View style={styles.formulario}>
                        <Text style={styles.label}> Hora </Text>
                        <Button title="Seleccionar hora" onPress={showTimePicker} />
                        <DateTimePickerModal
                            isVisible={isTimePickerVisible}
                            mode="time"
                            onConfirm={confirmar_hora}
                            onCancel={hideTimePicker}
                            locale="es_ES"
                            headerTextIOS="Seleccionar fecha"
                            cancelTextIOS="Cancelar"
                            confirmTextIOS="Confirmar"
                        />
                        <Text>{hora}</Text>
                    </View>
                    <View style={styles.formulario}>
                        <Text style={styles.label}> Sintomas </Text>
                        <TextInput 
                            multiline
                            style={styles.input}
                            onChangeText={ (texto) => guardarSintomas(texto)}
                        />
                    </View>
                    <View> 
                        <TouchableHighlight onPress={ () => crear_nueva_cita() } style={ styles.btnSubmit } >
                            <Text style={styles.textoSubmit}> Crear Nueva Cita </Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    btnSubmit:{
        padding:10,
        backgroundColor:"#7d024d",
        marginVertical:10 
    },
    textoSubmit:{
        color:"#FFF",
        fontWeight:"bold",
        textAlign:"center" 
    },
    formulario:{
        backgroundColor:"#FFF",
        paddingHorizontal:5,
        paddingVertical:10,
        marginHorizontal:'2.5%'
    },
    label:{
        fontWeight:"bold",
        fontSize:18,
    },
    input:{
        marginTop:10,
        height:60,
        borderColor:"#e1e1e1",
        borderWidth:1,
        borderStyle:'solid'
    }
});

export default Formulario;