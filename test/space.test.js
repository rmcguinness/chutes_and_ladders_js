import { LinkedSpace, SpaceType, Avatar, Color } from "../src/model";

describe("Space Tests", () => {
  let avatar;
  let avatar2;
  let start;
  let n1, ladder, n2, chute, n3, finish;

  initializeTest = () => {
    avatar = new Avatar("Tester 1");
    avatar.color = Color.RED
    
    avatar2 = new Avatar("Tester 2");
    avatar2.color = Color.BLUE

    start = new LinkedSpace(SpaceType.START, "1");

    // Create all of the spaces
    n1 = new LinkedSpace(SpaceType.NORMAL, "2");
    ladder = new LinkedSpace(SpaceType.LADDER, "3");
    n2 = new LinkedSpace(SpaceType.NORMAL, "4");
    chute = new LinkedSpace(SpaceType.CHUTE, "5");
    n3 = new LinkedSpace(SpaceType.NORMAL, "6");
    finish = new LinkedSpace(SpaceType.FINISH, "7");

    // Link the spaces to each other from start to finish
    start.next = n1;
    n1.previous = start
    n1.next = ladder;

    ladder.previous = n1
    ladder.next = n2;
    ladder.special = n2;

    n2.previous = ladder
    n2.next = chute;

    chute.previous = n2
    chute.next = n3;
    chute.special = start;

    n3.previous = chute
    n3.next = finish;

    finish.previous = n3

    // Place all avatars on start
    
    start.land(avatar);
    start.land(avatar2);
  };

  beforeEach(() => {
    initializeTest();
  });

  test('Avatar state', () => {
    expect(avatar.color).toBe(Color.RED)
  })

  test("Space Setup", () => {
    console.log("t1 = " + start);

    expect(start.occupied).toBeTruthy();
    expect(start.validate([() => start.next != null])).toBe(true);
    expect(start.occupiedCount).toBe(2);
  });

  test("Avatar Movement", () => {
    expect(avatar.location).toBe(start);
    avatar.move(1);
    expect(avatar.location).toBe(n1);

    avatar.move(-1)
    expect(avatar.location).toBe(start);
    avatar.move(1)
    avatar.move(-3)
    expect(avatar.location).toBe(n1);

    avatar.move(1);
    expect(avatar.location).toBe(n2);
    avatar.move(1);
    expect(avatar.location).toBe(start);
    avatar.move(5);
    expect(avatar.location).toBe(n3);
    avatar.move(1);
    expect(avatar.location).toBe(finish);
  });

  test("Avatar space occupation", () => {
    // Start
    expect(avatar.location).toBe(start);
    expect(avatar2.location).toBe(start);

    // Player two moves first
    avatar2.move(1);
    expect(avatar2.location).toBe(n1);

    // Player one lands on the same space
    avatar.move(1);
    expect(avatar.location).toBe(n1);
    expect(n1.occupiedCount).toBe(1);
    expect(avatar2.location).toBe(n2);
  });
});
