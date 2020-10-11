import React from 'react'
import {useDispatch/*, useSelector*/} from 'react-redux'
import { getEntitiesAction } from '../../redux/entitiesDucks'

const EntitiesList = () => {
    const dispatch = useDispatch()
    return (
        <div>
            lista de entidades
            <button onClick={()=> dispatch(getEntitiesAction())}>OBTENER ENTIDADES</button>
        </div>
    )
}

export default EntitiesList
