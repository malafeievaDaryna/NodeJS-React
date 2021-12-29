import { Component } from "react";
import axios from 'axios'
import gql from 'graphql-tag'

axios.defaults.withCredentials = true

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
        const query = gql`
        query GetProductById($id: ID)
        { 
            getProductById(id: $id){
                price, name, desc
                }
        }`;

        const id = this.state.id;

        if(typeof this.props.apolloClient === 'undefined'){
            console.error("error : no graphql client")
        } else {
            const {data: {getProductById}} = await this.props.apolloClient.query({query, variables: {id}});
            this.setState({product:getProductById})
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