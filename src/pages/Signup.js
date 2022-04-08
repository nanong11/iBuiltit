import { Button, FormControl, Grid, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { useNavigate } from "react-router-dom"
import Footer from '../components/Footer'

/* Custom Styles */
const useStyles = makeStyles({
    form: {
      width: "100%",
      padding: "2rem",
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    },
    gridItem: {
      border: "2px solid #7027A0",
      borderRadius: "10px",
      padding: "1rem",
      backgroundColor: 'white'
    }
})

export default function Signup() {
    const navigate = useNavigate()
    const classes = useStyles()

    const [ firstName, setFirstName ] = useState("")
    const [ firstNameColor, setFirstNameColor ] = useState("")
    const [ firstNameError, setFirstNameError ] = useState(false)
    const [ firstNameErrorText, setFirstNameErrorText ] = useState("")
    const [ firstNameFocused, setFirstNameFocused ] = useState(false)

    const [ lastName, setLastName ] = useState("")
    const [ lastNameColor, setLastNameColor ] = useState("")
    const [ lastNameError, setLastNameError ] = useState(false)
    const [ lastNameErrorText, setLastNameErrorText ] = useState("")
    const [ lastNameFocused, setLastNameFocused ] = useState(false)

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

    const [ confirmPassword, setConfirmPassword ] = useState("")
    const [ confirmPasswordColor, setConfirmPasswordColor ] = useState("")
    const [ confirmPasswordError, setConfirmPasswordError ] = useState(false)
    const [ confirmPasswordErrorText, setConfirmPasswordErrorText ] = useState("")
    const [ confirmPasswordFocused, setConfirmPasswordFocused ] = useState(false)
    const [ confirmPasswordIsDisabled, setConfirmPasswordIsDisabled ] = useState(true)

    const [ isDisabled, setIsDisabled ] = useState(true)

    /* First Name Validation */
    useEffect(() => {
      if(firstName.length > 0 && !/^[a-zA-Z\s]+$/.test(firstName)){
        setFirstNameError(true)
        setFirstNameErrorText("First Name should only consist of letters.")
      }else if(firstName.length > 1 && /^[a-zA-Z\s]+$/.test(firstName)){
        setFirstNameError(false)
        setFirstNameColor("primary")
        setFirstNameErrorText("")
        setFirstNameFocused(true)
      }else if(firstName.length === 1){
        setFirstNameError(true)
      }else{
        setFirstNameError(false)
        setFirstNameColor("")
        setFirstNameErrorText("")
        setFirstNameFocused(false)
      }
    }, [firstName])

    /* Last Name Validation */
    useEffect(() => {
      if(lastName.length > 0 && !/^[a-zA-Z\s]+$/.test(lastName)){
        setLastNameError(true)
        setLastNameErrorText("Last Name should only consist of letters.")
      }else if(lastName.length > 1 && /^[a-zA-Z\s]+$/.test(lastName)){
        setLastNameError(false)
        setLastNameColor("primary")
        setLastNameErrorText("")
        setLastNameFocused(true)
      }else if(lastName.length === 1){
        setLastNameError(true)
      }else{
        setLastNameError(false)
        setLastNameColor("")
        setLastNameErrorText("")
        setLastNameFocused(false)
      }
    }, [lastName])

    /* Email Validation */
    useEffect(() => {
      const validateEmail = (em) => {
        const mailFormat = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return mailFormat.test(String(em).toLowerCase())
      }
      if(email.length > 0 && validateEmail(email)){
        setEmailErrorText("")
        setEmailColor("")
        fetch(`https://mysterious-ocean-63835.herokuapp.com/api/users/check-email`, {
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
            setEmailError(true)
            setEmailErrorText("Email already exist.")
            setEmailFocused(false)
          }else{
            setEmailError(false)
            setEmailColor(`primary`)
            setEmailFocused(true)
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

    /* Password Validation */
    useEffect(() => {
      if(password.length > 0 && password.length < 8){
        setPasswordError(true)
        setPasswordColor("")
        setPasswordErrorText("Password should be 8 min characters.")
        setConfirmPasswordIsDisabled(true)
      }else if(password.length >= 8){
        setPasswordError(false)
        setPasswordColor("primary")
        setPasswordFocused(true)
        setPasswordErrorText("")
        setConfirmPasswordIsDisabled(false)
      }else{
        setPasswordError(false)
        setPasswordColor("")
        setPasswordFocused(false)
        setPasswordErrorText("")
        setConfirmPasswordIsDisabled(true)
      }
      
    }, [password])

    /* Confirm Password Validation */
    useEffect(() => {
      if(confirmPassword !== password && confirmPassword.length > 0){
        setConfirmPasswordError(true)
        setConfirmPasswordColor("")
        setConfirmPasswordErrorText("Please confirm password.")
      }else if(confirmPassword === password){
        setConfirmPasswordError(false)
        setConfirmPasswordColor("primary")
        setConfirmPasswordFocused(true)
        setConfirmPasswordErrorText("")
      }else{
        setConfirmPasswordError(false)
        setConfirmPasswordColor("")
        setConfirmPasswordFocused(false)
        setConfirmPasswordErrorText("")
      }
    }, [password, confirmPassword])
    
    /* Sign Up Button Activate */
    useEffect(() => {
      if(firstNameColor === "primary" && lastNameColor === "primary" && emailColor === "primary" && passwordColor ==="primary" && confirmPasswordColor === "primary"){
        setIsDisabled(false)
      }else{
        setIsDisabled(true)
      }
    }, [firstNameColor, lastNameColor, emailColor, passwordColor, confirmPasswordColor])

    /* Sign Up Function */
    const SignUp = (e) => {
      e.preventDefault()

      /* Capitalize First and Last Name */
      const firstNameLetters = firstName.split(" ")
      const lastNameLetters = lastName.split(" ")
      for (let i = 0; i < firstNameLetters.length; i++) {
        firstNameLetters[i] = firstNameLetters[i].charAt(0).toUpperCase() + firstNameLetters[i].slice(1)
      }
      for (let i = 0; i < lastNameLetters.length; i++) {
        lastNameLetters[i] = lastNameLetters[i].charAt(0).toUpperCase() + lastNameLetters[i].slice(1)
      }
      const firstNameCapitalize = firstNameLetters.join(" ")
      const lastNameCapitalize = lastNameLetters.join(" ")

      fetch(`https://mysterious-ocean-63835.herokuapp.com/api/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          firstName: firstNameCapitalize, lastName: lastNameCapitalize, email, password
        })
      })
      .then(response => response.json())
      .then(response => {
        if(response){
          alert(`Creating account successful.`)
          navigate(`/`)
        }else{
          alert(`Please try again.`)
          navigate(`/signup`)
        }
      })
    }

  return (
    <>
      <Grid 
      container
      spacing={0}
      alignItems="center"
      justifyContent="center"
      sx={{minHeight: "100vh"}}
      >
        <Grid item xs={10} sm={8} md={5} xl={3} className={classes.gridItem}>
          <FormControl
          className={classes.form}
          component="form"
          noValidate
          onSubmit={(e) => SignUp(e)}
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
              variant="body1"
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
              required
              color={firstNameColor}
              error={firstNameError}
              helperText={firstNameErrorText}
              value={firstName}
              focused={firstNameFocused}
              onChange={(e) => setFirstName(e.target.value)}
              />

              <TextField 
              type="text" 
              id="lastName" 
              name='lastName' 
              label="Last Name" 
              variant="outlined"
              autoCapitalize='on'
              required
              color={lastNameColor}
              error={lastNameError}
              helperText={lastNameErrorText}
              value={lastName}
              focused={lastNameFocused}
              onChange={(e) => setLastName(e.target.value)}
              />
              
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
              error={passwordError}
              helperText={passwordErrorText}
              focused={passwordFocused}
              onChange={(e) => setPasword(e.target.value)}
              />
            
            <TextField 
              type="password" 
              id="confirmPassword" 
              name='confirmPassword' 
              label="Confirm Password"
              variant="outlined"
              required
              value={confirmPassword}
              color={confirmPasswordColor}
              error={confirmPasswordError}
              helperText={confirmPasswordErrorText}
              focused={confirmPasswordFocused}
              disabled={confirmPasswordIsDisabled}
              onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <Button 
              type='submit' 
              variant="contained"
              disabled={isDisabled}
              >
                Sign Up
              </Button>

              <Typography
              variant="body1"
              component="p"
              align='center'
              >
                  Already have account? 
              </Typography>
              <Typography
              variant="h6"
              component="a"
              align='center'
              href='/'
              sx={{ textDecoration: "none", fontWeight: 600}}
              >
                  Login
              </Typography>

          </FormControl>
        </Grid>
      </Grid>
      <Footer />
    </>
  )
}
