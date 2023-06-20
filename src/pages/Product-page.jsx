import { Box } from "@mui/material";
import { Component } from "react";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label} from 'reactstrap';
import Sidenav from "../components/Sidenav";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.css';

const urlProducts    = "http://localhost:3001/api/productos";
const urlInventories = "http://localhost:3000/api/inventories";
// const urlSuppliers   = "http://localhost:3000/api/suppliers";
// const urlCatalogs    = "http://localhost:3000/api/catalogs";

class ProductPage extends Component {

    state = {
        dataProduct         : [],
        dataInventories     : [],
        dataSuppliers       : [],
        dataCatalogs        : [],
        dataProductsCatalog : [],

        modalInsertar   : false,
        modalAddRef     : false,
        modalEliminar   : false,

        supplier        : '',
        catalog         : '',
        productCatalog  : '',
        product         : '',

        catalogsForm    : {
            id        : '',
            type      : '',
            products  : [],
            supplier  : '',
            state     : false
        },

        inventoryForm: {
            id       : '',
            type     : '',
            stock    : 0,
            products : [],
        },
        productForm: {
            _id           : '',
            name         : '',
            description  : '',
            stock_actual : 0,
            price        : 0,
            url_img      : ''
        },

        typeModal : '',
    }
    
    peticionGet = () => {
        axios.get(urlProducts).then(response => {
            this.setState({dataProduct: response.data})
        }).catch(error => console.log(error.message));
    }

    peticionGetInventories = () => {
        axios.get(urlInventories).then(response => {
            this.setState({dataInventories: response.data.inventories})
        }).catch(error => console.log(error.message));
    }

    // peticionGetSuppliers = () => {
    //     axios.get(urlSuppliers).then(response => {
    //         this.setState({dataSuppliers: response.data.suppliers})
    //     }).catch(error => console.log(error.message));
    // }

    // peticionGetCatalogsBySuppliers = () => {
    //     axios.get(urlCatalogs+`/${this.state.supplier}`).then(response => {
    //         this.setState({dataCatalogs: response.data.catalogs})
    //     }).catch(error => console.log(error.message));
    // }

    // peticionPost = async () => {
    //     await axios.post(urlProducts, {product: this.state.productForm}).then( response => {
    //         //this.(response.data);
    //         // this.modalInsertar();
    //         // this.peticionGet();
    //     }).catch(error => console.log(error.message));
    // }

    peticionPost = async () => {
        await axios
		.post(urlProducts, this.state.productForm)
		.then( (response) => {
            this.modalInsertar();
            this.peticionGet();
		})
		.catch((error) => {
			console.log(error);
			// Mostrar un mensaje de error en caso de falla en la solicitud POST
			alert('Error al realizar la venta');
		});
    }

	

    // peticionPostAddRefProductToCatalog = async () => {
    //     await axios.post(urlProducts+`/${this.state.product}`, {product_id: this.state.productCatalog}).then(response => {
    //         this.modalAddRef()
    //     }).catch(error => console.log(error.message))
    // }

    peticionPostInventoryAddProduct = async (_id) => {
        await axios.post(urlInventories+`/${this.state.inventoryForm.id}`, {product_id: _id}).then(response => {
        }).catch(error => console.log(error.message));
    }

    peticionPut = () => {
        axios.put(urlProducts+`/${this.state.productForm._id}`, {product: this.state.productForm}).then( response => {
            this.modalInsertar();
            this.peticionGet();
        }).catch(error => console.log(error.message));
    }

    peticionDelete = () => {
        axios.delete(urlProducts+`/${this.state.productForm._id}`).then( response => {
            this.setState({modalEliminar: false});
            this.peticionGet();
        })
    }

    modalInsertar = () => {
        this.setState({modalInsertar: !this.state.modalInsertar})
    }

    modalAddRef = () => {
        this.setState({modalAddRef: !this.state.modalAddRef})
    }
    
    selectProduct = (product) => {
        this.setState({
            typeModal   : 'update',
            productForm : {
                id           : product._id,
                name         : product.name,
                description  : product.description,
                stockmin     : product.stockmin,
                stockmax     : product.stockmax,
                stock_actual : product.stock_actual,
                price        : product.price,
                url_img      : product.url_img,
            }
        })
    }


