import axios from 'axios'
import BaseUrl from './BaseUrl';
import setHeader from '../utilities/Header';

const OrderApi = {

    getOrdersByUser: async () => {
      const { data: userOrders } = await axios.get(
        `${BaseUrl}/api/orders/user`, 
       setHeader()
      );
      
      return userOrders;
    },

    adminGetAllOrders: async () => {

        const { data: allOrders } = await axios.get(
          `${BaseUrl}/api/orders/admin`,
          setHeader()
        );
        
        return allOrders;
      },

}

export default OrderApi;