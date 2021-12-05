    var cols,
        rows;
    let table = [];
    var user = {
        name: '',
        time: 0
    }

    var startTime, endTime; 
    var sec = 0; 
    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    // @anahiita pls choose the right name for varible
    var a , b;
    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    function getName(){
        // @anahita this function is very large, it is better to divide it into smaller functinos
        cols = document.getElementById('cols').value;
        rows = document.getElementById('rows').value;
        user.name = document.getElementById("userName").value;
        a = rows-1;
        b = 0;
        // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
        // const width = rows*52, 
        // height = cols*52;
        const [width, height] = [rows * 52, cols * 52]
        // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

        // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
        // @anahita pls write your variable name in camelCase : JSONnameCounter --> jsonNameCounter
        // it's better to write a seperate function for getting your local storage

        // let JSONnameCounter = localStorage.getItem("nameCounter");
        // let nameCounter = JSON.parse(JSONnameCounter);

        let nameCounter = getNameFromStorage()
        // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

        // ############################################################################
        // it's better to write a seperate function for setting your local storage
        setLocalStorage(nameCounter)
        // if(nameCounter == null){
        //     nameCounter = [];
        //     let JSONnameCounter = JSON.stringify(nameCounter);
        //     localStorage.setItem("nameCounter", JSONnameCounter);
        // }
        // ###########################################################################

        // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
        setWrapperStyle(width, height)
        // document.getElementById("wrapper").style.height = `${height}px`;
        // document.getElementById("wrapper").style.width = `${width}px`;
        // document.getElementById('container').style.display = 'flex';
        // document.getElementById('startBox').style.display = 'none';
        // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

        // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
        selectMazeAlgorithm()
        // var e = document.getElementById("Algorithm").value;
        // if(e == 'Prim'){
        //     primTable();
        // } else {
        //     huntAndKillTable();
        // }
        // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
        drawTable();
        drawBorders();
        document.addEventListener('keydown', checkKey);
        sec = 0;
        start();
    }


    function setLocalStorage(storageValue) {
        if(storageValue == null){
            storageValue = [];
            let jsonNameCounter = JSON.stringify(storageValue);
            localStorage.setItem("nameCounter", jsonNameCounter);
        }
    }

    function getNameFromStorage() {
        let jsonNameCounter = localStorage.getItem("nameCounter");
        return JSON.parse(jsonNameCounter);
    }

    function setWrapperStyle(width, height) {
        document.getElementById("wrapper").style.height = `${height}px`;
        document.getElementById("wrapper").style.width = `${width}px`;
        document.getElementById('container').style.display = 'flex';
        document.getElementById('startBox').style.display = 'none';
    }

    function selectMazeAlgorithm() {
        var e = document.getElementById("Algorithm").value;
        if(e == 'Prim'){
            primTable();
        } else {
            huntAndKillTable();
        }
    }
    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    // @anahita pls define your global variable in the first of file
    // var startTime, endTime; 
    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    function start() {
        startTime = new Date();
    };
    function end() {
        endTime = new Date();
        var timeDiff = endTime - startTime;
        timeDiff /= 1000;
        var seconds = Math.round(timeDiff);
        document.getElementById('result').style.display = 'flex';
        document.getElementById('time').innerHTML = seconds;
        user.time = seconds;
    }
    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    // @anahita pls define your global variable in the first of file
    // var sec = 0; 
    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    function pad ( val ) { return val > 9 ? val : "0" + val; }
    setInterval( function(){
        document.getElementById("seconds").innerHTML=pad(++sec%60);
        document.getElementById("minutes").innerHTML=pad(parseInt(sec/60,10));
    }, 1000);
    function checkKey(e) {
        e = e || window.event;

        if (e.keyCode == '38') {    
            // up
            if( a > 0 && table[a-1][b].s == true){
                document.getElementById(`${a}-${b}`).style.backgroundColor = 'white';
                a += -1;
                document.getElementById(`${a}-${b}`).style.backgroundColor = 'yellow';    
            }        
        }
        else if (e.keyCode == '40') {
            //down 
            if( a < table.length-1 && table[a][b].s == true){
                document.getElementById(`${a}-${b}`).style.backgroundColor = 'white';
                a += 1;
                document.getElementById(`${a}-${b}`).style.backgroundColor = 'yellow';    
            }        
        }
        else if (e.keyCode == '37') {
            // left 
            if( b > 0 && table[a][b-1].e == true){
                document.getElementById(`${a}-${b}`).style.backgroundColor = 'white';
                b += -1;
                document.getElementById(`${a}-${b}`).style.backgroundColor = 'yellow';    
            }        
        }
        else if (e.keyCode == '39') {
        // right
            if( b < table[0].length -1 && table[a][b].e == true){
                document.getElementById(`${a}-${b}`).style.backgroundColor = 'white';
                b += 1;
                document.getElementById(`${a}-${b}`).style.backgroundColor = 'yellow';    
            }
        }
        if(a == 0 && b == cols -1) {
            alert("YOU ROCK!");
            document.removeEventListener('keydown', checkKey)
            end();
            document.getElementById("counter").style.display = 'none';
            JSONnameCounter = localStorage.getItem("nameCounter");
            nameCounter = JSON.parse(JSONnameCounter);
            nameCounter.push(user);
            JSONnameCounter = JSON.stringify(nameCounter);
            localStorage.setItem("nameCounter", JSONnameCounter);
            resultChart();
        }
    }   
    function drawTable(){
        const wrapper = document.getElementById('wrapper')
        for (let i = 0; i < rows; i++){
            for(let j = 0; j < cols; j++)
            {
                const div = document.createElement('div')
                div.style.width = '50px'
                div.style.height = '50px'
                div.style.border = '1px solid white'
                div.id = `${i}-${j}`
                wrapper.appendChild(div);
            }
        }
    }
    function drawBorders(){
        document.getElementById(`${a}-${b}`).style.backgroundColor = 'yellow';
        for(let i = 0; i < rows; i++){
            for(let j=0; j < cols; j++){
                if(table[i][j].e == false){
                    document.getElementById(`${i}-${j}`).style.borderRightColor = "black"
                }
                if(table[i][j].s == false){
                    document.getElementById(`${i}-${j}`).style.borderBottomColor = "black"
                }
            }
        }
    }
    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
    function primTable(){
        for(let i = 0; i<rows; i++){
            table.push([]);
            for(let j = 0; j<cols; j++){
                table[i][j] = {
                    i: i,
                    j: j,
                    e: false,
                    s: false, 
                    visited: false,
                    frontierCells: [],
                    frontier: false
                };
            }
        }
        for(let i = 0; i<rows; i++){
            for(let j = 0; j<cols; j++){
                if( i == 0 && j == 0){
                    //top right
                    table[i][j].frontierCells.push(table[i+1][j] , table[i][j+1]);
                } else if( i == 0 && j == cols-1){
                    //top left
                    table[i][j].frontierCells.push(table[i+1][j] , table[i][j-1]);
                } else if( i == rows-1 && j == cols-1){
                    //bottom left
                    table[i][j].frontierCells.push(table[i-1][j] , table[i][j-1]);
                } else if( i == rows-1 && j == 0){
                    //bottom right
                    table[i][j].frontierCells.push(table[i-1][j] , table[i][j+1]);
                } else if( i == 0){
                    //top
                    table[i][j].frontierCells.push(table[i+1][j] , table[i][j-1] , table[i][j+1]);
                } else if( j == cols-1){
                    //right
                    table[i][j].frontierCells.push(table[i-1][j] , table[i][j-1] , table[i+1][j]);
                } else if( i == rows-1){
                    //bottom
                    table[i][j].frontierCells.push(table[i-1][j] , table[i][j-1] , table[i][j+1]);
                } else if( j == 0){
                    //left
                    table[i][j].frontierCells.push(table[i-1][j] , table[i][j+1] , table[i+1][j]);
                } else {
                    //in the table
                    table[i][j].frontierCells.push(table[i-1][j] , table[i][j-1] , table[i+1][j] , table[i][j+1]);
                }
            }
        }
        prim();
    }
    function prim(){
        let edges = [];
        for(let i= 0; i<rows ; i++){
            edges.push(table[0][i]);
            edges.push(table[rows-1][i]);
        }
        for(let i= 1; i<cols-1 ; i++){
            edges.push(table[i][0]);
            edges.push(table[i][cols-1]);
        }
        let currentCell;
        let startIndex = edges[getRandomInt(edges.length-1)];
        startIndex.visited = true;
        currentCell = startIndex;
        frontiers = [];
        for(let i = 0; i < currentCell.frontierCells.length; i++){
            frontiers.push(currentCell.frontierCells[i]);
            currentCell.frontierCells[i].frontier = true;
        }
        function addNewCell(){
            let x = getRandomInt(frontiers.length-1);
            currentCell = frontiers[x];
            currentCell.visited = true;
            frontiers.splice(x,1);
            let randomCell = [];
            for(let i = 0; i < currentCell.frontierCells.length; i++){
                if (currentCell.frontierCells[i].visited == true){
                    randomCell.push(currentCell.frontierCells[i]);
                }
            }
                let randomIndex = getRandomInt(randomCell.length);
                let randomWall = randomCell[randomIndex];
                if(randomWall.i < currentCell.i){
                    randomWall.s = true;
                }
                if(randomWall.i > currentCell.i){
                    currentCell.s = true;
                }
                if(randomWall.j > currentCell.j){
                    currentCell.e = true;
                }
                if(randomWall.j < currentCell.j){
                    randomWall.e = true;
                }
            for(let i = 0; i < currentCell.frontierCells.length; i++){
                if(currentCell.frontierCells[i].frontier == false && currentCell.frontierCells[i].visited == false){
                    frontiers.push(currentCell.frontierCells[i]);
                    currentCell.frontierCells[i].frontier = true;
                }
            }
        }
        while(frontiers.length > 0){
            addNewCell();
        }
    }
    function huntAndKillTable(){
        for(let i = 0; i<rows; i++){
            table.push([]);
            // table[i] = []
            for(let j = 0; j<cols; j++){
                table[i][j] = {
                    i: i,
                    j: j,
                    e: false,
                    s: false, 
                    visited: false,
                    frontierCells: [],
                    frontier: false
                };
            }
        }
        for(let i = 0; i<rows; i++){
            for(let j = 0; j<cols; j++){
                if( i == 0 && j == 0){
                    //top right
                    table[i][j].frontierCells.push(table[i+1][j] , table[i][j+1]);
                } else if( i == 0 && j == cols-1){
                    //top left
                    table[i][j].frontierCells.push(table[i+1][j] , table[i][j-1]);
                } else if( i == rows-1 && j == cols-1){
                    //bottom left
                    table[i][j].frontierCells.push(table[i-1][j] , table[i][j-1]);
                } else if( i == rows-1 && j == 0){
                    //bottom right
                    table[i][j].frontierCells.push(table[i-1][j] , table[i][j+1]);
                } else if( i == 0){
                    //top
                    table[i][j].frontierCells.push(table[i+1][j] , table[i][j-1] , table[i][j+1]);
                } else if( j == cols-1){
                    //right
                    table[i][j].frontierCells.push(table[i-1][j] , table[i][j-1] , table[i+1][j]);
                } else if( i == rows-1){
                    //bottom
                    table[i][j].frontierCells.push(table[i-1][j] , table[i][j-1] , table[i][j+1]);
                } else if( j == 0){
                    //left
                    table[i][j].frontierCells.push(table[i-1][j] , table[i][j+1] , table[i+1][j]);
                } else {
                    //in the table
                    table[i][j].frontierCells.push(table[i-1][j] , table[i][j-1] , table[i+1][j] , table[i][j+1]);
                }
            }
        }
        huntAndKill();
    }
    function huntAndKill(){
        let currentCell = table[rows-1][0];
        currentCell.visited = true;
        function addNewCell(){
            let randomCell = [];
            for(let i = 0; i < currentCell.frontierCells.length; i++){
                if (currentCell.frontierCells[i].visited == false){
                    randomCell.push(currentCell.frontierCells[i]);
                }
            }
            if(randomCell.length != 0 ){
                goToFrontier();
            } else {
                newStart();
            }
            function goToFrontier(){
                let randomIndex = getRandomInt(randomCell.length);
                let randomWall = randomCell[randomIndex];
                if(randomWall.i < currentCell.i){
                    randomWall.s = true;
                }
                if(randomWall.i > currentCell.i){
                    currentCell.s = true;
                }
                if(randomWall.j > currentCell.j){
                    currentCell.e = true;
                }
                if(randomWall.j < currentCell.j){
                    randomWall.e = true;
                }
                currentCell = randomWall;
                currentCell.visited = true;
            }
            function newStart(){
                for(let i = 0; i < rows ; i++){
                    for(let j = 0; j < cols; j++){
                        if(table[i][j].visited == true){
                            for(let k = 0; k < table[i][j].frontierCells.length; k++){
                                if(table[i][j].frontierCells[k].visited == false){
                                    currentCell = table[i][j];
                                    randomCell = [];
                                    for(let i = 0; i < currentCell.frontierCells.length; i++){
                                        if (currentCell.frontierCells[i].visited == false){
                                            randomCell.push(currentCell.frontierCells[i]);
                                        }
                                    }
                                    goToFrontier();
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        }
        let counter = 0; 
        while(counter < cols*rows - 2){
            addNewCell();
            counter++
        }
    }
    function resultChart(){
        let JSONresults = localStorage.getItem('nameCounter');
        let results = JSON.parse(JSONresults);
        results.sort((a, b) => a.time - b.time);
        for(let i = 0; i < results.length; i++){
            const res = document.createElement('div');
            res.id = `res-${i}`;
            res.innerHTML = `${results[i].name} <br>${results[i].time}`;
            document.getElementById('resultChart').appendChild(res);
        }

    }
