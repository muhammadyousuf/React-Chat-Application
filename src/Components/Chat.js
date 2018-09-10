import React, {} from 'react';
import {RaisedButton , AppBar , List , ListItem , Avatar,TextField } from 'material-ui'; 
import  '../Confiq/firebase.js';
import * as firebase from 'firebase';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import './main.css';
import {grey50} from 'material-ui/styles/colors';
import logo from './im8.jpg';
import '../App.css';
import IoCloseCircled from 'react-icons/lib/io/close-circled'



const styles = {  
      borderColor: grey50,      
      width:750,
  };
  const styling={
    margin:2,
    width:170,
    height:48,
    fontFamily: 'sans-serif',    
}
const style = {
    width:400,
    maxHeight:600,
    minHeight:600,
    overflow: 'scroll',
    fontSize:24,
    textTransform: 'capitalize',
    fontFamily: 'sans-serif',
    fontStyle: 'oblique',
    backgroundColor: 'rgb(114, 129, 179)',
    labelStyle: {
        color: 'rgb(114, 129, 179)',
        backgroundColor:'white',
        fontWeight:'bold',
        fontFamily: 'sans-serif',
        fontStyle: 'oblique',
    },
}

class Chat extends React.Component{
    ref = firebase.database().ref("Chat App");
constructor(){
    super();
    this.state = {
        Note:[],
        IsEditing:false,
        id:'',
        firstname:'',
        lastname:'',
        Email:'',
        messages : [],
        message:'',
        value:'',
    }
    this.Logout = this.Logout.bind(this);
    this.toggle = this.toggle.bind(this);
    this.ListItem = this.ListItem.bind(this);
    this.message = this.message.bind(this);
    this.send = this.send.bind(this);
    this.close = this.close.bind(this);    
    
}
close(){
    this.setState({IsEditing:false});
}


toggle(data){        
    this.setState({IsEditing: true});
    this.setState({id:data.id});
    this.setState({firstname:data.firstname});
    this.setState({lastname:data.lastname});
    this.setState({Email:data.Email});
    let current = localStorage.getItem("UserID");
    let sendUser = data.id;
    let sendUsercon = sendUser+'-'+current;
    this.ref.child(sendUser).child(sendUsercon).on('value', snap => {
        let emp = snap.val();
        if(emp !== null){
        var mydata = [];
        snap.forEach((element) => {
            mydata.push({
               id : element.key,
               mesg: element.val()
            });
                    this.setState({messages : mydata})
                    let Div = document.getElementById('container2');
                    if(!Div){
                          console.log('null')
                    }else{
                        setTimeout( () => {Div.scrollTop = 99999} , 100 );
                    }
                  //  setTimeout( () => {Div.scrollTop = 99999} , 100 );
                   // clearTimeout();
                
                });      
        }
        else{
                 console.log('empty')
                 this.setState({messages:null})
        }   
    });
 } 
message(){
    return(      
        <div>
              <div className='Chatbox'>
                <div className='header'>
                 <h1 className='headerbar' > <Avatar style={{color:' rgb(114, 129, 179)', background:'white'}} > {this.state.firstname.slice(0,1)} </Avatar><span style={{marginLeft:'1%'}} >{this.state.firstname}{' '+ this.state.lastname}</span></h1>
                 <div className='crossBtn'>
                 <button onClick={this.close} style={{width:'80%' , height:'60%', color:' rgb(114, 129, 179)', fontWeight:'bold'}} ><IoCloseCircled style={{width:'27' , height:'25'}} /></button>
                 </div>
                 </div>     
                 <div className='listshow' id="container2" >
                 {
                     this.state.messages?
                        this.state.messages.map((text,index) =>{
                             return(
                                <div key={index} style={{flexDirection:'column'}} >
                                     { text.mesg.sentmessage ?
                                     <Avatar style={{textTransform: 'capitalize',color:' rgb(114, 129, 179)', background:'white',fontWeight:'bold' }}> {this.state.firstname.slice(0,1)} </Avatar>:null}
                                     <span style={{float:'left', width:'95%', marginLeft:'4%',marginTop:'-4%', padding:'1%'}}> 
                                     <div style={{width:'45%'}} >
                                     {text.mesg.sentmessage?
                                     <div style={{float:'left',backgroundColor:'white',borderRadius:'20%',padding:'3%' }}>     
                                     {
                                 text.mesg.sentmessage
                                 }
                                 </div>:null
                             }
                                  </div>
                                  <br /><br />
                                 </span>
                                  <span style={{float:'right' , width:'96%'}}>
                                  <div style={{float:'right',marginRight:'2%',width:'45%'}}>
                                  {
                                      text.mesg.recievemessage ? <div style={{backgroundColor:' rgb(114, 129, 179)',float:'right', borderRadius:'20%',border: 'rgb(18, 17, 114)',color:'white',padding:'3%'}}>
                                  {
                               text.mesg.recievemessage 
                                 }</div> : null}
                                </div>
                                </span>
                                </div>
                             )
                                })
                    :null
                }
                 </div>
                 <form onSubmit={this.send} >
                <div className='boxset'> 
                     <div className='messagebox'>
                     <TextField
                      hintText="Type a message "
                      underlineFocusStyle={styles}
                      style={styles}
                      onChange={(event)=>this.setState({message:event.target.value})}
                      value={this.state.message}
                      />
    </div>
    <div className='buttonset'>
     <RaisedButton label="Send" disabled={false} style={styling} labelColor='#ffffff' backgroundColor='rgb(114, 129, 179)' onClick={this.send}/>
    </div>
    </div>
    </form>
            </div>
          </div>   
    )
}
send(e){
    e.preventDefault();
    if(this.state.message===''){
        alert('fill box');
    }
    else{

        console.log('Message: '+this.state.message);
        let current = localStorage.getItem("UserID");
        let sendUser = this.state.id;
        let currentcon = current+'-'+sendUser;
        let sendUsercon = sendUser+'-'+current;
        this.ref.child(current).child(currentcon).push({sentmessage:this.state.message});
        this.ref.child(sendUser).child(sendUsercon).push({recievemessage:this.state.message});
        this.setState({
            message:'',
            value:'',
        })   
    }
}
Logout(){
    firebase.auth().signOut();
    localStorage.clear();
    this.props.history.push("/Login")  
}
ListItem(){
return(
    <div  >
    

        <img src={logo} className='logo' alt='logo' />
        </div>
   )
}
componentWillMount(){
    console.log('working');
    const UserID = localStorage.getItem("UserID");
    console.log('hello '+UserID);
    const previousNotes = [];
    firebase.database().ref("Chat App").once('value')
            .then(function (snapshot) {
              if(snapshot.key !== UserID){
                snapshot.forEach(ChildSnapshot => {
                 if(ChildSnapshot.key !== UserID){
                    previousNotes.push({
                        id: ChildSnapshot.key,
                        firstname: ChildSnapshot.val().firstname,
                        lastname: ChildSnapshot.val().lastname,
                        Email: ChildSnapshot.val().Email  
                    })
                }
                })
            }
            }).then(
            () => {
                this.setState({Note: previousNotes })
            }
            )          
}
render(){
    const IsEditing = this.state.IsEditing;
return(
    <div >
        <AppBar style={{backgroundColor:'black'}}
            iconElementRight={  <div><RaisedButton label="Logout" disabled={false} labelStyle={style.labelStyle} onClick={this.Logout} />
            </div>
            }
          />
           <div className='main'>
              <List style={style} >
                  <h1 className='chat'>Chat Room</h1>
                  {this.state.Note.map((data, index) => {
                                    return (
                                        <div key={index} id={data.id}  >
                                        <ListItem onClick={()=>this.toggle(data)}
        leftAvatar={<Avatar style={{color:' rgb(114, 129, 179)', background:'white' , fontWeight:'bold'}} > {data.firstname.slice(0,1)} </Avatar> }
        rightIcon={<CommunicationChatBubble color={'white'}  /> }
      >
      <span className='grid'>    
      {data.firstname +' '+ data.lastname}
      </span>
      </ListItem>
                                       </div>
                                    )
                                }
                            )}
              </List>    
         </div>
          <section>
                {
                IsEditing  ? this.message()   :  this.ListItem() 
                }
            </section>
    </div>
    );
  }
}
export default Chat;