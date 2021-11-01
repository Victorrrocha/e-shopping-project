import { useReducer, useCallback } from "react"

const initialData = {
    status: null,
    data: null,
    error: null
}

const dataReducer = (state, action) => {
    if(action.type === 'SEND'){
        return {
            status: 'pending',
            data: null,
            error: null
        }
    }
    if(action.type === 'SUCCESS'){
        return {
            status: 'completed',
            data: action.requestData,
            error: null
        }
    }
    if(action.type === "FAILURE"){
        return {
            status: 'complete',
            data: null,
            error: action.error
        }
    }
    return state
}

const useProducts = (callersFunction) => {
    const [data, dispatch] = useReducer(dataReducer, initialData)

    const sendRequest = useCallback( async (requestPayload) => {
        dispatch({type: 'SEND'})
        try{
            const requestData = await callersFunction(requestPayload)
            //console.log(requestData)
            dispatch({type: 'SUCCESS', requestData})
        }
        catch(error){
            console.log(error)
            dispatch({type: 'FAILURE', error})
        }
    }, [callersFunction] )

    return {
        sendRequest,
        ...data
    }
}

export default useProducts