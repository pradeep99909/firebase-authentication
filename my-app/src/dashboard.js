import React from 'react';
import firebase from './Firebase';

class Dashboard extends React.Component{
    
    
    signout(){
        firebase.auth().signOut().then(
            
        ).catch(function(error) {
            // An error happened.
          });
    }
    render(){
        return(
            <h1>Dashboard</h1>
        );
    }
}


export default Dashboard;