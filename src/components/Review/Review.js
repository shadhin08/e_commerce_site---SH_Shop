import React, { useEffect, useState } from 'react';
import fakeData from '../../data/fakeData';
import { getDatabaseCart, removeFromDatabaseCart } from '../../data/utilities/fakedb';
import Card from '../Card/Card';
import ReviewItem from '../ReviewItem/ReviewItem';

const Review = () => {

    const [cart, setCart]=useState([]);
    useEffect(()=>
    {
        const savedCard=getDatabaseCart();
        // console.log(savedCard);
        const productKeys=Object.keys(savedCard);
        // const productCount=Object.values(savedCard);
        // console.log(productKeys);
        // console.log(productCount);

        const cartProducts=productKeys.map(key=>{
            const product=fakeData.find(pd=>pd.key===key);
            product.quantity=savedCard[key];
            return product;
        })
        // console.log(cartProducts);
        setCart(cartProducts);
    }, [])
    const handleRemoveProduct=(key)=>
    {
        // console.log(key);
        removeFromDatabaseCart(key);
        const newCart=getDatabaseCart();
        const newCartKey=Object.keys(newCart);

        // console.log(newCartKey);
        const newProducts=newCartKey.map(key=> {
            const product=fakeData.find(pd=>pd.key===key);
            return product;
        })
        // console.log(newProducts);
        setCart(newProducts);
    }


    // console.log(cart);
    return (
        <div className='shop-container'>
            <div className='product-container'>
                {
                    cart.map(pd=><ReviewItem product={pd} button={handleRemoveProduct} key={pd.key}></ReviewItem>)
                }
            </div>
            <div className='card-container'>
                <Card order={cart} placeOrder="true"></Card>    
            </div>
        </div>
    );
};

export default Review;