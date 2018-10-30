# Minesweeper built with react

Stack: react, redux, typescript, no back-end.

Demo: https://minesweeper-react.netlify.com/

Differences from old knockout version
https://github.com/tup1tsa/minesweeper_knockout

1. Multiple UI improvements.
2. Drastically increased performance on big fields (50\*50 and bigger).
3. First click on the field always creates an opening
4. Implementation of 3bv rating requirements.
   Details: http://www.minesweeper.info/wiki/3BV
5. Win condition is also tracked if all mines are flagged
6. Restart button was added.
