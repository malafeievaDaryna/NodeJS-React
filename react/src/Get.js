import { Component } from "react";
import { getProductById } from './graphqlClient';

///for obslete Rest Api requests
///import axios from 'axios'
///axios.defaults.withCredentials = true

class Get extends Component {

    constructor(props){
        super(props)
        this.state = {product: {}, id: {}}
    }

    componentDidMount(){
        console.log("Get app mounted")
    }

    componentDidUpdate(){
        console.log("Get app updated")
    }

    onIdChange = (e) => {
        this.setState({id:e.target.value})
    }

    async getProduct(){

        const id = this.state.id;

        const product = await getProductById(id);
        if(product){
            this.setState({product:product});
        } else {
            console.log(" graphql getProduct failed ");
        }
    }

    /**
     * obslete Rest API functional
     * getProduct(){
        axios.get("http://localhost:8080/api/products/" + this.state.id)
        .then(res=>{
            this.setState({product:res.data})
        })
    }*/

    render(){
        return (
            <div>
              Enter product id:<input onChange={this.onIdChange} />
              <button onClick={this.getProduct.bind(this)}>Get Product</button>
              <br/>
              Name: {this.state.product.name}
              <br/>
              Description: {this.state.product.desc}
              <br/>
              Price: {this.state.product.price}
            </div>
          );
    }
}

export default Get;