import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getEntitiesAction } from '../../redux/entitiesDucks'

const EntitiesList = () => {
    
    const dispatch = useDispatch()

    const entities = useSelector(store => store.entities.array)
    console.log(entities)

    return (
        <div>
            lista de entidades
            <button onClick={()=> dispatch(getEntitiesAction())}>OBTENER ENTIDADES</button>
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
