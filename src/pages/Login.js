import { Button, FormControl, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/styles';


const useStyles = makeStyles({
    form: {
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem"
    },
})

export default function Login() {
    const [ email, setEmail ] = useState("")
    const [ password, setPasword ] = useState("")
    const [ isLoginDisabled, setIsLoginDisabled ] = useState(true)

    const classes = useStyles()

    useEffect(() => {
      if(email !== "" && password !==""){
          setIsLoginDisabled(false)
      }else{
          setIsLoginDisabled(true)
      }
    
    }, [email, password])
    

    
  return (
    <>
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
               Welcome to iBuiltit
            </Typography>
            <Typography
            variant="p"
            component="p"
            align='center'
            >
                Login with email &amp; password
            </Typography>
          
            <TextField 
            type="email" 
            id="email" 
            name='email' 
            label="Email" 
            variant="outlined" 
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
            noValidate
            required
            value={password}
            onChange={(e) => setPasword(e.target.value)}
            />
           
            <Button variant="contained" disabled={isLoginDisabled}>Log in</Button>

            <Typography
             variant="p"
             component="p"
             align='center'
            >
                Don't have account? 
            </Typography>
            <Typography
            variant="a"
            component="a"
            align='center'
            href='/signup'
            >
                Sign up
            </Typography>

        </FormControl>
    </>
  )
}
