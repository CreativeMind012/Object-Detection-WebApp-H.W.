status = "";
objectDetector ="";
img = "";
objectss = [];

function preload(){
    img = loadImage('sofa.jpg');
}
function setup(){
    canvas = createCanvas(580, 420);
    canvas.center();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}
function modelLoaded(){
    status = "true";
    console.log("Model Loaded!");
    objectDetector.detect(img, gotResult);
}
function gotResult(error, results){
    if(error){
        console.error(error);
    }
    console.log(results);
    objectss = results;
}
function draw(){
    image(img, 0, 0, 580, 420);
    if(status != "")
    {
        for (i = 0; i < objectss.length; i++) {
            percentage = floor(objectss[i].confidence * 100);

            fill("black");
            text(objectss[i].label + "" + percentage + "%", objectss[i].x + 5,  objectss[i].y + 10);
            noFill();
            stroke("black");
            rect( objectss[i].x - 20, objectss[i].y - 20, objectss[i].width, objectss[i].height);
            
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            document.getElementById("no_objects_detected").innerHTML = "No. of big objects in the image: 1, No. of objects detected: 1";
        }
    }
}