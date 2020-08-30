
const chessType = {
    0: '',
    1: '⭕️',
    2: '❌'
}
let chesses = [];
const MAX_CHCESSES = 9;
const ROW = 3;
const checkerboard = document.getElementById('checkerboard');
function initCheckeBroard() {
    for (let i = 0; i < MAX_CHCESSES; i++) {
        chesses[i] = 0;
        let chess = document.createElement('div');
        chess.className = 'chess';
        chess.addEventListener('click', () => {
            userMove(i);
        })
        checkerboard.appendChild(chess);
    }
}

function userMove (pos) {
    if (checkGridHadContent(pos)) {
        alert("这里已经有棋子了！")
        return false;
    }
    chesses[pos] = 1;
    updateInterface();
    if (checkWin(chesses, 1)) {
        alert("用户胜利")
    } else {
        aiMove();
    }
}

function aiMove () {
    const res = findBest(chesses,2)
    console.log(res)
    if (res.point)
        chesses[res.point[0] * 3 + res.point[1]] = 2
    updateInterface();
    if (checkWin(chesses,2)) {
        alert("AI胜利")
    }

}

function checkWin (patterns, current) {
    for (let i = 0; i < 3; i++) { //判断行
        let win = true
        for (let j = 0; j < 3; j++) {
            if (patterns[i * 3 + j] !== current) {
                win = false
                break;
            }
        }
        if (win)
            return true
    }
    {
        for (let i = 0; i < 3; i++) { //判断行
            let win = true
            for (let j = 0; j < 3; j++) {
                if (patterns[j * 3 + i] !== current) {
                    win = false
                    break;
                }
            }
            if (win)
                return true
        }
    }
    {
        let win = true
        for (let j = 0; j < 3; j++) {
            if (patterns[j * 3 + j] !== current) {
                win = false
                break;
            }
        }
        if (win)
            return true
    }
    {
        let win = true
        for (let j = 0; j < 3; j++) {
            if (patterns[j * 2 + 2] !== current){
                win = false
                break;
            }
        }
        if (win)
            return true
    }
    return false
}

const clone = (data) => Object.create(data)
//判断是否将要赢
const willWin = (patterns, current) => {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (patterns[i * 3 + j])
                continue
            const tmp = clone(patterns)
            tmp[i * 3 + j] = current
            if (checkWin(tmp, current)) {
                return [i , j]
            }
        }
    }
    return null
}

function findBest (patterns, current) {
    let p = willWin(patterns, current);
    if (p) {
        return {
            point: p,
            result: 1
        }
    }

    let point = null
    let result = -2

    end:for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (patterns[i * 3 + j] !==0)
                continue;
            const tmp = clone(patterns)
            tmp[i * 3 + j] = current
            let r = findBest(tmp, 3 - current)
            if (-r.result >= result) {  // 对方对差的情况就是我们最好的情况
                result = -r.result
                point = [i, j]
            }

            if (Number(result) === 1)
                break end

        }
    }

    return {
        point,
        result: point ? result : 0
    }
}

function checkGridHadContent (i) {
    return chesses[i] !== 0;
}

function updateInterface () {
    for (let i = 0; i < MAX_CHCESSES; i++) {
        let chess = document.getElementById("checkerboard").children[i];
        chess.textContent = chessType[chesses[i]];
    }
}

window.onload = initCheckeBroard();
