import React, { useState, useEffect } from 'react';
import { Modal } from 'semantic-ui-react';
import AddressApi from '../../apis/AddressApi';
import DashboardLayout from "../../components/userdashboard/DashboardLayout";
import './AddressBook.scss';
import {CheckBox, InputField, Label} from '../../components/form-fields';
import Alert from "../../components/Alert";
import Pagination from './Pagination';

function addressReducer(state, action) {
  switch (action.type) {
    case 'OPEN_MODAL':
      return { open: true, dimmer: action.dimmer, size: action.size  }
    case 'CLOSE_MODAL':
      return { open: false }
    default:
      throw new Error()
  }
}

const AddressBook = (props) => {
  const [defaultAddress, setDefaultAddress] = useState([]);
  const [userAddress, setUserAddress] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [fields, setFields] = useState({
    address: '',
    city: '',
    state: '',
    phone: '',
    isDefaultShippingAddress: false
  });
  const [alertBox, setAlertBox] = useState({state:false, message:'',type:'error'});
  
  const [currentPage, setCurrentPage] = useState(1);
  const [addressesPerPage] = useState(2);
  const indexOfLastAddress = currentPage * addressesPerPage;
  const indexOfFirstAddress = indexOfLastAddress - addressesPerPage;
  const currentAddresses = addresses.slice(indexOfFirstAddress, indexOfLastAddress);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handleChange = (event) => {
      const {name, value, checked} = event.target;
      setFields((fields) => ({...fields, [name]: name !== 'isDefaultShippingAddress' ? value : checked }));
  };

  const handleSubmit = (e) => {
    AddressApi.addAddress(e, fields, setAlertBox);
    setFields({address: '', city: '', state: '', phone: '', isDefaultShippingAddress: false});
  };

  const [state, dispatch] = React.useReducer(addressReducer, {
    open: false,
    dimmer: undefined,
    size: undefined,
  })
  const { open, dimmer, size } = state

  useEffect(() => {
    (async()=>{
      const defaultAddress = await AddressApi.getUserDefaultAddress();    
      setDefaultAddress(defaultAddress);
      setUserAddress(defaultAddress.user);
    })();
   }, [])

   useEffect(() => {
    (async()=>{
      const allAddresses = await AddressApi.getAllUserAddresses();
      const addressesExceptDefault = defaultAddress !== null && defaultAddress.length !== 0 ? allAddresses.filter(address => address.id !== defaultAddress.id) : allAddresses;
      setAddresses(addressesExceptDefault);
    })();
   })

  return (
     <DashboardLayout>
       <div className="wrapper">
         <h1 className="title">Address Book</h1>
         {
          
          defaultAddress != null && defaultAddress.length !== 0 ? 
            (
              <div className="shell-wrapper">
                <h3 className="shell-title"> Default Shipping Address </h3>
                <p> { userAddress.firstName } { userAddress.lastName }</p>
                <p> { defaultAddress.address } </p>
                <p> { defaultAddress.city }, { defaultAddress.state } </p>
                <p> { defaultAddress.phone } </p>
                <div className="self-shell">
                  {/* <a style={{color:"#ED165F"}} href="#">Edit</a>               */}
                  <a style={{color:"#ED165F"}} href="http://localhost:3000/account/addressbook" onClick={(e) => AddressApi.deleteAddress(defaultAddress.id)}>Delete</a>
                </div>
              </div>        
            )
           :
           (<div className="shell-wrapper">
              <h3>DEFAULT ADDRESS NOT FOUND!</h3>
            </div>)
         }
         <button className="btn-address" onClick={() => dispatch({ type: 'OPEN_MODAL', dimmer: 'inverted', size: 'tiny' })}>ADD NEW ADDRESS</button>
         
         
         <Modal
          size={size}
          dimmer={dimmer}
          open={open}
          onClose={() => dispatch({ type: 'CLOSE_MODAL' })}>
          <Modal.Header>ADD NEW ADDRESS</Modal.Header>
          <Modal.Content>
          {alertBox.state && <Alert text={alertBox.message} variant={alertBox.type}/>}
          <form method='POST' onSubmit={handleSubmit}>
              <Label elementId='address' text='Address'/>
              <InputField
                  type='text'
                  value={fields.address}
                  placeholder=''
                  id='address'
                  name='address'
                  changeHandler={handleChange}
              />
              <Label elementId='city' text='City'/>
              <InputField
                  type='text'
                  value={fields.city}
                  placeholder=''
                  id='city'
                  name='city'
                  changeHandler={handleChange}
              />


              <Label elementId='state' text='State'/>
              <InputField
                  type='text'
                  value={fields.state}
                  placeholder=''
                  id='state'
                  name='state'
                  changeHandler={handleChange}
              />

              <Label elementId='phone' text='Phone Number'/>
              <InputField
                  type='text'
                  value={fields.phone}
                  placeholder=''
                  name='phone'
                  id='phone'
                  changeHandler={handleChange}
              />

              <CheckBox name='isDefaultShippingAddress' id='isDefaultShippingAddress' checked={fields.isDefaultShippingAddress} changeHandler={handleChange}/>
              <Label elementId='isDefaultShippingAddress' text='Default Shipping Address'/>
              <div>
                <button className='btn-address' type='submit' >SUBMIT</button>
              </div>
              
          </form>
          </Modal.Content>
        </Modal>
        
          {
            currentAddresses.map(address => 
              <div className="shell-wrapper">
                <h3 className="shell-title"> Shipping Address </h3>
                <p> { address.user.firstName } { address.user.lastName }</p>
                <p> { address.address } </p>
                <p> { address.city }, { address.state } </p>
                <p> { address.phone } </p>
                <div className="self-shell">
                  {/* <a style={{color:"#ED165F"}} href="#">Edit</a>              */}
                  <a style={{color:"#ED165F"}} href="http://localhost:3000/account/addressbook" onClick={(e) => AddressApi.deleteAddress(address.id)}>Delete</a>
                </div>
              </div>
            )
          }
          <Pagination itemsPerPage = {addressesPerPage} totalPages={addresses.length} paginate={paginate} currentPage={currentPage} />
        
       </div>
     </DashboardLayout>
  );
}

export default AddressBook;