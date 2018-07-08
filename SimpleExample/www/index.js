
function onSuccess(){
    navigator.notification.alert("Successfully launched navigator");
}

function onError(errMsg){
    navigator.notification.alert("Error launching navigator: "+errMsg);
}


function navigate(e){
    e.preventDefault();

    var dest = $('#dest input').val(),
        start = $('#start input').val();

    if(!dest){
        navigator.notification. alert("A destination must be specified");
        return;
    }

    launchnavigator.navigate(dest, {
        start: start,
        successCallback: onSuccess,
        errorCallback: onError
    });
    return false;
}

function init() {
    $('#form').submit(navigate);
    launchnavigator.enableDebug(true);

}
$(document).on("deviceready", init);