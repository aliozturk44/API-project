import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ProductDetails = () =>{

    //We use useParams to pull data from the parent
    const{productid} = useParams();

    const[productdata,productdatachange]=useState({});
    //This function get data for selected id to detail page
    useEffect(()=>{
        fetch("http://localhost:8080/api/item/"+productid).then((res) => {
            return res.json();
        }).then((resp)=>{
            productdatachange(resp)
            productdata.Price = Number(productdata.Price);
            productdata.Quantity = Number(productdata.Quantity);
        }).catch((err)=>{
            console.log(err.message);
        })
           
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    //Return function creates for detail page html and bootstrap code
    return (
        <div className="card" style={{"textAlign":"left"}}>

            <div className="card-title" style={{"textAlign":"center"}}>
                <h2>Product Detail</h2>
            </div>
                            <div className="card-body"></div>
            
            { productdata && 
                <div>                            
                    <h1>The product name is : {productdata.Name} ({productdata.Id})</h1> 
                    <h3>Details</h3>
                    <h5>Product price is : {productdata.Price}</h5>  
                    <h5>Product quantity is : {productdata.Quantity}</h5>
                    <h5>Product status is : {Number(productdata.Status)}</h5>     
                    <Link to={"/"} className="btn btn-danger">Back to listing</Link>                   
                </div>
            }
        </div>    
    );
}


export default ProductDetails;