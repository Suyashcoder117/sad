prediction1 = "";
prediction2 = "";
Webcam.set({
    width: 345,
    height: 298,
    image_format: 'png',
    png_quality: 90
     
 });
camea = document.getElementById("camera");

 Webcam.attach(camea);
 function take_snapshot(){
     Webcam.snap(function(data_uri) {
         document.getElementById("result").innerHTML = "<img id='captured_img' src='" + data_uri +"' />";
         ;});
     }
     console.log("ml5 version", ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/eFXpfGNf-/model.json',modelLoaded);
function modelLoaded(){
    console.log("model loaded");
}
function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is" + prediction1;
    speak_data_2 = "The second prediction is" + prediction2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}
function check(){
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}
function gotResult(error, results){
if (error){
    console.error(error);
}else{
    console.log(results)
    document.getElementById("result_emotion_name").innerHTML = results[0].label;
    document.getElementById("result_emotion_name2").innerHTML = results[1].label;
    prediction_1 = results[0].label;
    prediction_2 = results[1].label;
    speak()
    if(results[0].label == "Victory"){
        document.getElementById("update_emoji").innerHTML = "&#128522";
    }
    if(results[0].label == "Amazing"){
        document.getElementById("update_emoji").innerHTML = "&#128077";
    }
    if(results[0].label == "NIce"){
        document.getElementById("update_emoji").innerHTML = "&#128076";
    }
}
}
