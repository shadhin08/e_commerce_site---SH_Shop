import React, { useEffect, useState } from 'react';
import './Shop.css';
import fakeData from '../../data/fakeData';
import Product from '../Products/Product';
import Card from '../Card/Card';
import { addToDatabaseCart, getDatabaseCart } from '../../data/utilities/fakedb';

const Shop = () => {
    const data=fakeData;

    const [products]=useState(data);
    const [card, setCard]=useState([]);

    const [cart, setCart]=useState([]);
    useEffect(()=>
    {
        const savedCard=getDatabaseCart();
        const productKeys=Object.keys(savedCard);

        const cartProducts=productKeys.map(key=>{
            const product=fakeData.find(pd=>pd.key===key);
            product.quantity=savedCard[key];
            return product;
        })
        // console.log(cartProducts);
        setCart(cartProducts);
    }, [])

    const handelAddProduct=(product)=>
    {
        // console.log(product);
        const newCard=[...card, product];
        setCard(newCard);

        const sameProduct=newCard.filter(pd=>pd.key===product.key);
        const count=sameProduct.length;
        addToDatabaseCart(product.key, count);

        const savedCard=getDatabaseCart();
        const productKeys=Object.keys(savedCard);

        const cartProducts=productKeys.map(key=>{
            const product=fakeData.find(pd=>pd.key===key);
            product.quantity=savedCard[key];
            return product;
        })
        // console.log(cartProducts);
        setCart(cartProducts);
    }
    
    // console.log(cart);
    return (
        <div className='shop-container'>
            <div className='product-container'>
                {
                    products.map(product=> <Product button={handelAddProduct} data={product} key={product.key}></Product>)
                }
            </div>
            <div className='card-container'>
                <Card order={cart} reviewOrder="true"></Card>
            </div>
        </div>

        
    );
};

export default Shop;