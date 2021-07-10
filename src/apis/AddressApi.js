import axios from 'axios'
import BaseUrl from './BaseUrl';
import setHeader from '../utilities/Header';

const AddressApi = {

    getUserDefaultAddress: async () => {
      const { data: defaultAddress } = await axios.get(
        `${BaseUrl}/api/address/default`, 
    //    setHeader()S
        {
            headers: {
                Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJleHAiOjE2MjY2NTQyNjIsImlhdCI6MTYyNTc5MDI2Mn0._PokXtQcizInYlietSM5JKECB3ai9T0DIVZ3kJJ2HRw`,
            }
        }
      );
      
      return defaultAddress;
    },


}

export default AddressApi;