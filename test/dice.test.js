
import {Die} from '../src/model'

import { std } from 'mathjs'

test('Roll a single die 100 times, creating a matrix of 100 and evaluate standard deviation 100 times.', () => {
    let D6 = new Die(6)

    let min = 0
    let max = 0

    for (let k=0;k<100;k++) {
        let matrix = [[]]

        for (let j=0; j<100; j++) {
            let rolls = []
            for (let i = 0; i<100; i++) {
                const r = D6.roll()
                if (rolls.length<r) {
                    rolls.push(0)
                } else {
                    rolls[r-1] += 1
                }
                
            }
            matrix.push(rolls)
        }
        
        const matrix_deviation = std(matrix)
        if (matrix_deviation > max) {
            max = matrix_deviation
        }
        if (min == 0 || matrix_deviation < min) {
            min = matrix_deviation
        }
        expect(matrix_deviation).toBeLessThan(4.3)
        expect(matrix_deviation).toBeGreaterThan(3.2)
    }

    console.log(`Range: ${min} - ${max}`)
})

