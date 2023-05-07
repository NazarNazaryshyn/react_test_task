import { useEffect, useMemo, useState } from "react"
import Filters from "./Filters"
import Position from "./Position"
import axios from "axios"


export type ItemProp = {
    title: String
    company: String
    position_function: String
    due_date: String
    image_url: String
}


export type PositionFuncProp = {
    title: String
    children: []
}


function Home(){

    const [positions, setPositions] = useState<ItemProp[]>([])
    const [positionsFunction, setPositionsFunction] = useState<PositionFuncProp[]>([])
    
    useEffect(() => {
        axios.get("https://test-api.mojob.io/public/job/job-feed/?page_size=5")
        .then(data => {
            setPositions(() => {
                return data.data.results.map((item) => {
                    return {
                        "title": item.title,
                        "company": item.employment_type,
                        "position_function": item.position_function_name_en,
                        "due_date": item.due_date.slice(0, 10),
                        "image_url": item.image_url 
                    }
                })
            })
        })
        axios.get("https://test-api.mojob.io/public/job/position-functions/")
        .then(data => {
            setPositionsFunction(() => {
                return data.data.results.map((item) => {
                    return {
                        "title": item.name,
                        "children": item.children
                    }
                })
            })
        })
    }, [])


    const displayAmount = (amount: number | String) => {
        axios.get(`https://test-api.mojob.io/public/job/job-feed/?page_size=${amount}`).then(data => {
            setPositions(() => {
                return data.data.results.map((item) => {
                    return {
                        "title": item.title,
                        "company": item.employment_type,
                        "position_function": item.position_function_name_en,
                        "due_date": item.due_date.slice(0, 10),
                        "image_url": item.image_url 
                    }
                })
            })
        })
    }


    const filterPositions = useMemo(() => {
        return (position: String) => { 
            setPositions((prev) => {
                return [...(prev.sort((item) => (item.position_function != position) ? 1 : (item.position_function == position) ? -1 : 0))]
            })
        }
    }, [])
   

    return (
        <>
            <button onClick={() => console.log(positionsFunction)}>Show</button>
            <Filters displayAmount={displayAmount} positionsFunction={positionsFunction} filterPositions={filterPositions}/>
            {positions.map((item) => {
                return <Position item={item}/>
            })}
        </>
    )
}


export default Home