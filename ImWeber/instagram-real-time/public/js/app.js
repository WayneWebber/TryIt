(function() {
    var socket = io.connect('http://428f12c2.ngrok.com/');

    /**
     * [Namespacing]
     */
    var Insta = Insta || {};

    Insta.App = {

        /**
         * [Application initialization method / call for the methods being initializated in order]
         */
        init: function() {
            this.mostRecent();
            this.getData();
            this.aboutInfo();
            this.mobileNav();
        },

        /**
         * [Interaction to open mobile navigation]
         */
        mobileNav: function() {
            var btMobNav = $('#js-mobNav'),
                nav = $('.nav');

            btMobNav.on('click', function(e) {
                e.preventDefault();
                if( !nav.hasClass('active') ) {
                    nav.addClass('active');
                } else {
                    nav.removeClass('active');
                }
            });

        },

        /**
         * [get data ajax and send to render method]
         */
        getData: function() {

            var self = this;
            socket.on('show', function(data) {
                var url = data.show;
                $.ajax({
                    url: url,
                    type: 'POST',
                    crossDomain: true,
                    dataType: 'jsonp'
                }).done(function (data) {
                    console.log("得到資料")
                    self.renderTemplate(data);
                });
            });
        },

        /**
         * [Render the images on the page and check for layout resize]
         */
        renderTemplate: function(data) {

            var lastAnimate, lastSrc, nextSrc, last,
                current = data.data[0].images.standard_resolution.url,
                w = $(document).width();

                var
                    query = data,
                    source = $('#mostRecent-tpl').html(),
                    compiledTemplate = Handlebars.compile(source),
                    result = compiledTemplate(query),
                    imgWrap = $('#imgContent');

                imgWrap.prepend(result);

                last = $('#imgContent a:first-child');
                lastSrc = $('#imgContent a:first-child').find('img').attr('src');
                nextSrc = $('#imgContent a:nth-child(2)').find('img').attr('src');

                if( lastSrc === nextSrc ) {
                    last.remove();
                }

                last = $('#imgContent').find(':first-child').removeClass('Hvh');

                if( w >= 900 ) {
                    lastAnimate = $('#imgContent').find(':nth-child(2)').addClass('animated fadeInLeft');
                }

                if( w <= 900 ) {
                    lastAnimate = $('#imgContent').find(':nth-child(1)').addClass('animated fadeInDown');
                }

                $(window).resize(function() {
                    var w = $(document).width();
                    if( w >= 900 ) {
                        lastAnimate = $('#imgContent').find(':nth-child(2)').addClass('animated fadeInLeft');
                    }

                    if( w <= 900 ) {
                        lastAnimate = $('#imgContent').find(':nth-child(1)').addClass('animated fadeInDown');
                    }
                });
        },

        /**
         * [ render most recent pics defined by subscribed hashtag ]
         */
        mostRecent: function() {
            socket.on('firstShow', function (data) {
                // console.dir(data);

                var url = data.nextpage.next_url;
                // console.log(urls == undefined);
                // var url = urls != undefined? data.nextpage.next_url :nextdata.pagination.next_url;
                $('.load-more').click(function(){
                    var a = 0;
                  displayImgs(url);
                  function displayImgs(url){
                    a++;
                    $.ajax({
                      type: "POST",
                      dataType: "jsonp",
                      cache: false,
                      url: url,
                      success: function(nextdata){
                        for(var i=0;i<nextdata.data.length; i++){
                           $("#imgContent").append('<a href="#"><img src="'+nextdata.data[i].images.low_resolution.url+'" ></a>');
                        }
                        urls = nextdata.pagination.next_url;

                        console.dir(urls)
                        // socket.emit('nextShow', {nextpage: nextdata.pagination});
                      }
                    })
                  }

                })
                var clean = $('imgContent').find('a').remove();
                var
                    query = data,
                    source = $('#firstShow-tpl').html(),
                    compiledTemplate = Handlebars.compile(source),
                    result = compiledTemplate(query),
                    imgWrap = $('#imgContent');

                imgWrap.html(result);
            });
        },

        /**
         * [about view interaction show/hide]
         */
        aboutInfo: function() {
            var about = $('.aboutWrap'),
                btClose = $('#js-closeAbout').find('a'),
                bt = $('#js-btAbout'),
                user = localStorage.getItem('user');

            if( user ) {
                about.removeClass('active');
            } else {
                localStorage.setItem('user', 'visited');
            }

            btClose.on('click', function(e) {
                e.preventDefault();
                about.removeClass('active');
            });

            bt.on('click', function(e) {
                e.preventDefault();
                if( !about.hasClass('active') ) {
                    about.addClass('active');
                } else {
                    about.removeClass('active');
                }
            });

        }

    };

    Insta.App.init();

})(this);
