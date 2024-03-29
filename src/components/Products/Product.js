import React from 'react';
import './Product.css';
import { Link } from 'react-router-dom';

const Product = (props) => {
    const {img, name, seller, price, stock, key}=props.data;
    // console.log(key);
    return (
        <div className='product'>
            <div className='product-img'>
                <img src={img} alt=''></img>
            </div>
            <div className='product-dec'>
                <h4 className='product-name'> <Link to={"/product/"+key}>{name}</Link></h4>
                <p><small>by: {seller}</small></p>
                <h4>${price}</h4>
                <p><small>only {stock} product are available</small></p>
                <button onClick={()=>props.button(props.data)} className='button'>  Add To Cart</button>
            </div>
        </div>
    );
};

export default Product;