S1= "";
Leftwrist=0
Rightwrist=0;
Leftwristx=0;
Leftwristy=0;
Rightwristx=0;
Rightwristy=0;

function preload(){
S1= loadSound("Speechless.mp3");
}

function setup(){
canvas= createCanvas(400,300);
canvas.center();
video= createCapture(VIDEO);
video.hide();
posenet= ml5.poseNet(video, modelLoaded);
posenet.on("pose", gotPoses);

}

function gotPoses(results){
    if (results.length > 0){
        console.log(results);
        Leftwristx=results[0].pose.leftWrist.x;
        Leftwristy=results[0].pose.leftWrist.y;
        Rightwristx=results[0].pose.rightWrist.x;
        Rightwristy=results[0].pose.rightWrist.y;
        Leftwrist=results[0].pose.keypoints[9].score;
        Rightwrist=results[0].pose.keypoints[10].score;
    }
}

function modelLoaded(){
    console.log("Model has been loaded");
}
function draw(){
image(video, 0,0,400,300);

fill("green");
stroke("red");

if(Leftwrist > 0.2){
circle(Leftwristx, Leftwristy, 20);
if(Leftwristy>0&&Leftwristy<=100){
    document.getElementById("Speed").innerHTML="Speed is 0.5x";
S1.rate(0.5);
}
else if(Leftwristy>100&&Leftwristy<=200){
    document.getElementById("Speed").innerHTML="Speed is 1x";
S1.rate(1);
}
else if(Leftwristy>200&&Leftwristy<=300){
    document.getElementById("Speed").innerHTML="Speed is 1.5x";
S1.rate(1.5);
}
else if(Leftwristy>300&&Leftwristy<=400){
    document.getElementById("Speed").innerHTML="Speed is 2x";
S1.rate(2);
}
else if(Leftwristy>400&&Leftwristy<=500){
    document.getElementById("Speed").innerHTML="Speed is 2.5x";
S1.rate(2.5);
}
}
if(Rightwrist > 0.2){
    circle(Rightwristx, Rightwristy, 20);
  Numberr =Number(Rightwristy);
    NumberRW= floor(Numberr);
    scaleRW=NumberRW/500;
    document.getElementById("Volume").innerHTML="Volume is "+scaleRW;
    S1.setVolume(scaleRW);
}
}

function playSound(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}