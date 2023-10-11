import { Color, LinkedSpace, SpaceType } from "../src/model"
import { ValidateFinish, ValidateHasStartAndFinish, ValidateStart } from "../src/validators"


describe('Validator Test', () => {
    let start, middle, end

    beforeEach(() => {
        start = new LinkedSpace(SpaceType.START, "Start")
        middle = new LinkedSpace(SpaceType.NORMAL, "Middle")
        end = new LinkedSpace(SpaceType.FINISH, "Finish")

        start.next = middle
        middle.next = end
    })

    test('Undefined space', () => {
        const isValid = ValidateStart(undefined)
        expect(isValid).toBeFalsy()
    })

    test('Positive start validator', () => {
        const isValid = ValidateStart(start)
        expect(isValid).toBeTruthy()
    })

    test('Negative start validator', () => {
        const isValid = ValidateStart(middle)
        expect(isValid).toBeFalsy()
    })

    test('Test finish validator', () => {
        const isValid = ValidateFinish(end)
        expect(isValid).toBeTruthy()
    })


    test('Test valid board', () => {
        const isValid = ValidateHasStartAndFinish(start)
        expect(isValid).toBeTruthy()
    })

    test('Test invalid board', () => {
        const isValid = ValidateHasStartAndFinish(middle)
        expect(isValid).toBeFalsy()
    })

    test('Test board', () => {
        const isValidStart = start.validate([ValidateStart])
        expect(isValidStart).toBeTruthy()

        const isValidEnd = end.validate([ValidateFinish])
        expect(isValidEnd).toBeTruthy()
    })
})