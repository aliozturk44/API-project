/* eslint-disable no-const-assign */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {useEffect, useState} from "react"
import {Link, useNavigate} from 'react-router-dom'
const ProductListing = () => {
    const[productdata,productdatachange]=useState(null);
    const navigate = useNavigate();


    const LoadDetail =(id)=>{
        navigate("/product/detail/"+id);
    }

    const LoadEdit =(id)=>{
        navigate("/product/edit/"+id)
    }

    //Delete function from endpoint. It send delete request to endpoint
    const RemoveFunction =(id)=>{
        
       
        if(window.confirm("Do you want to remove?")){
            fetch("http://localhost:8080/api/DeleteItem/"+id,{
            method: "DELETE",
            body: JSON.stringify({})
        }).then((res)=>{
            alert('Removed succesfully.')
            window.location.reload();
        }).catch((err =>{
            console.log(err.message)
        }))
        }
    }

    //this useEffect function get all datas from endpoint to home page
    useEffect(()=>{
        fetch("http://localhost:8080/api/items").then((res) => {
            return res.json();
        }).then((resp)=>{
            productdatachange(resp)
            
        }).catch((err)=>{
            console.log(err.message);
        })
           
    },[])
    return (
        <div className="container">
            <div className="card">
                <div className="card-title">
                    <h2>Product Listing</h2>
                </div>

                <div className="card-body" >
                    <div className="divbtn">
                        <Link to={"product/create"} className="btn btn-success bosluk">Add New (+)</Link>
                    </div>
                    <table className="table table-bordered bg-dark">
                        
                            <thead className="table-dark text-white">
                            <tr>
                                <td>ID</td>
                                <td>Name</td>
                                <td>Price</td>
                                <td>Quantity</td>
                                <td>Status</td>
                                <td>Action</td>
                            </tr>

                        </thead>
                        <tbody>
                        {
                        productdata &&
                        productdata.map(item=>(
                                <tr key={item.Id}>
                                    <td>{item.Id}</td>
                                    <td>{item.Name}</td>
                                    <td>{item.Price}</td>
                                    <td>{item.Quantity}</td>
                                    <td>{Number(item.Status)}</td>
                                    <td><a onClick={()=>{LoadEdit(item.Id)}} className="btn btn-success">Edit</a>
                                        <a onClick={()=>{RemoveFunction(item.Id)}} className="btn btn-danger">Remove</a>
                                        <a onClick={()=>{LoadDetail(item.Id)}} className="btn btn-primary">Details</a>
                                    </td>
                                </tr>
                            ))}
                            
                        </tbody>
                       
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ProductListing;