/* eslint-disable eqeqeq */
import { useState } from 'react';
import {Link ,useNavigate} from 'react-router-dom'


const ProductCreate = () =>{

    // eslint-disable-next-line no-unused-vars
    const[Id,idchange]=useState("");
    const[Name,namechange]=useState("");
    const[Price,pricechange]=useState("");
    const[Quantity,quantitychange]=useState("");
    const[Status,statuschange]=useState(true);  
    const[validation,valchange]=useState(false);   
    const[validation1,val1change]=useState(false); 
    const[validation2,val2change]=useState(false);  
    
    //redirect
    const navigate = useNavigate();


    //This function works when create page was submit. And it makes PUT request to endpoint
    const handlesubmit = (e) => {

        e.preventDefault();
        const productdata = {Name,Price,Quantity,Status};
        productdata.Price = Number(productdata.Price);
        productdata.Quantity = Number(productdata.Quantity);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        
        
        fetch("http://localhost:8080/api/CreateItem",{
            method: "POST",
            headers: {"content-type":"application/json"},
            body: JSON.stringify(productdata)
        }).then((res)=>{
            alert('Saved succesfully.')
            navigate('/');
        }).catch((err =>{
            console.log(err.message)
        }))

    }
    
    //Return function creates for create page html and bootstrap code
    return (
        <div>
            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <form className="container" onSubmit={handlesubmit}>

                        <div className="card" style={{"textAlign":"left"}}>

                            <div className="card-title" style={{"textAlign":"center"}}>
                                <h2>Product create</h2>
                            </div>
                            <div className="card-body">
                                <div className="row">

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Id</label>
                                            <input value={Id} disabled={"disabled"} className="form-control"></input>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Name</label>
                                            <input required value={Name} onMouseDown={e=>valchange(true)} onChange={e=>namechange(e.target.value)} className="form-control"></input>
                                            {Name.length == 0 && validation && <span className="text-danger">Enter the name</span>}
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Price</label>
                                            <input required value={Price} onMouseDown={e=>val1change(true)} onChange={e=>pricechange(e.target.value)} className="form-control"></input>
                                            {Price.length == 0 && validation1 && <span className="text-danger">Enter the name</span>}
                                        </div>
                                    </div>
                                        

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Quantity</label>
                                            <input required value={Quantity} onMouseDown={e=>val2change(true)} onChange={e=>quantitychange(e.target.value)} className="form-control"></input>
                                            {Quantity.length == 0 && validation2 && <span className="text-danger">Enter the name</span>}
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-check">
                                            <input checked={Status} onChange={e=>statuschange(e.target.checked)} type='checkbox' className="form-check-input"></input>
                                            <label className='form-check-label'>Status</label>
                                                
                                        </div>
                                    </div>
                                        
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <button className="btn btn-success mt-2" type="submit">Save</button>
                                            <Link to="/" className="btn btn-danger mt-2">Back</Link>
                                        </div>
                                    </div>
                                        
                                    
                                </div>

                            </div>

                        </div>

                    </form>

                </div>

            </div>
        </div>
    );
}


export default ProductCreate;