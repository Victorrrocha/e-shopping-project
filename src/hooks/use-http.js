import { useReducer, useCallback } from "react"

const httpReducer = (state, action) => {
    if(action.type === 'SEND'){
        return {
            status: 'pending',
            error: null
        }
    }

    if(action.type === 'SUCCESS'){
        return {
            status: 'completed',
            error: null
        }
    }

    if(action.type === "FAILURE"){
        return {
            status: 'completed',
            error: action.errorMessage,
        }
    }

    return state
}

const useHttp = (requestFunction, startWithPending = false) => {
    const [httpState, dispatch] = useReducer(httpReducer, {
        status: startWithPending ? 'pending' : null,
        error: null,
    })

    const sendRequest = useCallback( 
        async (requestData) => {
            dispatch({ type: 'SEND' })
            try {
                await requestFunction(requestData)
                dispatch({ type: 'SUCCESS' })
            }
            catch(error){
                console.log('error to login hook')
                dispatch({ type: 'FAILURE', errorMessage: error.message || 'Something went wrong'})
            }
    }, [requestFunction])

    return {
        sendRequest,
        ...httpState
    }
}

export default useHttp