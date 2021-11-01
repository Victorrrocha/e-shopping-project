export const getCategories = async () => {
    const response = await fetch('https://fakestoreapi.com/products/categories')
    
    if(!response.ok){
        throw new Error('Could not get categories')
    }

    const data = await response.json()
    console.log(data)
    return data
}

export const getProductsInCategory = async({category, number}) => {
    const response = await fetch(`https://fakestoreapi.com/products/category/${category}?limit=${number}`)
    
    if(!response.ok){
        throw new Error('Could not get produts')
    }

    const data = await response.json()
    
    //console.log(data)

    return data
}

export const getAllProductsInCategory = async({category}) => {
    const response = await fetch(`https://fakestoreapi.com/products/category/${category}`)
    
    if(!response.ok){
        throw new Error('Could not get produts')
    }

    const data = await response.json()

    return data
}