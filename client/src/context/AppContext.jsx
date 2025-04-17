import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;


export const Appcontext=createContext();

export const AppcontextProvider = ({children}) => {


    const currency=import.meta.env.VITE_CURRENCY;

    const navigate= useNavigate();
    const [user,setUser] = useState(false);
    const [isSeller,setIsSeller] = useState(false);
    const [showUserLogin,setShowUserLogin] = useState(false);
    const [products,setProducts] = useState([]);
    const [cartItems,setCartItems] = useState({});
    const [searchQuery,setSearchQuery] = useState({});



    // fetch seller status 
    const fetchseller = async () => {
        try {
            const {data} = await axios.get('/api/seller/is-auth')
            if(data.success){
                setIsSeller(true);
            }else{
                setIsSeller(false);
            }
        } catch (error) {
            setIsSeller(false);
        }
    }

    // fetch All products
    const fetchProducts = async () => {
        try {
            const {data} = await axios.get('/api/product/list')
            if(data.success){
                setProducts(data.products)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    // fetch User Auth Status, User data and cart items
    const fetchUser = async (req,res) => {
        try {
            const {data } = await axios.get('/api/user/is-auth');
            if(data.success){
                setUser(data.user);
                setCartItems(data.user.cartItems)
            }
        } catch (error) {
            setUser(null)
        }
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
        setCartItems(cartData);
        toast.success("Removed from Cart")
    }

    // Get cart item count
    const getCartCount = () => {
        let totalCount = 0;
        for(const item in cartItems){
            totalCount += cartItems[item];
        }
        return totalCount;
    }

    // get cart total amount
    const getCartAmount = () => {
        let totalAmount = 0;
        for(const items in cartItems){
            let itemInfo = products.find((product) => product._id === items);
            if(cartItems[items] > 0){
                totalAmount += itemInfo.offerPrice * cartItems[items]
            }
        }
        return Math.floor(totalAmount *100) / 100;
    }

    useEffect(() => {
        fetchUser()
        fetchseller()
        fetchProducts()
    },[])

    const value = {navigate,user,setUser,isSeller,setIsSeller
        ,showUserLogin,setShowUserLogin,products,currency,
        cartItems,addToCart,updateCartItem,removeFromCart,
        searchQuery,setSearchQuery,getCartCount,getCartAmount,
        axios,fetchProducts
    }

    return <Appcontext.Provider value={value}>
        {children}
    </Appcontext.Provider>
}

export const useAppContext = () => {
    return useContext(Appcontext)
}