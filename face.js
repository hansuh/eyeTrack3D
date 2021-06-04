//const video = document.getElementById('video')
const video = document.querySelector("#video");
//video.style.display="none";

Promise.all([
 faceapi.nets.tinyFaceDetector.loadFromUri('/api/models'),
 faceapi.nets.faceLandmark68Net.loadFromUri('/api/models'),
 faceapi.nets.faceRecognitionNet.loadFromUri('/api/models'),
 faceapi.nets.faceExpressionNet.loadFromUri('/api/models')
]).then(startVideo)

function startVideo() {
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
          .then(function (stream) {
            video.srcObject = stream;
          })
          .catch(function (err0r) {
            console.log("Something went wrong!");
          });
    }
}
//loadeddata


let x=0;
let y=0;
let bufferz=36*2;
let z=36*2;

const d=0.75;
const videoLength=0.8*Math.sqrt(video.width**2+video.height**2);

video.addEventListener('play', () => {
    const canvas = faceapi.createCanvasFromMedia(video);
    const drawCanvas= document.getElementById("canvas1");
    const displaySize = { width: video.width, height: video.height }
    faceapi.matchDimensions(drawCanvas, displaySize)
    setInterval(async () => {
        const detections = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
        drawCanvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
        if(detections==undefined){
            mesh.material.color.set(0xFF8888);
            renderer.render( scene, camera );
            return;
        };

        mesh.material.color.set(0x888888);

        const resizedDetections = faceapi.resizeResults(detections, displaySize)
        
        faceapi.draw.drawDetections(drawCanvas, resizedDetections)
        //faceapi.draw.drawFaceLandmarks(drawCanvas, resizedDetections)
        faceapi.draw.drawFaceExpressions(drawCanvas, resizedDetections)
        
        x=d*x+(1-d)*(-15)*(2*resizedDetections.landmarks.positions[27].x/video.width-1);
        y=d*y+(1-d)*(-15)*(2*resizedDetections.landmarks.positions[27].y/video.height-1);
        z=d*z+(1-d)*15*videoLength/Math.max(resizedDetections.detection.box.height,detections.detection.box.height);
        if(Math.abs(bufferz-z)>1.5){
            bufferz=d*bufferz+(1-d)*15*videoLength/Math.max(resizedDetections.detection.box.height,detections.detection.box.height);
        }
        camera.position.set( x,y ,bufferz);
        camera.lookAt( 0,0,0 );
        camera.setFocalLength(bufferz);
        renderer.render( scene, camera );
    }, 1000/30)
})