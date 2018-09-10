import React, {} from 'react';
import {TextField , RaisedButton,AppBar} from 'material-ui'; 
import '../Confiq/firebase.js';
import * as firebase from 'firebase';
import {Link} from 'react-router-dom';
import '../App.css';
import Background from './im6.jpg';

const style = {
    buttonStyle : {
    width:280,
},
labelStyle: {
    color: 'rgb(18, 17, 114)',
    backgroundColor:'white',
    fontWeight:'bold',
    fontFamily: 'sans-serif',
    fontStyle: 'oblique',
    fontSize:16,

},
}
var sectionStyle = {
    width: "100%",
    height: "660px",
    backgroundImage: `url(${Background})`
  };
class Signup extends React.Component{
    ref = firebase.database().ref("Chat App");
    constructor(props){
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            Email: '',
            password: '',
            ConformPass: ''
            
        }

this.submitdata = this.submitdata.bind(this);
}
submitdata(){
    if(this.state.firstname ==="" ||this.state.lastname ==="" ||this.state.Email ==="" ||this.state.password ==="" ||this.state.ConformPass ===""){
        alert('Please Fill All The Fields');
     }
    else 
    if(this.state.password !== this.state.ConformPass){
         alert('Incorrect Password')
     }
    else{
        console.log(this.state.firstname,this.state.lastname,this.state.Email,this.state.password,this.state.ConformPass)
        const email = this.state.Email ;
        const pass = this.state.password ;
        const auth = firebase.auth();
        const promise = auth.createUserWithEmailAndPassword(email , pass)
        promise.then(  (aaa) => {
            console.log(">>>>>>>>>>>", aaa);
            if(aaa.uid != null){
                console.log(aaa.uid)
//this.ref.chlid('users').
              this.ref.child(aaa.uid).set({firstname:this.state.firstname,lastname:this.state.lastname,Email:this.state.Email})
               alert('successfull');
               this.setState({
                firstname:'',
                lastname:'',
                Email:'',
                password:'',
                ConformPass:'',
                value:''
            })
    
    
               
             } 
            } );
             promise.catch(e =>alert(e.message));
            
          
    
        
        
    }
}
    render(){
    return(

        <div className='App' style={ sectionStyle }>
                <AppBar style={{backgroundColor:'black'}}
            iconElementRight={  <div><RaisedButton label="Sign In"  disabled={false} labelStyle={style.labelStyle}  containerElement={<Link to='/Login' />}/> 
            </div>
            }
          />
         <TextField
      hintText="First Name"
      floatingLabelText="First Name"
      onChange={(event)=>this.setState({firstname:event.target.value})}
      maxLength='20'
      value={this.state.firstname}
      floatingLabelStyle={{color: 'white' }} 
      inputStyle={{ color: "white" }}
      
    /><br />
     <TextField
     inputStyle={{ color: "white" }}
      hintText="Last Name"
      floatingLabelText="Last Name"
      onChange={(event)=>this.setState({lastname:event.target.value})}
      maxLength='20'
      value={this.state.lastname}
      floatingLabelStyle={{color: 'white' }} 
      
    />
    <br />
    <TextField
      hintText="Email Address"
      floatingLabelText="Email"
      onChange={(event)=>this.setState({Email:event.target.value})}
      value={this.state.Email}
      inputStyle={{ color: "white" }}
      floatingLabelStyle={{color: 'white' }} 
      
    />
    <br />
    <TextField
      hintText="Password Field"
      floatingLabelText="Password"
      type="password"
      onChange={(event)=>this.setState({password:event.target.value})}
      maxLength='25'
      value={this.state.password}
      floatingLabelStyle={{color: 'white' }} 
      inputStyle={{ color: "white" }}
      /><br />
      <TextField
      hintText="Re-enter Password"
      floatingLabelText="Re-enter Password"
      type="password"
      onChange={(event)=>this.setState({ConformPass:event.target.value})}
      maxLength='25'
      value={this.state.ConformPass}
      inputStyle={{ color: "white" }}
      floatingLabelStyle={{color: 'white' }} 
    
      /><br /><br /> <br />
      <RaisedButton label="Signup" disabled={false}  labelStyle={style.labelStyle} labelColor='rgb(114, 129, 179)' buttonStyle={style.buttonStyle} style={style.buttonStyle} onClick={this.submitdata}/>

        </div>
    );
  }
}

export default Signup;