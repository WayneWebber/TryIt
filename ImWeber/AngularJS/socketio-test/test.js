var ONEAD = {};
  ONEAD.channel =  21; // just reversed.
  ONEAD.volume =  0.5; // range is 0 to 1 (float)
  ONEAD.slot_limit = {width: 980, height: 440};
  // optional(s)
  ONEAD.slot_limit_multiple = {
    inread: {
      width: 666,
      height: 440
    }
  };
  ONEAD.response_freq = {start:1, step: 3};
  ONEAD.category = "-1";
  ONEAD.response_freq_multiple = {
    instream: "1,4,7,10,13,16,19",
    inread: "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20"
  };
  ONEAD.cmd = ONEAD.cmd || [];
  // For OneAD, DON'T MODIFY the following
  if (typeof(ONEAD) !== "undefined"){
    ONEAD.uid = "1000007";
    ONEAD.external_url = "http://onead.onevision.com.tw/"; // base_url, post-slash is necessary
    ONEAD.wrapper = 'ONEAD_player_wrapper';
    ONEAD.wrapper_multiple = {
      instream: "ONEAD_player_wrapper", // equals to inpage
      inread: "ONEAD_inread_wrapper",
      incover: "ONEAD_incover_wrapper"
    };
  }
  if (typeof window.isip_js == "undefined") {
    (function() {
    var src = 'http://ad-specs.guoshipartners.com/static/js/isip.v2.js';
    var js = document.createElement('script');
    js.async = true;
    js.type = 'text/javascript';
    var useSSL = 'https:' == document.location.protocol;
    js.src = src;
    var node = document.getElementsByTagName('script')[0];
    node.parentNode.insertBefore(js, node.nextSibling); // insert after
    })();
  }

  ONEAD_on_get_response = function(param){
  // if there is no pid, param is {}, it's not null
    if (param === null || param.pid === undefined){
        // 沒廣告
    }else{
      var t = setInterval(function(){
        if (ONEAD_is_above(100)){    }
      }, 1000);
   }
  }
      // 這個函式名稱是固定的，廣告播放完畢會呼叫之
  function changeADState(obj){
    if (obj.newstate == 'COMPLETED' || obj.newstate == 'DELETED' ){
      if (ONEAD.play_mode == 'incover'){
        // remove the dimming block
        ONEAD_cleanup(ONEAD.play_mode);
      }else{
        ONEAD_cleanup();
      }
    }
  }

var in_read = $('<div/>').attr({ 'id': 'div-inread-ad' });
var in_read_sc = document.createElement('script');
in_read_sc.setAttribute('defer', 'defer');
in_read_sc.innerHTML = 'if (typeof(ONEAD) !== "undefined"){ONEAD.cmd = ONEAD.cmd || [];ONEAD.cmd.push(function(){ONEAD_slot("div-inread-ad", "inread");});}';
$(in_read).append(in_read_sc);
$('p.bzkeyword').before(in_read);

var in_page = $('<div/>').attr({ 'id': 'div-onead-ad' });
var in_page_sc = document.createElement('script');
in_page_sc.setAttribute('defer', 'defer');
in_page_sc.innerHTML = 'if (typeof(ONEAD) !== "undefined"){ONEAD.cmd = ONEAD.cmd || [];ONEAD.cmd.push(function(){ONEAD_slot("div-onead-ad");});}';
$(in_page).append(in_page_sc);
$( '#header_box' ).after(in_page);