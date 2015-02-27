$( document ).ready(function() {
    var isMobile = false;
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        isMobile  = true;
    }
    // Handler for .ready() called.
    var bouncetime = 800;
    var ballsize = 20;
    var bbleft = 0;
    var bbBottom = 0;
    var level = 0;
    var launchPosition = 0;
    var lives = 12;
    var levelOffset = 0;
    var topLevel = 4;

    function addNewLevel() {
        var newLevel = $('<div/>', {
            class: 'row ltor',
            height: "0px",
            width: "0px"

        }).prependTo('.sceneContainer').animate({
            width: "500px",
            height: "120px"
        }, 1500 );

        $('<div/>', {
            id: 'tray' + topLevel,
            class: 'eggTray'
        }).appendTo(newLevel);
    }

    $('.egg').css({'width':ballsize, 'height':ballsize, 'margin-left':-(ballsize/2),'display':'block', 'position': 'absolute', 'bottom':20});

    function ballbounce() {
        var ballPosition = launchPosition + 170;
        $('.egg').animate({'bottom':ballPosition}, bouncetime, 'easeInQuad', function() {
            $('.egg').animate({'bottom':20}, {
                duration: bouncetime,
                step: function(){
                    var checkPointx = $('.egg').position().left;
                    var checkPointy = $('.egg').position().top;
                    var trayName = 'tray' + level;
                    var left = $('#' + trayName).position().left;
                    var right = left + 50;
                    var top = $('#' + trayName).offset().top;

                    if (checkPointx > left && checkPointx < right && checkPointy <= top+25 && checkPointy >= top - 10) {
                        level++;
                        $('.score').html('Score: ' + level);
                        $('.egg').stop();
                        $('#' + trayName).append($('.egg'));
                        $('.egg').css('position', 'relative');
                        $('.egg').css('top', 5);
                        $('.egg').css('left', '');
                        bbBottom = launchPosition;
                        if (launchPosition >= 200) {
                            //Add next level, remove lowest level
                            var levelRows = $('.row');
                            $(levelRows).each(function(index, level){
                               var top = $(level).position().top;
                               $(level).css('top', top + 120);
                            });
                            levelOffset++;
                            topLevel++;
                            addNewLevel();
                        }
                    }
                },
                complete: function() {
                    //Reset the level
                    //Splash the egg
                    level = levelOffset;
                    lives --;
                    $('.lives').html('Ande: ' + lives);
                    $('.egg').addClass('broken');
                    $('.egg').css({'width':110, 'height':122, 'bottom': -18,'margin-left':-50 });
                },
                easing: 'easeInQuad'});
    });
    }
    $('.sceneContainer').on(isMobile ? 'touchend' : 'click', function(evt){
        launchPosition = 20;
        if(!$('.egg').parent().is($('.sceneContainer'))) {
            bbleft = $('#tray' + (level -1)).position().left + 25;
            launchPosition = $('.sceneContainer').height() - ($('#tray' + (level -1)).offset().top);
            $('.sceneContainer').append($('.egg'));
            $('.egg').css({'width':ballsize, 'height':ballsize,'display':'block', 'position': 'absolute', 'left': bbleft, 'top': '', 'bottom': launchPosition + 22 });
            //launchPosition = $('.egg').position().top;
        }
        if (level === levelOffset) {
            if ($('.egg').hasClass('broken')) {
                $('.egg').css({'width':ballsize, 'height':ballsize, 'margin-left':-(ballsize/2), 'bottom': 20 });
                $('.egg').removeClass('broken');
            }
        }
        ballbounce();
    });
});
