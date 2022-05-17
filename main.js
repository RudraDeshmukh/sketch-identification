function preload(){
    classifier= ml5.imageClassifier('DoodleNet')
}

function setup(){
 canvas = createCanvas(288,288)
 canvas.center()
 background("white");
 canvas.mouseReleased(classify_canvas)
 synth = window.speechSynthesis
}

function clear_canvas(){
    background('white');
}

function classify_canvas(){
    classifier.classify(canvas,gotResults)
}

function draw(){
    strokeWeight(13)
    stroke(0)

    if(mouseIsPressed){
        line(pmouseX , pmouseY , mouseX , mouseY)
    }
}

function gotResults(error,results){
    if(error){
        console.error(error)
    }
    else{
        console.log(results)
        document.getElementById("label").innerHTML="label:"+results[0].label
        document.getElementById("confidence").innerHTML="confidence:"+Math.round(results[0].confidence*100)+"%"

        utterThis=new SpeechSynthesisUtterance(results[0].label)
        synth.speak(utterThis)

    }
}