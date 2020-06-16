var sw = 26, // 一个方块的宽度
    sh = 26, // 高度
    tr = 22, // 行数
    td = 33; // 列数

var snake = null, // 蛇的实例
    food = null, // 食物的实例
    foodArr = [],
    randomIdx = ['a', 'b', 'c'],
    game = null; // 游戏实例

// 问题
var ques = [{
    text: '2 + 3 = ？',
    option: [5, 6, 7],
    anwser: 'a'
}, {

    text: '4 + 3 = ?',
    option: [9, 6, 7],
    anwser: 'c'
}];
var progress = 0; // 答题进度
// 方块构造函数
function Square(x, y, classname) {
    this.x = x * sw;
    this.y = y * sh;
    this.class = classname;

    this.viewContent = document.createElement('div');
    this.viewContent.className = this.class;
    this.parent = document.getElementById('snakeWrap');
}

Square.prototype.create = function () { // 创建方块dom
    this.viewContent.style.position = 'absolute';
    this.viewContent.style.width = sw + 'px';
    this.viewContent.style.height = sh + 'px';
    this.viewContent.style.left = this.x + 'px';
    this.viewContent.style.top = this.y + 'px';

    this.parent.appendChild(this.viewContent)
}

Square.prototype.remove = function () {
    this.parent.removeChild(this.viewContent);
}

// 蛇
function Snake() {
    this.head = null; //蛇头
    this.tail = null; // 蛇尾
    this.pos = []; // 存储蛇身上的每一个方块的位置
    this.directionNum = { // 存储蛇走的方向，用一个对象来表示
        left: {
            x: -1,
            y: 0,
            rotate: 180 // 蛇头旋转角度
        },
        right: {
            x: 1,
            y: 0,
            rotate: 0
        },
        up: {
            x: 0,
            y: -1,
            rotate: -90
        },
        down: {
            x: 0,
            y: 1,
            rotate: 90
        }
    }
}

Snake.prototype.init = function () {
    // 创建蛇头
    var snakeHead = new Square(2, 0, 'snakeHead');
    snakeHead.create();
    this.head = snakeHead; // 存储蛇头信息
    this.pos.push([2, 0]) // 存储蛇头位置
    // 创建蛇身体
    var snakeBody1 = new Square(1, 0, 'snakeBody');
    snakeBody1.create();
    this.pos.push([1, 0]) // 存储蛇身1位置

    var snakeBody2 = new Square(0, 0, 'snakeBody');
    snakeBody2.create();
    this.tail = snakeBody2; // 存储蛇尾信息
    this.pos.push([0, 0]) // 存储蛇身1位置

    // 形成链表关系
    snakeHead.last = null;
    snakeHead.next = snakeBody1;

    snakeBody1.last = snakeHead;
    snakeBody1.next = snakeBody2;

    snakeBody2.last = snakeBody1;
    snakeBody2.next = null;

    // 给蛇添加一个属性，用来表示蛇走的方向
    this.direction = this.directionNum.right; // 默认往右走

}

// 获取蛇头的下一个位置对应的元素，要根据元素做不同的事情
Snake.prototype.getNextPos = function () {
    var nextPos = [
        this.head.x / sw + this.direction.x,
        this.head.y / sh + this.direction.y
    ]
    // 下个点是自己，游戏结束
    var selfCollied = false; //是否撞到了自己
    this.pos.forEach(function (value) {
        if (value[0] == nextPos[0] && value[1] == nextPos[1]) {
            selfCollied = true;
        }
    });
    if (selfCollied) {
        this.strategies.die.call(this);
        return;
    }
    // 下个点是围墙，游戏结束
    if (nextPos[0] < 0 || nextPos[1] < 0 || nextPos[0] > td - 1 || nextPos[1] > tr - 1) {
        this.strategies.die.call(this);
        return;
    }

    // 下个点是食物，吃
    foodArr.forEach(food => {
        // console.log('food===', food);

        if (food.pos[0] == nextPos[0] && food.pos[1] == nextPos[1]) {
            console.log('撞到食物了:', food.type);
            // 判断一下答题有没有对
            var nowAnswer = ques[progress]['anwser'];
            if (nowAnswer !== food.type) {
                this.strategies.move.call(this);
                createFood();
                setTimeout(() => {
                    this.strategies.die();
                }, 0);
                return;
            }
            this.strategies.eat.call(this, food);
            return;
        }
    });

    // 下个点什么都不是，走
    this.strategies.move.call(this);

};

// 处理碰撞后要做的事
Snake.prototype.strategies = {
    move: function (format) { // 该参数用于决定是否删除蛇尾
        // 创建新身体，在旧蛇头的位置
        var newBody = new Square(this.head.x / sw, this.head.y / sh, 'snakeBody');
        // 更新链表的关系
        newBody.next = this.head.next;
        newBody.next.last = newBody;
        newBody.last = null;

        this.head.remove(); // 把旧蛇头从原来的位置删除
        newBody.create();

        // 创建蛇头:蛇头下一个点
        var newHead = new Square(this.head.x / sw + this.direction.x, this.head.y / sh + this.direction.y, 'snakeHead');

        // 更新链表的关系
        newHead.next = newBody;
        newHead.last = null;
        newBody.last = newHead;

        newHead.viewContent.style.transform = 'rotate(' + this.direction.rotate + 'deg)';

        newHead.create();

        // 更新蛇身上每一个方块的坐标
        this.pos.splice(0, 0, [this.head.x / sw + this.direction.x, this.head.y / sh + this.direction.y]);
        this.head = newHead; //更新this.head

        if (!format) { // false: 需要删除（处理吃之外的操作）
            this.tail.remove();
            this.tail = this.tail.last;
            this.pos.pop();
        }
    },
    eat: function () {
        this.strategies.move.call(this, true);
        createFood();
        switchQues();
        game.score++;
    },
    die: function () {
        game.over();
    }
}

