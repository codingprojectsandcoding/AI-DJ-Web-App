song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
score_leftWrist = 0;
function setup() {
canvas = createCanvas(600, 500);
canvas.center();
video = createCapture(VIDEO);
video.hide();
poseNet = ml5.poseNet(video, modelLoaded);
poseNet.on('pose', gotPoses);
}
function preload() {
song = loadSound("music.mp3");
}
function draw() {
image(video, 0, 0, 600, 500);
fill("#FF0000");
stroke("FF0000");
if (score_leftWrist > 0.2) {
circle(leftWristX, leftWristY, 20);
number_leftWristY = Number(leftWristY);
floored_number = floor(number_leftWristY);
volume = floored_number/500;
document.getElementById("volume").innerHTML = "Volume =" + volume;
song.setVolume(volume);
}
}
function play() {
song.play();
song.setVolume(1);
song.rate(1);
}
function modelLoaded() {
console.log("PoseNet Is Initialized");
}
function gotPoses(results) {
if(results.length > 0) {
console.log(results);
score_leftWrist = results[0].pose.keypoints[9].score;
console.log("Score =" + score_leftWrist);
leftWristX = results[0].pose.leftWrist.x;
leftWristY = results[0].pose.leftWrist.y;
console.log("Left Wrist X ="+ leftWristX + "Left Wrist Y =" + leftWristY);
rightWristX = results[0].pose.rightWrist.x;
rightWristY = results[0].pose.rightWrist.y;
console.log("Right Wrist X ="+ rightWristX + "Right Wrist Y =" + rightWristY);
}
}