    handleChange = async (evt) => {
        evt.persist();
        await this.setState({
            productForm: {
            ...this.state.productForm,
            [evt.target.name]: evt.target.value
            }
        })
        console.log(this.state.productForm)
    }

    handleChangeInventory = async (evt) => {
        evt.persist();
        await this.setState({
            inventoryForm: {
            ...this.state.inventoryForm,
            [evt.target.name]: evt.target.value
            }
        })
        console.log(this.state.inventoryForm)
    }

    // handleChangeSupplier = async (evt) => {
    //     evt.persist();
    //     await this.setState({
    //         supplier: evt.target.value
    //     })
    //     this.peticionGetCatalogsBySuppliers();
    //     console.log(this.state.supplier)
    // }

    // handleCatalog = async (evt) => {
    //     evt.persist();
    //     await this.setState({
    //         catalog: evt.target.value
    //     })
    //     this.handleProducts();
    //     console.log(this.state.catalog)
    // }

    // handleProducts = () => {
    //     this.state.dataCatalogs.forEach(catalog => {
    //         if(catalog.id === this.state.catalog) {
    //             this.setState({dataProductsCatalog: catalog.products})
    //         }
    //     });
    // }

    // handleProductCatalog = async (evt) => {
    //     evt.persist();
    //     await this.setState({
    //         productCatalog: evt.target.value
    //     })
    //     console.log(this.state.productCatalog)
    // }

    handleProduct = async (evt) => {
        evt.persist();
        await this.setState({
            product: evt.target.value
        })
        console.log(this.state.product)
    }

    componentDidMount() {
        this.peticionGet();
        this.peticionGetInventories();
        // this.peticionGetSuppliers();
    }

