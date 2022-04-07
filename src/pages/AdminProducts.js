import { Button, Dialog, FormControl, Grid, IconButton, Paper, Snackbar, TextField, Typography } from '@mui/material'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AdminDashboard from '../components/AdminDashboard'
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { makeStyles } from '@material-ui/styles';
import CloseIcon from '@mui/icons-material/Close';

const useStyles = makeStyles({
  form: {
      padding: "2rem",
      display: "flex",
      flexDirection: "column",
      gap: "1rem"
  },
})

export default function AdminProducts() {
    const classes = useStyles()
    const token = localStorage.getItem(`token`)
    const user = useSelector(state => state.user.value)
    const [products, setProducts] = useState([])
    const [openAddProudctDialog, setOpenAddProudctDialog] = useState(false)
    const navigate = useNavigate()

    const [productName, setProductName] = useState("")
    const [productNameFocused, setProductNameFocused] = useState(false)

    const [productImg, setProductImg] = useState("")
    const [productImgFocused, setProductImgFocused] = useState(false)

    const [description, setDescription] = useState("")
    const [descriptionFocused, setDescriptionFocused] = useState(false)

    const [category, setCategory] = useState("")
    const [categoryFocused, setCategoryFocused] = useState(false)

    const [price, setPrice] = useState(0)
    const [priceFocused, setPriceFocused] = useState(false)

    const [stock, setStock] = useState(0)
    const [stockFocused, setStockFocused] = useState(false)

    const [isSaveBtnDisabled, setIsSaveBtnDisabled] = useState(true)
    const [productNotif, setProductNotif] = useState(false)
    const [snackBarMessage, setSnackBarMessage] = useState("")

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

    useEffect(() => {
      if(productName.length > 0){
        setProductNameFocused(true)
      }else{
        setProductNameFocused(false)
      }
      if(productImg.length > 0){
        setProductImgFocused(true)
      }else{
        setProductImgFocused(false)
      }
      if(description.length > 0){
        setDescriptionFocused(true)
      }else{
        setDescriptionFocused(false)
      }
      if(category.length > 0){
        setCategoryFocused(true)
      }else{
        setCategoryFocused(false)
      }
      if(stock.length > 0){
        setStockFocused(true)
      }else{
        setStockFocused(false)
      }
      if(price.length > 0){
        setPriceFocused(true)
      }else{
        setPriceFocused(false)
      }
    }, [productName.length, productImg.length, description.length, category.length, stock.length, price.length])

    useEffect(() => {
      if(productNameFocused && productImgFocused && descriptionFocused && categoryFocused && priceFocused && stockFocused && price){
        setIsSaveBtnDisabled(false)
      }else{
        setIsSaveBtnDisabled(true)
      }
    }, [productNameFocused, productImgFocused, descriptionFocused, categoryFocused, priceFocused, stockFocused, price])

    const handleProductEdit = (oldData, newData) => {
        let productName = oldData.row.productName
        let productImg = oldData.row.productImg
        let description = oldData.row.description
        let category = oldData.row.category
        let stock = oldData.row.stock
        let price = oldData.row.price
        let isActive = oldData.row.isActive

        switch (oldData.field) {
            case "productName":
                productName = newData.target.value
                break;
            case "productImg":
                productImg = newData.target.value
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
        fetch(`https://mysterious-ocean-63835.herokuapp.com/api/products/${oldData.id}/update`, {
            method: "PUT",
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
                productName, productImg, description, category, stock, price, isActive
            })
        })
        .then(response => response.json())
        .then(response => {
          if(response){
            fetch(`https://mysterious-ocean-63835.herokuapp.com/api/products`, {
              headers: {"Authorization": `Bearer ${token}`}
              })
              .then(response => response.json())
              .then(response => {
                if(response){
                  setProducts(response)
                  setProductNotif(true)
                  setSnackBarMessage("Product Edited")
                  setOpenAddProudctDialog(false)
                  navigate(`/admin/products`)
                }
              })
          }
        })
    }

    const handleDeleteClick = (id) => {
        fetch(`https://mysterious-ocean-63835.herokuapp.com/api/products/${id}/delete`, {
            method: "DELETE",
            headers: {"Authorization": `Bearer ${token}`},
        })
        .then(response => response.json())
        .then(response => {
          if(response){
            fetch(`https://mysterious-ocean-63835.herokuapp.com/api/products`, {
              headers: {"Authorization": `Bearer ${token}`}
              })
              .then(response => response.json())
              .then(response => {
                if(response){
                  setProducts(response)
                  setProductNotif(true)
                  setSnackBarMessage("Product Deleted")
                  setOpenAddProudctDialog(false)
                  navigate(`/admin/products`)
                }
              })
          }
        })
    }

    const handleAddProduct = () => {
      setOpenAddProudctDialog(true)
    }

    const handleCloseAddProductDialog = () => {
      setOpenAddProudctDialog(false)
    }

    const handleCloseSaveProductNotif = (event, reason) => {
      if(reason === 'clickaway'){
        return;
      }
      setProductNotif(false)
    }

    const saveProductNotifAction = (
      <>
        <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={(e) => handleCloseSaveProductNotif(e)}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </>
    )

    const saveProduct = (e) => {
      e.preventDefault()
      fetch(`https://mysterious-ocean-63835.herokuapp.com/api/products/create`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          productName, productImg, description, category, stock, price
        })
      })
      .then(response => response.json())
      .then(response => {
        if(response){
          fetch(`https://mysterious-ocean-63835.herokuapp.com/api/products`, {
            headers: {"Authorization": `Bearer ${token}`}
            })
            .then(response => response.json())
            .then(response => {
              setProducts(response)
              setProductNotif(true)
              setSnackBarMessage("Product Save")
              setOpenAddProudctDialog(false)
              navigate(`/admin/products`)
            })
        }
      })
    }

    const columns = [
      { field: "_id", headerName: "ProductId", width: 150 },
      { field: "productName", headerName: 'Product Name', width: 300, editable: true },
      { field: "productImg", headerName: 'Product Image', width: 300, editable: true },
      { field: "description", headerName: "Description", width: 400, editable: true },
      { field: "category", headerName: 'Category', width: 150, editable: true},
      { field: "stock", headerName: 'Stock', width: 100, editable: true },
      { field: "price", headerName: 'Price', width: 100, editable: true },
      { field: "isActive", headerName: 'isActive', width: 100, editable: true },
      { field: "createdAt", headerName: 'Date Created', width: 200 },
      { field: "updatedAt", headerName: 'Date Updated', width: 200 },
      { field: "actions", type: "actions", headerName: 'Delete', width: 100, cellClassName: 'actions',
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            color="warning"
            onClick={(e) => handleDeleteClick(id)}
          />,
        ];
      },
      },
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
                <Paper
                sx={{height: "5rem", width: "80%", mx: "auto"}}
                elevation={0}
                >
                    <Typography
                    variant='h2'
                    component="div"
                    sx={{fontSize: "2rem", fontWeight: 700, textAlign: "center", pt: "1rem"}}
                    >
                        PRODUCTS TABLE
                    </Typography>
                </Paper>
            </Grid>

            <Grid
            item
            sx={{ ml: "310px", mr: "10px", mt: "2rem"}}
            >
              <Button
              variant='contained'
              onClick={(e) => handleAddProduct(e)}
              >
                Add Product
              </Button>

              <Dialog
                fullWidth={true}
                maxWidth="sm"
                open={openAddProudctDialog}
                onClose={(e) => handleCloseAddProductDialog(e)}
              >
                <FormControl
                className={classes.form}
                component="form"
                noValidate
                onSubmit={(e) => saveProduct(e)}
                >
                  <Typography
                  variant="h4"
                  component="h1"
                  align='center'
                  fontWeight="900"
                  >
                    Produc Details
                  </Typography>
            
                  <TextField 
                  type="text" 
                  id="productName" 
                  name='productName' 
                  label="Product Name" 
                  variant="outlined"
                  required
                  value={productName}
                  focused={productNameFocused}
                  onChange={(e) => setProductName(e.target.value)}
                  />

                  <TextField
                  type='text'
                  id="imgLink" 
                  name='imgLink' 
                  label="Image Link"
                  variant="outlined"
                  required
                  value={productImg}
                  focused={productImgFocused}
                  onChange={(e) => setProductImg(e.target.value)}
                  />

                  <TextField 
                  type="text" 
                  id="description" 
                  name='description' 
                  label="Description"
                  variant="outlined"
                  required
                  multiline
                  minRows={5}
                  value={description}
                  focused={descriptionFocused}
                  onChange={(e) => setDescription(e.target.value)}
                  />

                  <TextField
                  type="text" 
                  id="category" 
                  name='category' 
                  label="Category"
                  variant="outlined"
                  required
                  value={category}
                  focused={categoryFocused}
                  onChange={(e) => setCategory(e.target.value)}
                  />

                  <TextField
                  type="number" 
                  id="stock" 
                  name='stock' 
                  label="Stock"
                  variant="outlined"
                  required
                  InputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]*',
                    inputProps: {
                      min: 0
                    }
                  }}
                  value={stock}
                  focused={stockFocused}
                  onChange={(e) => setStock(e.target.value)}
                  />

                  <TextField 
                    type="number" 
                    id="price" 
                    name='price' 
                    label="Price"
                    variant="outlined"
                    required
                    InputProps={{
                      inputMode: 'numeric',
                      pattern: '[0-9]*',
                      inputProps: {
                        min: 0
                      }
                    }}
                    value={price}
                    focused={priceFocused}
                    onChange={(e) => setPrice(e.target.value)}
                  />
            
                  <Button
                    type="submit"
                    variant="contained" 
                    disabled={isSaveBtnDisabled}
                  >
                    Save
                  </Button>
                </FormControl>
              </Dialog>
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
        <Snackbar
          open={productNotif}
          autoHideDuration={6000}
          onClose={(event, reason) => handleCloseSaveProductNotif(event, reason)}
          message={snackBarMessage}
          action={saveProductNotifAction}
        />
    </>
  )
}
