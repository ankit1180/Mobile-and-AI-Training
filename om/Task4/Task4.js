import React from 'react';
import { View, Text, StyleSheet ,ActivityIndicator,FlatList} from 'react-native';
import { useState ,useEffect} from 'react';


const FetchingData = () =>{

const [data,setData] = useState([]);
const [loading,setLoading] = useState(false);
const [errorMsg,setErrorMsg] = useState('');
const [refreshing,setRefreshing] = useState(false);


const FetchData = async(isRefresh = false) =>{
        
    if(isRefresh){
        setRefreshing(true);
    }
    setLoading(true);
    //Fetching Data

    try{
        const response = await fetch('https://randomuser.me/api/?results=10');

        console.log(response);

        if(!response.ok){
            throw new Error('Something Went wrong');
        }else{
            const json = await response.json();
            setData(json.results);
        }
    }catch (err){
        setErrorMsg(err.message);
    }finally{
        setLoading(false);

        if(isRefresh){
            setRefreshing(false);
        }
    }


};

useEffect(() => {
    const timerId = setTimeout(() => {
       FetchData();
    }, 6000);

    return () => {
        clearTimeout(timerId);
    };
}, []);


if(loading){
    return(
        <View>

             <ActivityIndicator size="large" color="red" />
        </View>
    )
}

if(errorMsg){
    return(
        <View>
            <Text>{errorMsg}</Text>
        </View>
    )
}


 return(
    <View style = {styles.container}>

       <FlatList 
        data={data}
        keyExtractor={(item, index) => index.toString()} 
        renderItem={({item}) =>(
           <View style = {styles.dataSection}>
            <Text style = {styles.text1}>{item.name.first}</Text>
            <Text style = {styles.text1}>{item.gender}</Text>
            
            </View>
        )} 
        refreshing = {refreshing}
        onRefresh = {() => FetchData(true)} 
        
        />


       

    </View>
 )

};

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    dataSection:{
        width: '100%',
        height: 200,
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text1:{
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    }
})


export default FetchingData;