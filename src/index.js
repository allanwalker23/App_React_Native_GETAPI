import React,{useEffect,useState} from 'react'
import {SafeAreaView,FlatList,Text,StyleSheet,StatusBar,TouchableOpacity} from 'react-native'
import api from '../services/api'

//Não possuem valor semantico
//Não possuem estilização propria
///Todos compoeets possuem por padrao "display:flex"
//View: Div,footer,header,main...
//Text: p,strong,h1,span



export default function App(){
    const[projects,setProjects]= useState([]);

    useEffect(()=>{
        api.get('projects').then(response =>{
            setProjects(response.data)
        })
    },[])

    async function handleAddProject(){
        const response = await api.post('projects',{
            title:`Novo projeto ${Date.now()}`,
            owner: 'Allan Hipolito'
        });
        
        setProjects([...projects,response.data])
        }
    
    return (
        <>

    <StatusBar backgroundColor="black"/>
    <SafeAreaView style={styles.container}>
    <FlatList 
    
    data={projects}
    keyExtractor={project =>project.id}
    renderItem={({item:project})=>
        <Text style={styles.title} key={project.id}>{project.title}</Text>
    }
    />
    <TouchableOpacity 
    style={styles.button} 
    onPress={handleAddProject}>

        <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
    </SafeAreaView>
     </>
     
        )
        
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: 'purple',
    },
    title:{
        color:'#FFF',
        fontSize:50,
        fontWeight:'bold'
    },
    button:{
        alignSelf: 'stretch',
        backgroundColor:'#FFF',
        margin:20,
        height:50,
        borderRadius:4,
        justifyContent:'center',
        alignItems:'center'

    },
    buttonText:{
        fontWeight:'bold',
        fontSize:16,

    }


})