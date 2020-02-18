import { ADD, DELETE } from './types'

export const add = (text) => {
    return {
        text,
        type: ADD
    }
}

export const del = (id) => {
    return {
        id,
        type: DELETE
    }
}