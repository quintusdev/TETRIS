//definisco le colonne della matrice (campo di gioco)
const BOARD_WIDTH = 10;
//definisco le righe della matriche (campo di gioco)
const BOARD_HEIGHT = 20;
//definisco la costante BOARD come un'array vuoto
const board = [];

//Dichiaro la variabile ROTATEDSHAPE
let rotatedShape;

// Questo ciclo esterno itera attraverso le righe della matrice. Il numero di iterazioni dipende dalla variabile BOARD_HEIGHT
for(let row=0; row < BOARD_HEIGHT; row++){
    //Per ogni iterazione del ciclo esterno, viene creata un array vuoto e assegnato all'array bidimensionale board all'indice row, cioè creo una riga vuota all'interno della matrice.
    board[row]=[];
    //Questo ciclo interno itera attraverso le colonne all'interno della riga corrente. Il numero di iterazioni dipende dalla variabile BOARD_WIDTH
    for(let col=0; col < BOARD_WIDTH; col++){
        /* Per ogni iterazione del ciclo interno, l'elemento all'incrocio della riga row e della colonna col viene impostato a 0. Quindi, stai inizializzando tutti gli elementi della matrice con il valore 0. */
        board[row][col] = 0;
    }
};

const tetrominoes = [
    {

        shape: [
            [1,1],
            [1,1]
        ],
        color: "#ffd800"
    },
    {
        shape: [
            [0,2,0],
            [2,2,2]
        ],
        color: "#7925dd"
    },
    {
        shape: [
            [0,3,3],
            [3,3,0]
        ],
        color: "orange"
    },
    {
        shape: [
            [4,4,0],
            [0,4,4]
        ],
        color: "red"
    },
    {
        shape: [
            [5,0,0],
            [5,5,5]
        ],
        color: "green"
    },
    {
        shape: [
            [0,0,6],
            [6,6,6]
        ],
        color: "#ff6400"
    },
    {
        shape: [
            [7,7,7,7],
        ],
        color: "#00b5ff"
    },
];

/* Questa funzione, chiamata randomTetromino, ha lo scopo di generare un tetromino casuale tra una lista predefinita di tetromini, assegnandogli una forma, un colore e posizionandolo inizialmente nella parte superiore della griglia di gioco (alla riga 0) in una colonna casuale. */
function randomTetromino() {
    /*  Questa riga genera un numero casuale tra 0 (incluso) e la lunghezza della lista tetrominoes (escluso). In questo modo, viene selezionato casualmente un tetromino dalla lista. */
    const index = Math.floor(Math.random()* tetrominoes.length);

    /*  Una volta scelto casualmente un tetromino, viene assegnato a una variabile chiamata tetromino. Questo oggetto contiene la forma del tetromino e il suo colore, come definiti nella lista tetrominoes. */
    const tetromino = tetrominoes[index];

    /* La funzione restituisce un oggetto con le seguenti proprietà: */
    return {
        //La forma del tetromino selezionato dalla lista 
        shape: tetromino.shape,
        //Il colore del tetromino selezionato dalla lista.
        color: tetromino.color,
        // La riga iniziale del tetromino viene impostata a 0, il che significa che il tetromino inizierà nella parte superiore della griglia di gioco
        row: 0,
        //La colonna iniziale del tetromino viene impostata in modo casuale, ma assicurandosi che il tetromino non esca dalla griglia.
        col: Math.floor(Math.random() * (BOARD_WIDTH - tetromino.shape[0].length +1))
        //La formula (BOARD_WIDTH - tetromino.shape[0].length + 1)calcola il massimo spazio disponibile nella griglia per il tetromino.
    }
}
/* Inizializza la variabile currentTetromino utilizzando la funzione randomTetromino(). Questo significa che currentTetromino ora contiene un tetromino casuale con una forma, un colore e una posizione iniziale. */
let currentTetromino = randomTetromino();

/* Inizializza la variabile currentGhostTetromino senza assegnarle un valore specifico. In altre parole, al momento è undefined e non contiene alcun tetromino. 
Questa variabile è utilizzata per rappresentare un "fantasma" o una copia trasparente del tetromino corrente nella griglia di gioco, utilizzata per mostrare al giocatore dove il tetromino cadrebbe se venisse rilasciato nella posizione corrente senza attendere ulteriori movimenti.*/
let currentGhostTetromino;

