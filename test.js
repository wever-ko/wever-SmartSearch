$( function(){

    // Tab Control
    var $tab = $('.tab'),
        $tabContent = $('.tab_content');

    $tab.on('click', function () {
        $('#input').html("");
        $tab.removeClass('opend');
        var id = '#' + $(this).addClass('opend').data('name') + '_content';
        $tabContent.removeClass('opend');
        $(id).addClass('opend');
    });

    // Shared
    var $basic = $('#basic'),
        $exact = $('.exact'),
        $include = $('.include'),
        $exclude = $('.exclude'),
        $or = $('.or');

    function getSharedParams () {
        var params = {};
            basicValue = $basic.val(),
            excludeValues = [],
            includeValues = [],
            exactValues = [],
            orValues = [];

        $exact.each( function () {
            var v = $(this).val();
            if(v.length) exactValues.push(v);
        });

        $exclude.each( function () {
            var v = $(this).val();
            if(v.length) excludeValues.push(v);
        });

        $include.each( function () {
            var v = $(this).val();
            if(v.length) includeValues.push(v);
        });

        $or.each( function () {
            var v = $(this).val();
            if(v.length) orValues.push(v);
        })

        if (basicValue.length) params['basic'] = basicValue;
        if (excludeValues.length) params['exclude'] = excludeValues;
        if (includeValues.length) params['include'] = includeValues;
        if (exactValues.length) params['exact'] = exactValues;
        if (orValues.length) params['or'] = orValues;
        return params;
    }

    function fill_to_HTML (id, obj) {
       var objstr = JSON.stringify(obj, null, 2),
            hl = syntaxHighlight(objstr),
            ret = "";
            var isIn = false;
            for (var i = 0; i < hl.length; i++){
                var c = hl.charAt(i);
                ret += c;
                if (c == '{' )ret += "<br>&nbsp;&nbsp;&nbsp;";

                if (c == '[') isIn = true;
                if (c == ']') isIn = false;
                if( (!isIn) && (c == ',')) ret += "<br>&nbsp;&nbsp;&nbsp;";
                if ((i < hl.length - 1) && hl.charAt(i + 1) == '}') ret += "<br>";
            }
        $('#' + id).html(ret);
    }

    // Naver Search
    $('#naverSearch').on('click', function () {
        var params = getSharedParams();
        fill_to_HTML("input", params);
        $('#output').html(Wever.NaverQuery(params));
    });

    // Google Search
    var $site = $('#site'),
        $file = $('.type');

    $('#googleSearch').on('click', function () {
        var params = getSharedParams(),
            fileValues = $file.val(),
            siteValue = $site.val();

        if (fileValues.length) params['file'] = fileValues;
        if (siteValue.length) params['site'] = siteValue;
        fill_to_HTML("input", params);
        $('#output').html(Wever.GoogleQuery(params));
    });

    // YouTube Search
    var $channel = $('.channel'),
        $movie = $('.movie'),
        $playlist = $('.playlist'),
        $title = $('.title'),
        $period = $('#period');

    $('#youtubeSearch').on('click', function () {
        var params = getSharedParams(),
            channelValues = [],
            movieValues = [],
            playlistValues = [],
            titleValues = [],
            periodValue = $period.val();

        $channel.each( function () {
            var v = $(this).val();
            if(v.length) channelValues.push(v);
        });

        $movie.each( function () {
            var v = $(this).val();
            if(v.length) movieValues.push(v);
        });

        $playlist.each( function () {
            var v = $(this).val();
            if(v.length) playlistValues.push(v);
        });

        if (channelValues.length) params['channel'] = channelValues;
        if (movieValues.length) params['movie'] = movieValues;
        if (playlistValues.length) params['playlist'] = playlistValues;
        if (titleValues.length) params['title'] = titleValues;
        if (periodValue.length) params['time'] = periodValue;
        fill_to_HTML("input", params);
        $('#output').html(Wever.YouTubeQuery(params));
    });

    function syntaxHighlight(json) {
        json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}
});

