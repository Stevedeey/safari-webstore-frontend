import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import AddressApi from '../../apis/AddressApi';
import DashboardLayout from "../../components/userdashboard/DashboardLayout";
import './AddressBook.scss';

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
  const [data, setdata] = useState([]);
  const [userData, setUserData] = useState([]);
  const [state, dispatch] = React.useReducer(addressReducer, {
    open: false,
    dimmer: undefined,
    size: undefined,
  })
  const { open, dimmer, size } = state

  useEffect(() => {

    (async()=>{
      const result = await AddressApi.getUserDefaultAddress();    
      setdata(result);
      setUserData(result.user);
    })();
   }, [])

  return (
     <DashboardLayout>
       <div className="wrapper">
         <h1 className="title">Address Book</h1>
         {
          
          data != null && data.length !== 0 ? 
            (
              <div className="shell-wrapper">
                <h3 className="shell-title"> Default Shipping Address </h3>
                <p> { userData.firstName } { userData.lastName }</p>
                <p> { data.address } </p>
                <p> { data.city } </p>
                <p> { data.state } </p>
                <p> { data.phone } </p>
                <div className="self-shell">
                  <a href="#">Edit</a>             
                  <a href="#">Delete</a>
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
            Let Google help apps determine location. 
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={() => dispatch({ type: 'CLOSE_MODAL' })}>
              Disagree
            </Button>
            <Button positive onClick={() => dispatch({ type: 'CLOSE_MODAL' })}>
              Agree
            </Button>
          </Modal.Actions>
        </Modal>
       </div>
     </DashboardLayout>
  );
}

export default AddressBook;