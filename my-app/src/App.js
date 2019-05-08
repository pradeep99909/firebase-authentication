import React from 'react';
import firebase from './Firebase';
import './App.css';
import { SocialIcon } from 'react-social-icons';
import signUp from './signup';
import { Link, BrowserRouter, Route, withRouter } from 'react-router-dom';




class Form extends React.Component{
  


  constructor(){
    
    super();
    this.state={
      email:"",
      password:"",
      emailError:"",
      passwordError:"",
      success:"",
      isLogined:false,
      user:null
    };

    this.changeHandler=this.changeHandler.bind(this);
    this.login=this.login.bind(this);
    this.logined=this.logined.bind(this);
  }


  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          authenticated: true,
          currentUser: user,
          loading: false
        });
      } else {
        this.setState({
          authenticated: false,
          currentUser: null,
          loading: false
        });
      }
    });
  }


  logined(){
    if (this.props.user) {
                    this.setState({success: "Logined!",
                                    email:'',
                                    password:'',
                                    isLogined:true
                })
          } 
else 
          {
              this.setState({success: "Not Logined!",
                            email:'',
                            password:'',
                            isLogined:false
                })
                console.log(this)
          }
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
  if(this.state.password!==""){
    
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(
        
          /*user => {
          if (user) {
            dispatch({
              type: FETCH_USER,
              payload: user
            });
          } else {
            dispatch({
              type: FETCH_USER,
              payload: null
            });
          }
        }*/function(user){

          this.context.router.history.push("/");
        }
        
          
      
        
        ).catch(
        function(error){
          console.log(error.message)
          console.log(error.code)
        }
        )
        

        document.getElementById('email').value="";
        document.getElementById('password').value="";
    }
    else{
      this.setState({
        passwordError: "Enter Password"
      });
    }
}

googleLogin(){
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  firebase.auth().languageCode = 'pt';
  provider.setCustomParameters({
    'login_hint': 'pradeep99909@gmail.com'
  });
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;

    console.log(result.user)
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}


facebookLogin(){
  var provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().languageCode = 'fr_FR';
  provider.setCustomParameters({
    'display': 'popup'
  });


  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });


  firebase.auth().getRedirectResult().then(function(result) {
    if (result.credential) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // ...
    }
    // The signed-in user info.
    var user = result.user;
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}

  render(){
      return (
        
              
          <form onSubmit={this.login}>
            
            <h3 style={{color:'#333333'}}>Login</h3>
            <div style={{display:'flex'}}>
                <input type="email" name="email" id="email" placeholder="Email" onChange={this.changeHandler} /><p style={{color:'red'}}>{this.state.emailError}</p>
            </div>
            <div style={{display:'flex'}}>
                <input type="password" id="password" name="password" placeholder="Password" onChange={this.changeHandler} /><p style={{color:'red',fontSize:'12px',fontWeight:'normal',}}>{this.state.passwordError}</p>
            </div>
            <div style={{color:'green',fontSize:'12px',fontWeight:'normal'}}>{this.state.success}</div>
            <button>Sign In</button>
            <div style={{display:'flex',flexDirection:'column',marginTop:10}}>
              <div style={{fontSize:'14px',fontWeight:'normal'}}>Or Sign in with:</div>
              <div style={{padding:5,width:'80px',display:'flex',justifyContent:'space-between'}}>
                <SocialIcon className='twitter' style={{width:25 ,height:25}} network="twitter" bgColor="#38A1F3" />
                <SocialIcon onClick={this.googleLogin} className='google' style={{width:25 ,height:25}} network="google" bgColor="" />
                <SocialIcon onClick={this.facebookLogin} className='facebook' style={{width:25 ,height:25}} network="facebook" bgColor="#3b5998" />
              </div>
            </div>
            <div style={{fontSize:'14px',fontWeight:'normal'}}>New User? <Link to="/signup">Register</Link></div>
          </form>
          
          
      );
        }   
}



class Header extends React.Component{
  render(){
    return (

      <header className='head'>
        
      </header>

    );
  }
}

class Main extends React.Component{
  
  


  


  render(){
    return (

      <div id="main">
       <Form />
      </div>

    );
  }
}



class App extends React.Component{
  render(){
  return (
    <div id='all'>
    <Header name="Head" id="header"/>
      <BrowserRouter>
        <Route exact path="/" component={Main} />
        <Route path="/signup" component={signUp} />
      </BrowserRouter>
      
    </div>
  );
  }
}

export default App;
