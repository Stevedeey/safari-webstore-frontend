import axios from "axios";
import BaseUrl from "./BaseUrl";
import setHeader from "../utilities/Header";

const OrderApi = {
  getOrderByUser: async () => {
    const { data: userOrders } = await axios.get(
      `${BaseUrl}/orders/user`,
      setHeader()
    );

    return userOrders;
  },

  adminGetOrderByStatus: async () => {
    const { data: ordersByStatus } = await axios.get(
      `${BaseUrl}/orders/admin/status`,
      setHeader()
    );

    return ordersByStatus;
  },

  placeUserOrders: async (data) => {
    console.log(setHeader());
    return await axios.post(`${BaseUrl}/check-out`, data, setHeader());
  },

  placePaymentOrder: async (data) => {
    return await axios.get(`${BaseUrl}/api/payment/pay/${data}`, setHeader());
  },
};

export default OrderApi;
