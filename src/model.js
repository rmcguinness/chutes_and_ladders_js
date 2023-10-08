
export class Color {
    static RED = 1;
    static WHITE = 2;
    static BLUE = 3;
    static GREEN = 4;
    static PURPLE = 5;
    static YELLOW = 6;
    static ORANGE = 7;
    static PINK = 8;
    static BLACK = 9;
    static BROWN = 10;
}

export class SpaceType {
    static START = 1;
    static NORMAL = 2;
    static CHUTE = 3;
    static LADDER = 4;
    static FINISH = 5;
}

const MINIUM_SIDES = 4

export class Die {
    
    #Sides
    constructor(sides) {
        this.#Sides = (sides >= MINIUM_SIDES) ? sides : MINIUM_SIDES
    }
    roll() {
        return Math.floor(Math.random()*this.#Sides) + 1
    }
    multiRoll(totalRolls) {
        out = []
        for (let i=0;i<totalRolls;i++) {
            out.push(this.roll())
        }
        return out
    }
}

export class DieShaker {
    static roll(...die) {
        out = []
        for (const d in die) {
            out.push(d.roll())
        }
        return out
    }
    static summRoll(...die) {
        rolls = DieShaker.roll(die)
        sum = rolls.reduce((p, c) => p+c, 0)
        return {
            rolls: rolls,
            sum: sum 
        }
    }
}

export class Avatar {
    #Name
    #Location
    constructor(name, location) {
        this.#Name = name
        this.#Location = location
    }
    get name() { return this.#Name }
    get location() { return this.#Location }
    set location(location) { this.#Location = location }
    move(count) {
        const origin = this.location
        if (this.location != undefined) {
            let loc = this.location
            for(let i=0;i<count;i++) {
                if (loc.next) {
                    loc = loc.next
                } else {
                    break
                }
            }
            if (loc != undefined) {
                origin.leave()
                loc.land(this)
            }
        }
    }
}

export class Player {
    #Name
    #Order
    #Avatar
    constructor(name, order, avatar) {
        this.#Name = name
        this.#Order = order
        this.#Avatar = avatar
    }
    get name() { return this.#Name }
    get order() { return this.#Order }
    get avatar() { return this.#Avatar }
    set avatar(avatar) { this.#Avatar = avatar }
}

export class LinkedSpace {
    #Value
    #Type
    #Next
    #Special
    #Avatars
    constructor(type, value) {
        this.#Type = type;
        this.#Value = value
        this.#Avatars = []
    }
    get value() { return this.#Value }
    get type() { return this.#Type }
    get next() { return this.#Next }
    set next(space) { this.#Next = space }
    /**
     * @param {LinkedSpace} space
     */
    set special(space) { this.#Special = space }
    get occupied() { 
        return this.#Avatars.length > 0
    }
    get occupiedCount() { return this.#Avatars.length }

    _handleOccupied() {
        // Only the start space can have multiple players, otherwise
        // the original player in a space gets moved up one.
        if (this.#Type != SpaceType.START) {
            if (this.occupied) {
                let otherPlayer = this.#Avatars.pop()
                if (otherPlayer != undefined && this.next) {
                    this.next.land(otherPlayer)
                }
            }
        }
    }

    land(avatar) {
        this._handleOccupied()
        if (this.#Special != undefined) {
            this.#Special.land(avatar)
        } else {
            this.#Avatars.push(avatar)
            avatar.location = this
        }
    }

    leave() {
        this.#Avatars.pop()
    }

    validate(list) {
        list.forEach(f => 
            { 
                const ans = f();
                if (!ans) {
                    return false
                }
            })
        return true
    }
}

