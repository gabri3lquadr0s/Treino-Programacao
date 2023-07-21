var grid, colums, rows, res = 10, canH = 500, canW = 500, total, neighbors
var b = [0,1]

/*Função para pegar as medidas customizadas*/
function getStuff(){
    canH = document.getElementById('canH').value
    canW = document.getElementById('canW').value
    res = document.getElementById('res').value
    /*Aqui tem uma validação para se o tamanho dos quadrados for maior que o mapa.
    Se isso for verdade, os valores são resetados para o padrão.*/
    if(res > canH || res > canW){
        alert('Por favor, digite um valor menor do que o tamanho do mapa.')
        res = 10, canH = 500, canW = 500
    }
    return res, canH, canW
}

/*Criação do array que gera a grade*/
function makeGrid(colums, rows){
    var a = new Array(colums)
    for(var i = 0; i < a.length; i++){
        a[i] = new Array(rows)
    }
    return a
}

/*Criação da grade inicial*/
function setup(){
    createCanvas(canW, canH)
    colums = canW / res
    rows = canH / res
    grid = makeGrid(colums, rows)
    /*Looping dentro de outro looping para prencher o array de 1s e 0s.*/
    for(var i = 0; i < colums; i++){
        for(var ii = 0; ii < rows;  ii++){
            grid[i][ii] = Math.floor(Math.random()*b.length)
        }
    }
    return grid
}

/*Função de desenhar as grades*/
function draw(){
    /*Checar cada linha e coluna, se o char for 1, quadrado branco, se for 0, quadrado preto*/
    for(var i = 0; i < colums; i++){
        for(var ii = 0; ii < rows;  ii++){
            var x = i * res
            var y = ii * res
            if(grid[i][ii] == 1){
                fill(255)
                rect(x, y, res, res)
            }else{
                fill(0)
                rect(x, y, res, res)
            }
        }
    }
    /*Inicialização da nova geração*/
    var nextGen = makeGrid(colums, rows)
    for(var i = 0; i < colums; i++){
        for(var ii = 0; ii < rows;  ii++){
            neighbors = countNeighbors(grid, i, ii)
            var state = grid[i][ii]
            /*Set de regras do jogo da vida*/
            if(state == 0 && neighbors == 3){
                nextGen[i][ii] = 1
            } else if(state == 1 && (neighbors > 3 || neighbors < 2)){
                nextGen[i][ii] = 0
            } else{
                nextGen[i][ii] = state            
            }
        }
    }
    grid = nextGen
    return nextGen
}

/*Tabela para identificar os chars vizinhos*/
function countNeighbors(grid, x, y){
    var sum = 0
    for(var i = -1; i < 2; i++){
        for(var ii = -1; ii < 2; ii++){
            var c = (x+i+colums) % colums
            var r = (y+ii+rows) % rows
            sum += grid[c][r]
            if(grid[x][y]){continue}
        }
    }
    return sum
}
