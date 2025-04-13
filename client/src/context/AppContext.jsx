import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

export const Appcontext=createContext();

export const AppcontextProvider = ({children}) => {


    const currency=import.meta.env.VITE_CURRENCY;

    const navigate= useNavigate();
    const [user,setUser] = useState(true);
    const [isSeller,setIsSeller] = useState(false);
    const [showUserLogin,setShowUserLogin] = useState(false);
    const [products,setProducts] = useState([]);
    const [cartItems,setCartItems] = useState({});
    const [searchQuery,setSearchQuery] = useState({});

    // fetch All products
    const fetchProducts = async () => {
        setProducts(dummyProducts)
    }

    // Add product to cart
    const addToCart = (itemId) => {
        let cartData = structuredClone(cartItems);

        if(cartData[itemId]){
            cartData[itemId] += 1;
        }else{
            cartData[itemId]=1;
        }
        setCartItems(cartData);
        toast.success("Added to Cart")
    }

    //Update Cart Item Quantity
    const updateCartItem = (itemId,quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId] = quantity;
        setCartItems(cartData)
        toast.success("Cart Updated")
    }

    // Remove Product from Cart
    const removeFromCart = (itemId) => {
        let cartData = structuredClone(cartItems);
        if(cartData[itemId]){
            cartData[itemId] -= 1;
            if(cartData[itemId] === 0){
                delete cartData[itemId];
            }
        }
        toast.success("Removed from Cart")
    }

    useEffect(() => {
        fetchProducts()
    },[])

    const value = {navigate,user,setUser,isSeller,setIsSeller
        ,showUserLogin,setShowUserLogin,products,currency,
        cartItems,addToCart,updateCartItem,removeFromCart,
        searchQuery,setSearchQuery
    }

    return <Appcontext.Provider value={value}>
        {children}
    </Appcontext.Provider>
}

export const useAppContext = () => {
    return useContext(Appcontext)
}