snake = new Snake();
// snake.init();

// 创建食物
function createFood() {
    //生成食物
    foodArr = [];
    randomIdx.forEach(item => {
        //食物小方块的随机坐标
        var x = null;
        var y = null;

        var include = true;	//循环跳出的条件，true表示食物的坐标在蛇身上（需要继续循环）。false表示食物的坐标不在蛇身上（不循环了）
        while (include) {
            x = Math.round(Math.random() * (td - 1));
            y = Math.round(Math.random() * (tr - 1));

            snake.pos.forEach(function (value) {
                if (x != value[0] && y != value[1]) {
                    //这个条件成立说明现在随机出来的这个坐标，在蛇身上并没有找到。
                    include = false;
                }
            });
        }
        var randomCls = `food_${item}`;
        food = new Square(x, y, randomCls);
        food.pos = [x, y];
        food.type = item;
        foodArr.push(food);

        var foodDom = document.querySelector(`.${randomCls}`);
        if (foodDom) {
            foodDom.style.left = x * sw + 'px';
            foodDom.style.top = y * sh + 'px';
        } else {
            food.create();
        }
    });
}

function switchQues(isInit) {
    if (!isInit) {
        if (progress === ques.length - 1) {
            game.pause();
            clearInterval(scorer);
            var a = score.innerText;
            var node1 = document.createTextNode(a);
            var node2 = document.createElement("font");
            node2.appendChild(node1);
            document.getElementById("back").appendChild(node2);
            var popBox = document.getElementById("popBox1");
            popBox.style.display = "block";
            progress = 0;
        } else {
            progress++;
        }
    }
    var quesTextDom = document.querySelector('.quesText');
    var optionsDom = document.querySelector('.options');
    var nowQues = ques[progress]['text'];
    var nowOpts = ques[progress]['option'];

    quesTextDom.innerText = nowQues;
    console.log('optionsDom.children', optionsDom.children);

    [...optionsDom.children].forEach((child, idx) => {
        child.getElementsByTagName('i')[0].innerText = nowOpts[idx];
    });
}
// 创建游戏逻辑
function Game() {
    this.timer = null;
    this.score = 0;
}
Game.prototype.init = function () {
    snake.init();
    switchQues(true);
    createFood();

    document.onkeydown = function (ev) {
        // 用户按下左键， 蛇不能是正在往右走的
        if (ev.which == 37 && snake.direction != snake.directionNum.right) {
            snake.direction = snake.directionNum.left;
        } else if (ev.which == 38 && snake.direction != snake.directionNum.down) {
            snake.direction = snake.directionNum.up;
        } else if (ev.which == 39 && snake.direction != snake.directionNum.left) {
            snake.direction = snake.directionNum.right;
        } else if (ev.which == 40 && snake.direction != snake.directionNum.up) {
            snake.direction = snake.directionNum.down;
        } else if (ev.which == 32) {
            if (pauseBtn.parentNode.style.display == 'block') {
                game.start();
                pauseBtn.parentNode.style.display = 'none';

            } else {
                game.pause();
                pauseBtn.parentNode.style.display = 'block';
            }
        }
    }
    this.start();
}

Game.prototype.start = function () {
    // 开始游戏
    this.timer = setInterval(function () {
        snake.getNextPos();
    }, 200);
}
Game.prototype.pause = function () {
    clearInterval(this.timer);
}
// 游戏结束
Game.prototype.over = function () {
    clearInterval(this.timer);
    clearInterval(scorer);

    var popBox = document.getElementById("popBox2");
    popBox.style.display = "block";
}
$('.return').on('click', function () {
    window.location.href = "level_choosing"
})
$('.again').on('click', function () {
    window.location.href = "level1"
})
$('.next').on('click', function () {
    window.location.href = "level2"
})

// 开启游戏
game = new Game();
var startBtn = document.querySelector('.startBtn button');

// 暂停游戏
var snakeWrap = document.getElementById('snakeWrap');
var pauseBtn = document.querySelector('.pauseBtn button');
snakeWrap.onclick = function () {
    game.pause();
    pauseBtn.parentNode.style.display = 'block';
}
pauseBtn.onclick = function () {
    game.start();
    pauseBtn.parentNode.style.display = 'none';
}

var score = document.getElementById("score"),
    scorer = null,
    Score = 1000;

startBtn.onclick = function () {
    startBtn.parentNode.style.display = 'none';
    game.init();
    scorer = setInterval(function () {
        Score--;
        if (Score > 99) {
            score.innerText = Score;
        } else if (Score > 9) {
            score.innerText = "0" + Score;;
        } else if (Score > 0) {
            score.innerText = "00" + Score;;
        } else {
            score.innerText = "000";;
        }
    }, 1000)
}

