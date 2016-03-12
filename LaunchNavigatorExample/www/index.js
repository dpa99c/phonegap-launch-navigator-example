var ln, platform,
    $form, $select_app, $select_transport_mode, $select_launch_mode,
    $select_dest_type, $select_dest, $input_dest_name,
    $select_start_type, $select_start, $input_start_name;

function onSuccess(){
    navigator.notification.alert("Successfully launched navigator");
}

function onError(errMsg){
    navigator.notification.alert("Error launching navigator: "+errMsg);
}

function updateUI(){
    var app = $select_app.val(),
        launchMode = $select_launch_mode.val(),
        startType = $select_start_type.val(),
        destType = $select_dest_type.val();

    // Set transport modes
    $select_transport_mode.empty();
    if(ln.supportsTransportMode(app, platform, launchMode)){
        $select_transport_mode.prop('disabled', false);
        $('#transport-mode').toggleClass('disabled', false);
        var transportModes = ln.getTransportModes(app, platform, launchMode);
        transportModes.forEach(function(transportMode){
            $select_transport_mode.append($('<option value="'+transportMode+'">'+transportMode+'</option>'));
        });
    }else{
        $select_transport_mode.prop('disabled', true);
        $('#transport-mode').toggleClass('disabled', true);
    }

    // set launch mode availability
    $select_launch_mode.prop('disabled', !ln.supportsLaunchMode(app, platform));
    $('#launch-mode').toggleClass('disabled', !ln.supportsLaunchMode(app, platform));

    var supportsStart = ln.supportsStart(app, platform, launchMode);
    $('#start').toggleClass('disabled', !supportsStart);
    $select_start.prop('disabled', !supportsStart);
    $select_start_type.prop('disabled', !supportsStart);

    $input_start_name.prop('disabled', !supportsStart || !ln.supportsStartName(app, platform) || startType == 'none');
    $('#start .name').toggleClass('disabled', !supportsStart || !ln.supportsStartName(app, platform));

    $input_dest_name.prop('disabled', !ln.supportsDestName(app, platform, launchMode));
    $('#dest .name').toggleClass('disabled', !ln.supportsDestName(app, platform, launchMode));

    // Set start/dest types
    $('#start .location').toggleClass('disabled', startType == 'none');
    $select_start.prop('disabled', startType == 'none');

    $select_start.find('option.name').prop('disabled', startType == "coord");
    $select_start.find('option.coord').prop('disabled', startType == "name");
    $select_start.find('option').each(function(){
        var option = $(this);
        if(!option.prop("disabled")){
            option.prop("selected", true);
            return false;
        }
    });

    $select_dest.find('option.name').prop('disabled', destType == "coord");
    $select_dest.find('option.coord').prop('disabled', destType == "name");
    $select_dest.find('option').each(function(){
        var option = $(this);
        if(!option.prop("disabled")){
            option.prop("selected", true);
            return false;
        }
    });
}

function navigate(e){
    e.preventDefault();
    var values = {};
    $.each($(this).serializeArray(), function(i, field) {
        values[field.name] = field.value;
    });

    ln.navigate(values["dest"], {
        successCallback: function(){
            console.info("Launched navigator app");
        },
        errorCallback: function(err){
            console.error("Error launching navigator app: "+err);
        },
        app: values["app"],
        destinationName: values["dest-name"],
        start: values["start"],
        startName: values["start-name"],
        transportMode: values["transport-mode"],
        launchMode: values["launch-mode"],
        enableDebug: true
    });
    return false;
}

function init() {
    ln = launchnavigator;
    platform = device.platform.toLowerCase();
    if(platform == "android"){
        platform = ln.PLATFORM.ANDROID;
    }else if(platform == "ios"){
        platform = ln.PLATFORM.IOS;
    }else if(platform.match(/win/)){
        platform = ln.PLATFORM.WINDOWS;
    }
    $('body').addClass(platform);

    // Get DOM refs
    $form = $('#form');
    $select_app = $('#app select');
    $select_transport_mode = $('#transport-mode select');
    $select_launch_mode = $('#launch-mode select');
    $select_dest_type = $('#dest .type select');
    $select_dest =  $('#dest .location select');
    $input_dest_name = $('#dest .name input');
    $select_start_type = $('#start .type select');
    $select_start =  $('#start .location select');
    $input_start_name = $('#start .name input');

    // Populate apps for this platform
    if(platform == ln.PLATFORM.ANDROID){
        $select_app.append($('<option selected="selected" value="'+ln.APP.NONE+'">[None - use native chooser]</option>'));
    }
    ln.getAppsForPlatform(platform).forEach(function(app){
        $select_app.append($('<option value="'+ app+'">'+ ln.getAppDisplayName(app)+'</option>'));
    });

    // disable those that are not available
    ln.availableApps(function(results){
        for(var app in results){
            if(!results[app]){
                $select_app.find('option[value="'+app+'"]')
                    .prop('disabled', true)
                    .addClass('disabled');
            }
        }
    },function onError(errMsg){
        navigator.notification.alert("Error checking installed apps: "+errMsg);
    });

    // Set change handlers
    $select_app.change(updateUI);
    $select_transport_mode.change(updateUI);
    $select_dest_type.change(updateUI);
    $select_start_type.change(updateUI);
    $select_launch_mode.change(updateUI);
    $form.submit(navigate);

    // Refresh UI
    updateUI();
}
$(document).on("deviceready", init);