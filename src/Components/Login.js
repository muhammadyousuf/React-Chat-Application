import React, { } from 'react';
import { TextField, RaisedButton, AppBar } from 'material-ui';
import '../Confiq/firebase.js';
import * as firebase from 'firebase';
import { Link } from 'react-router-dom';
import '../App.css';
import Background from './im6.jpg';

const style = {
  buttonStyle: {
    width: 280,

  },

  labelStyle: {
    color: 'rgb(18, 17, 114)',
    backgroundColor: 'white',
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
    fontStyle: 'oblique',
    fontSize: 16,

  },
}
var sectionStyle = {
  width: "100%",
  height: "660px",
  backgroundImage: `url(${Background})`
};
class Login extends React.Component {
  constructor(props) {
    super();
    this.state = {
      Email: '',
      Password: ''
    }
    this.checkLogin = this.checkLogin.bind(this);
  }


  checkLogin(event) {
    console.log(this.state.Email, this.state.Password);

    const email = this.state.Email;
    const pass = this.state.Password;
    const auth = firebase.auth();

    // Sign In
    const promise = auth.signInWithEmailAndPassword(email, pass)
    promise.then(e => {
      console.log(e);
      if (e.uid != null) {
        alert('successfull')
        window.location.reload()
        this.props.history.push('/Chat')
        console.log(e.uid);
        localStorage.setItem("UserID", e.uid);
      }
    })
    promise.catch(e => {
      alert(e.message)
    });
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        console.log(firebaseUser)

      }

    })
  }

  render() {
    return (
      <div className='App' style={sectionStyle}>
        <AppBar style={{ backgroundColor: 'black' }}
          iconElementRight={<div><RaisedButton label="Sign Up" disabled={false} labelStyle={style.labelStyle} containerElement={<Link to='/' />} />
          </div>
          }
        />
        <br /> <br /> <br />
        <TextField
          hintText="Email Address"
          floatingLabelText="Email"
          onChange={(event) => this.setState({ Email: event.target.value })}
          value={this.state.Email}
          inputStyle={{ color: "white" }}
          floatingLabelStyle={{ color: 'white' }}

        />
        <br />
        <TextField
          hintText="Password Field"
          floatingLabelText="Password"
          type="password"
          onChange={(event) => this.setState({ Password: event.target.value })}
          maxLength='25'
          inputStyle={{ color: "white" }}
          value={this.state.Password}
          floatingLabelStyle={{ color: 'white' }}
        /><br /> <br />
        <RaisedButton label="Login" disabled={false} labelStyle={style.labelStyle} labelColor='rgb(114, 129, 179)' buttonStyle={style.buttonStyle} onClick={this.checkLogin} />


      </div>
    );
  }

}
export default Login;