/* Questa è una funzione chiamata drawTetromino che è responsabile per disegnare il tetromino corrente sulla griglia di gioco.  */
function drawTetromino() {
    /*  Questa riga estrae la forma del tetromino corrente dalla variabile currentTetromino e la assegna alla variabile shape. */
    const shape = currentTetromino.shape;
    //Estrae il colore del tetromino corrente e lo assegna alla variabile color.
    const color = currentTetromino.color;
    //Estrae la riga corrente in cui è posizionato il tetromino dalla variabile currentTetromino e la assegna alla variabile row.
    const row = currentTetromino.row;
    //Estrae la colonna corrente in cui è posizionato il tetromino dalla variabile currentTetromino e la assegna alla variabile col.
    const col = currentTetromino.col;

    /* Il doppio ciclo for nidificato successivo viene utilizzato per scorrere gli elementi della forma del tetromino. La variabile r rappresenta la riga all'interno della forma del tetromino, mentre la variabile c rappresenta la colonna all'interno di quella riga. */
    for(let r=0; r<shape.length; r++){
        for(let c=0; c<shape[r].length; c++){

            /* Questo blocco if verifica se l'elemento nella posizione [r][c] della forma del tetromino è diverso da zero. Se è diverso da zero, significa che c'è un blocco del tetromino in quella posizione */
            if(shape[r][c]){
                //Viene creato un nuovo elemento <div> HTML, che rappresenterà un blocco del tetromino
                const block = document.createElement('div');
                //Aggiunge la classe CSS "block" all'elemento <div>
                block.classList.add('block');
                //Imposta il colore di sfondo del blocco del tetromino con il colore estratto dalla variabile color.
                block.style.backgroundColor= color;
                /* Imposta la posizione verticale (top) del blocco calcolando la posizione in base alla riga del tetromino e moltiplicando per 24 */ 
                block.style.top = (row+r) *24 + 'px';
                /* Imposta la posizione orizzontale (left) del blocco calcolando la posizione in base alla colonna del tetromino e moltiplicando per 24 */
                block.style.left = (col+c) *24 + 'px';
                //Imposta un attributo "id" univoco per il blocco del tetromino. 
                block.setAttribute('id', `block-${row+r}-${col+c}`);
                //Aggiunge il blocco del tetromino come figlio all'elemento con l'ID "game_board
                document.getElementById('game_board').appendChild(block);
            }
        }
    }
}

//erase tetromino from board
function eraseTetromino() {
    for (let i = 0; i < currentTetromino.shape.length; i++) {
        for (let j = 0; j < currentTetromino.shape[i].length; j++) {
            if(currentTetromino.shape[i][j] !== 0) {
                let row = currentTetromino.row+i;
                let col = currentTetromino.col+j;
                let block = document.getElementById(`block-${row}-${col}`);

                if(block) {
                    document.getElementById('game_board').removeChild(block);
                }
            }
        }
    }
}

/* function Collision Check */
function canTetrominoMove(rowOffset, colOffset){
    for(i=0; i<currentTetromino.shape.length; i++){
        for(j=0; j<currentTetromino.shape[i].length; j++){
            if(currentTetromino.shape[i][j] !== 0) {
                let row = currentTetromino.row + i + rowOffset;
                let col = currentTetromino.col + j + colOffset;

                if(row >= BOARD_HEIGHT || col<0 || col >= BOARD_WIDTH || (row >= 0 && board[row][col] !==0)) {
                    return false;
                }
            }
        }
    }
    return true;
}

/* function rotate tetromino */
function canTetrominoRotate(){
    for(let i =0; i < rotatedShape.length; i++){
        for(j=0; j<rotatedShape[i].length; j++){
            if(rotatedShape[i][j] !== 0){
                let row = currentTetromino.row + i;
                let col = currentTetromino.col + j;

                if(row >= BOARD_HEIGHT || col<0 || col >= BOARD_WIDTH || (row >= 0 && board[row][col] !==0)) {
                    return false;
                }
           }
        }
    }
    return true;
}

/* function lock tetromino */
function lockTetromino(){
    for(i=0; i<currentTetromino.shape.length; i++){
        for(j=0; j<currentTetromino.shape[i].length; j++){
            if(currentTetromino.shape[i][j] !== 0) {
                let row = currentTetromino.row + i
                let col = currentTetromino.col + j
                board[row][col] = currentTetromino.color;
            }
        }
    }

    //Clear Rows
    let rowsCleared = clearRows();
    if(rowsCleared > 0){
        //update score
    }
    currentTetromino=randomTetromino();
}

