import { useState, useEffect, useCallback } from "react"
import { SignUp, SignIn } from "../lib/api"
import useHttp from "../hooks/use-http"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router"

import Box from "@mui/system/Box"
import { InputLabel, Typography } from "@mui/material"
import { Card } from "@mui/material"
import { TextField } from "@mui/material"
import { Button } from "@mui/material"
import CardActions from '@mui/material/CardActions';
import FormControl from '@mui/material/FormControl';
import { Select } from "@mui/material"
import MenuItem from '@mui/material/MenuItem';
import LoadingSpinner from "../components/UI/LoadingSpinner"

const Authentication = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const {sendRequest: signUpRequest} = useHttp(SignUp, false)
    const {sendRequest: signInRequest, status: signInStatus, error: signInError} = useHttp(SignIn, false)
    
    const [isLoginMode, setIsLoginMode] = useState(true)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [country, setCountry] = useState("")
    const [creditCard, setCreditCard] = useState("")

    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [countryError, setCountryError] = useState(false)
    const [creditCardError, setCreditCardError] = useState(false)

    useEffect(() => {
        if(signInError !== null){
            setEmailError(true)
            setPasswordError(true)
        }   
    }, [signInError])

    const submitHandler = async (event) => {
        event.preventDefault()
        
        onBlurEmailHandler()
        onBlurPasswordHandler()

        if(isLoginMode){
            if(email && password){
                await signInRequest({email, password, dispatch, history})
                if(signInError === null){
                    history.replace('/')
                }
            }
        }
        else{
            onBlurCountryHandler()
            onBlurCreditCardHandler()
            
            if(email && password && country && creditCard){
                signUpRequest({email, password, dispatch, history})
            }
        }
    }

    const toggleLoggin = () => {
        setIsLoginMode(prev => !prev)
    }

    const emailChangeHandler = (event) => {
        if(event.target.value.trim() !== ""){
            setEmailError(false)
        }

        setEmail(event.target.value)
    }

    const passwordChangeHandler = (event) => {
        if(event.target.value.trim() !== ""){
            setPasswordError(false)
        }
        setPassword(event.target.value)
    }

    const countryChangeHandler = (event) => {
        setCountry(event.target.value)

        if(event.target.value !== ""){
            setCountryError(false)
        }
    }

    const creditCardChangeHandler = (event) => {
        if(event.target.value !== ""){
            setCreditCardError(false)
        }

        setCreditCard(event.target.value)
    }

    const onBlurEmailHandler = useCallback( () => {
        if(email.trim() === ""){
            setEmailError(true)
        }
    }, [email])

    const onBlurPasswordHandler = useCallback( () => {
        if(password.trim() === "" && password.length < 6){
            setPasswordError(true)
        }
    }, [password])

    const onBlurCountryHandler = () => {
        if(country.trim() === ""){
            setCountryError(true)
        }
    }

    const onBlurCreditCardHandler = () => {
        if(creditCard === ""){
            setCreditCardError(true)
        }
    }

    if(signInStatus === 'pending'){
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100vw',
                height: '80vh'
            }}>
                <LoadingSpinner />
            </Box>
        )
    }

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100vw',
            height: '80vh'
        }}>
            <Card sx={{ 
                padding: 4,
                maxWidth: 500,
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: "center" }}>
                
                <Typography 
                    textAlign="center"
                    fontSize={25}
                    marginBottom={4}>
                    {isLoginMode ? "Sign In" : "Sign Up"}
                </Typography>

                <form onSubmit={submitHandler}>
                    <TextField 
                        value={email}
                        error={emailError}
                        onBlur={onBlurEmailHandler}
                        onChange={emailChangeHandler}
                        fullWidth 
                        type="email"
                        label="Email" 
                        variant="outlined"
                        sx={{
                            marginBottom: 2
                        }} />

                    <TextField 
                        value={password}
                        error={passwordError}
                        onChange={passwordChangeHandler}
                        onBlur={onBlurPasswordHandler}
                        fullWidth 
                        type="password"
                        label="Password" 
                        variant="outlined"
                        sx={{
                            marginBottom: 2
                        }} />

                    {!isLoginMode && <FormControl fullWidth>
                        <InputLabel id="country">Country</InputLabel>
                        <Select
                            labelId="country"
                            value={country}
                            label="Country"
                            error={countryError}
                            onBlur={onBlurCountryHandler}
                            onChange={countryChangeHandler}
                            sx={{
                                marginBottom: 2
                            }}>
                            <MenuItem value={"arakis"}>Arakis</MenuItem>
                            <MenuItem value={"trantor"}>Trantor</MenuItem>
                            <MenuItem value={"shire"}>Shire</MenuItem>
                            <MenuItem value={"australia"}>Australia</MenuItem>
                        </Select>
                    </FormControl>}

                    {!isLoginMode && <TextField 
                        value={creditCard}
                        error={creditCardError}
                        onChange={creditCardChangeHandler}
                        onBlur={onBlurCreditCardHandler}
                        fullWidth 
                        type="number"
                        label="Credit Card" 
                        variant="outlined"
                        sx={{
                            marginBottom: 2
                        }} />}

                    <Button fullWidth size="large" variant="contained" type="submit">{isLoginMode ? "Sign In" : "Sign Up"}</Button>
                </form>
            
                <CardActions 
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginTop: 4
                    }}>
                    <Button>Forgot password</Button>
                    <Button onClick={toggleLoggin}>{isLoginMode ? 'Sign up' : 'Sign In'}</Button>
                </CardActions>
               
            </Card>
        </Box>
    )
}

export default Authentication
