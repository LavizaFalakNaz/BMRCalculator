import React, { Component } from "react";
import "./bmr.css";

class Bmr extends Component {
  constructor() {
    super();
    this.state = {
      age: "",
      gender: "",
      heightCm: "",
      heightIn: "",
      heightFt: "",
      weight: "",
      activity: "",
      error:'',
      bmr: "",
      calories: "",
      mode: ""
    };
  }

  handleGenderChange = (event) => {
    this.setState({ gender: event.target.value });
  };

  handleAgeChange = (event) => {
    this.setState({ age: event.target.value });
  };

  handleHeightCmChange = (event) => {
    this.setState({ heightCm: event.target.value });
  };

  handleHeightInChange = (event) => {
    this.setState({ heightIn: event.target.value });
  };

  handleHeightFtChange = (event) => {
    this.setState({ heightFt: event.target.value });
  };

  handleWeightChange = (event) => {
    this.setState({ weight: event.target.value });
  };

  handleActivityChange = (event) => {
    this.setState({ activity: event.target.value });
  };

  handleModeChange = (event) => {
    this.setState({ mode: event.target.value });
  };

  calculateBMR() {
    this.setState({error:''});
    let age = this.state.age;
    let gender = this.state.gender;
    let weight = this.state.gender;
    let heightIn = this.state.heightIn;
    let heightCm = this.state.heightCm;
    let heightFt = this.state.heightFt;
    let activity = this.state.activity;
    let mode = this.state.mode;

    if(mode=='') //check modes selected 
    {
      this.setState({error:"All fields are Required"});
        return;
    }

    let calcbmr;
    if (mode == "1") //check values
    {
      //imperial system\
      if(age==''||weight==''||gender==''|| heightIn==''||heightFt=='')
      {
        this.setState({error:"All fields are Required"});
        return;
      }

      let height=(heightIn* 2.54)+(heightFt* 30.48);
      if(gender=="1") //female
      {
        calcbmr=655.1+(4.35*weight)+(4.7*height)-(age*4.7);
        this.setState({bmr:calcbmr});
      }
      else if(gender=="2")//male
      {
        calcbmr=66+(4.35*weight)+(12.7*height)-(age*6.76);
        this.setState({bmr:calcbmr});
      }

    } 
    else if (mode == "2") //check values
    {
      //metric system
      if(age==''||weight==''||gender==''||heightCm=='')
      {
        this.setState({error:"All fields are Required"});
        return;
      }

      if(gender=="1") //female
      {
        calcbmr=655+(9.563*weight)+(1.850*heightCm)-(age*4.676);
        this.setState({bmr:calcbmr});
      }
      else if(gender=="2")//male
      {
        calcbmr=66.5+(13.75*weight)+(5.003*heightCm)-(age*6.755);
        this.setState({bmr:calcbmr});
      }

    }
    this.setState({error:''});
  }

  calculateCalorie(){
    this.setState({error:''});
    let bmr = this.state.bmr;
    let cal;
    if(this.state.bmr==''||this.state.activity=='')
    {
      this.setState({error:'All fields are Required'});
      return;
    }

    let act=this.state.activity;
    switch (act){
      case "1.2":
      case "1.375":
      case "1.55":
      case "1.725":
      case "1.9":
        cal=bmr*act;
        this.setState({calories:cal});
        break;
      default:
        this.setState({error:'All fields are Required!'});
        break;
    }
  }

