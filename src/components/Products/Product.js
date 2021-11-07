import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

const Product = (props) => {
    // console.log(props);
    const {img, name, seller, price, stock}=props.data;
    return (
        <div className='product'>
            <div className='product-img'>
                <img src={img}></img>
            </div>
            <div className='product-dec'>
                <h4 className='product-name'>{name}</h4>
                <p><small>by: {seller}</small></p>
                <h4>${price}</h4>
                <p><small>only {stock} product are available</small></p>
                <button onClick={()=>props.button(props.data)} className='button'><FontAwesomeIcon icon={faShoppingCart} />  Add To Cart</button>
            </div>
        </div>
    );
};

export default Product;