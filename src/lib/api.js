import { authActions } from "../store/auth"

const SIGN_UP = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='
const SIGN_IN = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='
const KEY = 'AIzaSyB6f1xLrVKJoQOjta1E-grOuZpIcufiZ44'

export async function SignUp({email, password, dispatch, history}) {

    fetch(`${SIGN_UP}${KEY}`, {
        method: 'POST',
        body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true
        }),
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(res => {
        if(!res.ok){
            throw new Error('Sign up failed')
        }

        return res.json()
    })
    .then(data => {
        const { idToken } = data
        dispatch(authActions.login({token: idToken}))
        history.replace('/')
    })
    .catch(err => {
        return err.message
    })
}

export async function SignIn({email, password, dispatch, history}){

    const response = await fetch(`${SIGN_IN}${KEY}`, {
        method: 'POST',
        body: JSON.stringify({
            email,
            password, 
            returnSecureToken: true
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if(!response.ok){
        throw new Error(response.message || 'sign in request failed')
    }

    const data = await response.json()

    const { idToken } = data
    dispatch(authActions.login({token: idToken}))
}