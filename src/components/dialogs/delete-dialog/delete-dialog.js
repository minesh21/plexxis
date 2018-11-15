import React from 'react';
import {
    Dialog,
    DialogContentText,
    DialogContent,
    DialogTitle,
    DialogActions,
    Button
} from '@material-ui/core';
import axios from 'axios';
class DeleteDialog extends React.Component {
    handleCloseDialog = event =>  {
        this.props.close('openDeleteDialog');
        this.setState({name: '', profession: '', city: '', color: '#ffffff'})
    };

    deleteEmployee() {
      axios.post('http://localhost:8080/api/delete/employees', {ids: this.props.ids}, {withCredentials: true, headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        this.props.update({action: 'delete', data: response.data});
        this.handleCloseDialog()
      })
    }

    render() {
        return (
            <div className="delete-dialog">
                <Dialog open={this.props.open}>
                    <DialogTitle>Delete Employee(s)</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Are you sure you want to proceed?</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {this.handleCloseDialog()}} color="primary">
                            Cancel
                        </Button>
                        <Button color="primary" onClick={() => {this.deleteEmployee()}}>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default DeleteDialog;