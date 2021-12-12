import { Component } from "react";
import axios from 'axios'

axios.defaults.withCredentials = true

class GetAll extends Component {

    constructor(props){
        super(props)
        this.state = {products: []}
    }

    componentDidMount(){
        console.log("GetAll app mounted")
        axios.get("http://localhost:8080/api/products/")
        .then(res=>{
            console.log("GetAll ", res.data)
            this.setState({products:res.data})
        }).catch(err=>{
            console.error("error ", err)
        })
    }

    componentDidUpdate(){
        console.log("GetAll app updated")
    }

    render(){
        return (
            <div>
              <h3> Products: </h3>
              <br/>
              {this.state.products.map(product=>(
              [<h5>Product {product.name}</h5>,
              <ul> 
                   <li> product id: {product.id} </li>
                   <li> desc: {product.desc} </li>
                   <li> price: {product.price} </li>
              </ul>]))}
            </div>
          );
    }
}

export default GetAll;