    render() {

        const {productForm: form} = this.state;

        return(
            <>
                <Box sx={{display: 'flex'}}>
                    <Sidenav/>
                    <Box component="main" sx={{flexFlow: 1, p: 3}}>
                        <div className='App'>
                            <br/>
                            <button className='btn btn-success' onClick={ () => {this.setState({form: {}, typeModal: 'insert'}), this.modalInsertar()}}>Add Product</button>
                            {" "}
                            <button className='btn btn-danger'  onClick={ () => {this.setState({form: {}, typeModal: 'addRef'}), this.modalAddRef()}}>Add Refer</button>
                            <br/> <br/>

                            <table className='table'>
                            <thead>
                                <tr>
                                <th>Imagen</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Stock</th>
                                <th>Price</th>
                                <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                this.state.dataProduct.map((product) => {
                                    return (
                                    <tr key={product._id}>
                                        <img className="img-crear-product" src={product.url_img} alt={product.name} />
                                        <td>{product.name}</td>
                                        <td>{product.description}</td>
                                        <td>{product.stock_actual}</td>
                                        <td>{product.price}</td>
                                        <td>
                                        <button className='btn btn-primary' onClick={() => {this.selectProduct(product); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                                        {" "}
                                        <button className='btn btn-danger'  onClick={() => {this.selectProduct(product); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
                                        </td>
                                    </tr>
                                    )
                                })
                                }
                            </tbody>
                            </table>
                        
                            

                            <Modal isOpen={this.state.modalInsertar}>
                                <ModalHeader>
                                    Add Product
                                </ModalHeader>

                                <ModalBody>

                                    <FormGroup>
                                    <Label>Name:</Label>
                                    <Input className='form-control' type='text' name='name' onChange={this.handleChange} value={form?form.name : form.name}/>
                                    </FormGroup>

                                    <FormGroup>
                                    <Label>description:</Label>
                                    <Input className='form-control' type='text' name='description'  onChange={this.handleChange} value={form?form.description : form.description}/>
                                    </FormGroup>

                                    <FormGroup>
                                    <Label>price:</Label>
                                    <Input className='form-control' type='text' name='price'  onChange={this.handleChange} value={form?form.price : form.price}/>
                                    </FormGroup>

                                    <FormGroup>
                                    <Label>Stock_actual:</Label>
                                    <Input className='form-control' type='text' name='stock_actual'  onChange={this.handleChange} value={form?form.stock_actual : form.stock_actual}/>
                                    </FormGroup>

                                    <FormGroup>
                                    <Label>url_img:</Label>
                                    <Input className='form-control' type='text' name='url_img'  onChange={this.handleChange} value={form?form.url_img : form.url_img}/>
                                    </FormGroup>
                                    
                                    <FormGroup>
                                    <Label>Select inventory:</Label>
                                    <Input 
                                        className='form-control'
                                        type='select' 
                                        name='id'
                                        onChange={this.handleChangeInventory}
                                    >
                                        { 
                                            this.state.dataInventories.map(inventory => {
                                                return (
                                                    <option key={inventory.id} value={inventory.id}>{inventory.type}</option>
                                                )
                                            })
                                        }
                                    </Input>
                                    </FormGroup>

                                </ModalBody>

                                <ModalFooter>
                                    {
                                        this.state.typeModal === 'insert' 
                                        ? <button className='btn btn-success' onClick={() => {this.peticionPost()}}>Insert</button>
                                        : <button className='btn btn-primary' onClick={() => this.peticionPut() }>Update</button>
                                    }
                                    <Button color='secundary' onClick={this.modalInsertar}>Cancel</Button>
                                </ModalFooter>

                            </Modal>

                            <Modal isOpen={this.state.modalAddRef}>
                                <ModalHeader>
                                    Add Referencia to Catalogo
                                </ModalHeader>
                                <ModalBody>

                                    <FormGroup>
                                        <Label>Select Supplier:</Label>
                                        <Input 
                                            className='form-control'
                                            type='select'
                                            name='supplier'
                                            onChange={this.handleChangeSupplier}
                                        >
                                            { 
                                                this.state.dataSuppliers.map(supplier => {
                                                    return (
                                                        <option key={supplier.id} value={supplier.id}>{`${supplier.name} ${supplier.lastname}`}</option>
                                                    )
                                                })
                                            }
                                        </Input>
                                    </FormGroup>

                                    {   
                                        this.state.dataCatalogs.length > 0
                                            ? (
                                                <FormGroup>
                                                    <Label>Select Catalog:</Label>
                                                    <Input 
                                                        className='form-control'
                                                        type='select'
                                                        name='catalog'
                                                        onChange={this.handleCatalog}
                                                    >
                                                        { 
                                                            this.state.dataCatalogs.map(catalog => {
                                                                return (
                                                                    <option key={catalog.id} value={catalog.id}>{catalog.type}</option>
                                                                )
                                                            })
                                                        }
                                                    </Input>
                                                </FormGroup>
                                            ) 
                                            : (
                                                <></>
                                            )                                        
                                    }

                                    {   
                                        this.state.dataProductsCatalog.length > 0
                                            ? (
                                                <FormGroup>
                                                    <Label>Select Product Catalog:</Label>
                                                    <Input 
                                                        className='form-control'
                                                        type='select'
                                                        name='product'
                                                        onChange={this.handleProductCatalog}
                                                    >
                                                        { 
                                                            this.state.dataProductsCatalog.map(product => {
                                                                return (
                                                                    <option key={product.id} value={product.id}>{product.name}</option>
                                                                )
                                                            })
                                                        }
                                                    </Input>
                                                </FormGroup>
                                            ) 
                                            : (
                                                <></>
                                            )                                        
                                    }

                                    {   
                                        this.state.dataProduct.length > 0
                                            ? (
                                                <FormGroup>
                                                    <Label>Select Product:</Label>
                                                    <Input 
                                                        className='form-control'
                                                        type='select'
                                                        name='product'
                                                        onChange={this.handleProduct}
                                                    >
                                                        { 
                                                            this.state.dataProduct.map(product => {
                                                                return (
                                                                    <option key={product.id} value={product.id}>{product.name}</option>
                                                                )
                                                            })
                                                        }
                                                    </Input>
                                                </FormGroup>
                                            ) 
                                            : (
                                                <></>
                                            )                                        
                                    }

                                </ModalBody>

                                <ModalFooter>                                    
                                    <button className='btn btn-success' onClick={() => {this.peticionPostAddRefProductToCatalog()}}>Insert</button>
                                    <Button color='secundary' onClick={this.modalAddRef}>Cancel</Button>
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

export default ProductPage

