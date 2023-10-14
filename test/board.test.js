// Copyright 2023 Ryan McGuinness
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { Avatar, Die, LinkedSpace, SpaceType } from "../src/model"
import { ValidateHasStartAndFinish } from "../src/validators"

describe('Testing the board', () => {

  let board = {
    start: undefined
  }

  beforeAll(() => {
    board.start = new LinkedSpace(SpaceType.START, "Start")
    let current = board.start
    let previous = undefined
    for (let i=0; i<98; i++) {
      current.next = new LinkedSpace(SpaceType.NORMAL, `${i}`)
      current.next.previous = current
      previous = current
      current = current.next
    }
    current.next = new LinkedSpace(SpaceType.FINISH, "Finish")
  })

  test('Test integrity', () => {
    expect(ValidateHasStartAndFinish(board.start)).toBeTruthy()
  })

  test('Die rolls', () => {
    const D6 = new Die(6)

    const avatar = new Avatar("Car")
    board.start.land(avatar)

    let start = 1

    let total_roles = 0

    while (avatar.location.type != SpaceType.FINISH) {
      const roll = D6.roll()
      avatar.move(roll)
      start += roll
      total_roles += 1
    }

    expect(avatar.location.type).toBe(SpaceType.FINISH)
    console.log(`Total rolls: ${total_roles}`)

  })

})