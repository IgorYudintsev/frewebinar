import {useEffect, useState} from "react";
import axios from "axios";
import {ProductsType} from "./BestSellers";
import rating from './assets/img/rating.svg'
import cartWhite from './assets/img/cartWhite.svg'
import {Link, useNavigate, useParams} from "react-router-dom";
import arrow from './assets/img/arrowBack.svg'
import {Reviews} from "./Reviews";


export const Product = () => {
    const temporaryPlug = {
        category: "men's clothing",
        createdAt: "2022-06-30T17:46:05.978Z",
        description: "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
        id: 3,
        image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAA",
        price: 15.99,
        rating: {rate: 2.1, count: 430},
        title: "Mens Casual Slim Fit",
        updatedAt: "2022-06-30T17:46:05.978Z",
        __v: 0,
        _id: "62bde15d41e732c5cfc78984"
    }

    const [product, setProduct] = useState<ProductsType | null>(null)
    const [isProductInCart, setIsProductIncart] = useState(false) // для кнопки "Положить в корзину"
    let navigate = useNavigate()
    const id = 3 //в начале захардкодили а потом решили использовать useParams()
    const params = useParams()
    console.log(params.id)

    useEffect(() => {
        // axios.get(`https://masterclass.kimitsu.it-incubator.ru/api/products/${id}`)
        axios.get(`https://masterclass.kimitsu.it-incubator.ru/api/products/${params.id}`)
            .then((res) => {
                const product = res.data
                setProduct(product)
            })
    }, [])

    if (product === null) return <div>loading...</div>


    const addProductToCartHandler = () => {
        alert('Товар успешно добавлен в корзину') // добавляем в корзину
        setIsProductIncart(true)
    }


    return (
        <div>
            <h1>{product.category}</h1>
            <div className="arrowBack">
                <Link to={"/"}>
                    <img src={arrow} alt=""/>
                    Back to Best Seller
                </Link>
            </div>
            <div className="arrowBack">
                <button onClick={() => navigate(-1)}>
                    {/*-1 -значит на уровень ниже -часто это выносят в отдельн функцию и юзают все кнопки*/}
                    <img src={arrow} alt=""/>
                    Back to Best Seller
                </button>
            </div>
            <div className="product">
                <img src={product.image} alt=""/>
                <div className="info">
                    <p className="title">{product.title}</p>
                    <p className="price">$ {product.price}</p>
                    <div className="rating">
                        <p>Rating: {product.rating.rate}</p>
                        <img src={rating} alt=""/>
                    </div>
                    <div className="category">
                        <span>Category:</span>
                        <p>{product.category}</p>
                    </div>
                    <p className="description">{product.description}</p>
                    <button onClick={addProductToCartHandler}>
                        <img src={cartWhite} alt=""/>
                        {isProductInCart ? 'Go to cart' : 'Add to cart'}
                    </button>
                </div>
            </div>

            <Reviews/>

        </div>
    )
}