
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../styles/App.scss';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      temp:"", pressure:"",
      humidity:"",selectValue:"", width: "0px",
      fiveDaysTemp:[]
      
    }
    
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.panelAnimation = this.panelAnimation.bind(this);
    
  }
  
  handleDropdownChange(e) {
    this.setState({ selectValue: e.target.value });
    if(e.target.value==="")  // checking if a city is selected or not
    this.setState({ temp: "", pressure:"", humidity:"", fiveDaysTemp:[]});
    
    else{
      this.callCurrentDayApi(e.target.value) // calling current weather api
        .then(res => {this.setState({ temp: res.main.temp, pressure: res.main.pressure, humidity: res.main.humidity})
          
        }).catch(err => console.log(err));
      
      this.callFiveDayApi(e.target.value) // calling next 5 days weather api
        .then(res => {this.setState({ fiveDaysTemp:res})
          
        }).catch(err => console.log(err));
      
    }
  }
  
  callCurrentDayApi = async (city) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3fbb2b31fd3e77c536be64abc677a4d1`
    const response = await fetch(url);
    const body = await response.json();
    
    
    if (response.status !== 200) throw Error(body.message); // error handling
    
    return body;
  };
  
  callFiveDayApi = async (city) => {
    
    let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&mode=json&appid=3fbb2b31fd3e77c536be64abc677a4d1`;
    const response = await fetch(url);
    const body = await response.json();
    
    if (response.status !== 200) throw Error(body.message); // error handling
    
    const tempArray=[];
    for(let i=0;i<5;i++) // getting temperatures of next 5 days
    {tempArray.push(body.list[i].main.temp);}
    
    return tempArray;
  };
  
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
            <h4>Temperature- {this.state.temp}</h4>
            <h4>Humidity- {this.state.humidity}</h4>
            <h4>Pressure- {this.state.pressure}</h4></div>
          <div className="RightBox">5 day weather Forecast
            {this.state.fiveDaysTemp.map(item=>(<h5>Temperature- {item}</h5>))}
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
    password: state.password
  }
}


export default connect(mapStateToProps)(App); // connecting to the redux store
