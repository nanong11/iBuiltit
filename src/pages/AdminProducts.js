import { Grid, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AdminDashboard from '../components/AdminDashboard'

export default function AdminProducts() {
    const token = localStorage.getItem(`token`)
    const user = useSelector(state => state.user.value)
    const [products, setProducts] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        if(user.isAdmin && token){
          fetch(`https://mysterious-ocean-63835.herokuapp.com/api/products`, {
            headers: {"Authorization": `Bearer ${token}`}
          })
          .then(response => response.json())
          .then(response => setProducts(response))
        }else{
          navigate(`/`)
        }
      }, [user.isAdmin, token, navigate])

    const handleProductEdit = (oldData, newData) => {
        let productName = oldData.row.productName
        let description = oldData.row.description
        let category = oldData.row.category
        let stock = oldData.row.stock
        let price = oldData.row.price
        let isActive = oldData.row.isActive

        switch (oldData.field) {
            case "productName":
                productName = newData.target.value
                break;
            case "description":
                description = newData.target.value
                break;
            case "category":
                category = newData.target.value
                break;
            case "stock":
                stock = newData.target.value
                break;
            case "price":
                price = newData.target.value
                break;
            case "isActive":
                isActive = newData.target.value
                break;
            default:
                break;
        }
        fetch(`http://localhost:3011/api/products/${oldData.id}/update`, {
            method: "PUT",
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
                productName, description, category, stock, price, isActive
            })
        })
        .then(response => response.json())
        .then(response => navigate(`/admin/products`))
    }

    const columns = [
      { field: "_id", headerName: "ProductId", width: 150 },
      { field: "productName", headerName: 'Product Name', width: 300, editable: true },
      { field: "description", headerName: "Description", width: 400, editable: true },
      { field: "category", headerName: 'Category', width: 150, editable: true},
      { field: "stock", headerName: 'Stock', width: 200, editable: true },
      { field: "price", headerName: 'Price', width: 200, editable: true },
      { field: "isActive", headerName: 'isActive', width: 200, editable: true },
      { field: "createdAt", headerName: 'Date Created', width: 200 },
      { field: "updatedAt", headerName: 'Date Updated', width: 200 },
    ];

  return (
    <>
        <AdminDashboard/>
        
        <Grid
        container
        sx={{ height: "100vh", display: "flex", flexDirection: "column"}}
        >
            <Grid
            item
            sx={{ ml: "310px", mr: "10px", mt: "5rem"}}
            >
                <Typography
                variant='h2'
                component="h2"
                sx={{fontSize: "2rem", textAlign: "center"}}
                >
                    DASHBOARD
                </Typography>
            </Grid>

            <Grid
            item
            sx={{ ml: "310px", mr: "10px", mt: "1rem", flexGrow: 1}}
            >
                <DataGrid
                getRowId={(row) => row._id}
                rows={products}
                columns={columns}
                pagination
                experimentalFeatures={{ newEditingApi: true }}
                onCellEditStop={(oldData, newData) => handleProductEdit(oldData, newData)}
                />
            </Grid>
        </Grid>
    </>
  )
}
