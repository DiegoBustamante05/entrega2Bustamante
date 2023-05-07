const fs = require("fs");

class ProductManager {
    
    constructor () {
        this.products = [];
        this.path = "./products.json"
        const productsString = JSON.stringify(this.products)
        fs.writeFileSync(this.path, productsString)
    }
    getProducts(){
        const productsBeta = fs.readFileSync(this.path, "utf-8");
        this.products = JSON.parse(productsBeta);
        console.log(this.products);
        return this.products;
    }
    getProductById(id){
        const productsById = fs.readFileSync(this.path, "utf-8");
        this.products = JSON.parse(productsById);
        const found = this.products.find(prod => prod.id == id);
        if(found){
            console.log(found)
            return found;
        } else {
            console.log("Not found");
        }
    }
    #getProductByCode(code){
        const productsByCode = fs.readFileSync(this.path, "utf-8");
        this.products = JSON.parse(productsByCode);
        const codeExist = this.products.find(prod => prod.code == code);
        if(codeExist){
            return true;
        } else {
            return false;
        }
    }
    #generateId() {
        const productsId = fs.readFileSync(this.path, "utf-8");
        this.products = JSON.parse(productsId);
        let maxId = 0;
        for (let i = 0; i < this.products.length; i++) {
            const prod = this.products[i];
            if (prod.id > maxId) {
                maxId = prod.id;
            }
        } 
        return ++maxId;
    }
    addProduct(title, description, price, thumbnail, code, stock) {
        const prodFs = fs.readFileSync(this.path, "utf-8");
        this.products = JSON.parse(prodFs)
        if((title === undefined || title === null || title === '') || (description === undefined || description === null || description === '') || (price === undefined || price === null || price === '') || (thumbnail === undefined || thumbnail === null || thumbnail === '') || (code === undefined || code === null || code === '' ) || (stock === undefined || stock === null || stock === '')) {
            console.log('Error, you must complete all fields');            
        }else if(this.#getProductByCode(code)){
            console.log("The code entered has already been used, please enter another") 
        }else {
            let newProduct = {title, description, price, thumbnail, code, id: this.#generateId()};
            this.products = [...this.products, newProduct];
            const productsString = JSON.stringify(this.products)
            fs.writeFileSync(this.path, productsString)
            console.log("Added product!");
        }
    }
    deleteProductById(id) {
        const prodFs = fs.readFileSync(this.path, "utf-8");
        this.products = JSON.parse(prodFs)
        let newProducts = this.products.filter(prod=> prod.id !== id);
        this.products = newProducts
        const productsString = JSON.stringify(this.products)
        fs.writeFileSync(this.path, productsString)
        console.log("Removed product")
    }
    updateProduct(id, key, value) {
        const prodFs = fs.readFileSync(this.path, "utf-8");
        this.products = JSON.parse(prodFs)
        if(key == "id"){
            return console.log("The id cannot be modified")
        } else if (this.products.find(p => p.id === id)) {
            const found = this.products.find(p => p.id === id)
            found[key] = value
            const productsString = JSON.stringify(this.products)
            fs.writeFileSync(this.path, productsString)
            console.log("Updated product!", found)
        } else {
            console.log("Product not found")
        }
    }
}

const myProducts = new ProductManager;
myProducts.getProducts();
myProducts.addProduct("producto prueba", "Este es un producto de prueba", 200, "sin imagen", 25, 12)
myProducts.addProduct("producto prueba2", "Este es un producto de prueba2", 2000, "sin imagen2", 252, 10)
myProducts.getProducts();
myProducts.deleteProductById(1);
myProducts.updateProduct(2, "code", 33)
myProducts.getProducts();
