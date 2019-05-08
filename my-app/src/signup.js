import React from 'react';
import firebase from './Firebase';
import './App.css';
import {Link } from 'react-router-dom';



class Form extends React.Component{
  


  constructor(){
    super();
    this.state={
      email:"",
      password:""
    };

    this.changeHandler=this.changeHandler.bind(this);
    this.login=this.login.bind(this);
  }

  

  changeHandler(event){
    this.setState({
      [event.target.name]: event.target.value
    });

    console.log(this.state.email);
    console.log(this.state.password);

  }



  
login(event){
  event.preventDefault();

  
  firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then( ).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...

    console.log("Errorcode" + errorCode);

    console.log("ErrorMessage" + errorMessage);
  });


  
  
}

  render(){
      return (
        
          <form onSubmit={this.login}>
            <div>Sign Up</div>
            <input type="email" name="email" placeholder="Email" onChange={this.changeHandler} />
            <input type="password" name="password" placeholder="Password" onChange={this.changeHandler} />
            <button >Sign Up</button>
            <div style={{fontSize:'14px',fontWeight:'normal'}}><Link to="/">Sign In</Link></div>
          </form>
        
      );
        }   
}



class Main extends React.Component{
  
  constructor(){
    super();
    this.state={
      count:0,
    };

    
  }
  


  render(){
    return (

      <div id="main">
      
          <Form />
          
       
      </div>

    );
  }
}



class signUp extends React.Component{
  render(){
  return (
    <Main/>
  );
  }
}

export default signUp