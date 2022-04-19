var btn = document.getElementById("btn");
var character = document.getElementById("character");
var block = document.getElementById("block");
var counter = 0;
var jumpAudio = new Audio("audio/jump.wav");
var deathAudio = new Audio("audio/death.wav");
var gameSong = new Audio("audio/gameSong.wav");
var lvlAudio = new Audio("audio/10.wav")
var HSAudio = new Audio("audio/newHS.wav")

jumpAudio.load();

jumpAudio.volume = 0.6;

function jump() {
    if (character.classList == "animatech") {
        return 
    }
    character.classList.add("animatech");
    setTimeout(function(){
        character.classList.remove("animatech");
    },300);
    jumpAudio.play();
}

function main() {
    
    gameSong.load();
    deathAudio.load();
    
    
    var newHS = 0
    var sb=document.getElementById('scorebest');
    
    gameSong.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
    gameSong.currentTime = 0;
    gameSong.volume = 0.5;
    gameSong.play();
    
    function check() {
        let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
        let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
        
        if (blockLeft<20 && blockLeft>-20 && characterTop>=130) {
            dead()
        } else { 
            next();
        }
    }
    
    function dead() {
        btn.style.display = "inline";
        block.classList.remove("animateb");
        clearInterval(core);
        console.log("dead");
        gameSong.pause();
        deathAudio.play();
        
        function delay(time) {
            return new Promise(resolve => setTimeout(resolve, time));
        }
        
        delay(10).then(() =>
        alert("Game Over. score: " + Math.floor(counter/100)))
        
        if(sb.innerHTML < Math.floor(counter/100)) {
            sb.innerHTML= Math.floor(counter/100);
        }
        counter=0;
    }
    
    function next() {
        counter++;
        document.getElementById("scoreSpan").innerHTML = Math.floor(counter/100);
        if (Math.floor(counter/100) % 10 == 0 && Math.floor(counter/100) != 0 && (Math.floor(counter/100)-1) != sb.innerHTML) {
            lvlAudio.play();
            
        }
        
        if (Math.floor(counter/100) > sb.innerHTML && newHS == 0 && sb.innerHTML != 0) {
            HSAudio.play();
            newHS = 1;
        }
    }
    
    
    if (block.classList == "animateb") {
        return
    }
    
    block.classList.add("animateb");
    
    var core=setInterval(check, 10);}
