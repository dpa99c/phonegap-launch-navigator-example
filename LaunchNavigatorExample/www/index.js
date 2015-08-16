function alert2(msg) {
    //alert() is not available in the Windows platform, use org.apache.cordova.dialogs i.e.
    //Instead of this if/else code, you might want to use the org.apache.cordova.dialogs plugin and call instead navigator.notification.alert in all platforms.
    if ('MSApp' in window) {
        console.log(msg);
    }
    else {
        alert(msg);
    }
}

function onSuccess(){
    alert2("Successfully launched navigator");
}

function onError(errMsg){
    alert2("Error launching navigator: "+errMsg);
}

function init() {
    var platform = device.platform.toLowerCase();
    if(platform.match(/win/)){
        platform = "windows";
    }
    $('body').addClass(platform);

    $("#all-1 button").click(function(){
        launchnavigator.navigate([$("#all-1 .dlat").val(),$("#all-1 .dlon").val()], null, onSuccess, onError);
    });

    $("#all-2 button").click(function(){
        launchnavigator.navigate($("#all-2 .dname").val(), null, onSuccess, onError);
    });

    $("#all-3 button").click(function(){
        launchnavigator.navigate([$("#all-3 .dlat").val(),$("#all-3 .dlon").val()], [$("#all-3 .slat").val(),$("#all-3 .slon").val()], onSuccess, onError);
    });

    $("#all-4 button").click(function(){
        launchnavigator.navigate($("#all-4 .dname").val(), $("#all-4 .sname").val(), onSuccess, onError);
    });

    $("#all-5 button").click(function(){
        launchnavigator.navigate($("#all-5 .dname").val(), $("#all-5 .sname").val(), onSuccess, onError, {
            transportMode: $("#all-5 select.modes").val()
        });
    });

    // iOS-only
    $("#ios-1 button").click(function(){
        launchnavigator.navigate($("#ios-1 .dname").val(), $("#ios-1 .sname").val(), onSuccess, onError, {
            preferGoogleMaps: true,
            enableDebug: true
        });
    });
}
$(document).on("deviceready", init);