import { Box } from "@mui/material";
import { Component, useEffect, useState } from "react";
import Sidenav from "../components/Sidenav";

import { Header } from "../components/Header";
import { ProductList } from "../components/ProductsList";


const urlProducts = 'http://localhost:3001/api/productos';

function SalePage() {

    const [carProducts, setCarProducts]      = useState([]);
    const [products, setProducts]            = useState([]);
    const [total, setTotal]                  = useState(0);
    const [countProducts, setCountProducts]  = useState(0);


    // useEffect(() => {
    //     axios.get(urlProducts).then(response => {
    //         setProducts(response.data.productos);
    //     }).catch(error => console.log(error.message))
    // })

    return(
        <>
            <Box sx={{display: 'flex'}}>
                <Sidenav/>
                <Box component="main" sx={{flexFlow: 1, p: 3}}>
                    <Header 
                        carProducts={carProducts}
                        setCarProducts={setCarProducts}
                        products={products} 
                        setProducts={setProducts}
                        total={total}
                        setTotal={setTotal}
                        countProducts={countProducts}
                        setCountProducts={setCountProducts}
                        
                    />
                    <ProductList 
                        carProducts={carProducts}
                        setCarProducts={setCarProducts}
                        products={products}
                        setProducts={setProducts}
                        total={total}
                        setTotal={setTotal}
                        countProducts={countProducts}
                        setCountProducts={setCountProducts}
                    />
                    
                </Box>
            </Box>
        </>
    )
    
}

export default SalePage