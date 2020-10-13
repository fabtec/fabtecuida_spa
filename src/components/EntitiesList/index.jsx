import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getEntitiesAction } from '../../redux/entitiesDucks'

const EntitiesList = () => {
    
    const dispatch = useDispatch()

    const entities = useSelector(store => store.entities.array)

    useEffect(()=>{
        dispatch(getEntitiesAction())
    },[dispatch])

    return (
        <div>
            lista de entidades
            <ul>
                {
                    entities.map(item=>(
                        <li key={item.id}>{item.properties.name}</li>
                    ))
                }
            </ul>
        </div>
    )
}

export default EntitiesList
