import { createEffect, createEvent, createStore, fork } from "effector";

export const addItem = createEvent()
export const removeItem = createEvent()
export const reloadItems = createEvent()
export const changeItemStatus = createEvent()

export const itemsStore = createStore([])
    .on(addItem, (state, item) => [...state, item])
    .on(removeItem, (state, itemId) => state.filter((item) => item.id !== itemId))
    .on(reloadItems, (state, items) => state = items)
    .on(changeItemStatus, (state, itemId) => state.map(item => {
        if(item.id === itemId) {
            item.status = !item.status
        }
        return item
    }))    

export const increment = createEvent()
export const setCounter = createEvent()

export const counter = createStore(1)
    .on(increment, (state) => state + 1)
    .on(setCounter, (state, count) => state = count)

export const fetchItems = createEffect()

fetchItems.use( async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const arr = [
                {id: 1, name: "name1", status: false},
                {id: 2, name: "name2", status: false},
                {id: 3, name: "name3", status: false},
            ]
            resolve(arr)
        }, 1000)
    })
})

export const scope = fork()
