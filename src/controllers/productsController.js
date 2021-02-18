const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {

		 const paraLaVista = {
			 products,
			 toThousand
		 }
		res.render("products",paraLaVista)
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		const productoDetalle = products.find( producto => producto.id == req.params.id);

		const productoAEditar = {
			productoDetalle,
			toThousand
		}
		
		
		return res.render("detail", productoAEditar)
	},

	// Create - Form to create
	create: (req, res) => {
		res.render("product-create-form")
	},
	
	// Create -  Method to store
	store: (req, res) => {
		// Do the magic
	},

	// Update - Form to edit
	edit: (req, res) => {
		
		const productoEditar = products.find( producto => producto.id == req.params.id);


		res.render("product-edit-form", productoEditar)
	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
	}
};

module.exports = controller;