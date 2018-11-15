import React from 'react';
import Navbar  from './components/navbar/Navbar';
import ListView from './components/list-view/List-View';
import { MuiThemeProvider } from '@material-ui/core';
import { ThemeProvider } from "./providers/theme/themeProvider";
import axios from 'axios';

class App extends React.Component {
  state = {
    employees: []

  };
  
  componentWillMount = () => {
      axios.get('http://localhost:8080/api/employees', {withCredentials: true})
          .then(response => {
              this.setState({ employees: response.data });
          });
  };

  handleUpdateList = employees => {
    console.log('here1');
    console.log(employees);
    this.setState({employees})
}

  render() {
    const {
      employees
    } = this.state;

    return (
      <div className="App">
        <MuiThemeProvider theme={ThemeProvider}>
          <ListView employees={employees} update={this.handleUpdateList}/>
        </MuiThemeProvider>

      </div>
    );
  }
}

export default App;
