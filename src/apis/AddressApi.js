import axios from 'axios'
import BaseUrl from './BaseUrl';
import setHeader from '../utilities/Header';

const customHeader = setHeader();

const AddressApi = {

    getUserDefaultAddress: async () => {
      const { data: defaultAddress } = await axios.get(
        `${BaseUrl}/api/address/default`, 
        customHeader
      );
      
      return defaultAddress;
    },

    getAllUserAddresses: async () => {
        const { data: addresses } = await axios.get(
          `${BaseUrl}/api/address/all`, 
          customHeader
        );
        
        return addresses;
      },


    addAddress :  async (event, formData, setAlertBox) => {
        event.preventDefault();
        await axios.post( `${BaseUrl}/api/address/add`, formData, customHeader)
        .then((response) => {
            console.log("Address Upload Response: ", response);
                const {status} = response;
                if (status >= 400 ){
                    setAlertBox({state:true, message:'Something went wrong!!', type:'error'});
                } else {
                    setAlertBox({state:true, message:'Address has been successfully added!', type:'success'});
                }
            }
        );
    },

    deleteAddress: async (id) => {
        let { data: response } = await axios.delete(
          `${BaseUrl}/api/address/delete/${id}`,
          customHeader
        );
        
        return response;
      },

}

export default AddressApi;