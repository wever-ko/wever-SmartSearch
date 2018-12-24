$(function() {
    var ImgSrc = {
        historyListDel: "images/icons/history_list_del.svg",
        tagDel: "images/icons/del_tag_icon.svg" ,
        siteIcon: "images/icons/site_icon.svg",
        fileIcon: "images/icons/file_icon.svg",
        timeIcon: "images/icons/time_icon.svg",
        channelIcon:'images/icons/channel_icon.svg',
        titleIcon: 'images/icons/title_icon.svg',
        movieIcon: 'images/icons/movie_icon.svg',
        playlistIcon: 'images/icons/playlist_icon.svg'
    };

    var curSite = 'naver';

    // 검색 버튼 클릭시
    (function() {
        var params = {};

        function collectTagData() {
            var ret = {};
            $('.tag_outer').each(function() {
                var name = $(this).data('tag');

                if (name === "file" || name === "time" || name === "site") {
                    var val = $(this).children((name === "site" ? 'input' : 'select')).val();
                    ret[name] = val;
                } else {
                    var val = $(this).children('input').val();
                    if (!ret.hasOwnProperty(name)) {
                        ret[name] = [];
                    }
                    ret[name].push(val);
                }
                
            });
            return ret;
        }
        
        //사이트별 쿼리로 만들기
        function getSiteQuery(site) {
            var tmp = {};
            if(site === 'naver') {
              tmp.query = Wever.NaverQuery(collectTagData());
            } else if (site === 'google') {
              tmp.query = Wever.GoogleQuery(collectTagData());
            } else {
              tmp.query = Wever.YouTubeQuery(collectTagData());
            }
            tmp.site = site;

            return tmp;
        }

        $('#search_btn').on('click', function() {
            var queryObj;

            $('.tag_outer').each(function() {                
                queryObj = collectTagData();
            });
            params = getSiteQuery(curSite);
            //새탭 띄우기
            Wever.NewTab.open(params);
            // History 추가
            Wever.History.add(curSite, queryObj);
        });

    // Histrory(검색 기록) 영역 컨트롤

        var $openBtn = $('#openBtn'),
            $history = $('.history'),
            opened = false;

        // 히스토리 오픈 버튼 클릭시
        $openBtn.on('click', function () { 
            $history.animate({
                bottom: opened ? '-200px' : '0px'
            }, 200);
            $(this).css({
                transform: !opened ? 'rotate(180deg)' : 'rotate(0deg)'
            });
            opened = !opened;

            loadHistoryList(curSite);

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
                .attr({ src: ImgSrc.historyListDel })
                .appendTo(
                    $('<span />',{
                        class: 'right'
                }).appendTo($li)
            );
            
            $historyList.append($li);
        }

        function loadHistoryList(paramSite) {
           // var $li = $('<li></li>'),
                var list = Wever.History.getAll(paramSite);

            //console.log(list);

            for (var key in list) {
                var $li = $('<li></li>');
                for (var key2 in list[key]) {
                    for ( var value in list[key][key2]) {
                         $('<span />', {
                             class: key2,
                             text: list[key][key2][value]
                         }).appendTo($li);
                    }
                }
                 $('<img>')
                .attr({ src: ImgSrc.historyListDel })
                .appendTo(
                    $('<span />',{
                        class: 'right'
                }).appendTo($li)
                   
            );
                 $li.on('click', function () {
                        for( var i = 0; i < $(this).children.length; i++ ){
                            console.log($(this).children[i]);
                        }
                        console.log()
                    });
                $historyList.append($li);
            }

   
            
            //$historyList.append($li);
        }

        var $tabItem = $('.item'),
            $distCnt = $('.dist_cnt'),
            $curTab = $('.cur_tab');

        // 해당 탭으로 슬라이드 
        function slideTo (n) { 
            var seqNum = $('#' + n + '_content').data('seq');

            $('.dist_cnt').each( function () {
                var sn = $(this).data('seq');

                // 슬라이드 애니메이션
                $(this).animate({ 
                    left: seqNum == sn ? "51px" :
                          seqNum > sn ? "-100%" : "100%"
                }, 200);  
                $('li').remove();  
            });
            // 탭 이동시 삭제 되어야할 클래스
            $('.tabDel').remove();  
        }

        // 각 탭 클릭시
        $tabItem.on('click', function () { 
            var dn = $(this).data('name');
            curSite = dn;
            $curTab.animate({ 
                left: dn == "naver" ? "0%" : 
                      dn == "google" ? "33.3%" : "66.6%"
                }, 200);
            slideTo(dn);
            curSite = dn;
        });
    })();

    // 태그 outer <div> 생성
    function $TagOuter(cls, css) {
        cls = cls || "";
        css = css || {};
        return $('<div />').attr({'class': 'tabDel tag_outer ' + cls}).css(css);
    }

    // 태그 <input type=text> 생성
    function $TagInput(cls, css) {
        cls = cls || "";
        css = css || {};
        return $('<input type = "text" />').attr({'class': 'inputTag ' + cls}).css(css);
    }

    // 태그 삭제 버튼 생성
    function $TagDel() {
        return $('<img>').attr({'src': ImgSrc.tagDel});
    }

    // 태그 <select> 생성
    function $TagSelect(cls, css, options) {
        cls = cls || "";
        css = css || {};
        var $sel = $('<select>').attr({'class': cls}).css(css);
        $(options).each( function() {
            $sel.append($('<option>').attr('value', this.val).text(this.text));
        });
        return $sel;
    }

    // 태그 <img> 생성
    function $Img(iconSrc, css) {
        css = css || {};
        return $('<img>').attr({src: iconSrc}).css(css);
    }

    function _getTextLen(str, asciiLen, utfLen) {
        var len = 0;
        for (var i = 0; i < str.length; i++) {
            len += (escape(str.charCodeAt(i)) > 127 ? utfLen : asciiLen);
        }
        return len;
    }

    function onInput() {
         $(this).width(_getTextLen($(this).val(), 8, 10) + 20);
    }
        
    function onKeypress(e) {
        if (e.which == 13) {
            $(this).blur();
        }
    }

    /*
     * 검색 연산자(공통) 컨트롤
     */
    (function() {
        var $inputTarget = $('#inputTarget'),
            sharedInputCSS = {
                'width': '20px',
                'height': '20px',
                'background-color': 'none'
            };

        // 공통 태그 클릭시
        $('.shared_tag span').on('click', function () { 
            var $tag = $TagOuter($(this).attr('class'))
                .data('tag', $(this).data('tag'))
                .appendTo($inputTarget);
            
            var $tagInput = $TagInput('', sharedInputCSS)
                    .on('input', onInput)
                    .keypress(onKeypress)
                    .focus( () => { $delBtn.hide(); })
                    .focusout( function() {
                        $delBtn.show();
                        if ($(this).val().length <= 0) {
                            $tag.remove();
                        }
                    });

            var $delBtn = $TagDel().on('click', () => { $tag.remove(); });

            $tag.append($tagInput).append($delBtn);
            $tagInput.focus();
        });
    })();

    // 구글 연산자
    (function() {
        var $inputTarget = $('#inputTarget'),
            $siteTag = $('#siteTag'),
            $fileTag = $('#fileTag'),
            uniqCSS = {
                'background': 'black'
            },
            inputCSS = {
                'width': '20px',
                'height': '20px',
                'background-color': 'none'
            };
    
        // 사이트 태그
        $siteTag.on('click', function() {

            if ($('.uniq').length) {
                $('.uniq').remove();
            }

            var $tag = $TagOuter("uniq", uniqCSS)
                    .data('tag', $(this).data('tag'))
                    .appendTo($inputTarget),
                $siteIcon = $Img(ImgSrc.siteIcon),
                $delBtn = $TagDel().on('click', () => { $tag.remove(); }),
                $tagInput = $TagInput('', inputCSS)
                    .on('input', onInput)
                    .keypress(onKeypress)
                    .focus( () => { $delBtn.hide(); })
                    .focusout( function() {
                        $delBtn.show();
                        if ($(this).val().length <= 0) {
                            $tag.remove();
                        }
                    });

            $tag.append($siteIcon)
                .append($tagInput)
                .append($delBtn);
            $tagInput.focus();
        });

        // 파일 옵션
        var options = [
            {val: 'pdf', text: 'pdf'},
            {val: 'ps', text: 'ps'},
            {val: 'dwf', text: 'dwf'},
            {val: 'kml', text: 'kml'},
            {val: 'kmz', text: 'kmz'},
            {val: 'xls', text: 'xls'},
            {val: 'ppt', text: 'ppt'},
            {val: 'doc', text: 'doc'},
            {val: 'rtf', text: 'rtf'},
            {val: 'swf', text: 'swf'}
        ];

        // 파일 태그
        $fileTag.on('click', function() {
            if ($('.uniq').length) {
                $('.uniq').remove();
            }

            var $tag = $TagOuter("uniq", uniqCSS)
                    .data('tag', $(this).data('tag'))
                    .appendTo($inputTarget),
                $fileIcon = $Img(ImgSrc.fileIcon),
                $select = $TagSelect('', {
                        'background-color': 'black',
                        'color': 'white',
                        'border-width': '0px'
                    }, options),
                $delBtn = $TagDel().on('click', () => { $tag.remove(); });
            
            $tag.append($fileIcon)
                .append($select)
                .append($delBtn);
        });
    })();

    // 유튜브 연산자
    (function() {
        var $inputTarget = $('#inputTarget'),
            $timeTag = $('#timeTag'),
            uniqCSS = {
                'background': 'black'
            },
            inputCSS = {
                'width': '20px',
                'height': '20px',
                'background-color': 'none'
            },
            options = [
                {val: 'hour', text: '1시간 이내'},
                {val: 'today', text: '하루 이내'},
                {val: 'week', text: '일주일 이내'},
                {val: 'month', text: '한달 이내'},
                {val: 'year', text: '일년 이내'}
            ];

        // 시간 태그
        $timeTag.on('click', function() {
            if ($('.uniq').length) {
                $('.uniq').remove();
            }

            var $tag = $TagOuter("uniq", uniqCSS)
                    .appendTo($inputTarget)
                    .data('tag', $(this).data('tag')),
                $timeIcon = $Img(ImgSrc.timeIcon),
                $select = $TagSelect('', {
                        'background-color' : 'black',
                        'color' : 'white',
                        'border-width': '0px'
                    }, options),
                $delBtn = $TagDel().on('click', () => { $tag.remove(); });

            $tag.append($timeIcon)
                .append($select)
                .append($delBtn);
        });

        // 채널, 재생목록, 영화, 제목 태그
        $('.youtube_un0').on('click', function() {
            if ($('.uniq_4').length) {
                $('.uniq_4').remove();
            }

            var $tag = $TagOuter('uniq_4', uniqCSS)
                    .appendTo($inputTarget)
                    .data('tag', $(this).data('tag')),
                $icon = $Img(ImgSrc[$(this).attr('id') + 'Icon'], {
                    'margin-right': '6px'
                }),
                $delBtn = $TagDel().on('click', () => { $tag.remove(); }),
                $tagInput = $TagInput('', inputCSS)
                    .on('input', onInput)
                    .keypress(onKeypress)
                    .focus( () => { $delBtn.hide(); })
                    .focusout( function() {
                        $delBtn.show();
                        if ($(this).val().length <= 0) {
                            $tag.remove();
                        }
                    });

            $tag.append($icon)
                .append($tagInput)
                .append($delBtn);
            $tagInput.focus();
        });

    })();
});