/* function pulizia row */
function clearRows(){
    let rowCleared = 0;

    for( let y = BOARD_HEIGHT -1; y >=0; y--){
        let rowFilled = true;

        for(let x=0; x<BOARD_WIDTH; x++){
            if(board[y][x] === 0){
                rowFilled=false;
                break;
            }
        }

        if(rowFilled){
            rowCleared++;
            for(let yy= y; yy > 0; yy--){
                for(let x=0; x<BOARD_WIDTH; x++){
                    board[yy][x]=board[yy-1][x];
                }
            }

            for(let x=0; x<BOARD_WIDTH; x++){
                board[0][x] = 0;
            }

            document.getElementById("game_board").innerHTML="";
            for(let row = 0; row<BOARD_HEIGHT; row++){
                for(let col = 0; col < BOARD_WIDTH; col++){
                    if(board[row][col]){
                        const block = document.createElement('div');
                        block.classList.add('block');
                        block.style.backgroundColor = board[row][col];
                        block.style.top = row * 24 + "px";
                        block.style.left = col * 24 + "px";
                        block.setAttribute('id', `block-${row}-${col}`);
                        if(block) {
                            document.getElementById('game_board').appendChild(block);
                        }
                    }
                }
            }
        }
    }
}

/* function rotate tetromino */
function rotateTetromino(){
    rotatedShape =[];
    for(i=0; i<currentTetromino.shape[0].length; i++){
        let row = [];
        for(let j = currentTetromino.shape.length -1; j>=0; j--){
            row.push(currentTetromino.shape[j][i]);
        }
        rotatedShape.push(row);
    }

    if(canTetrominoRotate()){
        eraseTetromino();
        currentTetromino.shape = rotatedShape;
        drawTetromino();
        moveGhostTetromino();
    }
}

/* function draw Tetromino */
function moveTetromino(direction) {
    let row= currentTetromino.row;
    let col= currentTetromino.col;

    if(direction === "left"){
        if(canTetrominoMove(0, -1)){
            eraseTetromino();
            col-=1;
            currentTetromino.col=col;
            currentTetromino.row=row;
            drawTetromino();
        }
    }else if(direction === "right"){
        if(canTetrominoMove(0, 1)){
            eraseTetromino();
            col+=1;
            currentTetromino.col=col;
            currentTetromino.row=row;
            drawTetromino();
        }
    }else {
        //down
        if(canTetrominoMove(1,0)){
            eraseTetromino();
            row++;
            currentTetromino.col=col;
            currentTetromino.row=row;
            drawTetromino();
        } else {
            lockTetromino();
        }
    }
    moveGhostTetromino();
}

drawTetromino();
setInterval(moveTetromino, 500);

/* draw ghost */
function drawGhostTetromino(){
    const shape = currentGhostTetromino.shape;
    const color = "rgba(255,255,255,0.5)";
    const row = currentGhostTetromino.row;
    const col = currentGhostTetromino.col;

    for(let r = 0; r < shape.length; r++){
        for(let c = 0; c < shape[r].length; c++){
            if(shape[r][c]){
                const block = document.createElement('div');
                block.classList.add('ghost');
                block.style.backgroundColor = color;
                block.style.top = (row + r) * 24 + "px";
                block.style.left = (col + c) * 24 + "px";
                block.setAttribute('id', `ghost-${row + r}-${col + c}`);
                if(block) {
                    document.getElementById('game_board').appendChild(block);
                }
            }
        }
    }
}

/* function erase ghost tetromino */
function eraseGhostTetromino(){
    const ghost = document.querySelectorAll('.ghost');
    for(let i = 0; i < ghost.length; i++){
        ghost[i].remove();
    }
}

function canGhostTetrominoMove(rowOffset, colOffset){
    for(i=0; i<currentGhostTetromino.shape.length; i++){
        for(j=0; j<currentGhostTetromino.shape[i].length; j++){
            if(currentGhostTetromino.shape[i][j] !== 0) {
                let row = currentGhostTetromino.row + i + rowOffset;
                let col = currentGhostTetromino.col + j + colOffset;

                if(row >= BOARD_HEIGHT || col<0 || col >= BOARD_WIDTH || (row >= 0 && board[row][col] !==0)) {
                    return false;
                }
            }
        }
    }
    return true;
}

/* function move ghost tetromino */
function moveGhostTetromino(){
    eraseGhostTetromino();

    currentGhostTetromino = {...currentTetromino};

    while(canGhostTetrominoMove(1,0)){
        currentGhostTetromino.row++;
    }

    drawGhostTetromino();
}

/* function drop tetromino */
function dropTetromino(){
    let row = currentTetromino.row;
    let col = currentTetromino.col;

    while(canTetrominoMove(1,0)){
        eraseTetromino();
        row++;
        currentTetromino.col = col;
        currentTetromino.row = row;
        drawTetromino();
    }
    lockTetromino();
}

document.addEventListener("keydown", handleKeyPress);

function handleKeyPress(event){
    switch (event.keyCode) {
        case 37: //left arrow
            moveTetromino("left");
            break;
        case 39: //right arrow
            moveTetromino("right");
            break;
        case 40: //down arrow
            moveTetromino("down");
            break;
        case 38: //up arrow
            //rotate
            rotateTetromino();
            break;
        case 32: //space bar
            //drop
            dropTetromino();
            break;
        default:
            break;
    }
}