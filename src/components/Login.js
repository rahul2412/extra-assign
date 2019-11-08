import React from 'react';
import { connect } from 'react-redux'
import {addId} from '../redux/action/action.js'
import data from '../data/data.json';
import '../styles/Login.scss'
import logo from "../images/logo192.png"

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      id:"",
      password:""
      
    }
    this.handleChangeId = this.handleChangeId.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.validate=this.validate.bind(this);
    
  }
  handleChangeId(e){
    this.setState({id:e.target.value}); // setting id
  }
  
  handleChangePassword(e){
    this.setState({password:e.target.value}); //setting password
    
  }
  validate()
  {   let flag=0;
    const { history } = this.props;
    
    if(this.state.id && this.state.password)
    {
      
      for(let i=0;i<data.length;i++)
        {
          if(data[i].id === this.state.id && data[i].password===this.state.password) // checking for valid users
          {
            
            this.props.onLoginClick(this.state.id,this.state.password); // dispatching to store
            
            
            
            history.push('/data'); // to change current path the app page
            break;}
          flag=i;
          
        }
        
        if(flag===data.length-1)
        {
          
          alert("Invalid username or password");
        }
        
        
        }}
        render() {
          
          return (
            <div>
              <form className="FormStyle" >
                <h2>Weather Cast</h2><hr/>
                <img src={logo} alt="react logo"/><br/><br/>
                <input className="Textbox" name="id" type="text" required onChange={this.handleChangeId} value={this.state.id} placeholder="Enter username..."/><br/><br/>
                <input className="Textbox" name="password" type="password" required onChange={this.handleChangePassword} value={this.state.password} placeholder="Enter password..."/><br/><br/>
                <button className="Login" onClick={this.validate} type="submit">Login</button>
                
              </form>
              
            </div>
            
          )
        }
        };
        
        // sending id,password to redux
        const mapDispatchToProps = dispatch => {
          return {
            onLoginClick: (id,password) => {
              dispatch(addId(id,password))
            }
          }
        }
        export default connect(null,mapDispatchToProps)(Login) // connecting to the store
        
        