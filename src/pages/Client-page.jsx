import { Box } from "@mui/material";
import { Component } from "react";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label} from 'reactstrap';
import Sidenav from "../components/Sidenav";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.css';

const url = "http://localhost:3000/api/clients";

class ClientPage extends Component {

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
            this.setState({data: response.data.clients});
        }).catch(error => console.log(error.message));
    }

    peticionPost = async () => {
        await axios.post(url, {client: this.state.form}).then(response => {
            this.modalInsertar();
            this.peticionGet();
        }).catch(error => console.log(error.message));
    }

    peticionPut = () => {
        axios.put(url+`/${this.state.form.id}`, {client: this.state.form}).then( response => {
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
    
    selectClient = (client) => {
        this.setState({
            typeModal : 'update',
            form: {
            id        : client.id,
            name      : client.name,
            lastname  : client.lastname,
            cellphone : client.cellphone,
            email     : client.email,
            password  : client.password,
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
                            <button className='btn btn-success' onClick={ () => {this.setState({form: {}, typeModal: 'insert'}), this.modalInsertar()}}>Add Client</button>
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
                                this.state.data.map((client) => {
                                    return (
                                    <tr key={client.id}>
                                        <td>{client.name}</td>
                                        <td>{client.lastname}</td>
                                        <td>{client.cellphone}</td>
                                        <td>
                                        <button className='btn btn-primary' onClick={() => {this.selectClient(client); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                                        {"    "}
                                        <button className='btn btn-danger'  onClick={() => {this.selectClient(client); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
                                        </td>
                                    </tr>
                                    )
                                })
                                }
                            </tbody>
                            </table>
                        
                            

                            <Modal isOpen={this.state.modalInsertar}>
                            <ModalHeader>
                                Add Client
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

export default ClientPage