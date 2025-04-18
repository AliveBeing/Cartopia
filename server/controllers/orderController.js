import Order from "../models/Order.js";
import Product from "../models/Product.js";



// place order COD : /api/order/cod
export const placeOrderCOD = async (req,res) => {
    try {
        //const {userId, items, address} = req.body;
        const {items, address} = req.body;
        const userId = req.userId;
        if(!address || items.length === 0){
            return res.json({success: false, message: "Invalid data"})
        }
        //Calculate Amount using Items
        let amount = await items.reduce(async (acc,item) => {
            const product = await Product.findById(item.product);
            return (await acc) + product.offerPrice * item.quantity;
        }, 0)

        // Add Tax charge (2%)
        amount += Math.floor(amount * 0.02);

        await Order.create({
            userId,
            items,
            amount,
            address,
            payementType: "COD",
        });

        return res.json({success: true, message: "Order Placed Successfully"})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}

// get orders by user Id : api/order/user
export const getUserOrders = async (req,res) => {
    try {
        //const { userId } = req.body;
        const userId = req.userId;
        const orders = await Order.find({
            userId,
            $or: [{payementType: "COD"},{isPaid: true}]
        }).populate("items.product address").sort({createdAt: -1});
        res.json({success: true, orders});
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}

// Get All orders (for seller / admin) : /api/order/seller
export const getAllOrders = async (req,res) =>{
    try {
        const orders = await Order.find({
            $or: [{payementType: "COD"},{isPaid: true}]
        }).populate("items.product address").sort({createdAt: -1});
        res.json({success: true, orders});
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}