import { LinkedSpace, SpaceType } from "./model";


/**
 * 
 * @param {LinkedSpace} space the space to validate
 * @returns true if valid, false otherwise
 */
export const ValidateStart = (space) => {
    return space != undefined && space.type == SpaceType.START && space.next != undefined
}

/**
 * 
 * @param {LinkedSpace} space the space to validate
 * @returns 
 */
export const ValidateFinish = (space) => {
    return space != undefined && space.type == SpaceType.FINISH && space.next == undefined
}

/**
 * 
 * @param {LinkedSpace} space
 * @returns 
 */
export const ValidateHasStartAndFinish = (space) => {
    let hasStart = false
    let hasFinish = false

    let n = space
    while (n != undefined) {
        if (ValidateStart(n)) {
            hasStart = true
        }
        if (ValidateFinish(n)) {
            hasFinish = true
        }
        n = n.next
    }
    
    return hasStart && hasFinish
}