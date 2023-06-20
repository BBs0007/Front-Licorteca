import { Box } from "@mui/material";
import { Component } from "react";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label} from 'reactstrap';
import Sidenav from "../components/Sidenav";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.css';

const url = "http://localhost:3000/api/employees";

class EmployeePage extends Component {

    state = {
        data: [],
        modalInsertar: false,
        modalEliminar: false,
        form: {
            id        : '',
            name      : '',
            lastname  : '',
            email     : '',
            password  : '',
            cellphone : '',
        },
        typeModal : '',
    }

    peticionGet = () => {
        axios.get(url).then(response => {
            this.setState({data: response.data.employees});
        }).catch(error => console.log(error.message));
    }

    peticionPost = async () => {
        await axios.post(url, {employee: this.state.form}).then(response => {
            this.modalInsertar();
            this.peticionGet();
        }).catch(error => console.log(error.message));
    }

    peticionPut = () => {
        axios.put(url+`/${this.state.form.id}`, {employee: this.state.form}).then( response => {
            this.modalInsertar();
            this.peticionGet();
        }).catch(error => console.log(error.message));
    }

    peticionDelete = () => {
        axios.delete(url+`/${this.state.form.id}`).then( response => {
            this.setState({modalEliminar: false});
            this.peticionGet();
        })
    }

    modalInsertar = () => {
        this.setState({modalInsertar: !this.state.modalInsertar})
    }
    
    selectEmployee = (employee) => {
        this.setState({
            typeModal : 'update',
            form: {
            id        : employee.id,
            name      : employee.name,
            lastname  : employee.lastname,
            cellphone : employee.cellphone,
            email     : employee.email,
            password  : employee.password,
            }
        })
    }

    handleChange = async (evt) => {
        evt.persist();
        await this.setState({
            form: {
            ...this.state.form,
            [evt.target.name]: evt.target.value
            }
        })
        console.log(this.state.form)
    }

    componentDidMount() {
        this.peticionGet();
    }

    render() {

        const {form} = this.state;

        return(
            <>
                <Box sx={{display: 'flex'}}>
                    <Sidenav/>
                    <Box component="main" sx={{flexFlow: 1, p: 3}}>
                        <div className='App'>
                            <br/>
                            <button className='btn btn-success' onClick={ () => {this.setState({form: {}, typeModal: 'insert'}), this.modalInsertar()}}>Add Employee</button>
                            <br/> <br/>

                            <table className='table'>
                            <thead>
                                <tr>
                                <th>Name</th>
                                <th>LastName</th>
                                <th>CellPhone</th>
                                <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                this.state.data.map((employee) => {
                                    return (
                                    <tr key={employee.id}>
                                        <td>{employee.name}</td>
                                        <td>{employee.lastname}</td>
                                        <td>{employee.cellphone}</td>
                                        <td>
                                        <button className='btn btn-primary' onClick={() => {this.selectEmployee(employee); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                                        {"    "}
                                        <button className='btn btn-danger'  onClick={() => {this.selectEmployee(employee); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
                                        </td>
                                    </tr>
                                    )
                                })
                                }
                            </tbody>
                            </table>
                        
                            

                            <Modal isOpen={this.state.modalInsertar}>
                            <ModalHeader>
                                Add Employee
                            </ModalHeader>

                            <ModalBody>

                                <FormGroup>
                                <Label>Name:</Label>
                                <Input className='form-control' type='text' name='name' onChange={this.handleChange} value={form?form.name : form.name}/>
                                </FormGroup>

                                <FormGroup>
                                <Label>Lastname:</Label>
                                <Input className='form-control' type='text' name='lastname'  onChange={this.handleChange} value={form?form.lastname : form.lastname}/>
                                </FormGroup>
                        
                                <FormGroup>
                                <Label>Email:</Label>
                                <Input className='form-control' type='text' name='email'  onChange={this.handleChange} value={form?form.email : form.email}/>
                                </FormGroup>
                        
                                <FormGroup>
                                <Label>Password:</Label>
                                <Input className='form-control' type='text' name='password'  onChange={this.handleChange} value={form?form.password : form.password}/>
                                </FormGroup>
                        
                                <FormGroup>
                                <Label>Cell phone:</Label>
                                <Input className='form-control' type='text' name='cellphone'  onChange={this.handleChange} value={form?form.cellphone : form.cellphone}/>
                                </FormGroup>

                            </ModalBody>

                            <ModalFooter>
                                {
                                this.state.typeModal === 'insert' ?
                                <button className='btn btn-success' onClick={() => this.peticionPost()}>Insert</button>
                                :
                                <button className='btn btn-primary' onClick={() => this.peticionPut() }>Update</button>
                                }
                                <Button color='secundary' onClick={this.modalInsertar}>Cancel</Button>
                            </ModalFooter>

                            </Modal>

                            <Modal isOpen={this.state.modalEliminar}>
                            <ModalBody>
                                Estas seguro que deseas eliminar a esta persona {form && form.name}
                            </ModalBody>
                            <ModalFooter>
                                <button className='btn btn-danger'    onClick={() => this.peticionDelete()}>Yes</button>
                                <button className='btn btn-secundary' onClick={() => this.setState({modalEliminar: false})}>No</button>
                            </ModalFooter>
                            </Modal>

                        </div>
                    </Box>
                </Box>
            </>
        )
    }
}

export default EmployeePage