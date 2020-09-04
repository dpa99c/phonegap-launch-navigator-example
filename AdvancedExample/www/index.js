var ln, platform,
    $form, $select_app, $select_transport_mode, $select_launch_mode,
    $select_dest_type, $select_dest, $input_dest_name,
    $select_start_type, $select_start, $input_start_name,
    $select_selectable_apps;

function onSuccess(){
    navigator.notification.alert("Successfully launched navigator");
}

function onError(errMsg){
    console.error(errMsg);
    navigator.notification.alert(errMsg, null, "Error");
}

function updateUI(){
    var app = $select_app.val(),
        launchMode = $select_launch_mode.val(),
        startType = $select_start_type.val(),
        destType = $select_dest_type.val(),
        transportMode = $select_transport_mode.val();

    // Set transport modes
    $select_transport_mode.empty();
    if(ln.supportsTransportMode(app, platform, launchMode)){
        $select_transport_mode.prop('disabled', false);
        $('#transport-mode').toggleClass('disabled', false);
        var transportModes = ln.getTransportModes(app, platform, launchMode);
        transportModes.forEach(function(_transportMode){
            var opt = $('<option value="'+_transportMode+'">'+_transportMode+'</option>');
            $select_transport_mode.append(opt);
            if(_transportMode == transportMode){
                opt.attr("selected", "selected");
            }
        });

    }else{
        $select_transport_mode.prop('disabled', true);
        $('#transport-mode').toggleClass('disabled', true);
    }

    // set launch mode availability
    $select_launch_mode.prop('disabled', !ln.supportsLaunchMode(app, platform));
    if(platform == "android") {
        $('#google-maps-launch-mode').toggleClass('disabled', !ln.supportsLaunchMode(app, platform));
    }
    if(platform == "ios") {
        $('#apple-maps-launch-mode').toggleClass('disabled', !ln.supportsLaunchMode(app, platform));
    }

    var supportsStart = ln.supportsStart(app, platform, launchMode);
    $('#start').toggleClass('disabled', !supportsStart);
    $select_start.prop('disabled', !supportsStart);
    $select_start_type.prop('disabled', !supportsStart);

    $input_start_name.prop('disabled', !supportsStart || !ln.supportsStartName(app, platform, launchMode) || startType == 'none');
    $('#start .name').toggleClass('disabled', !supportsStart || !ln.supportsStartName(app, platform, launchMode));

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

    // Set start/dest types
    $('#selectable-apps').toggleClass('disabled', app != ln.APP.USER_SELECT);
    $select_selectable_apps.prop('disabled', app != ln.APP.USER_SELECT);


    $('#user-app-preference').toggleClass('disabled', app != ln.APP.USER_SELECT);

    //Check if user has preferred app
    ln.appSelection.userChoice.get(function(app){
        $('#clearAppPreference')
            .toggleClass('disabled', !app)
            .prop('disabled', !app);

        $('#preferred-app span').text(app ? ln.getAppDisplayName(app) : "[None]");
    });

    //Check if user has been asked whether to remember preference
    ln.appSelection.userPrompted.get(function(hasBeenPrompted){
        $('#resetUserPrompt')
            .toggleClass('disabled', !hasBeenPrompted)
            .prop('disabled', !hasBeenPrompted);

        $('#user-prompted span').text(hasBeenPrompted ? "Yes" : "No");
    });
}

function navigate(){
    var values = {};
    $.each($('#form').serializeArray(), function(i, field) {
        values[field.name] = field.value;
    });

    var opts = {
        successCallback: function(){
            console.info("Launched navigator app");
        },
        errorCallback: function(err){
            onError("Error launching navigator app: "+err);
        },
        app: values["app"],
        destinationName: values["dest-name"],
        start: values["start"],
        startName: values["start-name"],
        transportMode: values["transport-mode"],
        extras: parseExtras(values["extras"]),
        appSelection:{
            dialogHeaderText: "Custom header",
            cancelButtonText: "Custom cancel text",
            list: getSelectableApps(),
            callback: function(app){
                console.info("User selected app: "+app);
            },
            rememberChoice: {
                enabled: values["should-remember-choice"]
            }
        },
        enableGeocoding: values["enable-geocoding"] === "on"
    };
    if(platform === "android"){
        opts.launchModeGoogleMaps = values["google-maps-launch-mode"];
    }
    if(platform === "ios"){
        opts.launchModeAppleMaps = values["apple-maps-launch-mode"];
    }

    ln.navigate(values["dest"], opts);
}

function init() {
    $(document).on("resume", updateUI);

    ln = launchnavigator;
    ln.enableDebug(true, function(){
        console.log("Debug mode enabled");
    }, function(error){
       console.error("Error enabling debug mode: "+error);
    });

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
    if(platform == "android"){
        $select_launch_mode = $('#google-maps-launch-mode select');
    }
    if(platform == "ios"){
        $select_launch_mode = $('#apple-maps-launch-mode select');
    }
    $select_dest_type = $('#dest .type select');
    $select_dest =  $('#dest .location select');
    $input_dest_name = $('#dest .name input');
    $select_start_type = $('#start .type select');
    $select_start =  $('#start .location select');
    $input_start_name = $('#start .name input');
    $select_selectable_apps = $('#selectable-apps select');

    // Populate apps for this platform
    ln.getAppsForPlatform(platform).forEach(function(app){
        $select_app.append($('<option value="'+ app+'">'+ ln.getAppDisplayName(app)+'</option>'));
        if(app != ln.APP.USER_SELECT){
            $select_selectable_apps.append($('<option selected="selected" value="'+ app+'">'+ ln.getAppDisplayName(app)+'</option>'));
        }
    });

    // disable those that are not available
    var onAvailableError = function(errMsg){
        onError("Error checking installed apps: "+errMsg);
    };
    ln.availableApps(function(results){
        for(var app in results){
            ln.isAppAvailable(app, function(app, available){
                if(!available){
                    $select_app.find('option[value="'+app+'"]')
                        .prop('disabled', true)
                        .addClass('disabled');
                }
            }.bind(this, app), onAvailableError);
        }
    },onAvailableError);

    // Set change handlers
    $select_app.change(updateUI);
    $select_transport_mode.change(updateUI);
    $select_dest_type.change(updateUI);
    $select_start_type.change(updateUI);
    $select_launch_mode.change(updateUI);
    $form.submit(function(e){
        e.preventDefault();
        return false;
    });
    $('#navigate').click(navigate);

    $('#clearAppPreference').click(function(){
        ln.appSelection.userChoice.clear(updateUI);
    });

    $('#resetUserPrompt').click(function(){
        ln.appSelection.userPrompted.clear(updateUI);
    });

    // Refresh UI
    updateUI();
}

function parseExtras(sExtras){
    if(!sExtras) return null;

    try{
        var oExtras = {};
        sExtras = sExtras.replace(';','&');
        var params = sExtras.split('&');
        for(var i=0; i<params.length; i++){
            var parts = params[i].split('=');
            oExtras[parts[0]] = parts[1];
        }
    }catch(e){
        alert("Failed to parse 'App-specific parameters' as URI querystring - please check the syntax");
        return null;
    }
    return oExtras;
}

function getSelectableApps(){
    var selected = [];
    $select_selectable_apps.find('option').each(function(){
        if(this.selected) selected.push(this.value);
    });
    return selected;
}

$(document).on("deviceready", init);