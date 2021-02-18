const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {

		const ProductosVisitados = [];
		const ProductosenOferta  = [];

		products.map(producto => {
			 if(producto.category == "visited"){
				ProductosVisitados.push(producto)
			 }
			 else if(producto.category == "in-sale"){
				ProductosenOferta.push(producto)
			 }
			 
		 });

		 const listadoDeProducto = {
			 visitados:ProductosVisitados,
			 enOferta: ProductosenOferta,
			 toThousand
		 }
	return	res.render("index",listadoDeProducto)
	},
	search: (req, res) => {
		// Do the magic
	},
};

module.exports = controller;
