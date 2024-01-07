package models

import (
	"hello/config"
	"hello/entities"
	"strconv"
)

type ProductModel struct {
}

// Find all datas in database
func (*ProductModel) FindAll() ([]entities.Product, error) {

	db, err := config.GetDB()
	if err != nil {
		return nil, err

	} else {
		rows, err2 := db.Query("select * from product")
		if err2 != nil {
			return nil, err
		} else {
			var products []entities.Product
			for rows.Next() {
				var product entities.Product
				rows.Scan(&product.Id, &product.Name, &product.Price,
					&product.Quantity, &product.Status)
				products = append(products, product)
			}

			return products, nil
		}
	}

}

// Serarch products according to entered min and max price valu, Actually ı don't need this function
// but ı wondere something and ı tried it.
func (*ProductModel) Search(min, max float64) ([]entities.Product, error) {

	db, err := config.GetDB()
	if err != nil {
		return nil, err

	} else {
		rows, err2 := db.Query("select * from product where price >= ? and price <= ?", min, max)
		if err2 != nil {
			return nil, err2
		} else {
			var products []entities.Product
			for rows.Next() {
				var product entities.Product
				rows.Scan(&product.Id, &product.Name, &product.Price,
					&product.Quantity, &product.Status)
				products = append(products, product)
			}
			return products, nil
		}
	}
}

// Find product according to id
func (*ProductModel) Find(id int64) (entities.Product, error) {

	db, err := config.GetDB()
	if err != nil {
		return entities.Product{}, err

	} else {
		rows, err2 := db.Query("select * from product where id = ?", id)
		if err2 != nil {
			return entities.Product{}, err2
		} else {
			var product entities.Product
			for rows.Next() {
				rows.Scan(&product.Id, &product.Name, &product.Price,
					&product.Quantity, &product.Status)
			}
			return product, nil
		}
	}
}

//Actually ı didn't need Find2 function. Because ı could't understand route structure but I understood it.
//But ı didn't delete this function. Also ı used Find2 to in GetElementById function.

func (*ProductModel) Find2(id string) (entities.Product, error) {

	k, _ := strconv.Atoi(id)

	db, err := config.GetDB()
	if err != nil {
		return entities.Product{}, err

	} else {
		rows, err2 := db.Query("select * from product where id = ?", k)
		if err2 != nil {
			return entities.Product{}, err2
		} else {
			var product entities.Product
			for rows.Next() {
				rows.Scan(&product.Id, &product.Name, &product.Price,
					&product.Quantity, &product.Status)
			}
			return product, nil
		}
	}
}

// Create product in database
func (*ProductModel) Create(product *entities.Product) bool {

	db, err := config.GetDB()
	if err != nil {
		return false
	}

	//Add sql query to database
	result, erra := db.Exec("insert into product(name, price, quantity, status) values(?, ?, ?, ?)",
		product.Name, product.Price, product.Quantity, product.Status)

	if erra != nil {
		return false
	}
	lastId, _ := result.LastInsertId()
	product.Id = lastId
	rowsAffected, err2 := result.RowsAffected()
	if err2 != nil {
		return false
	}
	return rowsAffected > 0
}

// Delete from database
func (*ProductModel) Delete(id int64) bool {

	db, err := config.GetDB()
	if err != nil {
		return false
	}

	result, erra := db.Exec("Delete from product where id = ?", id)

	if erra != nil {
		return false
	}
	rowsAffected, err2 := result.RowsAffected()
	if err2 != nil {
		return false
	}
	return rowsAffected > 0
}

// Update from database
func (*ProductModel) Update(product entities.Product) bool {

	db, err := config.GetDB()
	if err != nil {
		return false
	}

	//Update sql query from database
	result, erra := db.Exec("update product set name = ?, price = ?, quantity = ?, status = ? where id = ?",
		product.Name, product.Price, product.Quantity, product.Status, product.Id)

	if erra != nil {
		return false
	}
	rowsAffected, err2 := result.RowsAffected()
	if err2 != nil {
		return false
	}
	return rowsAffected > 0
}
