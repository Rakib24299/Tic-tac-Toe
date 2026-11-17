let boxs=document.querySelectorAll(".box")

let resetbtn= document.querySelector(".resetbtn")

let newgamebtn = document.querySelector(".newgamebtn");

let msgcontainer= document.querySelector(".msgcontainer");

let  massage= document.querySelector("#massage");

let turnO = true ;  

let winptrn = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
]

const resetgame=()=>{

    turnO= true;
    enableleboxs();
    msgcontainer.classList.add("hide")

}

boxs.forEach((box)=>{
    box.addEventListener("click",()=>{

        console.log("box is clicked")
        // box.innerText="X";
        if (turnO===true){
            box.innerText= "O";     //player 0
            turnO= false;
        }
        else{
            box.innerText= "X";     //player x
            turnO= true;
        }
        box.disabled=  true ;
        
        cheakwinner();
    })
})



const desibleboxs=()=>{
    for ( let box of boxs)
    {
        box.desibled= true;
    }
}


const enableleboxs=()=>{
    for ( let box of boxs)
    {
        box.desibled= false;
        box.innerText="";
    }
}

const showwinner=(Winner)=>{
    massage.innerText = `Congratulations! Winner is ${Winner}`;
    msgcontainer.classList.remove("hide")
    desibleboxs();
}

const cheakwinner= ()=>{
    for (let pattern of winptrn){
        // console.log(pattern)
        let position1= boxs[pattern[0]].innerText
        let position2= boxs[pattern[1]].innerText
        let position3= boxs[pattern[2]].innerText
        
        
        if(position1 != "" && position2 !="" && position3 !="")
            
        {
            if( position1 === position2 && position2 === position3 )
            {
                console.log(" Winner",position1);

                showwinner(position1);
            }
        }
    }
}

newgamebtn.addEventListener('click', newgamebtn);
newgamebtn.addEventListener('click', resetbtn);
