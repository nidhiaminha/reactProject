import React, { Component } from "react";
import "./App.css";
import Button from '@material-ui/core/Button';
import Display from "./components/Display";
import TestComponent from "./components/TextComponent";
import { AppBar, withStyles } from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import logo from './static/Mojo.jpeg.PNG'; 



const styles = theme => ({
  iconButtonAvatar: {
    padding: 4,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    }
  }
});


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      someArray: [{
          value:'',
          error:false,
          label:"required",
          name:"Avg Order Amount",
          errorMsg: 'Please enter a valid input',
          normalHelperText:'Enter average amount per month',
          adornment:'$'
        },{
          value:'',
          error:false,
          label:'required',
          name:"AvgOrderNumber",
          errorMsg: 'Please enter a valid input',
          normalHelperText:'Enter average number per month',
          adornment:'#'
        },{
          value:'',
          error:false,
          label:'required',
          name:"Percentage To-Go",
          errorMsg: 'Enter values between 0-100',
          normalHelperText:'Enter percentage to-go orders',
          adornment:'%'
        }
      ],
      hasError:false,
      calculated:null,
    };
    this.calculate.bind(this);
  }

  testHandle = e => {
    let regex = e.target.name==='percentageToGo' ? /^([0-9](\.\d*){0,1}|[0-9][0-9](\.\d*){0,1}|[1][0][0])$/ : /^(\d*\.)?\d+$/ ; 
    let targName=e.target.name;
    let targValue=e.target.value;
    if(e.target.value==='' || regex.test(e.target.value)) {
      this.setState(function(prevState){
        let a=[...prevState.someArray];
        a.filter(x=>x.name===targName)[0].value=targValue;
        a.filter(x=>x.name===targName)[0].error=false;
        return {someArray:a}
        }
      )
    }
    else {
      this.setState(function(prevState){
        let a=[...prevState.someArray];
        a.filter(x=>x.name===targName)[0].error=true;
        return {someArray:a}
        }
      )
    }
  }

  calculate = () => {
    let amount=this.state.someArray.filter(x=>x.name==="Avg Order Amount")[0].value;
    let number=this.state.someArray.filter(x=>x.name==="Avg Order Number")[0].value;
    let percent=this.state.someArray.filter(x=>x.name==="Percentage To Go")[0].value;
    if (
      amount &&
      number &&
      percent
    ) {
      let result, totalToGo;
     const roundTo=require('round-to');
      totalToGo = ((number * (percent / 100) * 0.2
      )); 
      //percentage that mojo takes and set the precision to 2 digits
      result = roundTo((totalToGo * amount * 0.08),2); 
      this.setState({
        calculated: `Result: $${result}`,
        hasError:false
      });
    }
    else {
      this.setState({
        calculated:'Please enter valid inputs!',
        hasError:true
      })
    }; 
  };

  render() {
    const {classes} = this.props;
    
    return (
      <main className={classes.layout}>
        <div className="App">
          <AppBar position="static"  color={"primary"} className={classes.appBar}>
            <IconButton color="inherit" className={classes.iconButtonAvatar}>
              <Avatar className={classes.Avatar} src={logo} alt="mojo" />
            </IconButton>
            
            <Typography variant="title" color="inherit" >
            Welcome Mojo User!
            </Typography>
          </AppBar>
          {
            this.state.someArray.map(function(x,index) {
              return (
                <TestComponent 
                key={index}
                testError={x.error}
                testHelper={x.error?x.errorMsg : x.normalHelperText}
                testValue={x.value}
                testLabel={x.name}
                testChange={this.testHandle}
                name={x.name}
                adornment={x.adornment}
                /> 
                )
            },this)
          }
          <Button onClick={this.calculate} variant="contained" color="primary">
              Calculate
          </Button>
          {/* display component */}
          <Display result={this.state.calculated} error={this.state.hasError}/>
        </div>
      </main>
      
    );
  }
}

 export default withStyles(styles) (App);