
import { createContext,useContext, useRef } from 'react'
//import Total from './Total';

const products = [   
    
    {
        id: 1,
        title: "iPhone 9",
        description: "An apple mobile which is nothing like apple",
        price: 549,
        discountPercentage: 12.96,
        rating: 4.69,
        stock: 94,
        brand: "Apple",
        category: "smartphones",
        thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
        images: [
            "https://i.dummyjson.com/data/products/1/1.jpg",
            "https://i.dummyjson.com/data/products/1/2.jpg",
            "https://i.dummyjson.com/data/products/1/3.jpg",
            "https://i.dummyjson.com/data/products/1/4.jpg",
            "https://i.dummyjson.com/data/products/1/thumbnail.jpg"
        ]
    },
    {
        id: 2,
        title: "iPhone X",
        description: "SIM-Free, Model A19211 6.5-inch",
        price: 899,
        discountPercentage: 17.94,
        rating: 4.44,
        stock: 34,
        brand: "Apple",
        category: "smartphones",
        thumbnail: "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
        images: [
            "https://i.dummyjson.com/data/products/2/1.jpg",
            "https://i.dummyjson.com/data/products/2/2.jpg",
            "https://i.dummyjson.com/data/products/2/3.jpg",
            "https://i.dummyjson.com/data/products/2/thumbnail.jpg"
        ]
    },
    {
        id: 3,
        title: "Samsung Universe 9",
        description: "Samsung's new variant",
        price: 1249,
        discountPercentage: 15.46,
        rating: 4.09,
        stock: 36,
        brand: "Samsung",
        category: "smartphones",
        thumbnail: "https://i.dummyjson.com/data/products/3/thumbnail.jpg",
        images: [
            "https://i.dummyjson.com/data/products/3/1.jpg"
        ]
    },
    {
        id: 4,
        title: "OPPOF19",
        description: "OPPO F19 is officially announced on April.",
        price: 280,
        discountPercentage: 17.91,
        rating: 4.3,
        stock: 123,
        brand: "OPPO",
        category: "smartphones",
        thumbnail: "https://i.dummyjson.com/data/products/4/thumbnail.jpg",
        images: [
            "https://i.dummyjson.com/data/products/4/1.jpg",
            "https://i.dummyjson.com/data/products/4/2.jpg",
            "https://i.dummyjson.com/data/products/4/3.jpg",
            "https://i.dummyjson.com/data/products/4/4.jpg",
            "https://i.dummyjson.com/data/products/4/thumbnail.jpg"
        ]
    },
    {
        id: 5,
        title: "Huawei P30",
        description: "Huawei’s re-badged P30 Pro New Edition",
        price: 499,
        discountPercentage: 10.58,
        rating: 4.09,
        stock: 32,
        brand: "Huawei",
        category: "smartphones",
        thumbnail: "https://i.dummyjson.com/data/products/5/thumbnail.jpg",
        images: [
            "https://i.dummyjson.com/data/products/5/1.jpg",
            "https://i.dummyjson.com/data/products/5/2.jpg",
            "https://i.dummyjson.com/data/products/5/3.jpg"
        ]
    }

]
const TotalQuantityContext = createContext()
const TotalPriceContext = createContext()

export function PerProduct({product,setQuantity,setTotalQuantityContext,quantity,totalQuantity,totalPrice,setTotalPrice}){

    const priceRef = useRef()

        const quantityHandler =(e)=>{
            setQuantity(e.target.value);
            setTotalQuantityContext(totalQuantity+Number(e.target.value))
          //  console.log("price value is ", priceRef.current.innerHTML.slice(1))
            setTotalPrice(totalPrice+Number(priceRef.current.innerHTML.slice(1)))
            
        }

        // console.log("quantity from cart page is ",quantity)
        // console.log("quantity context from cart page is ",totalQuantity)
        // console.log("Total price",totalPrice)
    return(
   
        <div className = "cart-container">
            <div className="product-container">
                <div className="product-container-left">
                    <div>
                    <img src={product.thumbnail} ></img>
                    </div>
                    <div>
                    <h2>{product.title}</h2>
                    <h3>{product.description}</h3>
                    <h4>{product.brand}</h4>
                    <h5>{product.category}</h5>
                    </div>
                </div>   
                <div className="product-container-right">
                <div>
                {/* onChange={(e)=>{quantityHandler(e)}} */}
                <select  onChange={(e)=>{quantityHandler(e)}} >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                </select>
            </div>  
            <div>      
                <span ref={priceRef}>${product.price*quantity} </span>
            </div> 
                    </div>                        
            </div>
            
            <hr></hr>
            <div className="subtotal-container">
                <div className="subtotal-container-left">

                <div style={{color:"gray", fontSize:"10px"}}>SUBTOTAL:</div>
                <div style={{color:"gray", fontSize:"10px"}}>SHIPPING:</div>
                </div>

                <div  className="subtotal-container-right">
                <div>${product.price*quantity}</div>
                <div>FREE</div>
                </div>
            </div>
            <hr></hr>

        </div>
       
    );
}



function CartComponent({quantity,setQuantity,totalQuantity,setTotalQuantityContext,totalPrice,setTotalPrice}){
 

    return(
        <TotalQuantityContext.Provider value={totalQuantity}>
        <TotalPriceContext.Provider value={totalPrice}>
        <div>
          {products.map((pd, index) => (
          <PerProduct key={index} product={pd} setQuantity ={setQuantity} setTotalQuantityContext ={setTotalQuantityContext} quantity={quantity} totalQuantity={totalQuantity} totalPrice={totalPrice}setTotalPrice={setTotalPrice} />  ))}
          <Total />
          </div>
          </TotalPriceContext.Provider>
     </TotalQuantityContext.Provider>
    )

}



export const useGlobalContext = () => {
    return useContext(TotalQuantityContext)
}

export const useGlobalContextPrice = () => {
    return useContext(TotalPriceContext)
}



export function Total(){

    const totalQuantity = useGlobalContext();

  //  console.log("totalQuantity is ",totalQuantity)

    const totalPrice = useGlobalContextPrice();

  //  console.log("totalPrice is ",totalPrice)


    return(

        <div className="total-container">
        <div className="total-container-left">

        <div>TOTAL:</div>
        <div></div>
        </div>
        <div  className="total-container-right">
       
        <div>Total Quantity:{totalQuantity}</div>
        <div>Total Price: ${totalPrice}</div>
        </div>
    </div>
    );
}

export default CartComponent;