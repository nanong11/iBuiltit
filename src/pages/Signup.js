import { Button, FormControl, Grid, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/styles';
import { padding } from '@mui/system';

const useStyles = makeStyles({
    form: {
        margin: "10rem auto auto",
        width: "100%",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
    },
    gridItem: {
      border: "1px solid black",
      borderRadius: "10px",
      padding: "1rem",
    }
})

export default function Signup() {
    const [ firstName, setFirstName ] = useState("")
    const [ lastName, setLastName ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPasword ] = useState("")
    const [ confirmPassword, setConfirmPassword ] = useState("")
    const [ isDisabled, setIsDisabled ] = useState(true)

    const classes = useStyles()

    useEffect(() => {
      if(firstName !== "" && lastName !== "" && email !== "" && password !=="" && confirmPassword!== ""){
        setIsDisabled(false)
      }else{
        setIsDisabled(true)
      }
    
    }, [firstName, lastName, email, password, confirmPassword])

  return (
    <>
      <Grid 
      container
      spacing={0}
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh' }}
      >
        <Grid item xs={10} sm={8} md={5} xl={3} className={classes.gridItem}>
          <FormControl
          className={classes.form}
          component="form"
          >
              <Typography
              variant="h4"
              component="h1"
              align='center'
              fontWeight="900"
              >
                Create Your Account
              </Typography>
              <Typography
              variant="p"
              component="p"
              align='center'
              >
                  Please fill all fields to continue
              </Typography>

              <TextField 
              type="text" 
              id="firstName" 
              name='firstName' 
              label="First Name" 
              variant="outlined"
              autoCapitalize='on'
              autoComplete='off'
              noValidate
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              />

              <TextField 
              type="text" 
              id="lastName" 
              name='lastName' 
              label="Last Name" 
              variant="outlined"
              autoCapitalize='on'
              autoComplete='off'
              noValidate 
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              />
              
              <TextField 
              type="email" 
              id="email" 
              name='email' 
              label="Email" 
              variant="outlined"
              autoComplete='off'
              noValidate
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />

              <TextField 
              type="password" 
              id="password" 
              name='password' 
              label="Password"
              variant="outlined"
              autoComplete='off'
              noValidate
              required
              value={password}
              onChange={(e) => setPasword(e.target.value)}
              />
            
            <TextField 
              type="password" 
              id="confirmPassword" 
              name='confirmPassword' 
              label="Confirm Password"
              variant="outlined"
              autoComplete='off'
              noValidate
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <Button type='submit' variant="contained" disabled={isDisabled}>Log in</Button>

              <Typography
              variant="p"
              component="p"
              align='center'
              >
                  Already have account? 
              </Typography>
              <Typography
              variant="a"
              component="a"
              align='center'
              href='/'
              >
                  Login
              </Typography>

          </FormControl>
        </Grid>
      </Grid>
    </>
  )
}
