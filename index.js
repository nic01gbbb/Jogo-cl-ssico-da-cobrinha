const begin = document.querySelector(".begin")
const canvas = document.querySelector("canvas")
const header = document.querySelector("header")
const final = document.querySelector(".final")
let ponto = document.querySelector(".time")
let scorefinal = document.querySelector(".spanfinal")
const ctx = canvas.getContext("2d")  
const mp3 = new Audio("../audio.mp3")
let size = 30
let direction=""
ponto.innerHTML = "00"
scorefinal.innerHTML="00"
const positionsnake={x:240,y:300}
let snake=[positionsnake]

const movesnake=()=>{
ctx.fillStyle="#ddd"
snake.forEach((position,indice)=>{
if(indice=== snake.length-1){
ctx.fillStyle="white"
}
ctx.fillRect(position.x, position.y, size,size)
})
}




const drewsnake=()=>{
if(direction==="")return;
const head = snake[snake.length-1]
if(direction==="right"){
snake.push({x: head.x + size,y: head.y})   
}

else if(direction==="left"){
snake.push({x: head.x - size,y: head.y})   
}

else if(direction==="down"){
snake.push({x: head.x,y: head.y + size})   
}

else if(direction==="up"){
snake.push({x:head.x,y: head.y - size})   
}
snake.shift()

}

const load=()=>{ 
ctx.clearRect(0,0, 600,600)
greedstyle()
movesnake()
drewsnake() 
drewfood()
keydown()
validation()
gameover()
}
 
const loadgame = ()=>{
clearInterval(this.loop)
this.loop=setInterval(()=>{
load()
 

},300)

}




const resete=()=>{
    begin.style.display="none"
    canvas.style.display="flex"
    header.style.display="flex"
    }
    const backstep=()=>{
    canvas.style.display="none"
    header.style.display="none"
    begin.style.display="flex"
    }
    const backstep2=()=>{
    final.style.display="none"
    backstep()
    }
    
    
    const reseteinover=()=>{
    final.style.display="none"
    resete()
    }

 const numberroudom=(min,max)=>{
return Math.round(Math.random() * (max-min)+min)
}
const positionrandom=()=>{
const number = numberroudom(0,canvas.width -size)
 return Math.round(number/30)*30
}


const colorrandom=()=>{
const red = numberroudom(0,255)
const green = numberroudom(0,255)
const blue = numberroudom(0,255)


return `rgba(${red},${green},${blue})`
}

const greedstyle=()=>{
ctx.lineWidth=1
ctx.strokeStyle="red"

for(let i =30; i<canvas.width;i+=30){

ctx.lineTo(0,i)
ctx.lineTo(600,i)
ctx.stroke()
ctx.beginPath()

ctx.lineTo(i,0)
ctx.lineTo(i,600)
ctx.stroke()
ctx.beginPath()

}
}
const keydown=()=>{
document.addEventListener("keydown",({key})=>{
if(key==="ArrowRight" && direction!=="left"){
direction = "right"
}
else if(key==="ArrowLeft" && direction!=="right"){
direction = "left"
}

else if(key==="ArrowDown" && direction!=="up"){
direction = "down"
}

else if(key==="ArrowUp" && direction!=="down"){
direction = "up"
}
})
}
const validation=()=>{
 const head = snake[snake.length-1]
 if(head.x === food.x &&  head.y=== food.y){
mp3.play() 
snake.push(head)
ponto.innerHTML = +ponto.innerHTML+10

let x = positionrandom()
let y = positionrandom()

while(x== snake.x && y== snake.y){
x= x
y=y
}
food.x=x
food.y=y
food.color = colorrandom()
}
}

const gameover=()=>{
const head = snake[snake.length-1]
const nake = snake.length-2
const colid = head.x > canvas.width || head.x < canvas.width - canvas.width-size || head.y > canvas.width || head.y < canvas.width - canvas.width-size
const selfiecolid= snake.find((position,indice)=>{
return indice < nake && position.x == head.x && position.y == head.y
})

if(selfiecolid || colid){
game()
}
}
const game=()=>{
snake=[positionsnake]
direction=""
scorefinal.innerHTML = +ponto.innerHTML + " pontos"
final.style.display="flex"
canvas.style.display="none"
header.style.display="none"
ponto.innerHTML="00"
food.x=positionrandom()
food.y=positionrandom()
food.color=colorrandom()
}
const food={
x:positionrandom(),
y:positionrandom(),
color:colorrandom()}
    
const drewfood=()=>{
const {x,y,color}=food 

ctx.fillStyle=color
ctx.shadowBlur="15"
ctx.shadowColor=color
ctx.fillRect(x, y, size,size)
ctx.shadowBlur=0
}

loadgame()

