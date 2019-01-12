$( function(){
    var imgSrc = {
        "historyListDel" : "images/icons/history_list_del.svg",
        "tagDel": "images/icons/del_tag_icon.svg",
        "site" : "images/icons/site_icon.svg"
    };

    // Histrory(검색 기록) 영역 컨트롤
    (function () {
        var $openBtn = $('#openBtn'),
            $history = $('.history'),
            opened = false;

        $openBtn.on('click', function () { // 히스토리 오픈 버튼 클릭시
            $history.animate({
                bottom: opened ? '-200px' : '0px'
            }, 200);
            opened = !opened;
        });

        // 검색 기록 로드
        var $historyList = $('#historyList');

        function addHistoryList(lie) {
            var $li = $('<li> </li>');

            for (var obj of lie) {
                $('<span />', {
                    class: obj.class,
                    text: obj.content
                }).appendTo($li);
            }

            $('<img>')
                .attr({ src: imgSrc.historyListDel })
                .appendTo(
                    $('<span />',{
                        class: 'right'
                }).appendTo($li)
            );
            
            $historyList.append($li);
        }

        addHistoryList([
            {
                class: 'exact',
                content: '네이버'
            },
            {
                class: 'include',
                content: '네이버'
            },
            {
                class: 'or',
                content: '네이버'
            }
        ]);

        // 개별 기록 삭제
    })();

    // Tab(탭) 영역 컨트롤
    (function () { 

        var $tabItem = $('.item'),
            $distCnt = $('.dist_cnt'),
            $curTab = $('.cur_tab');

        function slideTo (n) { // 해당 탭으로 슬라이드 
            var seqNum = $('#' + n + '_content').data('seq');

            $('.dist_cnt').each( function () {
                var sn = $(this).data('seq');

                $(this).animate({
                    left: seqNum == sn ? "51px" :
                          seqNum > sn ? "-100%" : "100%"
                }, 200);    
            });

            $('.inputTag').remove();
            $('.tabDel').remove();
            $('.googleUn').remove();
        }
 
        $tabItem.on('click', function () { // 각 탭 클릭시
            var dn = $(this).data('name');

            $curTab.animate({ 
                left: dn == "naver" ? "0%" : 
                      dn == "google" ? "33.3%" : "66.6%"
                }, 200);
            slideTo(dn);
        });

    })();

    function onClickDel (id, cb) {
        return function () {
            $('#' + id).animate({width: "0px"}, 200, function() {
                $(this).remove();
                if( typeof cb === "function")
                    cb();
            });
            $(this).remove();
        }
    }    

    function getTextLength(str, asciiLen, utfLen) {
        var len = 0;
        for (var i = 0; i < str.length; i++) {
            len += (escape(str.charCodeAt(i)) > 127 ? utfLen : asciiLen);
        }
        return len;
    }

    function createTag(cname, id, $delBtn, onfo) {
        var $iT = $('<input type = "text" />')
            .attr({ class: "inputTag " + cname, id: id})
            .css({ width: '20px', height: '20px'})
            .on('input', function () {
                $(this).width( getTextLength($(this).val(),8, 10)+ 20);
            })
            .keypress( function (e) {
                if (e.which == 13) {
                    $(this).blur();
                }
            })
            .focus( function () {
                $delBtn.hide();
            })
            .focusout( function () {
                if ($(this).val().length <= 0) {
                    $(this).remove();
                    $delBtn.remove();
                    if(typeof onfo === "function")
                        onfo();
                    return;
                }
                $delBtn.show();
                $(this).width( getTextLength($(this).val(), 8, 10) + 20);
            })
            .focus();
        return $iT;
    }

    // 검색 연산자 태그(tag) 컨트롤
    (function () {
        var $inputTarget = $('#inputTarget'),
            localID = 0,
            $searchBtn = $('#search_btn');

        $('.shared_tag span').on('click', function () { // 공통 태그 클릭시
      
            var cname = $(this).attr('class');

            var $delBtn = $('<img>').attr({
                id: localID + "del",
                src: imgSrc.tagDel
                })
                .css({ 'margin-left': '-22px', 'cursor': "pointer" });

            var $iT = createTag(cname, "tag" + localID, $delBtn)
                    .appendTo($inputTarget)
                    .focus();
                
            $delBtn.appendTo(($iT).closest('div'))
                .on('click', onClickDel($iT.attr('id')));

            localID ++;
        });
    })();

    (function () {

        var $inputTarget = $('#inputTarget');
        var $siteTag = $('#siteTag');
        var $fileTag = $('#fileTag');
        var localID = 0;
        
        // google site tag        
        $siteTag.on('click', function() {
            if ($('#siteInputTag').length) {
                $('#siteInputTag').focus();
                return;
            }
            if ($('.googleUn').length) {
                $('.googleUn').remove();
            }
            var cname = $(this).attr('class');

            var $delBtn = $('<img>').attr({
                id: "siteTagdel",
                class:'googleUn',
                src: imgSrc.tagDel
                })
                .css({ 'margin-left': '-22px', 'cursor': "pointer" });

            var $iT = createTag('googleUn', 'siteInputTag', $delBtn, function() {
                    $uimg.remove();
                })
                .css({
                    'background-color': '#000000',
                    'padding-left': '24px'
                })
                .prependTo($inputTarget)
                .focus();
           
           var $uimg = $('<img>')
                .attr({
                    class:'googleUn',
                    src: imgSrc.site
                })
                .css({
                    left: ($iT.offset().left - $inputTarget.offset().left + 2) + "px",
                    top: ($iT.offset().top - $inputTarget.offset().top + 6) + "px",
                    position: 'absolute'
                })
                .prependTo($inputTarget);

            $delBtn.appendTo(($iT).closest('div'))
                .on('click', onClickDel($iT.attr('id'), function (){
                    $uimg.remove();
                }));
    
        });

        var options = [
            {val: 'pdf'},
            {val: 'ps'},
            {val: 'dwf'},
            {val: 'kml'},
            {val: 'kmz'},
            {val: 'xls'},
            {val: 'ppt'},
            {val: 'doc'},
            {val: 'rtf'},
            {val: 'swf'}
        ];

        $fileTag.on('click', function() {
            if ($('#siteInputTag').length) {
                $('.googleUn').remove();
            }
            if ($('.googleUn').length) {
                $('.googleUn').remove();
            }

            var $outer = $('<div />')
                .attr({
                    'class': 'tabDel googleUn'
                })
                .css({
                    'display': 'inline-block',
                    'float': 'left',
                    width : '93px',
                    height: '30px',
                    'background-color': 'black',
                    'margin': '4.2px 0px 4.3px 12px',
                    'border-radius': '5px',
                    'padding-left': '5px',
                    'padding-right': '2px'
                })
                .appendTo($inputTarget);

            $fileImg = $('<img>')
                    .attr({
                        'src': 'images/icons/file_icon.svg'
                    })
                    .appendTo($outer);
            $('<input type = "text" />')
           .on('input', function () {
                $(this).width( getTextLength($(this).val(),8, 10)+ 20);
            })
            .appendTo($outer);
/*
            $sel = $('<select>')
                .attr({
                    'class' : 'file_select'
                })
                .css({
                    'margin-left' : '5px'
                })
                .appendTo($outer);
            $(options).each( function(){
                $sel.append($('<option>').attr('value', this.val).text(this.val));
            });
            $sel.val('pdf').appendTo($outer);

            $delBtn = $('<img>')
                .attr({
                    src: 'images/icons/del_tag_icon.svg'
                })
                .css({
                     'margin-right': '3px',
                    'margin-left': '6px'
                })
                .on('click', function() {
                    $outer.remove();
                })
                .appendTo($outer);*/
        });

    })();

    // Youtube
    (function(){
        var $timeTag = $('#timeTag');
        var $inputTarget = $('#inputTarget');
        var $youTubeUn0 = $('.youtube_un0');
        var options = [
            {val: 'hour', text: '1시간 이내'},
            {val: 'today', text: '하루 이내'},
            {val: 'week', text: '일주일 이내'},
            {val: 'month', text: '한달 이내'},
            {val: 'year', text: '일년 이내'}
        ];

        $timeTag.on('click', function (){

            var $outer = $('<div />')
                .attr({
                    'class': 'tabDel googleUn'
                })
                .css({
                    'display': 'inline-block',
                    'float': 'left',
                    width : '120px',
                    height: '30px',
                    'background-color': 'black',
                    'margin': '4.2px 0px 4.3px 12px',
                    'border-radius': '5px',
                    'padding-left': '5px',
                    'padding-right': '2px'
                })
                .appendTo($inputTarget);

            $fileImg = $('<img>')
                    .attr({
                        'src': 'images/icons/file_icon.svg'
                    })
                    .appendTo($outer);


            $sel = $('<select>')
                .attr({
                    'class' : 'file_select'
                })
                .css({
                    'margin-left' : '5px'
                })
                .appendTo($outer);
            $(options).each( function(){
                $sel.append($('<option>').attr('value', this.val).text(this.text));
            });
            $sel.val('hour').appendTo($outer);

            $delBtn = $('<img>')
                .attr({
                    src: 'images/icons/del_tag_icon.svg'
                })
                .css({
                     'margin-right': '3px',
                    'margin-left': '6px'
                })
                .on('click', function() {
                    $outer.remove();
                })
                .appendTo($outer);
        });

        function getText (id){
            return id == 'playlist' ? '재생목록' :
                    id == 'channel' ? '채널' :
                    id == 'movie' ? '영화' :
                    id == 'title' ? '제목' : '';
        }

        $youTubeUn0.on('click', function (){
            if ($('.youtubeUn').length) {
                $('.youtubeUn').remove();
            }
            var $outer = $('<div />')
                .attr({
                    'class': 'tabDel youtubeUn'
                })
                .css({
                    'display': 'inline-block',
                    'float': 'left',
                    height: '20px',
                    'background-color': 'black',
                    'margin': '4.2px 0px 4.3px 12px',
                    'border-radius': '5px',
                    'padding-left': '5px',
                    'padding-right': '2px',
                    'padding': '5px'
                })
                .appendTo($inputTarget);


            var imgname = $(this).attr('id');
            $unImg = $('<img>')
                    .attr({
                        'src': 'images/icons/'+ imgname +'_icon.svg'
                    })
                    .appendTo($outer);


            $('<span>')
                .text(getText(imgname))
                .css({
                    'color': 'white',
                    'font-size': '11px'
                })
                .appendTo($outer);

            $delBtn = $('<img>')
                .attr({
                    src: 'images/icons/del_tag_icon.svg'
                })
                .css({
                     'margin-right': '3px',
                    'margin-left': '6px'
                })
                .on('click', function() {
                    $outer.remove();
                })
                .appendTo($outer);    
        });
    })();
});

