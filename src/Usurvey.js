import React, { Component } from 'react';
var firebase =  require('firebase');
var uuid = require('uuid');

//initialising the firebase
  var config = {
    apiKey: "AIzaSyDa9G4PBAPsHIk_Gai7FUXgTLOOfvYU3aE",
    authDomain: "usurvey-51960.firebaseapp.com",
    databaseURL: "https://usurvey-51960.firebaseio.com",
    projectId: "usurvey-51960",
    storageBucket: "usurvey-51960.appspot.com",
    messagingSenderId: "533681553981"
  };
  firebase.initializeApp(config);


class Usurvey extends Component {

  nameSubmit(event){
    var studentName = this.refs.name.value;
    this.setState({studentName: studentName}, function(){
      console.log(this.state);
    })
  }

  answerSelected(event){
    var answers= this.state.answers;
    if(event.target.name === 'answer1'){
      answers.answer1 = event.target.value;
    }
    else if(event.target.name === 'answer2'){
      answers.answer2 = event.target.value;
    }
    else if(event.target.name === 'answer3'){
      answers.answer3 = event.target.value;
    }
    else if(event.target.name === 'answer4'){
      answers.answer4 = event.target.value;
    }

    this.setState({answers: answers}, function(){
      console.log(this.state);
    });
  }

  questionSubmit(){
    firebase.database().ref('uSurvey/'+this.state.uid).set({
      studentName: this.state.studentName,
      answers: this.state.answers
    });
    this.setState({isSubmitted: true})
  }

  constructor(props){
    super(props);

    this.state = {
      uid: uuid.v1(), //everytime an instance is launched v1 is unique, follow documentation at uuid npm
      studentName: '',
      answers:{
        answer1: '',
        answer2: '',
        answer3: '',
        answer4: ''
      },
      isSubmitted: false
    };
    this.nameSubmit=this.nameSubmit.bind(this);
    this.answerSelected=this.answerSelected.bind(this);
    this.questionSubmit=this.questionSubmit.bind(this);
  }

  render(){
    var studentName;
    var questions;

    if(this.state.studentName === '' && this.state.isSubmitted === false){
      studentName = <div>
        <h1>Hey student, please fill in your name: </h1>
        <form onSubmit={this.nameSubmit}>
          <input className="namy" type="text" placeholder="Enter your name" ref="name" />
        </form>
      </div>;
      questions = ''
    }
    else if (this.state.studentName !== '' && this.state.isSubmitted=== false){
      studentName = <h1>Welcome to the Student Survey, {this.state.studentName}</h1>
      questions = <div>
        <h2>Here are some questions: </h2>
        <form onSubmit={this.questionSubmit}>
          <div className="card">
            <label>What kind of courses you like the most: </label><br />
            <input type="radio" name="answer1" value="Technology" onChange={this.answerSelected}/>Technology
            <input type="radio" name="answer1" value="Design" onChange={this.answerSelected}/>Design
            <input type="radio" name="answer1" value="Marketing" onChange={this.answerSelected}/>Marketing
          </div>

          <div className="card">
            <label>You are a: </label><br />
            <input type="radio" name="answer2" value="Student" onChange={this.answerSelected}/>Student
            <input type="radio" name="answer2" value="In-job" onChange={this.answerSelected}/>In-job
            <input type="radio" name="answer2" value="Looking-job" onChange={this.answerSelected}/>Looking-job
          </div>

          <div className="card">
            <label>Online leaning helpful: </label><br />
            <input type="radio" name="answer3" value="Yes" onChange={this.answerSelected}/>Yes
            <input type="radio" name="answer3" value="No" onChange={this.answerSelected}/>No
            <input type="radio" name="answer3" value="Maybe" onChange={this.answerSelected}/>Maybe
          </div>

          <div className="card">
            <label>Which is your favourite online among these: </label><br />
            <input type="radio" name="answer4" value="Udacity" onChange={this.answerSelected}/>Udacity
            <input type="radio" name="answer4" value="Udemy" onChange={this.answerSelected}/>Udemy
            <input type="radio" name="answer4" value="Lyndra" onChange={this.answerSelected}/>Lyndra
          </div>

          <div className="card">
            <label>Which is your age range: </label><br />
            <input type="radio" name="answer4" value="10-25" onChange={this.answerSelected}/>10-25
            <input type="radio" name="answer4" value="25-40" onChange={this.answerSelected}/>25-40
            <input type="radio" name="answer4" value="40 above" onChange={this.answerSelected}/>40 above
          </div>
          <input className="feedback-button" type="submit" value="submit" />

        </form>
      </div>
    } else if(this.state.isSubmitted ===true){
      studentName= <h1>Thanks, {this.state.studentName}</h1>
      questions=<h1>Your reponse has been successfully submitted</h1>
    }
    else if(this.state.isSubmitted ===true && this.state.studentName==='')
    {
      studentName=<h1>Please enter your name</h1>
    }

    return(
      <div>
        {studentName}
        -------------------------------------------------------
        {questions}
      </div>
    );
  }
}

export default Usurvey;
