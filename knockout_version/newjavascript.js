$(document).ready(function () {
   /*jQuery test 
    $('.moveBlock').click(function () {
        $('p').css('color', 'red');
        $('#14').css('position', 'relative');
        $('#14').animate({'left': '250px'});
     
    });
            */
           
    
    function viewModel() {
        var self = this;
        self.displayForm = ko.observable(false);
        self.widthCheck = ko.observable(10);
        self.width;
        self.minWidth = 2;
        self.maxWidth = 50;
        self.widthPx = ko.computed(function() {
            return self.widthCheck()*25+'px';
        });
        self.heightCheck = ko.observable(10);
        self.height;
        self.minHeight = 2;
        self.maxHeight = 50;
        self.heightPx = ko.computed(function () {
            return self.heightCheck()*25+'px';
        });
        self.numberOfBlocks = function() {
            return self.width*self.height;
        };
        self.minesCheck = ko.observable(2);
        self.maxMines = ko.computed(function () {
            return self.widthCheck()*self.heightCheck()-1;
        });
        self.mines;
        self.openedCells = ko.observable(0);
        self.winCondition = ko.computed(function () {
            if ((self.numberOfBlocks()-self.minesCheck())===self.openedCells()) {
                self.isOver=true;
                self.displayWin(true);
            }
            
        });
        self.displayWin = ko.observable(false);
        self.displayLose = ko.observable(false);
        self.numberOfFlags = ko.observable(0);
        self.minesLeft = ko.computed(function () {
            return self.minesCheck()-self.numberOfFlags();
        });
        self.isOver = false;
        self.beginner = function () {
            self.widthCheck(10);
            self.heightCheck(10);
            self.minesCheck(10);
            self.newGame();
        };
        self.intermediate = function () {
            self.widthCheck(16);
            self.heightCheck(16);
            self.minesCheck(40);
            self.newGame();
        };
        self.expert = function () {
            self.widthCheck(30);
            self.heightCheck(16);
            self.minesCheck(100);
            self.newGame();
        };
        self.custom = function() {
            self.displayForm(true);
        };
        self.time=ko.observable();
        self.stopwatch =ko.computed(function() {
            setInterval(function () {
                if (self.isOver) return;
                if (isNaN(self.time())) return;
                var time=self.time();
                time++;
                self.time(time);
            }, 1000);
        });
        self.displayField = ko.observable(true);
        self.removingField = function () {
            self.displayField(false);
        };
        self.displayingField = function () {
            self.displayField(true);
        };
        self.gameArray = ko.observableArray ();
        self.newGame = function() {
            self.displayLose(false);
            self.displayWin(false);
            self.openedCells(0);
            self.numberOfFlags(0);
            self.time(0);
            self.isOver=false;
            self.displayForm(false);
            self.width = parseInt(self.widthCheck());
            self.height = parseInt(self.heightCheck());
            self.mines = parseInt(self.minesCheck());
            function clearArray () {
                self.gameArray.removeAll();
                         randomArray();
                for (i=0; i<self.numberOfBlocks(); i++) {
                    self.gameArray.push({id: i, 'isMine': self.a[i]<self.mines ? true: false, 'adjustment': '', 'isOpen':false, 'flag':false, 'questionMark':false, 'active': false });

                }
            };   
            function randomArray () {
                for (self.a = [], i=0; i<self.numberOfBlocks(); i++) {
                    self.a[i]=i;
                }
                function shuffle(array) {
                    var tmp, current, top = array.length;
                    while(--top) {
                    current = Math.floor(Math.random() * (top + 1));
                    tmp = array[current];
                    array[current] = array[top];
                    array[top] = tmp;
                    }
                    return array;
                }
                self.a = shuffle(self.a);
            };
            clearArray();   
        };
        self.openCell = function (block) {
            if (block.flag||block.questionMark) return;
            self.revealField(block);
        };
        self.revealField = function (block) {
            if(block.isOpen||self.isOver) return;
            if(block.isMine) {
                self.displayLose(true);
                self.gameover(block);
                return;
            }
            var a=self.openedCells(); a++; self.openedCells(a);
            if (block.flag) {
                var b=self.numberOfFlags(); b--; self.numberOfFlags(b);
            };
            var adjustmentMines = 0;
            calcualteAdjustmentMines();
            function calcualteAdjustmentMines () {  
                if (toLeft(block.id)) adjustmentMines++;
                if (toRight(block.id)) adjustmentMines++;
                if (toUp(block.id)) adjustmentMines++;
                if (toDown(block.id)) adjustmentMines++;
                if (toUpperLeft(block.id)) adjustmentMines++;
                if (toUpperRight(block.id)) adjustmentMines++;
                if (toDownLeft(block.id)) adjustmentMines++;
                if (toDownRight(block.id)) adjustmentMines++;

                function toLeft (id) {
                    if (id%self.width===0) {
                        return false;
                    } else if (self.gameArray()[id-1].isMine ) {
                        return true;
                    } else {
                        return false;
                    }
                }
                function toRight (id) {
                    if ((id+1)%self.width===0) {
                        return false;
                    } else if (self.gameArray()[id+1].isMine ) {
                        return true;
                    } else {
                        return false;
                    }
                }
                function toUp (id) {
                    if (id<self.width) {
                        return false;
                    } else if (self.gameArray()[id-self.width].isMine ) {
                        return true;
                    } else {
                        return false;
                    }
                }
                function toDown (id) {
                    if (id>=self.gameArray().length-self.width) {
                        return false;
                    } else if (self.gameArray()[id+self.width].isMine ) {
                        return true;
                    } else {
                        return false;
                    }
                }
                function toUpperLeft (id) {
                    if ((id%self.width===0)||(id<self.width)) {
                        return false;
                    } else if (self.gameArray()[id-self.width-1].isMine ) {
                        return true;
                    } else {
                        return false;
                    }
                }
                function toUpperRight (id) {
                    if (((id+1)%self.width===0)||(id<self.width)) {
                        return false;
                    } else if (self.gameArray()[id-self.width+1].isMine ) {
                        return true;
                    } else {
                        return false;
                    }
                }
                function toDownLeft (id) {
                    if ((id>=self.gameArray().length-self.width)||(id%self.width===0)) {
                        return false;
                    } else if (self.gameArray()[id+self.width-1].isMine ) {
                        return true;
                    } else {
                        return false;
                    }
                }
                function toDownRight (id) {
                    if ((id>=self.gameArray().length-self.width)||((id+1)%self.width===0)) {
                        return false;
                    } else if (self.gameArray()[id+self.width+1].isMine ) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
            
            var currentObject = new Object();
            currentObject.id=block.id;
            currentObject.isMine = block.isMine;
            currentObject.adjustment=adjustmentMines;
            currentObject.isOpen=true;
            currentObject.flag=false;
            currentObject.questionMark=false;
            currentObject.active=false;
            self.gameArray.splice(block.id, 1, currentObject);
            
            if (adjustmentMines===0) revealNearbyBlocks(block.id);
            function revealNearbyBlocks (id) {
                
                revealLeft(); 
                revealUp();
                revealRight();
                revealDown();
                revealUpperLeft();
                revealUpperRight();
                revealDownLeft();
                revealDownRight();
                function revealLeft() {
                    if (!(self.gameArray()[id].id%self.width===0)) {
                        self.revealField(self.gameArray()[id-1]);
                    }
                }
                function revealUp () {
                    if (!(self.gameArray()[id].id<self.width)) {
                        self.revealField(self.gameArray()[id-self.width]);
                    }
                }
                function revealRight() {
                    if (!((self.gameArray()[id].id+1)%self.width===0)) {
                        self.revealField(self.gameArray()[id+1]);
                    }
                }
                function revealDown() {
                    if (self.gameArray()[id].id<(self.gameArray().length-self.width)) {
                        self.revealField(self.gameArray()[id+self.width]);
                    }
                }
                function revealUpperLeft() {
                    if (!((self.gameArray()[id].id%self.width===0)||(self.gameArray()[id].id<self.width))) {
                        self.revealField(self.gameArray()[id-self.width-1]);
                    }
                }
                function revealUpperRight() {
                    if (!((self.gameArray()[id].id<self.width)||((self.gameArray()[id].id+1)%self.width===0))) {
                        self.revealField(self.gameArray()[id-self.width+1]);
                    }
                }
                function revealDownLeft() {
                    if ((!(self.gameArray()[id].id%self.width===0))&&(self.gameArray()[id].id<(self.gameArray().length-self.width))) {
                        self.revealField(self.gameArray()[id+self.width-1]);
                    }
                }
                function revealDownRight() {
                    if ((!((self.gameArray()[id].id+1)%self.width===0))&&(self.gameArray()[id].id<(self.gameArray().length-self.width))) {
                        self.revealField(self.gameArray()[id+self.width+1]);
                    }
                }
            }
        };
        
        self.flag = function (block) {
            if (block.isOpen||self.isOver||(!(block.flag)&&!(block.questionMark)&&self.minesLeft()===0)) return;
            var currentObject = new Object();
                currentObject.id=block.id;
                currentObject.isMine = block.isMine;
                currentObject.adjustment=block.adjustment;
                currentObject.isOpen=block.isOpen;
                currentObject.active=false;
                if (block.flag) {
                    currentObject.flag=false;
                    var a=self.numberOfFlags(); a--; self.numberOfFlags(a);
                    currentObject.questionMark=true;
                } else if (block.questionMark) {
                    currentObject.flag=false;
                    currentObject.questionMark=false;
                } else {
                    var a=self.numberOfFlags(); a++; self.numberOfFlags(a);
                    currentObject.flag=true;
                    currentObject.questionMark=false;
                }
            self.gameArray.splice(block.id, 1, currentObject);
        };
        
        self.gameover = function (block) {
            self.isOver = true;
            for (i=0; i<self.gameArray().length; i++) {
                if (self.gameArray()[i].isMine) {
                    var currentObject=new Object();
                    currentObject.id=self.gameArray()[i].id;
                    currentObject.isMine =true;
                    currentObject.adjustment=0;
                    currentObject.isOpen=true;
                    currentObject.flag=false; 
                    currentObject.questionMark=false;
                    if (i===block.id) {currentObject.active=true;}
                        else {currentObject.active=false;} 
                    self.gameArray.splice(i,1,currentObject);
                }
            }
        };
        
      
      
      
    };
    ko.applyBindings(new viewModel());  
});
