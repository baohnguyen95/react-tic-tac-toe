const { haveWon } = require('../components/Board');

// test row
test('when we have 3 Xs in one row', () => {
  const pl = [
    ['','',''],
    ['X','X','X'],
    ['','',''],
  ];
  expect(haveWon('X',1,2,pl)).toBeTruthy();
});

// test column
test('when we have 3 Xs in one column', () => {
  const pl = [
    ['','X',''],
    ['','X',''],
    ['','X',''],
  ];
  expect(haveWon('X',2,1,pl)).toBeTruthy();
});

// test diagonal (top-left to bottom-right)
test('when we have 3 Xs from top-left to bottom-right diagonally', () => {
  const pl = [
    ['X','',''],
    ['','X',''],
    ['','','X'],
  ];
  expect(haveWon('X',2,2,pl)).toBeTruthy();
});

// test diagonal (top-right to bottom-left)
test('when we have 3 Xs from top-right to bottom-left diagonally', () => {
  const pl = [
    ['','','X'],
    ['','X',''],
    ['X','',''],
  ];
  expect(haveWon('X',2,0,pl)).toBeTruthy();
});

// test when haveWon should return false
// test diagonal (top-left to bottom-right)
test('when the game should not ended', () => {
  const pl = [
    ['X','',''],
    ['','X','X'],
    ['','',''],
  ];
  expect(haveWon('X',1,2,pl)).toBeFalsy();
});
