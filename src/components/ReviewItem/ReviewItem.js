import React from 'react';
import { Link } from 'react-router-dom';

const ReviewItem = (props) => {
    // console.log(props)
    const {img, name, seller, price, stock, quantity, key}=props.product
    return (
        <div className='product'>
            <div className='product-img'>
                <img src={img} alt=''></img>
            </div>
            <div className='product-dec'>
                <h4 className='product-name'><Link to={"/product/"+key}>{name}</Link></h4>
                <p><small>by: {seller}</small></p>
                <h4>${price}</h4>
                <p><small>only {stock} product are available</small></p>
                <h6>Quantity: {quantity}</h6>
                <button onClick={()=> props.button(props.product.key)} className='button'>Remove</button>
            </div>
        </div>
    );
};

export default ReviewItem;