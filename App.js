
import React, { useState } from 'react';
import { StyleSheet, Text,View,FlatList,TouchableHighlight,Platform, TouchableWithoutFeedback, Keyboard} from 'react-native';
import Cita from "./componentes/Citas"
import Formulario from "./componentes/Formulario"

const App = () => {
  const [MostrarFrom, guardarmMstrarFrom] =useState(false);
  const [citas, setCitas ] = useState([]);


  const eliminar_paciente = id => {
    setCitas((citasActuales)=>{
      return citasActuales.filter( cita => cita.id !==id );
    });
  }
  const mostrar_formulario = () => {
    guardarmMstrarFrom(!MostrarFrom)
  }
  const cerrarTeclado = () =>{
    Keyboard.dismiss();
  }
  return (
    <TouchableWithoutFeedback onPress={() => cerrarTeclado()} >
      <View style={styles.contenedor}>
        <Text style={styles.titulo}  > Administrador de Citas</Text>
        <View> 
            <TouchableHighlight onPress={ () => mostrar_formulario() } style={ styles.btnMostrarForm } >
                <Text style={styles.textoMostrarForm}> {MostrarFrom ? 'Cancelar Cita' : 'Crear Cita' } </Text>
            </TouchableHighlight>
        </View>
        <View style={styles.contenido}>
          { MostrarFrom ? (
              <>
            <Text style={styles.titulo}  > Crear Nueva Cita </Text>
          <Formulario 
            citas={citas}
            setCitas={setCitas}
            mostrar_formulario={mostrar_formulario}
          /> 
          </>
          ) : (
              <>
            <Text style={styles.titulo}  > {citas.length>0 ? 'Administrador de Citas' :'No hay citas, Agrega una'} </Text>
            <FlatList 
            style={styles.listado}
              data={citas}
              renderItem={ ({ item }) => <Cita item={item} eliminar_paciente={eliminar_paciente} />}
              keyExtractor={ cita => cita.id}
            />
            </>
          )}
          
        </View>
        
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  contenedor:{
    backgroundColor:'#AA076B',
    flex:1
  },
  btnMostrarForm:{
      padding:10,
      backgroundColor:"#7d024d",
      marginVertical:10 
  },
  textoMostrarForm:{
      color:"#FFF",
      fontWeight:"bold",
      textAlign:"center" 
  },
  contenido:{
    flex:1,
    marginHorizontal:'2.5%'
  },
  listado:{
    flex:1,
    marginHorizontal:'2.5%' 
  },
  titulo:{
    color:"#FFF",
    textAlign:'center',
    marginTop: Platform.OS==='ios'? 40 : 20,
    marginBottom:20,
    fontSize:24,
    fontWeight:'bold',

  }

});

export default App;
