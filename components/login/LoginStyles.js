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
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 12,
    borderColor: '#ccc',  
    
    borderRadius: 4,  
    backgroundColor:'yellow', 
  },
  forgotPasswordContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  forgotPasswordText: {
    color: 'blue',
    textDecorationLine:'underline',
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'gray',
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: 'gray',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  socialIcon: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    margin: 12,
  },
  createAccountContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  createAccountText: {
    fontWeight:'bold',
    color: 'blue',
    textDecorationLine: 'underline',
    fontSize: 26,
  },
});


export default styles;
