import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Paper,
  Checkbox,
  AppBar,
  Toolbar,
  Typography,
  Tooltip,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  TextField,
} from '@material-ui/core'
import {Check, Close, PersonAdd, Delete, ViewColumn, FilterList, Edit} from '@material-ui/icons';
import AddDialog  from '../dialogs/add-dialog/add-dialog';
import DeleteDialog from '../dialogs/delete-dialog/delete-dialog';
import './List-View.css'
import { PhotoshopPicker } from 'react-color';
class ListView extends React.Component {
    state = {
      selected: [],
      text: '',
      columns: [],
      selectedAll: false,
      openAddDialog: false,
      openDeleteDialog: false,
      anchorEl: null,
      menuItems: {
        id: true,
        name: true,
        code: true,
        profession: true,
        color: true,
        city: true,
        branch: true,
        assigned: true},
      editable: [],
    };

    onSelectAll = value => event => {
        const checked = event.target.checked;
        this.setState({selectAll: event.target.checked});

        if (checked) {
            this.setState({selected: this.props.employees.map(g => {return g.id})})
        } else {
            this.setState({selected: []});
        }
    };

    addToSelected = value => () => {
        let employees = this.state.selected;
        const index = employees.indexOf(value);
        if (index !== -1) {
            employees.splice(index, 1);
            this.setState({selected: employees});
            return;
        }
        employees.push(value);
        this.setState({selected: employees});
    };

    isSelected = id =>  {
       return this.state.selected.indexOf(id) !== -1;
    };

    handleInput = event => {
      this.setState({text: event.target.value})
    };

    handleOpenDialog(key) {
        this.setState({[key]: true});
    }

    handleCloseDialog = (key) => {
        this.setState({[key]: false});
    };

    handleUpdate = data => {

      if (data.action === 'delete') {
        this.setState({text: ''});
        this.setState({selected: []});
      }

      this.props.update(data.data);
    };

    handleClose = () => {
      this.setState({ anchorEl: null });
    };

    handleMenuClick = key => event => {
      if (key === 'id') {
        return;
      }
      const menuItems = this.state.menuItems;
      menuItems[key] = event.target.checked;
      this.setState({menuItems});
    };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };


  render() {
       const {selected, selectAll, text, openAddDialog, openDeleteDialog, anchorEl, menuItems, editable} = this.state;
       const open = Boolean(anchorEl);
       let employees = this.props.employees;
       return(
           <div className="full-width">
               {
                   (this.props.employees.length > 0) ?
                       <Paper>
                           <AppBar position="relative"  color={selected.length > 0 ? 'secondary' : 'primary'}>
                                <Toolbar>
                                    <Typography variant="h6" color="inherit">
                                        Employees
                                    </Typography>
                                    <div className="spacer" />
                                    <div className="search-container">
                                        <InputBase placeholder="Search by name" className="search-box" onChange={this.handleInput}/>
                                    </div>

                                    <Menu id="menu-appbar"
                                          anchorEl={anchorEl}
                                          anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                          }}
                                          transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                          }}
                                          open={open}
                                          onClose={this.handleClose}>

                                      {
                                        Object.keys(this.props.employees[0]).map(key => {
                                          return <MenuItem key={key} value={key}>
                                              <Checkbox
                                              onChange={this.handleMenuClick(key)}
                                              checked={menuItems[key] === true} />{key}
                                            </MenuItem>
                                        })
                                      }
                                    </Menu>

                                    <Tooltip title="Show/Hide Columns">
                                      <IconButton aria-owns={open ? 'menu-appbar' : undefined}
                                                  aria-haspopup="true"
                                                  onClick={this.handleMenu}
                                                  color="inherit">
                                        <ViewColumn />
                                      </IconButton>
                                    </Tooltip>

                                        {selected.length === 0 ?
                                            <Tooltip title="Add Employee">
                                                <IconButton color="inherit" onClick={() => {this.handleOpenDialog('openAddDialog')}}>
                                                    <PersonAdd />
                                                </IconButton>
                                            </Tooltip>:
                                            <div>
                                              {
                                                selected.length === 1 ?

                                                <Tooltip title="Edit selection">
                                                  <IconButton color="inherit">
                                                    <Edit/>
                                                  </IconButton>
                                                </Tooltip> :
                                                ''
                                              }
                                              <Tooltip title="Delete selected">
                                                <IconButton color="inherit" onClick={() => {this.handleOpenDialog('openDeleteDialog')}}>
                                                  <Delete />
                                                </IconButton>
                                              </Tooltip>
                                            </div>

                                        }
                                </Toolbar>
                           </AppBar>
                         <div className="table-wrapper">
                           <Table>
                             <TableHead>
                               <TableRow>
                                 <TableCell>
                                   <Checkbox checked={selected.length === this.props.employees.length}
                                             onChange={this.onSelectAll(!selectAll)}/>
                                 </TableCell>
                                 <TableCell>id</TableCell>
                                 <TableCell>Name</TableCell>
                                 <TableCell>Code</TableCell>
                                 <TableCell>Profession</TableCell>
                                 <TableCell>Color</TableCell>
                                 <TableCell>City</TableCell>
                                 <TableCell>Branch</TableCell>
                                 <TableCell>Assigned</TableCell>
                               </TableRow>
                             </TableHead>
                             <TableBody>
                               {

                                 employees.filter(g => g.name.toString().toLowerCase().includes(text.toLowerCase())).map(employee => {
                                   const isSelected = this.isSelected(employee.id);
                                   return <TableRow className="table-row" key={employee.id}>
                                     {<TableCell><Checkbox onChange={this.addToSelected(employee.id)}
                                                           checked={isSelected}/>
                                     </TableCell>}
                                     {<TableCell>{employee.id}</TableCell>}
                                     {<TableCell>{isSelected ? null : employee.name}</TableCell>}
                                     {<TableCell>{employee.code}</TableCell>}
                                     {<TableCell>{employee.profession}</TableCell>}
                                     {<TableCell>
                                       <div className="color" style={{background: employee.color, width: '100%', height: '5px'}} />
                                     </TableCell>}
                                     {<TableCell>{employee.city}</TableCell>}
                                     {<TableCell>{employee.branch}</TableCell>}
                                     {<TableCell>
                                       {employee.assigned ? <Check /> : <Close/>}
                                     </TableCell>}
                                   </TableRow>
                                 })
                               }
                             </TableBody>
                           </Table>
                         </div>

                       </Paper>

                   :
                       <Paper>
                           <AppBar position="relative"  color="primary" className="full-width">
                               <Toolbar>
                                   <Typography variant="h6" color="inherit">
                                       Employees
                                   </Typography>
                                   <div className="spacer" />
                                       <Tooltip title="Add Employee">
                                           <IconButton color="inherit" onClick={() => {this.handleOpenDialog('openAddDialog')}}>
                                               <PersonAdd />
                                           </IconButton>
                                       </Tooltip>
                               </Toolbar>
                           </AppBar>
                           <p>No data Found!</p>
                       </Paper>

               }
               <AddDialog open={openAddDialog} close={this.handleCloseDialog} update={this.handleUpdate}/>
               <DeleteDialog open={openDeleteDialog} close={this.handleCloseDialog} update={this.handleUpdate} ids={selected}/>
           </div>


       )
   }
}

export default ListView;