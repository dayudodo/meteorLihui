import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'
import { createContainer } from 'meteor/react-meteor-data';
import { nameTable, Products }  from '/imports/api/products'

 var App = React.createClass({
    // mixins: [ ReactMeteorData ],
    getInitialState(){
      return {
        productName:'',
        barCode:''
      }
    },
    productNameChange(e){
      this.setState({ productName: e.target.value })
    },
    barCodeChange(e){
      this.setState({ barCode: e.target.value })
    },
    render() {
      // console.log('in app')
      // let first = _.first(this.props.lists)
      // console.log( first )
      // console.log(nameTable)
      window.Products = this.props.products
      let keys = _.keys( nameTable )
      let values = _.values( nameTable )
      // console.log(keys)
      const tableHeader = <tr>
                            { values.map((item, index)=>(
                                _.isEmpty(item)?  null: <th key={ 'value'+ index }>{ item[0] } </th>
                              ))
                            }
                          </tr>
      //keys因为是从原始的对应表nameTable中得来的，所以并不会有id这个属性，保存到mongoDb中之后才会有。
      const allLists = this.props.products.map((list)=>(
                          <tr key={list._id}>
                            { keys.map((item, index)=>(
                                <td key={ 'key'+ index }>{ list[item] } </td>
                              ))
                            }
                          </tr>
                        ))
        return <div>
                  商品名称：<input value={this.state.productName} onChange={ this.productNameChange }/>
                  国际条码：<input value={this.state.barCode} onChange={ this.barCodeChange }/>
                  <table className="table table-striped">
                    <thead>
                      { tableHeader }
                    </thead>
                    <tbody>
                      { allLists }
                    </tbody>
                  </table>
              </div>
    }
})
// <Link to="/listpage" >listPage</Link>
App.propTypes= {
    text: PropTypes.string,
    products: PropTypes.array.isRequired
}

export default createContainer(() => {
  Meteor.subscribe('products');
  return {
    products: Products.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
}, App);