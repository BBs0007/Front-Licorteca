import { Box } from "@mui/material";
import { Component } from "react";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label} from 'reactstrap';
import Sidenav from "../components/Sidenav";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.css';

const url = "http://localhost:3000/api/catalogs";

class CatalogPage extends Component {

    state = {
        data: [],
        modalInsertar: false,
        modalEliminar: false,
        form: {
            id        : '',
            type      : '',
            products  : '',
            supplier  : '',
            state     : ''
        },
        typeModal : '',
    }

    peticionGet = () => {
        axios.get(url).then(response => {
            this.setState({data: response.data.catalogs});
        }).catch(error => console.log(error.message));
    }

    peticionPost = async () => {
        await axios.post(url, {catalog: this.state.form}).then(response => {
            this.modalInsertar();
            this.peticionGet();
        }).catch(error => console.log(error.message));
    }

    peticionPut = () => {
        axios.put(url+`/${this.state.form.id}`, {catalog: this.state.form}).then( response => {
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
    
    selectCatalogs = (catalogs) => {
        this.setState({
            typeModal : 'update',
            form: {
                id          : catalogs.id,
                type        : catalogs.type,
                products    : catalogs.products,
                supplier    : catalogs.supplier,
                state       : catalogs.state
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
                            <button className='btn btn-success' onClick={ () => {this.setState({form: {}, typeModal: 'insert'}), this.modalInsertar()}}>Add Catalogs</button>
                            <br/> <br/>

                            <table className='table'>
                            <thead>
                                <tr>
                                <th>type</th>
                                {/* <th>products</th> */}
                                <th>supplier</th>
                                {/* <th>state</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                this.state.data.map((catalogs) => {
                                    return (
                                    <tr key={catalogs.id}>
                                        <td>{catalogs.type}</td>
                                        {/* <td>{catalogs.products}</td> */}
                                        <td>{catalogs.supplier}</td>
                                        {/* <td>{catalogs.state}</td> */}
                                        <td>
                                        <button className='btn btn-primary' onClick={() => {this.selectCatalogs(catalogs); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                                        {"    "}
                                        <button className='btn btn-danger'  onClick={() => {this.selectCatalogs(catalogs); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
                                        </td>
                                    </tr>
                                    )
                                })
                                }
                            </tbody>
                            </table>
                        
                            

                            <Modal isOpen={this.state.modalInsertar}>
                            <ModalHeader>
                                Add Catalogs
                            </ModalHeader>

                            <ModalBody>

                                <FormGroup>
                                <Label>type:</Label>
                                <Input className='form-control' type='text' name='type' onChange={this.handleChange} value={form?form.type : form.type}/>
                                </FormGroup>

                                {/* <FormGroup>
                                <Label>products:</Label>
                                <Input className='form-control' type='text' name='products'  onChange={this.handleChange} value={form?form.products : form.products}/>
                                </FormGroup>
                         */}
                                <FormGroup>
                                <Label>supplier:</Label>
                                <Input className='form-control' type='text' name='supplier'  onChange={this.handleChange} value={form?form.supplier : form.supplier}/>
                                </FormGroup>
                        
                                {/* <FormGroup>
                                <Label>state:</Label>
                                <Input className='form-control' type='text' name='state'  onChange={this.handleChange} value={form?form.state : form.state}/>
                                </FormGroup> */}
                        
                                {/* <FormGroup>
                                <Label>Cell phone:</Label>
                                <Input className='form-control' type='text' name='cellphone'  onChange={this.handleChange} value={form?form.cellphone : form.cellphone}/>
                                </FormGroup> */}

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
                                Estas seguro que deseas eliminar a esta persona {form && form.type}
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

export default CatalogPage