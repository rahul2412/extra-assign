
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {fetchCity} from '../redux/action/action.js'
import '../styles/App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state={
     selectValue:"", width: "0px",
    }
    
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.panelAnimation = this.panelAnimation.bind(this);
    
  }
  
  handleDropdownChange(e) {
    this.setState({ selectValue: e.target.value });

    if(e.target.value!=="")  // checking if a city is selected or not
    {
        this.props.onSelectCity(e.target.value);  // triggering redux saga for fetching weather api
    }
   }
  
  panelAnimation() // sidebar open/close
  {
    if(this.state.width==="0px")
      this.setState({width: "29%"});
    else
      this.setState({width: "0px"});
  }
  
  
  render() {
    
    return (
      <div>
        <h1>Hi {this.props.id},</h1>
        <Link to ="/"> <button className="Logout">Logout</button></Link>
      
        <div className="Sidenav" style={{width:this.state.width}}>
          <h4>About us information</h4>
          <p> Work life balance is just a state of mind.</p>
        </div>
      
        <br/>
        <h1>Select City</h1>
        
        <select className="Dropdown" value={this.state.selectValue} onChange={this.handleDropdownChange}>
          <option value = "" >List of cities</option>/option>
          <option value = "Mumbai">Mumbai</option>
          <option value = "London">London</option>
          <option value = "Pune"> Pune</option>
          <option value = "Delhi">Delhi</option>
        </select>
        <br/><br/>
        
        <div className="FlexContainer">

          <div className="LeftBox">Current Weather Data
          {this.state.selectValue && (
            <div><h4>Temperature- {this.props.temp}</h4>
            <h4>Humidity- {this.props.humidity}</h4>
            <h4>Pressure- {this.props.pressure}</h4></div>  )}
          </div>

          <div className="RightBox">5 day weather Forecast
          {this.state.selectValue && (
              this.props.fiveDaysTemp.map(item=>(<h5>Temperature- {item}</h5>  )))}
          </div>
        </div>
        
        <h3 onClick={this.panelAnimation}>About Us</h3>
        
      </div>
    )
  }
};

// getting state from redux
const mapStateToProps = state => {
  return {
    id: state.id,
    password: state.password,
    temp : state.temp,
    pressure: state.pressure,
    humidity: state.humidity,
    fiveDaysTemp: state.fiveDaysTemp
  }
}

// dispatching city name to redux saga
const mapDispatchToProps = dispatch => {
  return {
    onSelectCity: (city) => {
      dispatch(fetchCity(city))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App); // connecting to the redux store
