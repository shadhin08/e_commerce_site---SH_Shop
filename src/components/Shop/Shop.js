import React, { useState } from 'react';
import './Shop.css';
import fakeData from '../../data/fakeData';
import Product from '../Products/Product';
import Card from '../Card/Card';

const Shop = () => {
    const data=fakeData;

    const [products, setProduct]=useState(data);
    const [card, setCard]=useState([]);

    const handelAddProduct=(product)=>
    {
        // console.log(product);
        const newCard=[...card, product];
        setCard(newCard);
    }
    // console.log(products);
    return (
        <div className='shop-container'>
            <div className='product-container'>
                {
                    products.map(product=> <Product button={handelAddProduct} data={product}></Product>)
                }
            </div>
            <div className='card-container'>
                <Card order={card}></Card>
            </div>
        </div>

        
    );
};

export default Shop;