import React, {useMemo, useEffect, useState} from 'react';
import './AdminProductList.css';
import AdminLayout from "../../components/adminlayout/AdminLayout";
import {Table, SelectColumnFilter} from '../../components/table/Table';
import ProductApi from '../../apis/ProductApi';

const token = localStorage.getItem('token');
const AdminProductList = (props) => {
  const [data, setdata] = useState([]);
  const [id, setId ]= useState("");
  

   useEffect(() => {

    (async()=>{
      const result = await ProductApi.getAllProductsAdmin();   
    
      console.log(result.content, "hiiiiiiiii")
      setdata(result.content);
    })();
   }, [])

   const handleImageChange = (e) => {}

  const columns = useMemo(
    () => [
      {
        Header: 'List of Products',
        columns: [
          {
            Header: 'Product Name',
            accessor: 'name',
          },
          {
            Header: 'Price',
            accessor: 'price',
          },
          {
            Header: 'Category',
            accessor: 'category[0].name',
            
          },
          {
            Header: 'Sub Category',
            accessor: 'subCategory[0].name',
          },
          {
            Header: 'Size',
            accessor: 'sizes[0].size',
          },
          {
            Header: 'Colour',
            accessor: 'colors[0].color',
          },
          // {
          //   Header: '',
          //   accessor: 'edit',
          //   Cell: ({ cell }) => (
          //       <button value={cell.row.values.edit} onClick={props.handleClickGroup}>
          //         Edit
          //          {/* {cell.row.values.name} */}
          //       </button>
          //     )
          // },
          {
            Header: '',
            accessor: 'delete',
            Cell: ({ cell }) => (
              <button value={cell.row.values.delete} onClick={props.handleClickGroup}>
                Delete {cell.row.values.name}
              </button>
            )
          },
        ],
      },
    
    ],
    []
  )

  

  return (
     <AdminLayout>
      <div className="orders-wrapper">
        <Table columns={columns} data={data}/>
      </div>
     </AdminLayout>
  );
}

export default AdminProductList;