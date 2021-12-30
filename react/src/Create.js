import { Component } from "react";
import axios from 'axios'
import gql from 'graphql-tag'

axios.defaults.withCredentials = true

class Create extends Component {

    constructor(props){
        super(props)
        this.state = {name: {}, desc: {}, price: {}}
    }

    componentDidMount(){
        console.log("Create app mounted")
    }

    componentDidUpdate(){
        console.log("Create app updated")
    }

    onNameChange = (e) => {
        this.setState({name:e.target.value})
    }

    onDescChange = (e) => {
        this.setState({desc:e.target.value})
    }

    onPriceChange = (e) => {
        this.setState({price:e.target.value})
    }

    async createProduct(){
        const mutation = gql`
        mutation CreateProduct($input: CreateProductInput){
           result: createProduct(input: $input) 
        }`;

        const id = this.state.id;

        if(typeof this.props.apolloClient === 'undefined'){
            console.error("error : no graphql client")
        } else {
            const {data: {result}} = await this.props.apolloClient.mutate({mutation, variables: { 
                input : {
                   name: this.state.name,
                   desc: this.state.desc,
                   price: parseFloat(this.state.price)
                }
            }});
        }
    }

    /**
    * obslete Rest API functional
    createProduct(){
        axios.post("http://localhost:8080/api/products/",
        {
            name: this.state.name,
            desc: this.state.desc,
            price: this.state.price
        })
        .then(res=>{
            console.log(res.data)
        })
    }
    */

    render(){
        return (
            <div>
              Name: <input onChange={this.onNameChange} />
              <br/>
              Description: <input onChange={this.onDescChange} />
              <br/>
              Price: <input onChange={this.onPriceChange} />
              <br/>
              <button onClick={this.createProduct.bind(this)}>Create Product</button>
              <br/>
            </div>
          );
    }
}

export default Create;