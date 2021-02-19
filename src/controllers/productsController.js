const { fileLoader } = require('ejs');
const fs = require('fs');
const path = require('path');

const productsFilePath = path.resolve(__dirname, '../data/productsDataBase.json');
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

		let productoAgregar = {
			id: products.length == 0 ? 1 : products[products.length -1].id +1,
			name: req.body.name,
			price: req.body.price,
			discount: req.body.discount ,
			category: req.body.category ,
			description: req.body.description,
			image: req.file.filename

			
		};

		
		products.push(productoAgregar);
        let productoSubir = JSON.stringify(products, null , 2);
		fs.writeFileSync(productsFilePath ,productoSubir)
        

		return res.redirect("/")
	},

	// Update - Form to edit
	edit: (req, res) => {
		
		let productoAEditar = products.find( producto => producto.id == req.params.id);


		res.render("product-edit-form", productoAEditar)
	},
	// Update - Method to update
	update: (req, res) => {

		let productoAEditar = products.find( producto => producto.id == req.params.id);

		const productoEditado = products.map( producto => {
			if(producto.id == productoAEditar.id ){
			producto.name = req.body.name;
			producto.price = req.body.price;
			producto.discount= req.body.discount ;
			producto.category= req.body.category ;
			producto.description = req.body.description;
             }
			 return producto;
			 
		})

		let productoSubir = JSON.stringify(productoEditado, null , 2);
		fs.writeFileSync(productsFilePath,productoSubir);

		res.redirect("/")

	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		
	}
};

module.exports = controller;