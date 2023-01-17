import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiEdit } from "react-icons/fi";
import { removeItem,incrementQuantity, decrementQuantity } from "../../store/cartSlice";
import { FaTrash } from "react-icons/fa";

const Cart = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    console.log(cart)
    const totalQuantity = () => {
        let totalQuantity = 0;
        cart.cart.forEach((item) => {
            totalQuantity += item.quantity;
        });
        return totalQuantity;
    };
    const totalPrice = () => {
        let totalPrice = 0;
        cart.cart.forEach((item) => {
            totalPrice += item.rate * item.quantity;
        });
        return totalPrice;
    };

    const deleteItem = ({ id }) => {
        if (window.confirm("Are you sure you want to remove this item?")){
            dispatch(removeItem(id))
        }
    };

    return (
        <div className="container ">
            <h2 className="display-5">My Cart Details</h2>
            <div className="table mt-5">
                <table className="table table-hover">
                    <thead>
                        <tr className="">
                            {/* <th scope="col">#</th> */}
                            <th scope="col">Name</th>
                            <th scope="col">Rate</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Total Price</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {cart.cart.map((item) => {
                            return (
                                <tr key={item.id} className=" ">
                                    {/* <th scope="row">{item.id}</th> */}
                                    <td>
                                        {/* <img src={item.img}  /> */}
                                        {item.name}
                                    </td>
                                    <td>{item.rate}</td>
                                    <td>
                                        <button onClick={() => dispatch(decrementQuantity(item.id))}>-</button>
                                        {item.quantity}
                                        <button onClick={() => dispatch(incrementQuantity(item.id))}>+</button>
                                    </td>
                                    <td>Rs. {item.rate * item.quantity}</td>
                                    <td>
                                        <FaTrash
                                            className="mx-2"
                                            color="red"
                                            cursor="pointer"
                                            size={20}
                                            onClick={() => {
                                                dispatch(removeItem(item.id));
                                            }}
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                    <tfoot>
                        <tr>
                            {/* <th scope="row"></th> */}
                            <th colSpan="2">Grand Total</th>
                            <th scope="row">{totalQuantity()}</th>
                            <th>Rs. {totalPrice()}</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};

export default Cart;
