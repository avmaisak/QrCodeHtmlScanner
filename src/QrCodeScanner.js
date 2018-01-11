//instascan scanner object
scanner = {};

// HTML element
function initHtmlElement(id){
    return document.getElementById(id);
}

//init video object options
function initVideoObjectOptions(id) {
    scanner = {};
    return  {
        // The HTML element to use for the camera's video preview. Must be a <video> element.
        // When the camera is active, this element will have the "active" CSS class, otherwise,
        // it will have the "inactive" class. By default, an invisible element will be created to
        // host the video.
        video: initHtmlElement(id),
        // Whether to scan continuously for QR codes. If false, use scanner.scan() to manually scan.
        // If true, the scanner emits the "scan" event when a QR code is scanned. Default true.
        continuous: true,
		// Whether to horizontally mirror the video preview. This is helpful when trying to
		// scan a QR code with a user-facing camera. Default true.
        mirror: false,
        // Whether to include the scanned image data as part of the scan result. See the "scan" event
        // for image format details. Default false.
        captureImage: false,
        // Only applies to continuous mode. Whether to actively scan when the tab is not active.
        // When false, this reduces CPU usage when the tab is not active. Default true.
        backgroundScan: true,
        // Only applies to continuous mode. The period, in milliseconds, before the same QR code
        // will be recognized in succession. Default 5000 (5 seconds).
        refractoryPeriod: 5000,
        // Only applies to continuous mode. The period, in rendered frames, between scans. A lower scan period
        // increases CPU usage but makes scan response faster. Default 1 (i.e. analyze every frame).
        scanPeriod: 1
    };

}

//init Avaliable Cameras of current device
function initAvaliableCameras(selectObject, callBack) {
    var max = 0;
    Instascan.Camera.getCameras().then(function (cameras) {

        for (var i = 0; i < cameras.length; i++) {
            var o = $("<option value='" + i + "'></option>");
            o.text("Camera#" + i);
            o.appendTo(selectObject);
            max = i;
        }

        //choose the rear camera (last)
        selectObject.val(max);

        callBack();
    });
}

//Get Selected Camera
function getSelectedCamera(selectObject) {
    return parseInt(selectObject.val());
}

//Init camera
function initCamera(i) {
    scanner.stop();

    Instascan.Camera.getCameras().then(function (cameras) {
        scanner.start(cameras[i]);
    });
}

function scanStart(ondetect){
    //Emitted when a QR code is scanned using the camera in continuous mode (see scanner.continuous).
    scanner.addListener('scan', function (content) {
        ondetect(content);
    });
}

//change camera
function cameraChange(cameraNum) {
    initCamera(parseInt(cameraNum));
}

//init QrCode scanner
function initScanner(options) {
    scanner = new Instascan.Scanner(options);
}