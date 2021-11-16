import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';

const Card = (props) => {
    // console.log(props);
    const len=props.order.length;
    let productPrice=0;
    let shipping=0;
    for(let i=0;i<len;i++)
    {
        productPrice=productPrice + props.order[i].price*props.order[i].quantity;
        shipping=shipping+props.order[i].shipping;
    }
    let vat=0;
    if(productPrice>0)
    {
        vat=productPrice/10;
    }
    
    productPrice=productPrice.toFixed(2);
    productPrice=Number(productPrice);
    shipping=shipping.toFixed(2);
    shipping=Number(shipping);
    vat=vat.toFixed(2);
    vat=Number(vat);

    let total=productPrice+shipping+vat;
    total=total.toFixed(2);
    total=Number(total);

    let order="";
    if(props.placeOrder)
    {
        order="Place Order";
    }
    else if(props.reviewOrder)
    {
        order="Review Order"
    }

    return (
        <div>
            <div className='order-summary'>
                    <h4>Order Summary</h4>
                    <p>Items Orderd: {len}</p>
                </div>
                <div className='bill-section'>
                    <div className='bill-dec'>
                    <p><small>Price:</small></p>
                    <p><small>Shipping:</small></p>
                    <p><small>VAT:</small></p>
                    <h4>Total: </h4>
                    </div>
                    <div className='bill'>
                        <p><small>${productPrice}</small></p>
                        <p><small>${shipping}</small></p>
                        <p><small>${vat}</small></p>
                        <h4>${total}</h4>
                    </div>
                    
                </div>
                <div className='review-button'>
                <Link to="/order">
                    <button className='review-card'>{order}</button>
                </Link>
                </div>
        </div>
    );
};

export default Card;