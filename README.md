# minesweeper_new

Stack: react, redux, typescript, no back-end.

Differences from old knockout version
https://github.com/tup1tsa/minesweeper_knockout


1. Multiple UI improvements.
2. Drastically increased performance on big fields (50*50 and bigger). 
3. First click on the field always creates an opening
4. Implementation of 3bv rating requirements. 
    Details: http://www.minesweeper.info/wiki/3BV
6. Game state is saved in local storage.
7. Win condition is also tracked if all mines are flagged
8. Restart button was added.
