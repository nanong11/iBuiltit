import { Button, FormControl, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/styles';
import { setUserData } from '../redux/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
    form: {
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem"
    },
})

export default function Login() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [ email, setEmail ] = useState("")
    const [ emailColor, setEmailColor ] = useState("")
    const [ emailError, setEmailError ] = useState(false)
    const [ emailErrorText, setEmailErrorText ] = useState("")
    const [ emailFocused, setEmailFocused ] = useState(false)
    
    const [ password, setPasword ] = useState("")
    const [ passwordColor, setPasswordColor ] = useState("")
    const [ passwordError, setPasswordError ] = useState(false)
    const [ passwordErrorText, setPasswordErrorText ] = useState("")
    const [ passwordFocused, setPasswordFocused ] = useState(false)

    const [ isLoginDisabled, setIsLoginDisabled ] = useState(true)

    /* Email Check */
    useEffect(() => {
        const validateEmail = (em) => {
          const mailFormat = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return mailFormat.test(String(em).toLowerCase())
        }
        if(email.length > 0 && validateEmail(email)){
          setEmailErrorText("")
          setEmailColor("")
          fetch(`/api/users/check-email`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              email
            })
          })
          .then(response => response.json())
          .then(response => {
            if(response){
              setEmailError(false)
              setEmailColor(`success`)
              setEmailFocused(true)
              setEmailErrorText("")
            }else{
              setEmailError(true)
              setEmailErrorText("Email doesn't exist.")
              setEmailFocused(false)
            }
          })
        }else if(email.length > 0 && validateEmail(email) === false){
          setEmailColor("")
          setEmailError(true)
          setEmailErrorText("Please input valid email.")
          setEmailFocused(false)
        }else{
          setEmailError(false)
          setEmailErrorText("")
          setEmailColor("")
          setEmailFocused(false)
        }
      }, [email])

    /* Password Check */
    useEffect(() => {
        if(password.length > 0 && password.length < 8){
          setPasswordColor("")
          setPasswordFocused(false)
          setPasswordError(true)
          setPasswordErrorText("")
        }else if(password.length >= 8){
          setPasswordColor("success")
          setPasswordFocused(true)
          setPasswordError(false)
          setPasswordErrorText("")
        }else{
          setPasswordColor("")
          setPasswordFocused(false)
          setPasswordError(false)
          setPasswordErrorText("")
        }
      }, [password])

    /* Login Button Activate */
    useEffect(() => {
      if(emailColor === "success" && passwordColor ==="success"){
        setIsLoginDisabled(false)
      }else{
        setIsLoginDisabled(true)
      }
    }, [emailColor, passwordColor])

    /* Login Function */
    const Login = (e) => {
        e.preventDefault()
        fetch(`https://mysterious-ocean-63835.herokuapp.com/api/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password
            })
        })
        .then(response => response.json())
        .then(response => {
            if(response.token !== undefined){
              localStorage.setItem(`token`, response.token)
              const {token} = response

              fetch(`https://mysterious-ocean-63835.herokuapp.com/api/users/profile`, {
                method: "GET",
                headers: {
                  "Authorization": `Bearer ${token}`
                }
              })
              .then(response => response.json())
              .then(response => {
                dispatch(setUserData(response))
                navigate(`/`)
              })
            }else{
              setPasswordError(true)
              setPasswordErrorText("Invalid password")
            }
        })
    }
    
  return (
    <>
        <FormControl
          className={classes.form}
          component="form"
          noValidate
          onSubmit={(e) => Login(e)}
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
              color={emailColor}
              error={emailError}
              helperText={emailErrorText}
              focused={emailFocused}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField 
              type="password" 
              id="password" 
              name='password' 
              label="Password"
              variant="outlined"
              required
              value={password}
              color={passwordColor}
              focused={passwordFocused}
              error={passwordError}
              helperText={passwordErrorText}
              onChange={(e) => setPasword(e.target.value)}
            />
            
            <Button
              type="submit"
              variant="contained" 
              disabled={isLoginDisabled}
            >
                Log in
            </Button>

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
