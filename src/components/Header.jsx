import React, {useEffect ,useState } from "react";
import './Header.css';
import axios from "axios";

//const urlSales = 'http://localhost:3001/api/sales';
const urlSupplier = "http://localhost:3000/api/suppliers";


export const Header = ( {carProducts, setCarProducts} ) => {

	const [active, setActive] = useState(false);
	const [selectedClient, setSelectedClient] = useState("");
	const [suppliers, setSuppliers] = useState([]);


	const totalProducts = carProducts.reduce((total, product) => total + product.amount, 0);



	useEffect(() => {
		// Realizar solicitud HTTP GET para obtener los clientes desde urlSupplier
		axios.get(urlSupplier)
		  .then(response => {
			setSuppliers(response.data.suppliers); // Asignar los clientes a la variable suppliers
		  })
		  .catch(error => {
			console.log(error.message);
		  });
	  }, []); 
	  

	const handleClientChange = (event) => {
		setSelectedClient(event.target.value); // Actualizar el cliente seleccionado
	  };

	const handleSale = () => {

		


		const urlSale = 'http://localhost:3001/api/sales';
	
		let totalPagar = 0; // Variable para almacenar el total a pagar

  		carProducts.forEach((product) => {
    	const precioTotal = product.price * product.amount;
    	totalPagar += precioTotal;
 		});

  		const saleData2 = {
    	products_sold: carProducts,
    	total_pagar: totalPagar, // Agregar el total a pagar al objeto saleData
  		};



		// Construir objeto de venta utilizando el esquema
		const saleData = {
		products_sold: carProducts.map((product) => ({
			product_id: product.id,
			quantity: product.amount,
			total_pagar: product.amount * product.price,
		})),
		};
	
		// Realizar la solicitud POST al servidor
		axios
		.post(urlSale, saleData)
		.then(async (response) => {

			const selectedClientName = suppliers.find((supplier) => supplier.id === selectedClient)?.name || '';

			// Obtener los datos específicos que deseas mostrar en el alert
			const { products_sold } = response.data;

			// Crear el mensaje de alerta con los detalles de cada producto vendido
			let alertMessage = 'Venta realizada\n';

			for (const productSold of products_sold) {
			const { product_id, quantity, total_pagar } = productSold;

			try {
				// Realizar la consulta para obtener el nombre del producto usando el product_id
				const product = carProducts.find((product) => product.id === product_id);
                const productName = product.name;
	
				alertMessage += `\nProducto: ${productName}\nID: ${product_id}\nCantidad: ${quantity}\nTotal a pagar: ${total_pagar}\n`;
				
			} catch (error) {
				console.log(error);
				// Mostrar un mensaje de error en caso de fallo en la consulta
				alert('Error al obtener el nombre del producto');
			}
			}
			alertMessage += `\nTotal a pagar todos los productos: ${totalPagar}`
			alertMessage += `\nCliente: ${selectedClientName}`
			// Mostrar el mensaje de alerta
			alert(alertMessage);

			// Vaciar el carrito después de realizar la venta
			setCarProducts([]);
		})
		.catch((error) => {
			console.log(error);
			// Mostrar un mensaje de error en caso de falla en la solicitud POST
			alert('Error al realizar la venta');
		});
	};


	const increaseAmount = (productId) => {
		const updatedProducts = carProducts.map((product) => {
		if (product.id === productId) {
			return { ...product, amount: product.amount + 1 };
		}
		return product;
		});
		setCarProducts(updatedProducts);
	};
	
	const decreaseAmount = (productId) => {
		const updatedProducts = carProducts.map((product) => {
		if (product.id === productId && product.amount > 1) {
			return { ...product, amount: product.amount - 1 };
		}
		return product;
		});
		setCarProducts(updatedProducts);
	};
	
	const removeProduct = (productId) => {
		const updatedProducts = carProducts.filter((product) => product.id !== productId);
		setCarProducts(updatedProducts);
	};



	const sale = () => {

		let products = [];

		carProducts.forEach(product => {
			const productMap = new Map();
			productMap.set('id',     product.id)
			productMap.set('name',   product.name)
			productMap.set('amount', product.amount)
			productMap.set('price',  product.price)
			products.push(productMap)
		});

		console.log(products);
	}
	//const productCount = carProducts.length;

    return(
        <header>
			<h1>Tienda</h1>

			<div className="container-icon">
				<div className="container-cart-icon" onClick={() => setActive(!active)}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="currentColor"
						className="icon-cart"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
						/>
					</svg>
					<div className="count-products">
						<span id="contador-productos">{totalProducts}</span>
					</div>
				</div>

				<div className={`container-cart-products ${active ? '' : 'hidden-cart'}`}>
					{
						carProducts.length ? (
							<>
								<div className="row-product">
									{
										carProducts.map(carProduct => (
											<div className="cart-product" key={carProduct.id}>
												<div className="info-cart-product">
												<button className="quantity-button" onClick={() => decreaseAmount(carProduct.id)}>
                  									  -
                  								</button>
													<span className="cantidad-producto-carrito">{carProduct.amount}</span>
													<button className="quantity-button" onClick={() => increaseAmount(carProduct.id)}>
                 									   +
                								</button>
													<p className="titulo-producto-carrito">{carProduct.name}</p>
													<span className="precio-producto-carrito">${carProduct.price}</span>
												</div>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth="1.5"
													stroke="currentColor"
													className="icon-close"
													onClick={() => removeProduct(carProduct.id)}
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M6 18L18 6M6 6l12 12"
													/>
												</svg>
											</div>
										))
									}
									
								</div>

								<div className="cart-total hidden">
									<h3>Total:</h3>
									<span className="total-pagar">$200</span>
								</div>

								<div className="cart-total">
									<select name="select" id="id" value={selectedClient} onChange={handleClientChange}>
  										<option value="">Seleccionar cliente</option>
  										{suppliers.map((supplier) => (
    									<option key={supplier.id} value={supplier.id}>
      									{supplier.name}
    									</option>
  										))}
									</select>
   								</div>


								<div className="cart-total">
									<button onClick={handleSale}>Vender</button>
								</div>
							</>
						) : (
							<p className="cart-empty">El carrito está vacío</p>
						)
					}
				</div>
			</div>
		</header>
    )
}