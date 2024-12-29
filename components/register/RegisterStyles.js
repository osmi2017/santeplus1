
import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
      },
      title: {
        fontSize: 24,
        marginBottom: 16,
 
      },
      input: {
        width: '90%',
        padding: 8,
        marginVertical: 1,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: 'white',
        backgroundColor:'yellow',
        color:'black',
      },
      loginLink: {
        marginTop: 20,
        alignItems: 'center',
      },
      loginText: {
        marginTop:12,
        color: 'blue',
        textDecorationLine: 'underline',
        fontSize:18,
      }, 
      passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'white',
        borderWidth: 1,
        marginBottom: 12,
        borderColor: '#ccc',
        borderRadius: 4,
        backgroundColor:'yellow', 
        width: '90%',
           
      },
      nameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'white',
        borderWidth: 1,
        marginBottom: 12,
        borderColor: '#ccc',  
        
        borderRadius: 4,  
        backgroundColor:'yellow', 
      },
      emailContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'white',
        borderWidth: 1,
        marginBottom: 12,
        borderColor: '#ccc',  
        
        borderRadius: 4,  
        backgroundColor:'yellow', 
      },
      
});
export default styles;