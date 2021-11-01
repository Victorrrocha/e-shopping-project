import CategoryContainer from "../components/CategoryContainer"

// import { getCategories } from "../api/fakestore_api"
// import useProducts from "../hooks/use-products"

import { Grid } from "@mui/material"

const categories = ['electronics', 'jewelery', "men's clothing", "women's clothing"]

const Home = () => {

    //start, get 5 random categories, populate 5 diferent rows

    // const {sendRequest: getProducts, data, status} = useProducts(getCategories)

    // const getProductsCategoriesHandler = useCallback( async () => {
    //     await getProducts()
    // }, [getProducts])

    // useEffect(() => {
    //     getProductsCategoriesHandler()

    //     if(data !== null){
    //         console.log(data)
    //     }

    // }, [getProductsCategoriesHandler])

    //OBS>>> This api only has these 4 categories, so I thought it was best just to save them

    return (
        <Grid >
            {categories !== null && categories.map(category => {
                return <CategoryContainer key={category} category={category} />
            })}
        </Grid>
    )
}

export default Home
