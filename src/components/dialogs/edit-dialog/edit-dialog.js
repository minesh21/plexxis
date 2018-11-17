import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  Button,
  Select,
  MenuItem
} from '@material-ui/core';
import { HuePicker } from 'react-color';
import axios from "axios";
class EditDialog extends React.Component {
  state = {
    id: '',
    name: '',
    profession: '',
    color: '',
    city: '',
    branch: '',
    assigned: '',
    changed: false,
  };
  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.employee !== null ) {
      this.setState({
        id: nextProps.employee.id,
        name: nextProps.employee.name,
        profession: nextProps.employee.profession,
        color: nextProps.employee.color,
        city: nextProps.employee.city,
        branch: nextProps.employee.branch,
        assigned: nextProps.employee.assigned === 1,
        changed: true
      })
    }
  }

  handleNameChange = event => {
    this.setState({name: event.target.value});
  };

  handleProfessionChange = event => {
    this.setState({profession: event.target.value});
  };

  handleCityChange = event => {
    this.setState({city: event.target.value});
  };

  handleBranchChange = event => {
    this.setState({branch: event.target.value});
  };

  handleAssignedChange = event => {
    this.setState({assigned: event.target.value});
  };

  handleColorChange = color  => {
    this.setState({color: color.hex})
  };

  handleCloseDialog = event =>  {
    this.props.close('openEditDialog');
    this.setState({changed: false});
  };

  onSaveClick = () => {
    axios.put(`http://localhost:8080/api/edit/employees/${this.state.id}`, this.state, {withCredentials: true, headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      this.props.update({action: 'edit', data: response.data});
      this.handleCloseDialog();
    })
  };

  isAllEmpty () {
    return (
    this.state.name === '' ||
    this.state.profession === '' ||
    this.state.color === '' ||
    this.state.city === '' ||
    this.state.branch === '' ||
    this.state.assigned === null
    )
  }

  render() {
    const { name, profession, color, city, branch, assigned } = this.state;
    return (
    this.state.changed ?
      <Dialog open={this.props.open}  maxWidth="lg">
       <DialogTitle>Edit Employee</DialogTitle>
        <DialogContent>
          <div className="form-group full-width">
            <TextField label="Name" onChange={this.handleNameChange} className="full-width" value={name}/>
          </div>
          <div className="form-group full-width mt-2">
            <TextField label="Profession" onChange={this.handleProfessionChange} className="full-width" value={profession}/>
          </div>
          <div className="form-group full-width mt-2">
            <DialogContentText>Color</DialogContentText>
            <HuePicker className="mt-2" color={color} onChangeComplete={this.handleColorChange}/>
            <div style={{width: "30px", height: '10px', backgroundColor: color, marginTop: '5px'}}/>
            <TextField className="full-width" value={color} disabled/>
          </div>
          <div className="form-group full-width mt-2">
            <TextField label="City" onChange={this.handleCityChange} className="full-width" value={city}/>
          </div>
          <div className="form-group full-width mt-2">
            <TextField label="Branch" onChange={this.handleBranchChange} className="full-width" value={branch}/>
          </div>
          <div className="form-group full-width mt-2">
            <Select
            label="Assigned"
            onChange={this.handleAssignedChange}
            value={assigned}
            displayEmpty
            name="Assigned"
            className="full-width">
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="true">Assigned</MenuItem>
              <MenuItem value="false">Not Assigned</MenuItem>
            </Select>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {this.handleCloseDialog()}} color="primary">
            Cancel
          </Button>
          <Button color="primary" onClick={() => {this.onSaveClick()}} disabled={this.isAllEmpty()}>
            Save
          </Button>
        </DialogActions>
      </Dialog> :
    null
    )
  }
}

export default EditDialog;