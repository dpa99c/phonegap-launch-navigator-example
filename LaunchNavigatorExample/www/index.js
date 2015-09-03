var platform;
var transportModes = {
    "android": ["driving", "walking", "transit", "bicycling"],
    "windows": ["driving", "walking", "transit"],
    "ios-google-maps": ["driving", "walking", "transit", "bicycling"],
    "ios-apple-maps": ["driving", "walking"]
};

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

function extendDefaultOptions(opts){
    var defaults = {};
    if(platform === "ios"){
        defaults.preferGoogleMaps = $('body.ios #prefer-google-maps input').prop('checked');
        defaults.enableDebug = true;
    }else if(platform === "android"){
        defaults.navigationMode = $('body.android #navigation-mode select').val();
    }

    return $.extend(defaults, opts);
}

function setTransportModes(){
    var modes;
    var $select = $('select.modes');
    switch(platform){
        case "android":
            $select.prop('disabled', $('body.android #navigation-mode select').val() === "maps");
            modes = transportModes["android"];
            break;
        case "windows":
            modes = transportModes["windows"];
            break;
        case "ios":
            if($('#prefer-google-maps input').prop('checked')){
                modes = transportModes["ios-google-maps"];
            }else{
                modes = transportModes["ios-apple-maps"];
            }
            break;
    }
    $select.empty();
    for(var i=0; i<modes.length; i++){
        var mode = modes[i];
        $select.append($('<option value="'+mode+'">'+mode+'</option>'));
    }
}

function init() {
    platform = device.platform.toLowerCase();
    if(platform.match(/win/)){
        platform = "windows";
    }
    $('body').addClass(platform);

    $("#all-1 button").click(function(){
        launchnavigator.navigate([$("#all-1 .dlat").val(),$("#all-1 .dlon").val()], null, onSuccess, onError, extendDefaultOptions());
    });

    $("#all-2 button").click(function(){
        launchnavigator.navigate($("#all-2 .dname").val(), null, onSuccess, onError, extendDefaultOptions());
    });

    $("#all-3 button").click(function(){
        launchnavigator.navigate([$("#all-3 .dlat").val(),$("#all-3 .dlon").val()], [$("#all-3 .slat").val(),$("#all-3 .slon").val()], onSuccess, onError, extendDefaultOptions());
    });

    $("#all-4 button").click(function(){
        launchnavigator.navigate($("#all-4 .dname").val(), $("#all-4 .sname").val(), onSuccess, onError, extendDefaultOptions());
    });

    $("#all-5 button").click(function(){
        launchnavigator.navigate($("#all-5 .dname").val(), $("#all-5 .sname").val(), onSuccess, onError, extendDefaultOptions({
            transportMode: $("#all-5 select.modes").val()
        }));
    });

    $('body.ios #prefer-google-maps input').change(setTransportModes);

    if(platform === "ios"){
        // Check if Google Maps is available on iOS device
        launchnavigator.isGoogleMapsAvailable(function(available){
            console.log("Google Maps IS"+(available ? " " : " NOT ") + "available");
            $('#prefer-google-maps input').prop('disabled', !available);
            if(!available){
                $('#prefer-google-maps label').css('text-decoration', 'line-through');
            }
        });
    }

    $('body.android #navigation-mode select').change(function(){
        $('input.slat, input.slon, input.sname').prop('disabled', $(this).val() === "turn-by-turn");
        setTransportModes();
    });
    setTransportModes();

}
$(document).on("deviceready", init);