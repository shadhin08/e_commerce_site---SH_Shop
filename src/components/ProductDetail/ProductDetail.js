import React from 'react';
import { useLocation } from 'react-router-dom';
import fakeData from '../../data/fakeData';

const ProductDetail = (props) => {
    const locetion = useLocation();
    const path = locetion.pathname;
    const productKey =path.substr(9);
    
    const data = fakeData;

    const orderDetail = data.find(pd=>pd.key===productKey);
    // console.log( orderDetail );

    const {img, name, seller, price, stock}=orderDetail;
    const productFeatures=orderDetail.features;
    // console.log(productFeatures);

    let fet;
    if(productFeatures.length>0)
    {
        fet="Features......";
    }
    else
    {
        fet="";
    }
    return (
        <div className='product'>
            <div className='product-img'>
                <img src={img} alt=''></img>
            </div>
            <div className='product-dec'>
                <h4 className='product-name'>{name}</h4>
                <p><small>by: {seller}</small></p>
                <h4>${price}</h4>
                <p><small>only {stock} product are available</small></p>
                <h5>{fet}</h5>
                <ul>
                {
                    productFeatures.map(feature=> <li>{feature.description}: {feature.value}</li>)
                }
                </ul>
            </div>
        </div>
    );
};

export default ProductDetail;