  render() {
    let error;
    if(this.state.error)
    {
      error=<div className="error">{this.state.error}</div>
    }

    let bmrresult;
    if(this.state.bmr)
    {
      bmrresult=<div className="result"> Your BMR is {this.state.bmr}</div>
    }

    let act;
    if (this.state.bmr) {
      act = (
        <div className="workout">
          <div className="inputwrap">
            <label className="label">Workout in a Week</label>
            <select
              className="activity"
              value={this.state.activity}
              onChange={this.handleActivityChange}
              name="activity"
            >
              <option value="">Select your Activity</option>
              <option value="1.2">
                Sedentary (Very little or no exercise, and desk job)
              </option>
              <option value="1.375">
                Lightly Active (Light exercise 1 to 3 days per week)
              </option>
              <option value="1.55">
                Moderately Active (Moderate exercise 3 to 5 days per week)
              </option>
              <option value="1.725">
                Very Active (Heavy exercise 6 to 7 days per week)
              </option>
              <option value="1.9">
                Extremely Active (Very intense exercise, and physical job,
                exercise multiple times per day)
              </option>
            </select>
          </div>
          <button type="button" onClick={() => this.calculateCalorie()}>Calculate Calories</button>
        </div>
      );
    }

    let mod;
    if (this.state.mode == "1") {
      //imperial
      mod = (
        <div>
          <div className="inputwrap"> <label className="label">Weight in Pounds</label>
            <input type="number"
              value={this.state.weight}
              onChange={this.handleWeightChange}
              name="weight"
              className="weight"
              min="0"
              max="999"
            />
          </div>
          <div className="inputwrap">
            <label className="label">Height in feet and inches</label>
            <input
              type="number"
              value={this.state.heightFt}
              onChange={this.handleHeightFtChange}
              name="heightFeet"
              className="heightFeet"
              min="0"
              max="8"
            />
            <input
              type="number"
              value={this.state.heightIn}
              onChange={this.handleHeightInChange}
              name="heightInches"
              className="heightInches"
              min="0"
              max="11"
            />
          </div>
        </div>
      );
    } else if (this.state.mode == "2") {
      mod = (
        <div>
          <div className="inputwrap">
            <label className="label">Weight in Kilograms</label>
            <input
              type="number"
              value={this.state.weight}
              onChange={this.handleWeightChange}
              name="weight"
              className="weight"
              min="0"
              max="999"
            />
          </div>
          <div className="inputwrap">
            <label className="label">Height in Centimeters</label>
            <input
              type="number"
              value={this.state.heightCm}
              onChange={this.handleHeightCmChange}
              name="heightFeet"
              className="heightFeet"
              min="0"
              max="8"
            />
          </div>
        </div>
      );
    }

    let cal;
    if(this.state.calories)
    {
      cal=<div className="result">Your Daily calories intake should be {this.state.calories}</div>
    }

    return (
      <div id="bmrcalc">
        <div className="form">
          <h2>BMR &amp; Daily Calorie Calculator</h2>
          {error}
          <div className="inputwrap">
            <label className="label">Calculation metrics</label>
            <label>
              <input
                type="radio"
                checked={this.state.mode === "1"}
                onChange={this.handleModeChange}
                className="mode"
                name="mode"
                value="1"
              />
              Imperial (Lbs/In)
            </label>
                <label>
              <input
                type="radio"
                checked={this.state.mode === "2"}
                onChange={this.handleModeChange}
                className="mode"
                name="mode"
                value="2"
              />
              Metric(Kg/cm)
            </label>
          </div>
          <div className="inputwrap">
            <label className="label">Gender</label>
            <label>
              <input
                type="radio"
                checked={this.state.gender === "1"}
                onChange={this.handleGenderChange}
                className="genderF"
                name="gender"
                value="1"
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                checked={this.state.gender === "2"}
                onChange={this.handleGenderChange}
                className="genderM"
                name="gender"
                value="2"
              />
              Male
            </label>
          </div>
          {mod}
          <div className="inputwrap">
            <label className="label">Age in years</label>
            <input
              type="number"
              onChange={this.handleAgeChange}
              className="age"
              name="age"
              min="0"
              max="120"
            />
          </div>
          <button type="button" onClick={() => this.calculateBMR()}>
            Calculate BMR
          </button>
          {bmrresult}
          {act}
          {cal}
        </div>
      </div>
    );
  }
}

export default Bmr;

