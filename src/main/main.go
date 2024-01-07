package main

// İmport libraries
import (
	"encoding/json"
	"fmt"
	"hello/entities"
	"hello/models"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

// Get all datas in database
func GetAllItems(w http.ResponseWriter, r *http.Request) {

	var productModel models.ProductModel
	products, err := productModel.FindAll()
	if err != nil {
		fmt.Println(err)
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(products)

}

// Get the product with the specified id

func GetElementById(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	vars := mux.Vars(r)
	id := vars["id"]

	var productModel models.ProductModel

	product, _ := productModel.Find2(id)

	json.NewEncoder(w).Encode(product)

}

// Create new product in database
func CreateItem(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var productModel models.ProductModel
	var NewProduct entities.Product
	if err := json.NewDecoder(r.Body).Decode(&NewProduct); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	product := entities.Product{
		Name:     NewProduct.Name,
		Price:    NewProduct.Price,
		Quantity: NewProduct.Quantity,
		Status:   NewProduct.Status,
	}
	productModel.Create(&product)
	json.NewEncoder(w).Encode(product)
}

// Update product in database with the specified id.
func UpdateItem(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	vars := mux.Vars(r)
	id := vars["id"]

	k, _ := strconv.Atoi(id)
	var productModel models.ProductModel
	var NewProduct entities.Product
	if err := json.NewDecoder(r.Body).Decode(&NewProduct); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	//Find product according to id
	product, _ := productModel.Find(int64(k))
	product.Name = NewProduct.Name
	product.Price = NewProduct.Price
	product.Quantity = NewProduct.Quantity
	product.Status = NewProduct.Status
	productModel.Update(product)
	json.NewEncoder(w).Encode(product)
}

// Delete the product in database with the specified id.
func DeleteItem(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	//Select id from URL
	vars := mux.Vars(r)
	id := vars["id"]

	//Convert the id to integer type
	k, _ := strconv.Atoi(id)

	//Create product model and a new product
	var productModel models.ProductModel
	var NewProduct entities.Product
	if err := json.NewDecoder(r.Body).Decode(&NewProduct); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	product := entities.Product{
		Id: int64(k),
	}
	productModel.Delete(int64(k))
	json.NewEncoder(w).Encode(product)
}

func main() {
	r := mux.NewRouter()

	// Define API endpoints
	r.HandleFunc("/api/items", GetAllItems).Methods("GET")
	r.HandleFunc("/api/item/{id}", GetElementById).Methods("GET")
	r.HandleFunc("/api/CreateItem", CreateItem).Methods("POST")
	r.HandleFunc("/api/DeleteItem/{id}", DeleteItem).Methods("DELETE")
	r.HandleFunc("/api/UpdateItem/{id}", UpdateItem).Methods("PUT")

	// Allow access to API from different ports
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowCredentials: true,
		AllowedMethods:   []string{"DELETE", "GET", "POST", "PUT"},
	})

	handler := c.Handler(r)
	// Start to presenter at port 8080
	if err := http.ListenAndServe(":8080", (handler)); err != nil {
		fmt.Println("Sunucu Başlatma Hatası:", err)
	}

}
