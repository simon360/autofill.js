var params = [];
var autofill = false;

if (location.search) {
    var parts = location.search.substring(1).split('&');

    for (var i = 0; i < parts.length; i++) {
        var nv = parts[i].split('=');
        if (!nv[0]) continue;

        if (nv[0] === 'autofill' && nv[1] == 'true') {
            autofill = true;
        }

        params.push({key: nv[0], value: (nv[1] || true)});
    }
}

if (autofill) {
    for (var i = 0; i < params.length; i++) {
        var param = params[i];
        formAutoPopulate(param.key, param.value);
    }

    history.pushState('data', '', window.location.pathname);
}

function formAutoPopulate(name, value) {
    if (name != 'autofill') {
        var populated = false;
        var field = $('[name="'+ name +'"]');
        var type = $('[name="'+ name +'"]').prop("tagName").toLowerCase();

        name = decodeURIComponent(name);
        value = decodeURIComponent(value);

        if (type == 'input') {
            field.val(value);
            populated = true;
        }

        if (type == 'textarea') {
            field.html(value);
            populated = true;
        }

        if (type == 'select') {
            //
        }

        if (populated) {
            field.attr('autopopulated', 'true');
        }
    }
}
