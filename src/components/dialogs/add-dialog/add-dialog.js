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
} from '@material-ui/core'
import './add-dialog.css';
import { HuePicker } from 'react-color'
import axios from 'axios';
class AddDialog extends React.Component {
    state = {
        name: '',
        profession: '',
        city: '',
        assigned: false,
        branch: '',
        color: '#ffffff'
    };

    handleCloseDialog = event =>  {
        this.props.close('openAddDialog');
        this.setState({name: '', profession: '', city: '', color: '#ffffff'})
    };

    handleColorChange = color =>  {
        this.setState({color: color.hex})
    };

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

    addEmployee = () => {
        axios.post('http://localhost:8080/api/add/employees', this.state, {withCredentials: true, headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
          this.props.update({action: 'add', data: response.data});
          this.handleCloseDialog();
        })
    };


    render() {
        const { color, name, city, profession, branch } = this.state;
        return (
            <div className="edit-dialog">
                <Dialog open={this.props.open}  maxWidth="lg">
                    <DialogTitle>Add Employee</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please enter your most up to date employee information
                        </DialogContentText>
                            <TextField id="employee_name"
                               label="Employee Name"
                               placeholder="What is your name?"
                               value={name}
                               onChange={this.handleNameChange}
                               margin="normal"  fullWidth/>
                            <TextField id="employee_profession"
                                       value={profession}
                                       onChange={this.handleProfessionChange}
                                       label="Employee Profession"
                                       placeholder="What is your current profession?"
                                       margin="normal"
                                       fullWidth/>
                        <DialogContentText>
                            Pick a color of your choice
                        </DialogContentText>
                            <HuePicker className="full-width" color={color} onChangeComplete={this.handleColorChange}/>
                            <div style={{width: "30px", height: '10px', backgroundColor: color, marginTop: '5px'}}/>
                            <TextField disabled value={color} className="full-width"/>
                            <TextField id="employee_city"
                                       value={city}
                                       onChange={this.handleCityChange}
                                       label="City"
                                       placeholder="What city do you current reside in?"
                                       margin="normal"
                                       fullWidth/>
                        <TextField id="employee_branch"
                                   value={branch}
                                   onChange={this.handleBranchChange}
                                   label="Branch"
                                   placeholder="Which branch do you belong to?"
                                   margin="normal"
                                   fullWidth/>
                        <DialogContentText className="mt-1">
                            Are you assigned?
                        </DialogContentText>
                        <Select
                            value={this.state.assigned}
                            onChange={this.handleAssignedChange}
                            displayEmpty
                            name="Assigned"
                            className="full-width">
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="true">Assigned</MenuItem>
                            <MenuItem value="false">Not Assigned</MenuItem>
                        </Select>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {this.handleCloseDialog()}} color="primary">
                            Cancel
                        </Button>
                        <Button  onClick={() => {this.addEmployee()}} color="primary" disabled={this.isAllEmpty()}>
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default AddDialog;