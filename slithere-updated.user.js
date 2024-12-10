// ==UserScript==
// @name         Slither.io Mods / Slithere.com 6.X
// @namespace    http://tampermonkey.net/
// @version      2024-10-17
// @description  try to take over the world!
// @author       You
// @match        *://slither.com/io
// @match        *://slither.io/
// @require      https://code.jquery.com/jquery-3.7.1.min.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=slither.com
// @grant        none
// ==/UserScript==

$(document.head).append('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">');
var renderMode = 2,
    version = '7.3',
    normalRender = false,
    gameFPS = null,
    positionHUD = null,
    bestscoreHUD = null,
    ipHUD = null,
    fpsHUD = null,
    styleHUD = "color: #FFF; font-family: Consolas, Verdana; font-size: 13px; position: fixed; opacity: 0.35; z-index: 7;",
    inpNick = null,
    currentIP = null,
    retry = 0,
    bgImage = null;
var f = false;
var colorfood = 1;
var sizee = 1;
var crazie = false;
var teamUp = false;
var loopInterval = 500;
var skinLoop = null;
var nextSkin = 0;
var highScore = 0;
var inpIP = null;
window.currentSkin = 0;
window.__skins = {};
setInterval(function () {
    if (Object.keys(window.__skins).length > 0) {
        for (var key in window.__skins) {
                slither[key] = window.__skins[key];
        }
    }
}, 100);
function zoom(e) {
    if (!window.gsc) {
        return;
    }
    e.preventDefault();
    window.lvz *= Math.pow(0.93, e.wheelDelta / -120 || e.detail / 2 || 0);
    window.lvz > 2 ? window.lvz = 2 : window.lvz < 0.1 ? window.lvz = 0.1 : null;
    window.gsc = window.lvz;
}

function zoomByKey(key) {
    var fzoom = key ? -2 : 2;
    window.lvz *= Math.pow(0.9, fzoom);
    window.lvz > 2 ? window.lvz = 2 : window.lvz < 0.1 ? window.lvz = 0.1 : null;
}

window.aef = window.oef;
window.oef = function () {
    window.aef();
    if (slither) {
        window.gsc = window.lvz;
    } else {
        window.lvz = window.sgsc;
    }
};
var tuslaraktif = false;
let setIngameSkin = function() {
  if (!slither) return setTimeout(setIngameSkin, 1000);
  setSkin(slither, currentSkin, null);
}
function init() {
    window.currentSkin = 0;
    play_btn.elem.onclick = function() {
      if (!want_play)
      if (!play_btn.disabled)
          if (!entering_code) {
              want_play = true;
              play_btn_click_mtm = timeObj.now();
              play_btn.setEnabled(false);
              nick.disabled = true;
              spinner_shown = true;
              ldmc.style.display = "inline";
              play_count++
              //setIngameSkin();
          }
    }
    appendDiv("position-hud", "nsi", styleHUD + "right: 30; bottom: 120px;");
    appendDiv("ip-hud", "nsi", styleHUD + "right: 30; bottom: 140px;");
    appendDiv("score-hud", "nsi", styleHUD + "right: 30; bottom: 180px;");
    appendDiv("fps-hud", "nsi", styleHUD + "right: 30; bottom: 160px;");
    positionHUD = document.getElementById("position-hud");
    ipHUD = document.getElementById("ip-hud");
    fpsHUD = document.getElementById("fps-hud");
    bestscoreHUD = document.getElementById("score-hud");
    document.addEventListener("wheel", zoom, false);
    window.lvz = window.sgsc;
    document.addEventListener("keydown", function (e) {
        if (window.playing) {
            switch (e.keyCode) {
                case 9:
                    e.preventDefault();
                    positionHUD.style.display = positionHUD.style.display == "none" ? positionHUD.style.display = null : positionHUD.style.display = "none";
                    ipHUD.style.display = ipHUD.style.display == "none" ? ipHUD.style.display = null : ipHUD.style.display = "none";
                    fpsHUD.style.display = fpsHUD.style.display == "none" ? fpsHUD.style.display = null : fpsHUD.style.display = "none";
                    bestscoreHUD.style.display = bestscoreHUD.style.display == "none" ? bestscoreHUD.style.display = null : bestscoreHUD.style.display = "none";
                    break;
                case 27:
                    forceConnect();
                    break;
                case 81:
                    gameOver();
                    break;
                case 90:
                    gsc = 0.9;
                    window.lvz = 0.9;
                    break;
                case 69: //r
                    changeSkinback();
                    break;
                case 82: //e
                    changeSkin();
                    break;
                case 70:
                    if (f === true) {
                        f = false;
                    } else {
                        f = true;
                    }
                    foodInterval();
                    break;
                case 71:
                    if (colorfood >= 7) {
                        colorfood = 0;
                    }
                    colorfood = colorfood + 1;
                    break;
                case 72:
                    if (sizee >= 20) {
                        sizee = 0;
                    }
                    sizee = sizee + 2;
                    break;
                case 74:
                    if (crazie === true) {
                        crazie = false;
                    } else {
                        crazie = true;
                    }
                    break;
                case 16:
                    setAcceleration(true);
                    break;
                case 77://M
                    zoomByKey(false);
                    zoom(e);
                    break;
                case 78://N
                    zoomByKey(true);
                    zoom(e);
                    break;
					case 49:
					if(tuslaraktif == true)
					{
						insertFitout('oneeye'); //1
					}
						break;
					case 50:
					if(tuslaraktif == true)
					{
						insertFitout('argo'); //2
					}
						break;
					case 51:
					if(tuslaraktif == true)
					{
						insertFitout('magnet'); //3
					}
						break;
					case 52:
					if(tuslaraktif == true)
					{
						insertFitout('kiwi'); //4
					}
						break;
					case 53:
					if(tuslaraktif == true)
					{
						insertFitout('punch'); //5
					}
						break;
					case 54:
					if(tuslaraktif == true)
					{
						insertFitout('smile'); //6
					}
						break;
					case 55:
					if(tuslaraktif == true)
					{
						insertFitout('snail'); //7
					}
						break;
					case 56:
					if(tuslaraktif == true)
					{
						insertFitout('store'); //8
					}
						break;
					case 57:
					if(tuslaraktif == true)
					{
						insertFitout('reddit'); //8
					}
					break;
					case 66:
					if(tuslaraktif == false)
					{
					tuslaraktif = true;
					} else { tuslaraktif = false; }
					break;
                case 85:
                    showHelp(true);
                    break;
            }
        }
    });
    document.addEventListener("keyup", function (e) {
        switch (e.keyCode) {
            case 16:
                setAcceleration(false);
                break;
            case 85:
                showHelp(false);
                break;
        }
    });
    setLogoMenu();
    loadBoard();
    setGPU();
    updateLoop();
    loadFPS();
    localStorage.edttsg = "1";
}


function appendDiv(id, className, style) {
    var div = document.createElement("div");
    if (id) {
        div.id = id;
    }
    if (className) {
        div.className = className;
    }
    if (style) {
        div.style = style;
    }
    document.body.appendChild(div);
}

function changeSkin() {
    if (window.playing && window.slither != null) {
        var skin = window.slither.rcv;
        skin++;
        if (skin > window.max_skin_cv) {
            skin = 0;
        }
        window.setSkin(window.slither, skin, null);
        resetTogg();
    }
}

function changeSkinback() {
    var skin = window.slither.rcv;
    if (window.playing && window.slither != null) {
        skin--;
        if (skin < 1) {
            skin = window.max_skin_cv;
        }
        window.setSkin(window.slither, skin, null);
        resetTogg();
    }
}

function setLogoMenu() {
    var login = document.getElementById("login");
    if (login) {
        loadOptions();
        document.getElementById("nick").value = "Slithere.com";
        document.getElementById("nick_holder").style.marginTop = "10px";
        document.getElementById("playh").firstChild.style.marginBottom = "10px";
        document.getElementById("login").style.marginTop = "30px";
        document.getElementById("logo").style.marginTop = "0px";
        document.getElementById("lastscore").style.marginTop = "20px";
        jQuery('#login').append('');
        jQuery('#login').append('<div style="box-shadow: #000 0px 6px 50px;width: 700px;color: rgb(165, 165, 165);border-radius: 40px;font-family: Arial;font-size: 13px;text-align: center;margin: 10px auto 10px;line-height: 16px;text-shadow: #000000 0px 1px 1px;background: none;padding:25px;">We share best Slither.io Mods, Extensions Visit Us: <a style="color:#e2cd09;"target="_blank"href="http://www.slithere.com">SLITHERE.COM</a><br><span style="color:#ff5656;">Plaese Disable other Slither.io extension for use that one with full features!</span><div class="row" style="margin-top:15px;"><div class="col-xs-6 col-md-4"style="text-align:left;font-weight: bold;padding-right:0;"><div style="border-radius: 4px;padding:5px 0px;"><center><a href="http://www.slithere.com"target="_blank"style="color:#00b9d6;opacity:2;text-decoration:none;">VISIT SLITHERE.COM</a><br/><a href="http://www.diepioplay.com"target="_blank"style="color:#00b9d6;opacity:2;text-decoration:none;">VISIT DIEPIOPLAY.COM</a><br/><a href="http://www.agarw.com"target="_blank"style="color:#00b9d6;opacity:2;text-decoration:none;">VISIT AGARW.COM</a></br><a href="http://www.iogameslist.org"target="_blank"style="color:#00f5f9;opacity:2;text-decoration:none;">VISIT IOGAMESLIST.ORG</a></center></br><select id="select-srv"class="form-control"style="color:#047a18;"><option value="">Select Server</option></select></div><div style="border-radius: 4px;padding:5px 0px;"><select id="select-graph"class="form-control"style="color: #c90808;"><option value="3">Graphic: Normal</option><option value="2">Graphic: Optimized</option><option value="1">Graphic: Low</option></select></div><div style="border-radius: 4px;padding:5px 0px;"><select id="bg-value"class="form-control"style="color: #0838d6;"><option value="1">Background:Default</option><option value="2">Background:Custom(URL)</option><option value="3">Background:White grid</option><option value="4">Background:Black grid</option><option value="5">Background:None(Black)</option><option value="6">Background:Cats</option><option value="7">Background:Dirt</option><option value="8">Background:Grass</option><option value="9">Background:Grid</option><option value="10">Background:Magma</option><option value="11">Background:Stonewall</option><option value="12">Background:Wood</option></select></div><div style="line-height: 20px;text-align: center;"></br>Mod Version: ' + version + '</br><a style="color:#00ff00;opacity:2;text-decoration:none;"href="https://chrome.google.com/webstore/detail/slitherio-mods-hacks-skin/gkfpaolkkchfafkhdleklbddpcolkdea/reviews"target="_blank">Rate for SLITHERE MOD [CLICK]</a></div></div><div class="col-xs-12 col-md-8"><div class="form-inline"style="padding: 5px;color: rgb(128, 88, 208); border-radius: 4px; margin: 5px auto; background-color: rgb(255, 255, 255);"><input id="ip-server"type="text"placeholder="Enter Server IP Here"class="form-control"style="color:#2196F3;text-align:center;"> <input id="connect-btn"type="button"value="Play With IP"class="btn btn-primary"style="padding:6px 10px;"></div><div style="border-radius: 4px; margin: 5px auto; padding: 5px 2px; background-color: rgb(255, 255, 255);"><input type="file"accept="image/*"id="fileinput"style="display: inline-block;"><input id="setbg-btn"type="button"value="Set BG"onclick="localImage();"class="btn btn-info"style="padding: 4px 10px;"></div><span style="color:#999">Upload your image with (559x519),then press (Set BG)</span></br></br><div style="color: rgb(133, 249, 174); font-family: Arial; font-size: 13px; text-align: left; opacity: 2; margin: 0px auto; padding: 5px 0px; line-height: 22px; text-shadow: rgb(0, 0, 0) 0px 1px 1px;"><b style="color:#8058d0">MAIN | </b><b style="color:#FF9800">ESC</b> - Respawn | <b style="color:#FF9800">Q</b> - Die | <b style="color:#FF9800">Z</b> - Reset Zoom | <b style="color:#FF9800">SHIFT</b> - Boost </br><b style="color:#FF9800">TAB</b> - Toggle HUD | <b style="color:#FF9800">N/M</b> - Zoom In/Out | <b style="color:#FF9800">U</b> - Hold For Help</br><b style="color:#8058d0">SKINS | </b><b style="color:#FF9800">W</b> - Toggle Skin Rotator | <b style="color:#FF9800">E</b> - Skin Backward | <b style="color:#FF9800">R</b> - Skin Forward</br><b style="color:#8058d0">FOODS | </b><b style="color:#FF9800">F</b> - Toggle Food | <b style="color:#FF9800">G</b> - Food Color | <b style="color:#FF9800">H</b> - Food Size | <b style="color:#FF9800">J</b> - Crazy</br><b style="color:#8058d0">ADDS | </b><b style="color:#ff0000">B</b> - ON/OFF ADS</b> | <b style="color:#FF9800">1</b> - Green Eye | <b style="color:#FF9800">2</b> - Point | <b style="color:#FF9800">3</b> - Magnet</br><b style="color:#FF9800">4</b> - Kiwi | <b style="color:#FF9800">5</b> - Punch | <b style="color:#FF9800">6</b> - Smile | <b style="color:#FF9800">7</b> - Snail | <b style="color:#FF9800">8</b> - Google | <b style="color:#FF9800">9</b> - Reddit</div></div></div></div></div>');
        inpIP = document.getElementById("ip-server");
        var nick = document.getElementById("nick");
        nick.addEventListener("input", setNickname, false);
        var connectBtn = document.getElementById("connect-btn");
        connectBtn.onclick = forceConnect;
        listServer();
        var selectGraph = document.getElementById("select-graph");
        if (renderMode == 1) {
            selectGraph.selectedIndex = 2;
        } else if (renderMode == 2) {
            selectGraph.selectedIndex = 1;
        } else {
            selectGraph.selectedIndex = 0;
            normalRender = true;
        }
        selectGraph.onchange = function () {
            var mode = selectGraph.value;
            if (mode) {
                renderMode = mode;
                localStorage.setItem("rendermode", renderMode);
            }
        };
        var bgGraph = document.getElementById("bg-value");
        bgGraph.onchange = function () {
            var bg = parseInt(bgGraph.value);
            switch (bg) {
                case 1:
                    ii.src = "http://slither.io/s/bg45.jpg";
                    break;
                case 2:
                    ii.src = prompt("Enter url image (559x519px)")
                    break;
                case 3:
                    ii.src = "http://www.slithere.com/chrome2/whitegrid.png";
                    break;
                case 4:
                    ii.src = "http://www.slithere.com/chrome2/blackgrid.png";
                    break;
                case 5:
                    ii.src = "http://www.slithere.com/chrome2/black.png";
                    break;
                case 6:
                    ii.src = "http://www.slithere.com/chrome2/carts.jpg";
                    break;
                case 7:
                    ii.src = "http://www.slithere.com/chrome2/dirt.jpg";
                    break;
                case 8:
                    ii.src = "http://www.slithere.com/chrome2/grass.jpg";
                    break;
                case 9:
                    ii.src = "http://www.slithere.com/chrome2/grid.jpg";
                    break;
                case 10:
                    ii.src = "http://www.slithere.com/chrome2/magma.jpg";
                    break;
                case 11:
                    ii.src = "http://www.slithere.com/chrome2/stonewall.jpg";
                    break;
                case 12:
                    ii.src = "http://www.slithere.com/chrome2/wood.jpg";
                    break;
            }
        };
        resizeScreen();
        yardimet();
        $('#playh').insertAfter('#nick_holder');
        $('#playh').css({
            'display': 'inline-flex',
            'margin-left': '5px'
        });
        jQuery('#tips').remove();
        jQuery('#lastscore').css('margin-top', '0px');
        cskh.style.bottom = "35px";
        cskh.style.display = "inline";
        cstx.style.display = "none";
        clq.style.width = "320px";
        clq.style.bottom = "35px";
        clq.innerHTML = "</br></br><a class='lq2' href='http://slithere.com/privacy-policy' target='_blank'>Privacy Policy</a> - <a class='lq2' href='http://facebook.com/slitherecom' target='_blank'>Contact</a>";
    } else {
        setTimeout(setLogoMenu, 100);
    }
}

function loadOptions() {
	//Merry Christmas version
    if (window.localStorage.getItem("nick") != null) {
        var nick = window.localStorage.getItem("nick");
        document.getElementById("nick").value = nick;
    }
    if (window.localStorage.getItem("rendermode") != null) {
        var mode = parseInt(window.localStorage.getItem("rendermode"));
        if (mode >= 1 && mode <= 3) {
            renderMode = mode;
        }
    }
    if (window.localStorage.getItem("highscore") != null) {
        var score = parseInt(window.localStorage.getItem("highscore"));
        if (score > 0) {
            highScore = score;
        }
    }
    if (window.resetGame) {
        window.resetOld = window.resetGame;
        window.resetGame = function () {
            if (slither != null) {
                var score = Math.floor(150 * (fpsls[slither.sct] + slither.fam / fmlts[slither.sct] - 1) - 50) / 10;
                if (score > highScore) {
                    highScore = score;
                    window.localStorage.setItem("highscore", highScore);
                }
            }
            window.resetOld();
        };
    }
}

function setNickname() {
    var nick = document.getElementById("nick").value;
    window.localStorage.setItem("nick", nick);
}

function showHelp(show) {
    if (show) {
        jQuery('div#menu-help').fadeIn(100);
    } else {
        jQuery('div#menu-help').fadeOut(100);
    }
}


function yardimet() {
    var div = document.createElement('div');
    div.id = 'menu-help';
    div.style.width = "700px";
    div.style.color = "#85f9ae";
    div.style.fontFamily = "'Arial'";
    div.style.fontSize = "13px";
    div.style.textAlign = "center";
    div.style.opacity = "1";
    div.style.zIndex = "1000";
    div.style.display = "none";
    div.style.margin = "0 auto";
    div.style.padding = "5px 0";
    div.style.position = "fixed";
    div.style.top = "150px";
    div.style.left = "calc(50% - 350px)";
    div.style.lineHeight = "22px";
    div.style.textShadow = "0px 1px 1px #000";
    div.innerHTML = "<b style='color:#FF9800'>ESC</b> - Respawn | <b style='color:#FF9800'>Q</b> - Die | <b style='color:#FF9800'>Z</b> - Reset Zoom | <b style='color:#FF9800'>SHIFT</b> - Boost | <b style='color:#FF9800'>TAB</b> - Toggle HUD | <b style='color:#FF9800'>W</b> - Toggle Skin Rotator<br/><b style='color:#FF9800'>N/M</b> - Zoom In/Out | <b style='color:#FF9800'>E/R</b> - Change Skin | <b style='color:#FF9800'>F</b> - Toggle Food | <b style='color:#FF9800'>G</b> - Food Color | <b style='color:#FF9800'>H</b> - Food Size | <b style='color:#FF9800'>J</b> - Food Crazy</br><b style='color:#FF9800'>1</b> - Green Eye | <b style='color:#FF9800'>2</b> - Point | <b style='color:#FF9800'>3</b> - Magnet | <b style='color:#FF9800'>4</b> - Kiwi | <b style='color:#FF9800'>5</b> - Punch | <b style='color:#FF9800'>6</b> - Smile | <b style='color:#FF9800'>7</b> - Snail | <b style='color:#FF9800'>8</b> - Google | <b style='color:#FF9800'>9</b> - Reddit";
    jQuery('body').append(div);
}

function connectionStatus() {
    if (!window.connecting || retry == 10) {
        window.forcing = false;
        retry = 0;
        return;
    }
    retry++;
    setTimeout(connectionStatus, 1000);
}

function forceConnect() {
    if (inpIP.value.length == 0 || !window.connect) {
        return;
    }
    window.forcing = true;
    if (!window.bso) {
        window.bso = {};
    }
    if (jQuery('canvas').eq(1).css('display') != 'none') {
        jQuery('canvas').eq(1).css('display', 'none');
    }
    var srv = inpIP.value.trim().split(":");
    window.bso.ip = srv[0];
    window.bso.po = srv[1];
    window.connect();
    setTimeout(connectionStatus, 1000);
}

function loadBestscore() {
    if (!window.slither || !window.fpsls || !window.fmlts) {
        return;
    }
    if (bestscoreHUD && highScore > 0) {
        bestscoreHUD.textContent = "Best Score: " + highScore;
    }
}

function listServer() {
    if (window.sos && window.sos.length > 0) {
        var selectSrv = document.getElementById("select-srv");
        for (var i = 0; i < sos.length; i++) {
            var srv = sos[i];
            var option = document.createElement("option");
            option.value = srv.ip + ":" + srv.po;
            option.text = (i + 1) + ". " + option.value;
            selectSrv.appendChild(option);
        }
        selectSrv.onchange = function () {
            var srv = selectSrv.value;
            inpIP.value = srv;
        };
    } else {
        setTimeout(listServer, 100);
    }
}

function resizeScreen() {
    if (window.resize) {
        window.lww = 0;
        window.wsu = 0;
        window.resize();
        var wh = Math.ceil(window.innerHeight);
        if (wh < 800) {
            var login = document.getElementById("login");
            window.lgbsc = wh / 800;
            login.style.top = -50 + "px";
            if (window.trf) {
                window.trf(login, "scale(" + window.lgbsc + "," + window.lgbsc + ")");
            }
        }
    } else {
        setTimeout(resizeScreen, 100);
    }
}

function loadBoard() {
    if (window.lbh) {
        window.lbh.textContent = "Slithere.com Top 10";
        window.lbh.style.fontSize = "20px";
    } else {
        setTimeout(loadBoard, 100);
    }
}

function setNormalMode() {
    normalRender = true;
    window.ggbg = true;
    if (!window.bgp2 && bgImage) {
        window.bgp2 = bgImage;
    }
    window.render_mode = 2;
}

function setGPU() {
    if (renderMode == 3) {
        if (!normalRender) {
            setNormalMode();
        }
        return;
    }
    if (normalRender) {
        normalRender = false;
    }
    if (window.want_quality && window.want_quality != 0) {
        window.want_quality = 0;
        window.localStorage.setItem("qual", "0");
        window.grqi.src = "/s/lowquality.png";
    }
    if (window.ggbg && window.gbgmc) {
        window.ggbg = false;
    }
    if (window.high_quality) {
        window.high_quality = false;
    }
    if (window.gla && window.gla != 0) {
        window.gla = 0;
    }
    if (window.render_mode && window.render_mode != renderMode) {
        window.render_mode = renderMode;
    }
}

function loadFPS() {
    if (window.playing && fpsHUD && window.fps && window.lrd_mtm) {
        if (Date.now() - window.lrd_mtm > 970) {
            fpsHUD.textContent = "FPS: " + window.fps;
        }
    }
    setTimeout(loadFPS, 50);
}

function updateLoop() {
    setGPU();
    loadBestscore();
    if (window.playing) {
        if (positionHUD) {
            positionHUD.textContent = "X: " + (~~window.view_xx || 0) + " Y: " + (~~window.view_yy || 0);
        }
        if (inpIP && window.bso) {
            currentIP = window.bso.ip + ":" + window.bso.po;
            inpIP.value = currentIP;
            if (ipHUD) {
                ipHUD.textContent = "IP: " + currentIP;
            }
        }
    }
    setTimeout(updateLoop, 1000);
}

function ShowFullscreen() {
    var elem = document.getElementsByTagName('html')[0];
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    }
}

function gameOver() {
    if (playing) {
        try {
            localStorage.snakercv = slither.rcv
            localStorage.currentSkin = currentSkin;
        } catch (e) {}
        window.want_close_socket = -1;
        window.ws.close();
        window.ws = null;
        connected = false;
        playing = false;
        window.resetGame();
        dead_mtm = timeObj.now() - 5E3
    }
}


function foodInterval() {
    skinLoop = setInterval(function () {
        if (f === true && colorfood != 7 && crazie !== true) {
            newFood(3, slither.xx, slither.yy, sizee, 5, colorfood);
        } else if (f === true && colorfood == 7 && crazie !== true) {
            newFood(3, slither.xx, slither.yy, sizee, 5, Math.floor(Math.random() * 7) + 1);
        } else if (f === true && crazie === true) {
            newFood(3, slither.xx, slither.yy, Math.floor(Math.random() * 20) + 1, 5, Math.floor(Math.random() * 7) + 1);
        }
    }, 100);
}

init();
var toggEye = false;
var toggArgo = false;
var toggMag = false;
var toggKiw = false;
var toggPunch = false;
var toggSmile = false;
var toggSnail = false;
var toggStore = false;
var toggRed = false;

function resetTogg() {
    toggEye = false;
    toggArgo = false;
    toggMag = false;
    toggKiw = false;
    toggPunch = false;
    toggSmile = false;
    toggSnail = false;
    toggStore = false;
    toggRed = false;
}

function resetCustom() {
    slither.ec = "#fff";
    slither.ppc = "#000";
    slither.ppa = 1;
    toggRed = false;
}

function flagTogg(result) {
    toggArgo = result;
    toggMag = result;
    toggKiw = result;
    toggPunch = result;
    toggStore = result;
    toggRed = result;
}

function eyeTogg(result) {
    slither.ed = 6;
    slither.esp = 6;
    slither.eca = 0.75;
    slither.eo = 0;
    slither.er = 6;
    slither.easp = .1;
    slither.pr = 3.5;
    slither.pma = 2.3;
    slither.slg = 0;
    slither.eac = 0;
    slither.jyt = 0;
    toggSnail = result;
    toggEye = result;
    toggSmile = result;
}

function insertFitout(fitout) {
    resetCustom();
    if (fitout == 'oneeye') {
        if (!toggEye) {
            eyeTogg(false);
            slither.one_eye = !0;
            slither.ebi = jsebi;
            slither.ebiw = 64;
            slither.ebih = 64;
            slither.ebisz = 29;
            slither.epi = jsepi;
            slither.epiw = 48;
            slither.epih = 48;
            slither.episz = 14;
            slither.pma = 4;
            slither.swell = .06;
            toggEye = true;
            toggSmile = false;
            toggSnail = false;
        }
        else {
            slither.one_eye = 0;
            slither.swell = 0;
            toggEye = false;
        }
    }
    if (fitout == 'reddit') {//Flag
        if (!toggRed) {
            flagTogg(false);
            eyeTogg(false);
            window.setSkin(window.slither, 19, null);
            var redbulb = document.createElement("canvas");
            redbulb.width = redbulb.height = 34;
            ctx = redbulb.getContext("2d");
            g = ctx.createRadialGradient(17, 17, 1, 17, 17, 16);
            g.addColorStop(0, "rgba(255, 255, 255, 1)");
            g.addColorStop(.83, "rgba(150,150,150, 1)");
            g.addColorStop(.84, "rgba(80,80,80, 1)");
            g.addColorStop(.99, "rgba(80,80,80, 1)");
            g.addColorStop(1, "rgba(80,80,80, 0)");
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, 34, 34);
            slither.ec = "#ee5500";
            slither.atc1 = "#000";
            slither.atc2 = "#fff";
            slither.er = 4.5;
            slither.ppa = 0;
            slither.antenna = !0;
            var b = 8;
            slither.atx = new Float32Array(b);
            slither.aty = new Float32Array(b);
            slither.atvx = new Float32Array(b);
            slither.atvy = new Float32Array(b);
            slither.atax = new Float32Array(b);
            slither.atay = new Float32Array(b);
            for (--b; 0 <= b; b--) slither.atx[b] = slither.xx, slither.aty[b] = slither.yy;
            slither.bulb = redbulb;
            slither.blbx = -10;
            slither.blby = -10;
            slither.blbw = 20;
            slither.blbh = 20;
            slither.bsc = 1;
            slither.blba = .9;
            toggRed = true;
        } else {
            slither.antenna = 0;
            toggRed = false;
        }
    }
    if (fitout == 'argo') {//Flag
        if (!toggArgo) {
            flagTogg(false);
            slither.antenna = !0;
            slither.atba = 0;
            slither.atc1 = "#00688c";
            slither.atc2 = "#64c8e7";
            slither.atwg = !0;
            slither.atia = .35;
            slither.abrot = !1;
            var b = 18;
            slither.atx = new Float32Array(b);
            slither.aty = new Float32Array(b);
            slither.atvx = new Float32Array(b);
            slither.atvy = new Float32Array(b);
            slither.atax = new Float32Array(b);
            slither.atay = new Float32Array(b);
            for (--b; 0 <= b; b--) slither.atx[b] = slither.xx, slither.aty[b] = slither.yy;
            slither.bulb = acbulb;
            slither.blbx = -10;
            slither.blby = -10;
            slither.blbw = 20;
            slither.blbh = 20;
            slither.bsc = 1;
            slither.blba = .9;
            toggArgo = true;
        } else {
            slither.antenna = 0;
            toggArgo = false;
        }
    }
    if (fitout == 'magnet') {//Flag
        if (!toggMag) {
            flagTogg(false);
            slither.ec = "#ff5609";
            slither.eca = 1;
            slither.antenna = !0;
            slither.atba = 0;
            slither.atc1 = "#000000";
            slither.atc2 = "#5630d7";
            slither.atia = 1;
            slither.abrot = !0;
            b = 18;
            slither.atx = new Float32Array(b);
            slither.aty = new Float32Array(b);
            slither.atvx = new Float32Array(b);
            slither.atvy = new Float32Array(b);
            slither.atax = new Float32Array(b);
            slither.atay = new Float32Array(b);
            for (--b; 0 <= b; b--) slither.atx[b] = slither.xx, slither.aty[b] = slither.yy;
            slither.bulb = cdbulb;
            slither.blbx = -5;
            slither.blby = -10;
            slither.blbw = 20;
            slither.blbh = 20;
            slither.bsc = 1.6;
            slither.blba = 1;
            toggMag = true;
        } else {
            slither.ec = "#fff";
            slither.antenna = 0;
            toggMag = false;
        }
    }
    if (fitout == 'kiwi') {//Flag
        if (!toggKiw) {
            flagTogg(false);
            slither.eca = 1;
            slither.antenna = !0;
            slither.atba = 0;
            slither.atc1 = "#301400";
            slither.atc2 = "#ff6813";
            slither.atwg = !0;
            slither.atia = .5;
            slither.abrot = !0;
            c = 9;
            slither.atx = new Float32Array(c);
            slither.aty = new Float32Array(c);
            slither.atvx = new Float32Array(c);
            slither.atvy = new Float32Array(c);
            slither.atax = new Float32Array(c);
            slither.atay = new Float32Array(c);
            for (--c; 0 <= c; c--) slither.atx[c] = slither.xx, slither.aty[c] = slither.yy;
            slither.bulb = kwkbulb;
            slither.blbx = -39;
            slither.blby = -63;
            slither.blbw = 172;
            slither.blbh = 113;
            slither.bsc = .42;
            slither.blba = 1;
            toggKiw = true;
        } else {
            slither.antenna = 0;
            toggKiw = false;
        }
    }
    if (fitout == 'punch') {//Flag
        if (!toggPunch) {
            flagTogg(false);
            slither.eca = 1;
            slither.antenna = !0;
            slither.atba = 0;
            slither.atc1 = "#1d3245";
            slither.atc2 = "#44d4ff";
            slither.atwg = !0;
            slither.atia = .43;
            slither.abrot = !0;
            c = 12;
            slither.atx = new Float32Array(c);
            slither.aty = new Float32Array(c);
            slither.atvx = new Float32Array(c);
            slither.atvy = new Float32Array(c);
            slither.atax = new Float32Array(c);
            slither.atay = new Float32Array(c);
            for (--c; 0 <= c; c--) slither.atx[c] = slither.xx, slither.aty[c] = slither.yy;
            slither.bulb = pwdbulb;
            slither.blbx = -36;
            slither.blby = -100;
            slither.blbw = 190;
            slither.blbh = 188;
            slither.bsc = .25;
            slither.blba = 1;
            toggPunch = true;
        } else {
            slither.antenna = 0;
            toggPunch = false;
        }
    }
    if (fitout == 'smile') {
        if (!toggSmile) {
            eyeTogg(false);
            slither.eac = !0;
            slither.jyt = !0;
            slither.one_eye = 0;
            slither.swell = 0;
            toggSmile = true;
            toggSnail = false;
            toggEye = false;
        } else {
            slither.eac = 0;
            slither.jyt = 0;
            toggSmile = false;
        }
    }
    if (fitout == 'snail') {
        if (!toggSnail) {

            slither.one_eye = 0;
            slither.swell = 0;
            slither.ed = 34;
            slither.esp = 14;
            slither.eca = 1;
            slither.eo = 3;
            slither.er = 8;
            slither.easp = .038;
            slither.pr = 4.5;
            slither.pma = 3;
            slither.slg = !0;
            toggSnail = true;
            toggEye = false;
        } else {
            slither.ed = 6;
            slither.esp = 6;
            slither.eca = 0.75;
            slither.eo = 0;
            slither.er = 6;
            slither.easp = .1;
            slither.pr = 3.5;
            slither.pma = 2.3;
            slither.slg = 0;
            toggSnail = false;
        }
    }
    if (fitout == 'store') {//Flag
        if (!toggStore) {
            flagTogg(false);
            slither.eca = 1;
            slither.antenna = !0;
            slither.atba = 0;
            slither.atc1 = "#002828";
            slither.atc2 = "#80d0d0";
            slither.atwg = !0;
            slither.atia = .5;
            slither.abrot = !0;
            c = 9;
            slither.atx = new Float32Array(c);
            slither.aty = new Float32Array(c);
            slither.atvx = new Float32Array(c);
            slither.atvy = new Float32Array(c);
            slither.atax = new Float32Array(c);
            slither.atay = new Float32Array(c);
            for (--c; 0 <= c; c--) slither.atx[c] = slither.xx, slither.aty[c] = slither.yy;
            slither.bulb = playbulb;
            slither.blbx = -29;
            slither.blby = -74;
            slither.blbw = 142;
            slither.blbh = 149;
            slither.bsc = .36;
            slither.blba = 1;
            toggStore = true;
        } else {
            slither.antenna = 0;
            toggStore = false;
        }
    }
}

function localImage() {
    var file = document.querySelector('input[type=file]').files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
        theImage = reader.result;
        localStorage.setItem("savei", theImage);
        ii.src = localStorage.getItem("savei");
    };
    if (file) {
        reader.readAsDataURL(file);
    } else {
        preview.src = "";
    }
}

function resizeScreen() {
    if (window.resize) {
        window.lww = 0;
        window.wsu = 0;
        window.resize();
        var wh = Math.ceil(window.innerHeight);
        if (wh < 800) {
            var login = document.getElementById("login");
            window.lgbsc = wh / 800;
            login.style.top = -20 + "px";
            if (window.trf) {
                window.trf(login, "scale(" + window.lgbsc + "," + window.lgbsc + ")");
            }
        }
    } else {
        setTimeout(resizeScreen, 100);
    }
}

window.addEventListener('resize', function () {
    resizeScreen()
}, false);

document.getElementById('twt').href = "http://twitter.com/intent/tweet?status=Come%20and%20play%20http%3A%2F%2Fslithereio.com%20%23slitherio";
document.getElementById('fb').href = "https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fslithereio.com";
document.getElementById("csk").childNodes[1].src = "http://www.wormax.org/chrome3kafa/changeskin5.png";
//Default newest skin
if (localStorage.snakercv == undefined) {
    localStorage.snakercv = max_skin_cv;
}
window.addEventListener('click', function () {
    $(window).focus()
});

(function(){
    slitherenabled = true;

    if (!+localStorage.getItem('edttsg')) {
        localStorage.setItem('edttsg', 1);
        cskh.style.display = "inline";
        cstx.style.display = "none";
    }
    if (isNaN(+localStorage['snakercv'])) localStorage.setItem('snakercv', 0);
    if (!localStorage.getItem('slithereskin-skins')) localStorage.setItem('slithereskin-skins', '[]');

    var body = document.body, switches = {};

    function createWindow() {
        var blackout = document.createElement('div');
        blackout.className = 'slithereskin-blackout';
        body.appendChild(blackout);
        var wind = document.createElement('div');
        wind.className = 'slithereskin-window';
        wind.onmousedown = function(e) {
            e.stopPropagation();
        };
        blackout.appendChild(wind);
        return blackout;
    }

    function createSwitch(parent, opt, text, func, initial = false) {
        var id = 'slithereskin-'+opt;
        if (!localStorage.getItem(id)) localStorage.setItem(id, initial);
        switches[opt] = localStorage.getItem(id) == 'true';

        var div = document.createElement('div');
        div.className = 'slithereskin-checkbox-div';
        parent.appendChild(div);

        var checkbox = document.createElement('div');
        checkbox.className = 'slithereskin-checkbox';
        div.appendChild(checkbox);

        var input = document.createElement('input'), o = {div:div,input:input};
        input.type = 'checkbox';
        input.id = id;
        if (switches[opt]) input.checked = true, func && func(o);
        input.onchange = function() {
            switches[opt] = this.checked;
            localStorage.setItem(id, switches[opt]);
            func && func(o);
        };
        checkbox.appendChild(input);

        var label = document.createElement('label');
        label.htmlFor = id;
        checkbox.appendChild(label);

        var textLabel = document.createElement('label');
        textLabel.htmlFor = id;
        textLabel.textContent = text;
        div.appendChild(textLabel);

        return input;
    }

    // <Styles>

    var styles = {
        '.slithereskin-checkbox': {
            display: 'inline-block',
            width: '22px',
            height: '22px',
            position: 'relative',
            'margin-right': '8px',
            'background-color': '#fcfff4',
            background: 'linear-gradient(to bottom, #fcfff4 0%, #dfe5d7 40%, #b3bead 100%)',
            'border-radius': '50px',
            'box-shadow': 'inset 0px 1px 1px white, 0px 1px 3px rgba(0, 0, 0, 0.5)'
        },
        '.slithereskin-checkbox>input': {
            visibility: 'hidden'
        },
        '.slithereskin-checkbox>label': {
            width: '14px',
            height: '14px',
            position: 'absolute',
            top: '4px',
            left: '4px',
            cursor: 'pointer',
            background: 'linear-gradient(to bottom, #222222 0%, #45484d 100%)',
            'border-radius': '50px',
            'box-shadow': 'inset 0px 1px 1px rgba(0, 0, 0, 0.5), 0px 1px 0px white'
        },
        '.slithereskin-checkbox>label::after': {
            content: '""',
            width: '8px',
            height: '5px',
            position: 'absolute',
            top: '2px',
            left: '2px',
            border: '2px solid #fcfff4',
            'border-top': 'none',
            'border-right': 'none',
            background: 'transparent',
            opacity: 0,
            '-webkit-transform': 'rotate(-45deg)',
            transform: 'rotate(-45deg)'
        },
        '.slithereskin-checkbox-div:hover>.slithereskin-checkbox>label::after': {
            opacity: 0.3
        },
        '.slithereskin-checkbox>input:checked + label::after': {
            opacity: '1 !important'
        },
        '#slitcheck': {
            transition: '1s'
        },
        '#slitcheck>div': {
            display: 'inline-block',
            margin: '0 15px'
        },
        '.slithereskin-link': {
            color: 'white',
            cursor: 'pointer'
        },
        '.slithereskin-link:hover': {
            'text-shadow': '1px 1px 4px rgba(0,0,0,1)'
        },
        '.slithereskin-blue': {
            color: '#3366FF',
            'text-decoration': 'none',
            cursor: 'pointer'
        },
		'.slithereskin-red': {
            color: '#ff0000',
            'text-decoration': 'none',
            cursor: 'pointer'
        },
        '.slithereskin-blackout': {
            display: 'flex',
            'justify-content': 'center',
            'align-items': 'center',
            visibility: 'hidden',
            position: 'fixed',
            top: 0, right: 0, bottom: 0, left: 0,
            background: 'rgba(0,0,0,.5)',
            opacity: 0,
            'z-index': 100000002,
            transition: 'opacity 0.5s'
        },
        '.slithereskin-window': {
            'box-sizing': 'border-box',
            padding: '12px',
            'min-width': '300px',
            'max-height': hh - 50 + 'px',
            background: 'white',
            'border-radius': '10px',
            'box-shadow': '0 0 20px 7px rgba(0,0,0,.5)',
            'font-family': 'Calibri, Tahoma, Arial, sans-serif',
            overflow: 'auto'
        },
        '.slithereskin-window>h2': {
            margin: 0,
            'text-align': 'center'
        }
    };

    var style = document.createElement('style');
    document.head.appendChild(style);
    stylesheet = style.sheet;
    for (var selector in styles)
        for (var property in styles[selector])
            stylesheet.insertRule(selector + '{' +  property + ':' + styles[selector][property] + ';' + '}', stylesheet.cssRules.length);

    // </Styles>

    var div = document.createElement('div');
    div.id = 'slitcheck';
    div.className = 'nsi';
    div.style.display = 'none';
    div.style.opacity = 0;
    div.style.position = 'fixed';
    div.style.bottom = '35px';
    div.style.left = '20%';
    div.style.right = '20%';
    div.style.color = 'white';
    div.style.fontFamily = 'Arial, sans-serif';
    div.style.textAlign = 'center';
    div.style.zIndex = 100000000;
    body.appendChild(div);

    // <Change SKins>

    if (!localStorage.getItem('slithereskin-cstime')) localStorage.setItem('slithereskin-cstime', 1000);
    var nextSkin = +localStorage.getItem('snakercv'), cstime = +localStorage.getItem('slithereskin-cstime');
    function changeSkins() {
        if (switches.changeskins && slither && !sc) {
            nextSkin++;
            var Skins = skins, maxSkin = max_skin_cv;
            if (switches.csd) Skins = [];
            if (nextSkin > maxSkin + Skins.length) nextSkin = 0;
            if (switches.csc && Skins.length && nextSkin <= maxSkin) nextSkin = maxSkin + 1;
            setSkin(slither, nextSkin, null);
            localStorage.setItem('snakercv', nextSkin);
        }
        if (switches.changeskins) setTimeout(changeSkins, cstime);
    }

    var csinput = createSwitch(div, 'changeskins', 'Change Skins (W)', function(){if (switches.changeskins) setTimeout(changeSkins, cstime)});

    // </Change SKins>

    var bullet = document.createTextNode('-');
    div.appendChild(bullet);

	// <Settings>

    var setlink = document.createElement('div');
    setlink.innerHTML = '<span class="slithereskin-link">Skin Rotator</span>';
    setlink.style.marginTop = '5px';
    setlink.style.fontSize = '16px';
    setlink.firstChild.onclick = function() {
        setblackout.style.visibility = 'visible';
        setblackout.style.opacity = 1;
    };
    div.appendChild(setlink);

    var setblackout = createWindow();
    //setblackout.style.visibility = 'visible';
    //setblackout.style.opacity = 1;
    var setdiv = setblackout.firstChild;

    var setcs1 = document.createElement('div'), setcs2 = document.createElement('div');;
    setcs1.style.display = setcs2.style.display = 'inline-block';
    setcs1.style.width = setcs2.style.width = '50%';
    setdiv.appendChild(setcs1);
    setdiv.appendChild(setcs2);

    var setcs = document.createElement('h3');
    setcs.textContent = 'Skin Rotator';
    setcs.style.margin = '3px';
    setcs1.appendChild(setcs);

    var setcstime = document.createElement('label');
    setcstime.innerHTML = '<span title="' + "Excellent for Slither.io YouTubers.\nIncrease the value so that skins don't cnage too fast in your video.\nThe unit is milliseconds." + '" style="cursor:help;">Interval:</span>&nbsp;<input type="number" value="' + cstime + '" style="width:60px;">';
    setcstime.lastChild.onchange = function() {
        cstime = +this.value;
        localStorage.setItem('slithereskin-cstime', cstime);
    };
    setcs1.appendChild(setcstime);

    function csonly(o) {
        if (o.input.checked) {
            var sib = o.div.previousSibling || o.div.nextSibling;
            if (sib) {
                var input = sib.firstChild.firstChild;
                if (input && input.checked) input.checked = false, input.onchange();
            }
        }
    }

    var setcsd = createSwitch(setcs2, 'csd', 'Only default', csonly);
    var setcsc = createSwitch(setcs2, 'csc', 'Only custom', csonly);
    setcsc.parentNode.parentNode.style.marginTop = '2px';

    var setok = makeTextBtn('OK', 36, 16, 18, 1).elem;
    setok.style.position = 'relative';
    setok.style.margin = '10px auto 0px auto';
    setok.style.removeProperty('box-shadow');
    setok.onclick = function() {
        setblackout.style.opacity = 0;
        setTimeout(function() {
            setblackout.style.visibility = 'hidden';
        }, 500);
    };
    setdiv.appendChild(setok);

    // </Settings>

	var bullet = document.createTextNode('-');
    div.appendChild(bullet);

    // <Custom Colors>

    function applyColor(i) {
        o = {
                imgs: [],
                fws: [],
                fhs: [],
                fw2s: [],
                fh2s: [],
                gimgs: [],
                gfws: [],
                gfhs: [],
                gfw2s: [],
                gfh2s: [],
                oimgs: [],
                ofws: [],
                ofhs: [],
                ofw2s: [],
                ofh2s: []
            };
            var rs = "00" + rrs[i].toString(16),
                gs = "00" + ggs[i].toString(16),
                bs = "00" + bbs[i].toString(16),
                rs = rs.substr(rs.length - 2),
                gs = gs.substr(gs.length - 2),
                bs = bs.substr(bs.length - 2);
            o.cs = "#" + rs + gs + bs;
            var sz = 62,
                kfmc = document.createElement("canvas");
            kfmc.width = kfmc.height = sz;
            ctx = kfmc.getContext("2d");
            map = ctx.getImageData(0, 0, sz, sz);
            imgd = map.data;
            l = imgd.length;
            for (p =
                 yy = xx = 0; p < l; p += 4) v = Math.abs(Math.sqrt(Math.pow(sz / 2 - xx, 2) + Math.pow(sz / 2 - yy, 2)) - 16), v = 15 >= v ? 1 - v / 15 : 0, imgd[p] = rrs[i], imgd[p + 1] = ggs[i], imgd[p + 2] = bbs[i], imgd[p + 3] = Math.floor(255 * v), xx++, xx >= sz && (xx = 0, yy++);
            ctx.putImageData(map, 0, 0);
            o.kfmc = kfmc;
            var ksz = 48,
                ksz2 = ksz / 2,
                kmc = document.createElement("canvas");
            kmc.width = kmc.height = ksz;
            ctx = kmc.getContext("2d");
            ctx.fillStyle = "#FFFFFF";
            ctx.arc(ksz2, ksz2, ksz2, 0, pi2);
            ctx.fill();
            map = ctx.getImageData(0, 0, ksz, ksz);
            imgd = map.data;
            l = imgd.length;
            yy = xx = 0;
            var kmcs = [];
            for (j =
                 0; 7 > j; j++) {
                for (p = xx = yy = 0; p < l; p += 4) {
                    var v = Math.pow(Math.max(0, Math.min(1, 1 - Math.abs(yy - ksz2) / ksz2)), .35),
                        v2 = Math.max(0, Math.min(1, 1 - Math.sqrt(Math.pow(xx - ksz2, 2) + Math.pow(yy - ksz2, 2)) / 34)),
                        v = v + .375 * (v2 - v),
                        v = v * (1.22 - .44 * j / 6);
                    rr = rrs[i];
                    gg = ggs[i];
                    bb = bbs[i];
                    imgd[p] = Math.max(0, Math.min(255, Math.floor(rr * v)));
                    imgd[p + 1] = Math.max(0, Math.min(255, Math.floor(gg * v)));
                    imgd[p + 2] = Math.max(0, Math.min(255, Math.floor(bb * v)));
                    xx++;
                    xx >= ksz && (xx = 0, yy++)
                }
                ctx.putImageData(map, 0, 0);
                var kmc2 = document.createElement("canvas");
                kmc2.width = kmc2.height = ksz;
                var ctx2 = kmc2.getContext("2d");
                ctx2.drawImage(kmc, 0, 0);
                /*if (10 == i)
                    for (k = -1; 1 >= k; k++) {
                        var tx = ksz2 + ksz2 / 16 * Math.cos(2 * Math.PI * k / 8) * 13,
                            ty = ksz2 + ksz2 / 16 * Math.sin(2 * Math.PI * k / 8) * 13;
                        ctx2.fillStyle = "#FFFFFF";
                        ctx2.beginPath();
                        for (m = 0; 5 >= m; m++) xx = tx + ksz / 32 * Math.cos(2 * Math.PI * m / 5) * .05 * 24, yy = ty + ksz / 32 * Math.sin(2 * Math.PI * m / 5) * .05 * 24, 0 == m ? ctx2.moveTo(xx, yy) : ctx2.lineTo(xx, yy), xx = tx + ksz / 32 * Math.cos(2 * Math.PI * (m + .5) / 5) * 3.1, yy = ty + ksz / 32 * Math.sin(2 * Math.PI * (m + .5) / 5) * 3.1, ctx2.lineTo(xx, yy);
                        ctx2.fill()
                    } else if (19 == i)
                        for (k = -2; 2 >= k; k++) {
                            tx = ksz2 + ksz2 / 16 * Math.cos(2 * Math.PI * k / 15) * 13;
                            ty = ksz2 + ksz2 / 16 * Math.sin(2 * Math.PI * k / 15) * 13;
                            ctx2.save();
                            ctx2.globalAlpha = .7;
                            ctx2.fillStyle = "#FFFFFF";
                            ctx2.beginPath();
                            for (m = 0; 5 >= m; m++) xx = tx + ksz / 32 * Math.cos(2 * Math.PI * m / 5) * .05 * 12, yy = ty + ksz / 32 * Math.sin(2 * Math.PI * m / 5) * .05 * 12, 0 == m ? ctx2.moveTo(xx, yy) : ctx2.lineTo(xx, yy), xx = tx + ksz / 32 * Math.cos(2 * Math.PI * (m + .5) / 5) * 1.55, yy = ty + ksz / 32 * Math.sin(2 * Math.PI * (m + .5) / 5) * 1.55, ctx2.lineTo(xx, yy);
                            ctx2.fill();
                            ctx2.restore()
                        } else if (20 == i)
                            for (k = -1.5; 1.5 >= k; k++) {
                                tx = ksz2 + ksz2 / 16 * Math.cos(2 * Math.PI * k / 15) * 13;
                                ty = ksz2 + ksz2 / 16 * Math.sin(2 * Math.PI * k / 15) * 13;
                                ctx2.save();
                                ctx2.globalAlpha = .7;
                                ctx2.fillStyle = "#FFFFFF";
                                ctx2.beginPath();
                                for (m = 0; 5 >= m; m++) xx = tx + ksz2 / 16 * Math.cos(2 * Math.PI * m / 5) * .05 * 14, yy = ty + ksz2 / 16 * Math.sin(2 * Math.PI * m / 5) * .05 * 14, 0 == m ? ctx2.moveTo(xx, yy) : ctx2.lineTo(xx, yy), xx = tx + ksz2 / 16 * Math.cos(2 * Math.PI * (m + .5) / 5) * 1.8, yy = ty + ksz2 / 16 * Math.sin(2 * Math.PI * (m + .5) / 5) * 1.8, ctx2.lineTo(xx, yy);
                                ctx2.fill();
                                ctx2.restore()
                            }*/
                kmcs.push(kmc2)
            }
            o.kmcs = kmcs;
            per_color_imgs.push(o);
            for (j = 2.8; 18.8 >= j; j += 1) {
                var cc = document.createElement("canvas"),
                    sz = Math.ceil(2.5 * j + 28);
                cc.width = cc.height = sz;
                ctx = cc.getContext("2d");
                ctx.fillStyle = o.cs;
                ctx.arc(sz / 2, sz / 2, .65 * j, 0, pi2);
                ctx.shadowBlur = 12;
                ctx.shadowOffsetY = 0;
                ctx.shadowColor = "#" + rs + gs + bs;
                ctx.globalAlpha = .8;
                ctx.fill();
                ctx.globalAlpha = 1;
                ctx.fill();
                o.imgs.push(cc);
                o.fws.push(sz);
                o.fhs.push(sz);
                o.fw2s.push(sz / 2);
                o.fh2s.push(sz / 2);
                sz = Math.ceil(8 * j + 6);
                cc = document.createElement("canvas");
                cc.width = cc.height = sz;
                ctx = cc.getContext("2d");
                g = ctx.createRadialGradient(sz / 2, sz / 2, 1, sz / 2, sz / 2, 4 * j);
                g.addColorStop(0, "rgba(" + rrs[i] + ", " + ggs[i] + ", " + bbs[i] + ", 1)");
                g.addColorStop(1, "rgba(" + rrs[i] + ", " + ggs[i] + ", " + bbs[i] + ", 0)");
                ctx.fillStyle = g;
                ctx.fillRect(0, 0, sz, sz);
                o.gimgs.push(cc);
                o.gfws.push(sz);
                o.gfhs.push(sz);
                o.gfw2s.push(sz / 2);
                o.gfh2s.push(sz / 2);
                cc = document.createElement("canvas");
                sz = Math.ceil(1.3 * j + 6);
                cc.width = cc.height = sz;
                ctx = cc.getContext("2d");
                var eam = .2,
                    g = ctx.createRadialGradient(sz / 2, sz / 2, 0, sz / 2, sz / 2, j / 2);
                g.addColorStop(0, "rgba(" +
                               rrs[i] + ", " + ggs[i] + ", " + bbs[i] + ", 1)");
                g.addColorStop(.99, "rgba(" + Math.floor(rrs[i] * eam) + ", " + Math.floor(ggs[i] * eam) + ", " + Math.floor(bbs[i] * eam) + ", 1)");
                g.addColorStop(1, "rgba(" + Math.floor(rrs[i] * eam) + ", " + Math.floor(ggs[i] * eam) + ", " + Math.floor(bbs[i] * eam) + ", 0)");
                ctx.fillStyle = g;
                ctx.fillRect(0, 0, sz, sz);
                ctx.strokeStyle = "#000000";
                ctx.lineWidth = 2;
                ctx.arc(sz / 2, sz / 2, .65 * j, 0, pi2);
                ctx.globalAlpha = 1;
                ctx.stroke();
                o.oimgs.push(cc);
                o.ofws.push(sz);
                o.ofhs.push(sz);
                o.ofw2s.push(sz / 2);
                o.ofh2s.push(sz / 2)
            }
            o.ic =
                o.imgs.length;
            o.pr_imgs = [];
            o.pr_fws = [];
            o.pr_fhs = [];
            o.pr_fw2s = [];
            o.pr_fh2s = [];
            for (j = 3; 24 >= j; j += 1) cc = document.createElement("canvas"), sz = Math.ceil(2 * j + 38), cc.width = cc.height = sz, ctx = cc.getContext("2d"), ctx.fillStyle = o.cs, ctx.arc(sz / 2, sz / 2, j / 2, 0, pi2), ctx.shadowBlur = 22, ctx.shadowOffsetY = 0, ctx.shadowColor = "#" + rs + gs + bs, ctx.fill(), ctx.fill(), o.pr_imgs.push(cc), o.pr_fws.push(sz), o.pr_fhs.push(sz), o.pr_fw2s.push(sz / 2), o.pr_fh2s.push(sz / 2)
    };

    function applyColors(update = true) {
        per_color_imgs.splice(ncolors, ccolors.length);
        ccolors = [];
        if (update) {
            for (var i = cccs.childNodes.length - 1; i >= 0; i--) {
                if (cccs.childNodes[i].childNodes.length == 5) {
                    rrs.splice(ncolors+i,1);
                    ggs.splice(ncolors+i,1);
                    bbs.splice(ncolors+i,1);
                    cccs.removeChild(cccs.childNodes[i]);
                    for (var j = i+1; j < cccs.childNodes.length; j++)
                        cccs.childNodes[j].dataset.n = cccs.childNodes[j].dataset.n - 1;
                    for (var j = 0; j < skins.length; j++)
                        for (var k = 0; k < skins[j].skin.rbcs.length; k++)
                            if (skins[j].skin.rbcs[k] >= ncolors + i) skins[j].skin.rbcs[k]--;
                }
            }
            saveSkins();
            colorMenu();
            workspace();
        }
        for (var i = ncolors; i < rrs.length; i++) {
            ccolors.push([rrs[i], ggs[i], bbs[i]]);
            applyColor(i);
        }
        localStorage.setItem('slithereskin-colors', JSON.stringify(ccolors));
    }

    var currentColor = null,
        ccrestore = document.createElement('div');
    ccrestore.innerHTML = 'You just deleted this color. <span class="slithereskin-blue">Restore</span>';
    ccrestore.style.position = 'absolute';
    ccrestore.style.top = ccrestore.style.left = 0;
    ccrestore.style.width = '100%';
    ccrestore.style.height = '46px';
    ccrestore.style.background = 'rgba(255,255,255,0.95)';
    ccrestore.style.lineHeight = '46px';
    ccrestore.style.textAlign = 'center';

    function newColor(rgb) {
        var ccc = document.createElement('div');
        ccc.dataset.n = rrs.length;
        ccc.style.position = 'relative';
        ccc.style.margin = '8px';
        cccs.appendChild(ccc);

        var ccself = document.createElement('div');
        ccself.style.display = 'inline-block';
        ccself.style.boxSizing = 'content-box';
        ccself.style.width = '40px';
        ccself.style.height = '40px';
        ccself.style.border = '3px solid rgba(0,0,0,0.5)';
        ccc.appendChild(ccself);

        var ccnames = document.createElement('div'),
            ccr = document.createElement('div'),
            ccg = document.createElement('div'),
            ccb = document.createElement('div');
        ccnames.style.display = 'inline-block';
        ccnames.style.boxSizing = 'content-box';
        ccnames.style.margin = '0 8px';
        ccnames.style.width = '45px';
        ccr.textContent = 'Red: ';
        ccg.textContent = 'Green: ';
        ccb.textContent = 'Blue: ';
        ccr.style.lineHeight = ccg.style.lineHeight = ccb.style.lineHeight = '10px';
        ccg.style.margin = '8px 0';
        ccc.appendChild(ccnames);
        ccnames.appendChild(ccr);
        ccnames.appendChild(ccg);
        ccnames.appendChild(ccb);

        var ccgrads = document.createElement('div');
        ccgrads.style.display = 'inline-block';
        ccgrads.style.width = '256px';
        ccc.appendChild(ccgrads);

        var ccred = document.createElement('canvas');
        var ccgreen = document.createElement('canvas');
        var ccblue = document.createElement('canvas');
        ccred.style.cursor = ccgreen.style.cursor = ccblue.style.cursor = 'pointer';
        ccgreen.style.margin = '8px 0';
        var ccrgb = [ccred, ccgreen, ccblue];
        ccred.onmousedown = ccgreen.onmousedown = ccblue.onmousedown = function(e) {
            currentColor = this;
            body.onmousemove(e);
        };
        ccred.width = ccgreen.width = ccblue.width = 256;
        ccred.height = ccgreen.height = ccblue.height = 10;
        ccgrads.appendChild(ccred);
        ccgrads.appendChild(ccgreen);
        ccgrads.appendChild(ccblue);

        var ccdelete = document.createElement('div');
        ccdelete.innerHTML = '<span class="slithereskin-blue">Delete</span>';
        ccdelete.style.display = 'inline-block';
        ccdelete.style.boxSizing = 'content-box';
        ccdelete.style.marginLeft = '8px';
        ccdelete.style.width = '50px';
        ccdelete.style.height = '46px';
        ccdelete.style.lineHeight = '46px';
        ccdelete.style.verticalAlign = 'top';
        ccdelete.firstChild.onclick = function() {
            var ccback = ccrestore.cloneNode(true);
            ccback.onclick = function() {
                this.parentNode.removeChild(this);
            };
            this.parentNode.parentNode.appendChild(ccback);
        };
        ccc.appendChild(ccdelete);

        setColor(rgb, ccc);
    }

    function parseColor(input) {
        var m = input.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
        if( m) {
            return [+m[1],+m[2],+m[3]];
        }
    }

    function setColor(rgb, el) {
        var n = el.dataset.n;
        rrs[n] = rgb[0];
        ggs[n] = rgb[1];
        bbs[n] = rgb[2];
        for (var i = 0; i < 3; i++) {
            el.firstChild.style.backgroundColor = 'rgb('+rgb[0]+','+rgb[1]+','+rgb[2]+')';
            var rgb0 = rgb.slice(), rgb1 = rgb.slice();
            rgb0[i] = 0, rgb1[i] = 255;
            var ctx = el.childNodes[2].children[i].getContext('2d');
            var grad = ctx.createLinearGradient(0,0,256,0);
            grad.addColorStop(0, 'rgb('+rgb0[0]+','+rgb0[1]+','+rgb0[2]+')');
            grad.addColorStop(1, 'rgb('+rgb1[0]+','+rgb1[1]+','+rgb1[2]+')');
            ctx.fillStyle = grad;
            ctx.fillRect(0,0,256,10);
            ctx.beginPath();
            ctx.arc(rgb[i],5,3,0,2*Math.PI);
            ctx.strokeStyle = (rgb[0] + rgb[1] + rgb[2] < 350) ? '#fff' : '#000';
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    }

    function setColors() {
        for (var i = 0; i < ccolors.length; i++)
            newColor([ccolors[i][0], ccolors[i][1], ccolors[i][2]]);
        applyColors(false);
    }

    var ccolors = JSON.parse(localStorage.getItem('slithereskin-colors')) || [],
        ncolors = rrs.length,
        ccblackout = createWindow(),
        ccdiv = ccblackout.firstChild;

    var ccheader = document.createElement('h2');
    ccheader.textContent = 'Custom colors';
    ccdiv.appendChild(ccheader);

    var cccs = document.createElement('div');
    ccdiv.appendChild(cccs);

    var ccnew = document.createElement('div');
    ccnew.innerHTML = '<span class="slithereskin-blue">New color</span>';
    ccnew.style.textAlign = 'center';
    ccnew.style.fontSize = '20px';
    ccnew.firstChild.onclick = function() {
        newColor([255,255,255]);
    };
    ccdiv.appendChild(ccnew);

    var ccbtns = document.createElement('div');
    ccbtns.style.margin = '10px 0 6px 0';
    ccbtns.style.textAlign = 'center';
    ccdiv.appendChild(ccbtns);

    var ccsave = makeTextBtn('Save', 36, 16, 18, 1).elem;
    ccsave.style.position = 'relative';
    ccsave.style.display = 'inline-block';
    ccsave.style.removeProperty('box-shadow');
    ccsave.onclick = function() {
        ccblackout.style.opacity = 0;
        setTimeout(function() {
            ccblackout.style.visibility = 'hidden';
        }, 500);
        applyColors();
    };
    ccbtns.appendChild(ccsave);

    var cccancel = makeTextBtn('Cancel', 36, 16, 18, 2).elem;
    cccancel.style.position = 'relative';
    cccancel.style.display = 'inline-block';
    cccancel.style.marginLeft = '6px';
    cccancel.style.removeProperty('box-shadow');
    cccancel.onclick = function() {
        ccblackout.style.opacity = 0;
        setTimeout(function() {
            ccblackout.style.visibility = 'hidden';
        }, 500);
        rrs.splice(ncolors, rrs.length - ncolors);
        ggs.splice(ncolors, ggs.length - ncolors);
        bbs.splice(ncolors, bbs.length - ncolors);
        while (cccs.firstChild)
            cccs.removeChild(cccs.firstChild);
        setColors();
    };
    ccbtns.appendChild(cccancel);

    // </Custom Colors>

    // <Skin Constructor>

    var pixel = document.createElement('canvas');
    pixel.width = pixel.height = 1;
	var xvarmi = false, yvarmi = false, hvarmi = false, wvarmi = false, avarmi = false, svarmi = false, dvarmi = false, r1varmi = false, r2varmi = false, r3varmi = false, r4varmi = false;
    var ss = setSkin;
    setSkin = function(b, h, cusk) {
        if (!slither) h = localStorage.getItem('snakercv');
        ss(b, h, cusk);
        if (h > max_skin_cv) {
            setTimeout(function() {
				var s = skins[h - max_skin_cv - 1], skin = s.skin;
				slither.antenna = window.__skins["antenna"];
				slither.eca = 1;
				var c = window.__skins["valuem"];
				slither.atx = new Float32Array(c);
				slither.aty = new Float32Array(c);
				slither.atvx = new Float32Array(c);
				slither.atvy = new Float32Array(c);
				slither.atax = new Float32Array(c);
				slither.atay = new Float32Array(c);
				for (--c; 0 <= c; c--) slither.atx[c] = slither.xx, slither.aty[c] = slither.yy;
				slither.bulb = window.anten_canvas;
				if(xvarmi == false) { slither.blbx = 0; } else { slither.blbx = window.__skins["blbx"];}
				if(yvarmi == false) { slither.blby = -25; } else { slither.blby = window.__skins["blby"];}
				if(hvarmi == false) { slither.blbh = 50; } else { slither.blbh = window.__skins["blbh"];}
				if(wvarmi == false) { slither.blbw = 50; } else { slither.blbw = window.__skins["blbw"];}
				if(avarmi == false && !slither.slg) { slither.er = 6; } else { slither.er = window.__skins["er"]; }
				if(svarmi == false && !slither.slg) { slither.pr = 3; } else { slither.pr = window.__skins["pr"];}
				if(dvarmi == false) { slither.swell = 0; } else { slither.swell = window.__skins["swell"];}

				if(r1varmi == false) { slither.ppc = '#000'; } else { slither.ppc = window.__skins["ppc"]; }
				if(r2varmi == false) { slither.ec = '#fff'; } else { slither.ec = window.__skins["ec"];}
				if(r3varmi == false) { slither.atc1 = '#000'; } else { slither.atc1 = window.__skins["atc1"];}
				if(r4varmi == false) { slither.atc2 = '#fff'; } else { slither.atc2 = window.__skins["atc2"];}
				slither.bsc = 1;
				slither.blba = 1;

				slither.atba = 0;
				slither.atwg = !0;
				slither.atia = .5;
				slither.abrot = !0;
				if (skin.one_eye) b.ebi = jsebi, b.ebiw = 64, b.ebih = 64, b.ebisz = 29, b.epi = jsepi, b.epiw = 48, b.epih = 48, b.episz = 14, b.pma = 4, b.swell = .06;
                else if (skin.slg) b.ed = 34, b.esp = 14, b.eca = 1, b.eo = 3, b.er = 8, b.easp = .038, b.pr = 4.5, b.pma = 3;
                else if (skin.jyt) b.eac = true;
                for (prop in skin) b[prop] = skin[prop];
                if (skin.one_eye) b.slg = false, b.jyt = false;
            }, 0);
        }
        if (sc) setTimeout(workspace, 0);
    };
    function newSkin() {
        skins.push({skin:{rbcs:[9]}});
        var storageSkins = JSON.parse(localStorage.getItem('slithereskin-skins'));
        storageSkins.push({skin:{rbcs:[9]}});
        localStorage.setItem('slithereskin-skins', JSON.stringify(storageSkins));
        setSkin(slither, max_skin_cv + skins.length, null);
    }
    function updateSkin() {
        var toSave = JSON.parse(localStorage.getItem('slithereskin-skins')), singleColor = true;
        toSave[slither.rcv - max_skin_cv - 1].skin.rbcs = JSON.parse(JSON.stringify(slither.rbcs));
        for (var i = 0; i < slither.rbcs.length; i++) {
            if (slither.rbcs[i] >= ncolors) toSave[slither.rcv - max_skin_cv - 1].skin.rbcs[i] = ~slither.rbcs[i] + ncolors;
            if (singleColor && i > 0 && slither.rbcs[i] != slither.rbcs[i-1]) singleColor = false;
        }
        if (singleColor) slither.rbcs = [slither.rbcs[0]], toSave[slither.rcv - max_skin_cv - 1].skin.rbcs = [toSave[slither.rcv - max_skin_cv - 1].skin.rbcs[0]];
        skins[slither.rcv - max_skin_cv - 1].skin.rbcs = slither.rbcs;
        localStorage.setItem('slithereskin-skins', JSON.stringify(toSave));
    }
    function saveSkins() {
        var toSave = JSON.parse(JSON.stringify(skins));
        for (var i = 0; i < toSave.length; i++)
            for (var j = 0; j < toSave[i].length; j++)
                if (toSave[i].skin.rbcs[j] >= ncolors) toSave[i].skin.rbcs[j] = ~toSave[i].skin.rbcs[j] + ncolors;
        localStorage.setItem('slithereskin-skins', JSON.stringify(toSave));
    }

    var sc = false;
    function sfc(el, bottom = false) {
        var prop = bottom ? 'bottom' : 'top';
        el.style.transition = '0.5s';
        el.style[prop] = parseInt(el.style[prop]) + (sc != bottom ? 250 : -250) + 'px';
        setTimeout(function() {
            el.style.removeProperty('transition');
        }, 500);
    }

    function Constructor(onlyReset = false) {
        if (!(onlyReset && !sc)) {
            sfc(mc);
            sfc(pskh);
            sfc(nskh);
            sfc(skodiv);
            sfc(div, true);
            sfc(scdiv, true);
            sc ? scdiv.style.removeProperty('box-shadow') : scdiv.style.boxShadow = '0px -3px 2px rgba(0,0,0,0.5)';
            sc = !sc;
        }
    }

        function workspace() {
        while (sccss.firstChild)
            sccss.removeChild(sccss.firstChild);
        if (slither.rcv > max_skin_cv && slither.rcv <= max_skin_cv + skins.length) {
            scdef.style.display = 'none';
            scadd.style.display = scskin.style.display = scprops.style.display = 'block';
            var colorStops = [0];
            for (var i = 1; i < slither.rbcs.length; i++) {
                if (slither.rbcs[i-1] != slither.rbcs[i]) break;
                if (i == slither.rbcs.length - 1) slither.rbcs = [slither.rbcs[0]];
            }
            for (var i = 1; i < slither.rbcs.length; i++)
                if (slither.rbcs[i] != slither.rbcs[i-1]) colorStops.push(i);
            for (var i = 0; i < colorStops.length; i++) {
                var sccs = document.createElement('div');
                sccs.dataset.position = colorStops[i];
                sccs.style.marginBottom = '1px';
                sccss.appendChild(sccs);

                var sccolor = document.createElement('div');
                sccolor.textContent = 'Color:';
                sccolor.style.position = 'relative';
                sccolor.style.display = 'inline-block';
                sccolor.style.width = '125px';
                sccs.appendChild(sccolor);

                var scc = colors[slither.rbcs[colorStops[i]]].cloneNode();
                scc.style.margin = '0 0 0 10px';
                scc.style.verticalAlign = 'middle';
                scc.onclick = function(e) {
                    e.stopPropagation();
                    var sccolor = this.parentNode;
                    sccm.parentNode == sccolor ? sccolor.removeChild(sccm) : sccolor.appendChild(sccm);
                };
                sccolor.appendChild(scc);

                var sccells = document.createElement('div');
                sccells.textContent = 'Cells number:';
                sccells.style.display = 'inline-block';
                sccells.style.marginRight = '13px';
                sccs.appendChild(sccells);

                var sccn = document.createElement('input');
                sccn.type = 'number';
                sccn.min = 1;
                sccn.value = (colorStops.length - 1 == i ? slither.rbcs.length : colorStops[i+1]) - colorStops[i];
                if (colorStops.length == 1) sccn.disabled = true;
                sccn.style.marginLeft = '10px';
                sccn.style.width = '50px';
                sccn.style.height = '20px';
                sccn.style.border = '1px solid #A9A9A9';
                sccn.style.fontSize = '12px';
                sccn.style.verticalAlign = 'middle';
                sccn.onchange = function() {
                    var sccs = this.parentNode.parentNode,
                        prevValue = (sccs.nextSibling ? +sccs.nextSibling.dataset.position : slither.rbcs.length) - +sccs.dataset.position;
                    if (isNaN(parseInt(this.value))) {
                        this.value = prevValue; return;
                    }
                    var args = [+sccs.dataset.position, 0];
                    if (this.value > prevValue)
                        for (var i = 0; i < this.value - prevValue; i++)
                            args.push(slither.rbcs[args[0]]);
                    else args[1] = prevValue - this.value;
                    Array.prototype.splice.apply(slither.rbcs, args);
                    updateSkin();
                    if (this.value == 0) workspace();
                    else while (sccs = sccs.nextSibling)
                        sccs.dataset.position = +sccs.dataset.position + +this.value - prevValue;
                };
                sccells.appendChild(sccn);

                if (!sccn.disabled) {
                    var sccsd = document.createElement('div');
                    sccsd.textContent = 'Delete';
                    sccsd.className = 'donuts-blue';
                    sccsd.style.display = 'inline-block';
                    sccsd.style.fontSize = '14px';
                    sccsd.onclick = function() {
                        this.previousSibling.lastChild.value = 0;
                        this.previousSibling.lastChild.onchange();
                    };
                    sccs.appendChild(sccsd);
                    if (colorStops.length == 2) {
                        sccss.firstChild.appendChild(sccsd.cloneNode());
                    }
                }
            }
            for (var i = 0; i < scprops.childNodes.length; i++)
                scprops.childNodes[i].firstChild.checked = slither[scprops.childNodes[i].dataset.prop] || skins[slither.rcv - max_skin_cv - 1][scprops.childNodes[i].dataset.prop];
        } else {
            scdef.style.display = 'block';
            scadd.style.display = scskin.style.display = scprops.style.display = 'none';
        }
    };

    var sclink = document.createElement('div');
    sclink.className = 'slithereskin-link';
    sclink.style.marginTop = '5px';
    sclink.style.fontSize = '16px';
    sclink.innerHTML = '<b>→ Create Your Skin & More ←</b>';
    sclink.onclick = function() {
        Constructor();
        if (sc) slither.rcv <= max_skin_cv ? skins.length ? setSkin(slither, max_skin_cv + 1, null) : newSkin() : workspace();
    };
    div.appendChild(sclink);

    var scdiv = document.createElement('div');
    scdiv.style.width = '100%';
    scdiv.style.height = '250px';
    scdiv.style.padding = '10px 0px 0px 15px';
    scdiv.style.boxSizing = 'border-box';
    scdiv.style.position = 'fixed';
    scdiv.style.bottom = '-250px';
    scdiv.style.left = 0;
    scdiv.style.background = 'white';
    scdiv.style.fontFamily = 'Calibri, Tahoma, Arial, sans-serif';
    scdiv.style.overflow = 'auto';
    scdiv.style.zIndex = 100000000;
    scdiv.style.transition = '0.5s';
    scdiv.onmousedown = function(e) {
        e.stopPropagation();
    };
    body.appendChild(scdiv);

    var schelp = document.createElement('div');
    schelp.style.display = 'inline-block';
    schelp.style.width = '30%';
    schelp.style.float = 'left';
    scdiv.appendChild(schelp);

        var scheader = document.createElement('h2');
    scheader.innerHTML = '<span style="color:black"><a href="http://slithere.com" target="_blank">SLITHERE.COM [CLICK]</a></br><a href="http://diepioplay.com" target="_blank">DIEPIOPLAY.COM [CLICK]</a></br><a href="http://iogameslist.org" target="_blank">IOGAMESLIST [CLICK]</a></span>';
    scheader.style.margin = 0;
    schelp.appendChild(scheader);

	scp = document.createElement('h3');
    scp.innerHTML = '<span class="slithereskin-red">Skin List ON/OFF</span>';
    scp.firstChild.onclick = function() {
        ssblackout.style.visibility = 'visible';
        ssblackout.style.opacity = 1;
        for (var  i = 0; i < ssskins.childNodes.length; i++) {
            ssskins.childNodes[i].lastChild.style.display = 'block';
        }
    };
    scp.style.marginBottom = 0;
    schelp.appendChild(scp);

	scp3 = document.createElement('h4');
    scp3.innerHTML = '<a href="https://chrome.google.com/webstore/detail/slitherio-mods-zoom-creat/gkfpaolkkchfafkhdleklbddpcolkdea/reviews" target="_blank"><font color="darkorange">VOTE OUR MOD [CLICK]</font></a>';
    scp3.style.marginBottom = 0;
    schelp.appendChild(scp3);

	scp2 = document.createElement('p');
    scp2.innerHTML = '</br>Create Your Skins & Heads Mozilla Public License 2.0';
    scp2.firstChild.onclick = function() {
        ssblackout.style.visibility = 'visible';
        ssblackout.style.opacity = 1;
        for (var  i = 0; i < ssskins.childNodes.length; i++) {
            ssskins.childNodes[i].lastChild.style.display = 'block';
        }
    };
    scp2.style.marginBottom = 0;
    schelp.appendChild(scp2);

// <Promotion>

    var subdiv = document.createElement('div'), br = document.createElement('br');
    subdiv.id = 'slithereskin-subdiv';
    subdiv.style.height = '48px';
    clq.insertBefore(subdiv, clq.firstElementChild);
    clq.style.height = clq.offsetHeight + subdiv.offsetHeight + 'px';


    var script = document.createElement('script');
    script.src = 'https://apis.google.com/js/platform.js';
    script.onload = function() {
        this.parentNode.removeChild(this);
        gapi.ytsubscribe.render('slithereskin-subdiv', {
            channelid: 'UCy6xGaMhm74YeHMDGgEr7kg',
            layout: 'full',
            theme: 'dark'
        });
    };
    document.head.appendChild(script);

    // </Promotion>

var scws = document.createElement('div');
    scws.style.display = 'inline-block';
    scws.style.width = '27%';
    scws.style.height = '100%';
    scws.style.position = 'relative';
    scws.style.float = 'left';
    scdiv.appendChild(scws);

    var _scws = document.createElement('div');
    _scws.style.display = 'inline-block';
    _scws.style.width = '43%';
    _scws.style.height = '100%';
    _scws.style.position = 'relative';
    _scws.style.float = 'left';
    scdiv.appendChild(_scws);

    var _sccss = document.createElement('div');
    _scws.appendChild(_sccss);

    var _sccs = document.createElement('div');
    _sccs.style.marginBottom = '1px';
    _sccss.appendChild(_sccs);

	var sclink = document.createElement('div');
    sclink.innerHTML = "<center><b style='color:#ff0000'>X</b></center>";
    sclink.style.width = '20px';
    sclink.style.height = '20px';
    sclink.style.border = '1px solid #ff0000';
	sclink.style.float = 'right';
    sclink.style.fontSize = '14px';
    sclink.onclick = function() {
        Constructor();
    };
    _sccs.appendChild(sclink);

	var _sccimage = document.createElement('div');
    _sccimage.innerHTML = '<span title="' + "You can only use 1 image for all created skins and if you refresh your browser image will go.\nBecause our mod get images from your computer and we can't controll your computer. Thanks for your understanding." + '" style="cursor:help;">Image <font color="red">(?)</font>:</span>';
        _sccimage.style.position = 'relative';
    _sccimage.style.display = 'inline-block';
	_sccs.appendChild(_sccimage);

    var _sccn = document.createElement('input');
    _sccn.type = 'file';
	_sccn.accept = '.jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|images/*';
    _sccn.style.marginLeft = '10px';
    _sccn.style.height = '20px';
    _sccn.style.border = '1px solid #A9A9A9';
    _sccn.style.fontSize = '9px';
    _sccn.style.verticalAlign = 'middle';
    _sccn.style.display = 'inline-block';
    var angleInDegrees = 0;
    var anten_resim = document.createElement("img");
    window.anten_canvas = document.createElement("canvas");

    _sccn.onchange = function () {
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {

                anten_resim.onload = function () {
                    var cw = anten_resim.width, ch = anten_resim.height;
                    window.anten_canvas.setAttribute('width', cw);
                    window.anten_canvas.setAttribute('height', ch);
                    ctx = window.anten_canvas.getContext("2d");
                    ctx.rotate(0 * Math.PI / 180);
                    ctx.drawImage(anten_resim, 0, 0);
                    ctx.restore();
					window.__skins["bulb"] = window.anten_canvas;
                };
                anten_resim.src = e.target.result;
            };
            reader.readAsDataURL(this.files[0]);
			if(document.getElementById('mycheckbox').checked == false)
			{
			document.getElementById('mycheckbox').click();
			}
			if(document.getElementById('antennawidth').value == false)
			{
			document.getElementById('antennawidth').value = 15;
			}
			if(document.getElementById('imageheight').value == false)
			{
			document.getElementById('imageheight').value = 50;
			}
			if(document.getElementById('imagewidth').value == false)
			{
			document.getElementById('imagewidth').value = 50;
			}
			if(document.getElementById('xcoor').value == false)
			{
			document.getElementById('xcoor').value = 0;
			}
			if(document.getElementById('ycoor').value == false)
			{
			document.getElementById('ycoor').value = -25;
			}
        }
    };
    _sccimage.appendChild(_sccn);
    var skMain = document.createElement('div');
    _scws.appendChild(skMain);
    var skMainDiv = document.createElement('div');
    skMainDiv.style.marginBottom = '2px';
    skMain.appendChild(skMainDiv);
    var skMainWidth = document.createElement('div');
    skMainWidth.innerHTML = '<span title="' + "When you select your image,\nYou can rotate with buttons." + '" style="cursor:help;">Rotate <font color="red">(?)</font>:</span>';
    skMainWidth.style.position = 'relative';
    skMainWidth.style.display = 'inline-block';
    skMainWidth.style.marginRight = '13px';
    skMainDiv.appendChild(skMainWidth);
    var sccn = document.createElement('input');
    sccn.type = 'button';
    sccn.value = "Right";
    sccn.min = 1;
    sccn.style.marginLeft = '10px';
    sccn.style.width = '50px';
    sccn.style.height = '20px';
    sccn.style.border = '1px solid #A9A9A9';
    sccn.style.fontSize = '12px';
    sccn.style.verticalAlign = 'middle';
    var rightBtnClick = function () {
        if (anten_resim.src) {
            angleInDegrees += 90;
            var cw = anten_resim.width, ch = anten_resim.height, cx = 0, cy = 0;
            degree = angleInDegrees;
            degree = parseInt(degree.toString().replace("-", ""));
            switch (degree) {
                case 90:
                    cw = anten_resim.height;
                    ch = anten_resim.width;
                    cy = anten_resim.height * (-1);
                    break;
                case 180:
                    cx = anten_resim.width * (-1);
                    cy = anten_resim.height * (-1);
                    break;
                case 270:
                    cw = anten_resim.height;
                    ch = anten_resim.width;
                    cx = anten_resim.width * (-1);
                    angleInDegrees = 0;
                    break;
            }
            window.anten_canvas.setAttribute('width', cw);
            window.anten_canvas.setAttribute('height', ch);
            ctx = window.anten_canvas.getContext("2d");
            ctx.rotate(degree * Math.PI / 180);
            ctx.drawImage(anten_resim, cx, cy);
			window.__skins["bulb"] = window.anten_canvas;
        }
    };
    sccn.onclick = rightBtnClick;
    skMainWidth.appendChild(sccn);
    var skMainWidth = document.createElement('div');
    skMainWidth.style.position = 'relative';
    skMainWidth.style.display = 'inline-block';
    skMainDiv.appendChild(skMainWidth);
    var sccn = document.createElement('input');
    sccn.type = 'button';
    sccn.value = "Left";
    sccn.min = 1;
    sccn.style.marginLeft = '10px';
    sccn.style.width = '50px';
    sccn.style.height = '20px';
    sccn.style.border = '1px solid #A9A9A9';
    sccn.style.fontSize = '12px';
    sccn.style.verticalAlign = 'middle';
    var LeftBtnClick = function () {
        if (anten_resim.src) {
            angleInDegrees -= 90;
            var cw = anten_resim.width, ch = anten_resim.height, cx = 0, cy = 0;
            degree = angleInDegrees;
            degree = parseInt(degree.toString().replace("-", ""));
            switch (degree) {
                case 90:
                    cw = anten_resim.height;
                    ch = anten_resim.width;
                    cy = anten_resim.height * (-1);
                    break;
                case 180:
                    cx = anten_resim.width * (-1);
                    cy = anten_resim.height * (-1);
                    break;
                case 270:
                    cw = anten_resim.height;
                    ch = anten_resim.width;
                    cx = anten_resim.width * (-1);
                    angleInDegrees = 0;
                    break;
            }
            window.anten_canvas.setAttribute('width', cw);
            window.anten_canvas.setAttribute('height', ch);
            ctx = window.anten_canvas.getContext("2d");
            ctx.rotate(degree * Math.PI / 180);
            ctx.drawImage(anten_resim, cx, cy);
			window.__skins["bulb"] = window.anten_canvas;
        }
    };
    sccn.onclick = LeftBtnClick;
    skMainWidth.appendChild(sccn);
    var skMain = document.createElement('div');
    _scws.appendChild(skMain);
    var skMainDiv = document.createElement('div');
    skMainDiv.style.marginBottom = '2px';
    skMain.appendChild(skMainDiv);
    var skMainWidth = document.createElement('div');
    skMainWidth.innerHTML = '<span title="' + "Your image width. Please do not leave empty." + '" style="cursor:help;">Width <font color="red">(?)</font>:</span>';
    skMainWidth.style.position = 'relative';
    skMainWidth.style.display = 'inline-block';
    skMainWidth.style.marginRight = '13px';
    skMainDiv.appendChild(skMainWidth);
    var sccn = document.createElement('input');
    sccn.type = 'number';
    sccn.min = 1;
    sccn.style.marginLeft = '10px';
	sccn.id = "imagewidth";
    sccn.style.width = '50px';
    sccn.style.height = '20px';
    sccn.style.border = '1px solid #A9A9A9';
    sccn.style.fontSize = '12px';
    sccn.style.verticalAlign = 'middle';
    var widthFunct = function () {
        if (parseInt(this.value) > 0)
			wvarmi = true;
            slither.blbw = parseInt(this.value);
        window.__skins["blbw"] = slither.blbw;
    };
    sccn.onchange = widthFunct;
    sccn.onkeyup = widthFunct;
    sccn.onclick = widthFunct;
    skMainWidth.appendChild(sccn);
    var skMainHeight = document.createElement('div');
    skMainHeight.innerHTML = '<span title="' + "Your image height. Please do not leave empty." + '" style="cursor:help;">Height <font color="red">(?)</font>:</span>';
    skMainHeight.style.position = 'relative';
    skMainHeight.style.display = 'inline-block';
    skMainDiv.appendChild(skMainHeight);
    var __sccn = document.createElement('input');
    __sccn.type = 'number';
    __sccn.min = 1;
	__sccn.id = "imageheight";
    __sccn.style.marginLeft = '10px';
    __sccn.style.width = '50px';
    __sccn.style.height = '20px';
    __sccn.style.border = '1px solid #A9A9A9';
    __sccn.style.fontSize = '12px';
    __sccn.style.verticalAlign = 'middle';
    var heightFunct = function () {
        if (parseInt(this.value) > 0) {
			hvarmi = true;
            slither.blbh = parseInt(this.value);
            window.__skins["blbh"] = slither.blbh;
        }
    };
    __sccn.onchange = heightFunct;
    __sccn.onkeyup = heightFunct;
    __sccn.onclick = heightFunct;
    skMainHeight.appendChild(__sccn);

    var skMain = document.createElement('div');
    _scws.appendChild(skMain);
    var skMainDiv = document.createElement('div');
    skMainDiv.style.marginBottom = '1px';
    skMain.appendChild(skMainDiv);
    var skMainWidth = document.createElement('div');
    skMainWidth.innerHTML = '<span title="' + "Your image X Coordinate. Please do not leave empty" + '" style="cursor:help;">X <font color="red">(?)</font>:</span>';
    skMainWidth.style.position = 'relative';
    skMainWidth.style.display = 'inline-block';
    skMainWidth.style.marginRight = '13px';
    skMainDiv.appendChild(skMainWidth);
    var __sccn = document.createElement('input');
    __sccn.type = 'number';
    __sccn.style.marginLeft = '10px';
    __sccn.style.width = '50px';
    __sccn.style.height = '20px';
    __sccn.style.border = '1px solid #A9A9A9';
    __sccn.style.fontSize = '12px';
	__sccn.id = "xcoor";
    __sccn.style.verticalAlign = 'middle';
    var XFunct = function () {
		xvarmi = true;
        slither.blbx = parseInt(this.value);
        window.__skins["blbx"] = slither.blbx;
    };
    __sccn.onchange = XFunct;
    __sccn.onkeyup = XFunct;
    __sccn.onclick = XFunct;
    skMainWidth.appendChild(__sccn);

    var skMainHeight = document.createElement('div');
    skMainHeight.innerHTML = '<span title="' + "Your image Y Coordinate. Please do not leave empty" + '" style="cursor:help;">Y <font color="red">(?)</font>:</span>';
    skMainHeight.style.position = 'relative';
    skMainHeight.style.display = 'inline-block';
    skMainDiv.appendChild(skMainHeight);
    var __sccn = document.createElement('input');
    __sccn.type = 'number';
    __sccn.style.marginLeft = '10px';
    __sccn.style.width = '50px';
    __sccn.style.height = '20px';
    __sccn.style.border = '1px solid #A9A9A9';
    __sccn.style.fontSize = '12px';
    __sccn.style.verticalAlign = 'middle';
	__sccn.id = "ycoor";
    var YFunct = function () {
		yvarmi = true;
        slither.blby = parseInt(this.value);
        window.__skins["blby"] = slither.blby;
    };
    __sccn.onchange = YFunct;
    __sccn.onkeyup = YFunct;
    __sccn.onclick = YFunct;
    skMainHeight.appendChild(__sccn);
    var skMainDiv = document.createElement('div');
    skMainDiv.style.marginBottom = '2px';
    skMain.appendChild(skMainDiv);
    var skMainWidth = document.createElement('div');
    skMainWidth.innerHTML = '<span title="' + "Your Antenna Width.\nIt is limited to between 2 and 500\nBecause 500 up is lag, 2 down is not work." + '" style="cursor:help;">Antenna Width <font color="red">(?)</font>:</span>';
    skMainWidth.style.position = 'relative';
    skMainWidth.style.display = 'inline-block';
    skMainWidth.style.marginRight = '13px';
    skMainDiv.appendChild(skMainWidth);
    var sccn = document.createElement('input');
    sccn.type = 'number';
    sccn.min = 2;
	sccn.max = 500;
	sccn.id = "antennawidth";
    sccn.style.marginLeft = '10px';
    sccn.style.width = '50px';
    sccn.style.height = '20px';
    sccn.style.border = '1px solid #A9A9A9';
    sccn.style.fontSize = '12px';
    sccn.style.verticalAlign = 'middle';
    var awidthFunct = function () {
        if (parseInt(this.value) >= 2 && parseInt(this.value) <= 500) {
            c = parseInt(this.value);
            slither.atx = new Float32Array(c);
            slither.aty = new Float32Array(c);
            slither.atvx = new Float32Array(c);
            slither.atvy = new Float32Array(c);
            slither.atax = new Float32Array(c);
            slither.atay = new Float32Array(c);
			for (--c; 0 <= c; c--) slither.atx[c] = slither.xx, slither.aty[c] = slither.yy;
			window.__skins["valuem"] = parseInt(this.value);
        }
			if(document.getElementById('mycheckbox').checked == false)
			{
			document.getElementById('mycheckbox').click();
			}
    };
    sccn.onchange = awidthFunct;
    sccn.onkeyup = awidthFunct;
    sccn.onclick = awidthFunct;
    skMainWidth.appendChild(sccn);


			var skMainWidth = document.createElement('div');
			skMainWidth.innerHTML = '<span title="' + "Antenna is your head image carrier." + '" style="cursor:help;">A <font color="red">(?)</font>:</span>';
            skMainWidth.style.position = 'relative';
            skMainWidth.style.display = 'inline-block';
            skMainWidth.style.marginLeft = '8px';
            skMainDiv.appendChild(skMainWidth);
            var ____sccn3 = document.createElement('input');
            ____sccn3.type = 'checkbox';
			____sccn3.id = 'mycheckbox';
            ____sccn3.style.marginRight = '30px';
            ____sccn3.style.width = '50px';
            ____sccn3.style.height = '20px';
            ____sccn3.style.border = '1px solid #A9A9A9';
            ____sccn3.style.fontSize = '12px';
            ____sccn3.style.verticalAlign = 'middle';
            var antennaaktif = function () {
                if (this.checked) {
					if(document.getElementById('antennawidth').value == false)
					{
					document.getElementById('antennawidth').value = 15;
					}
                    slither.antenna = true;
					var c = 15;
                    slither.atx = new Float32Array(c);
                    slither.aty = new Float32Array(c);
                    slither.atvx = new Float32Array(c);
                    slither.atvy = new Float32Array(c);
                    slither.atax = new Float32Array(c);
                    slither.atay = new Float32Array(c);
                } else {
                    slither.antenna = false;
                }
                window.__skins["antenna"] = slither.antenna;
				window.__skins["valuem"] = c;
            };
            ____sccn3.onclick = antennaaktif;
            skMainDiv.appendChild(____sccn3);


			var skMainDiv = document.createElement('div');
			skMainDiv.style.marginBottom = '2px';
			skMain.appendChild(skMainDiv);
			var skMainWidth = document.createElement('div');
			skMainWidth.innerHTML = '<span title="' + "Your Eye Size.\nIt is limited to between 1 and 15\nBecause 15 up is too big, 1 down is not work.\nAlso you can't use on Slogoman Eyes" + '" style="cursor:help;">Eye Size <font color="red">(?)</font>:</span>';
			skMainWidth.style.position = 'relative';
			skMainWidth.style.display = 'inline-block';
			skMainWidth.style.marginRight = '13px';
			skMainDiv.appendChild(skMainWidth);
			var sccn__ = document.createElement('input');
			sccn__.type = 'number';
			sccn__.min = 1;
			sccn__.max = 15;
			sccn__.value = 3;
			sccn__.style.marginLeft = '10px';
			sccn__.style.width = '50px';
			sccn__.style.height = '20px';
			sccn__.style.border = '1px solid #A9A9A9';
			sccn__.style.fontSize = '12px';
			sccn__.style.verticalAlign = 'middle';
			var prdeisitir = function () {
				if (parseInt(this.value) >= 1 && parseInt(this.value) <= 15 && !slither.slg) {
					slither.pr = parseInt(this.value);
					svarmi = true;
					window.__skins["pr"] = parseInt(this.value);
				}
			};
			sccn__.onchange = prdeisitir;
			sccn__.onkeyup = prdeisitir;
			sccn__.onclick = prdeisitir;
			skMainWidth.appendChild(sccn__);

			var skMainWidth = document.createElement('div');
			skMainWidth.innerHTML = '<span title="' + "Your Eye Lens Size.\nIt is limited to between 1 and 15\nBecause 15 up is too big, 1 down is not work.\nAlso you can't use on Slogoman Eyes" + '" style="cursor:help;">Eye Lens Size <font color="red">(?)</font>:</span>';
			skMainWidth.style.position = 'relative';
			skMainWidth.style.display = 'inline-block';
			skMainWidth.style.marginRight = '13px';
			skMainDiv.appendChild(skMainWidth);
			var sccn = document.createElement('input');
			sccn.type = 'number';
			sccn.min = 1;
			sccn.max = 15;
			sccn.value = 6;
			sccn.style.marginLeft = '10px';
			sccn.style.width = '50px';
			sccn.style.height = '20px';
			sccn.style.border = '1px solid #A9A9A9';
			sccn.style.fontSize = '12px';
			sccn.style.verticalAlign = 'middle';
			var erdeistirir = function () {
				if (parseInt(this.value) >= 1 && parseInt(this.value) <= 15 && !slither.slg) {
					slither.er = parseInt(this.value);
					avarmi = true;
					window.__skins["er"] = parseInt(this.value);
				}
			};
			sccn.onchange = erdeistirir;
			sccn.onkeyup = erdeistirir;
			sccn.onclick = erdeistirir;
			skMainWidth.appendChild(sccn);

			var skMainWidth = document.createElement('div');
			skMainWidth.innerHTML = '<span title="' + "Your Head Size.\nIt is limited to between 0 and 50\nBecause 50 up is too big, 0 down is not work." + '" style="cursor:help;">Head Size <font color="red">(?)</font>:</span>';
			skMainWidth.style.position = 'relative';
			skMainWidth.style.display = 'inline-block';
			skMainWidth.style.marginRight = '13px';
			skMainDiv.appendChild(skMainWidth);
			var sccn = document.createElement('input');
			sccn.type = 'number';
			sccn.value = 0;
			sccn.style.marginLeft = '10px';
			sccn.style.width = '50px';
			sccn.style.height = '20px';
			sccn.style.border = '1px solid #A9A9A9';
			sccn.style.fontSize = '12px';
			sccn.style.verticalAlign = 'middle';
			var smelldeistir = function () {
				if (parseInt(this.value) >= 0 && parseInt(this.value) <= 50) {
					slither.swell = parseInt(this.value)/200;
					dvarmi = true;
					window.__skins["swell"] = parseInt(this.value)/200;
				}
			};
			sccn.onchange = smelldeistir;
			sccn.onkeyup = smelldeistir;
			sccn.onclick = smelldeistir;
			skMainWidth.appendChild(sccn);

//Antenna color - Antenna Border color
            var skMain = document.createElement('div');
            _scws.appendChild(skMain);
            var skMainDiv = document.createElement('div');
            skMainDiv.style.marginBottom = '2px';
            skMain.appendChild(skMainDiv);
            var skMainWidth = document.createElement('div');
            skMainWidth.textContent = 'Antenna Color:';
            skMainWidth.style.position = 'relative';
            skMainWidth.style.display = 'inline-block';
            skMainWidth.style.marginRight = '13px';
            skMainDiv.appendChild(skMainWidth);
            var sccn = document.createElement('input');
            sccn.type = 'color';
            sccn.min = 1;
            sccn.style.marginLeft = '10px';
            sccn.style.width = '50px';
            sccn.style.height = '20px';
            sccn.style.border = '1px solid #A9A9A9';
            sccn.style.fontSize = '12px';
            sccn.style.verticalAlign = 'middle';
			sccn.value = "#FFFFFF";
            sccn.id = "antenna_color";
            var antennaColorFunct = function () {
				r4varmi = true;
				if(document.getElementById('mycheckbox').checked == false)
				{
				document.getElementById('mycheckbox').click();
				}
				if(document.getElementById('transparen1').checked == true)
				{
				document.getElementById('transparen1').checked = false;
				}
                slither.atc2 = this.value;
                window.__skins["atc2"] = slither.atc2;
            };
            sccn.onchange = antennaColorFunct;
            sccn.onkeyup = antennaColorFunct;
            sccn.onclick = antennaColorFunct;
            skMainWidth.appendChild(sccn);
            var skMainWidth = document.createElement('div');
            skMainWidth.textContent = 'Transparent:';
            skMainWidth.style.position = 'relative';
            skMainWidth.style.display = 'inline-block';
            skMainWidth.style.marginRight = '13px';
            skMainDiv.appendChild(skMainWidth);
            var __sccn = document.createElement('input');
            __sccn.type = 'checkbox';
			__sccn.id = 'transparen1';
            __sccn.style.marginLeft = '10px';
            __sccn.style.width = '50px';
            __sccn.style.height = '20px';
            __sccn.style.border = '1px solid #A9A9A9';
            __sccn.style.fontSize = '12px';
            __sccn.style.verticalAlign = 'middle';
            var AntennaTransparentFunct = function () {
                if (this.checked) {
					r4varmi = true;
                    slither.atc2 = "transparent";
					if(document.getElementById('mycheckbox').checked == false)
					{
					document.getElementById('mycheckbox').click();
					}
                } else {
                    slither.atc2 = document.getElementById("antenna_color").value;
                }
                window.__skins["atc2"] = slither.atc2;
            };
            __sccn.onclick = AntennaTransparentFunct;
            skMainWidth.appendChild(__sccn);
            var skMain = document.createElement('div');
            _scws.appendChild(skMain);
            var skMainDiv = document.createElement('div');
            skMainDiv.style.marginBottom = '1px';
            skMain.appendChild(skMainDiv);

            var skMainHeight = document.createElement('div');
            skMainHeight.textContent = 'Antenna Border Color:';
            skMainHeight.style.position = 'relative';
            skMainHeight.style.display = 'inline-block';
            skMainDiv.appendChild(skMainHeight);
            var __sccn = document.createElement('input');
            __sccn.type = 'color';
            __sccn.min = 1;
            __sccn.id = "antenna_border_color";
            __sccn.style.marginLeft = '10px';
            __sccn.style.width = '50px';
            __sccn.style.height = '20px';
            __sccn.style.border = '1px solid #A9A9A9';
            __sccn.style.fontSize = '12px';
            __sccn.style.verticalAlign = 'middle';
			__sccn.value = "#000000";
            var antennaBorderColorFunct = function () {
				r3varmi = true;
				if(document.getElementById('mycheckbox').checked == false)
				{
				document.getElementById('mycheckbox').click();
				}
				if(document.getElementById('transparen2').checked == true)
				{
				document.getElementById('transparen2').checked = false;
				}
                slither.atc1 = this.value;
                window.__skins["atc1"] = slither.atc1;
            };
            __sccn.onchange = antennaBorderColorFunct;
            __sccn.onkeyup = antennaBorderColorFunct;
            __sccn.onclick = antennaBorderColorFunct;
            skMainHeight.appendChild(__sccn);
            var skMainWidth = document.createElement('div');
            skMainWidth.textContent = 'Transparent:';
            skMainWidth.style.position = 'relative';
            skMainWidth.style.display = 'inline-block';
            skMainWidth.style.marginLeft = '8px';
            skMainDiv.appendChild(skMainWidth);
            var __sccn = document.createElement('input');
            __sccn.type = 'checkbox';
			__sccn.id = 'transparen2';
            __sccn.style.marginLeft = '10px';
            __sccn.style.width = '50px';
            __sccn.style.height = '20px';
            __sccn.style.border = '1px solid #A9A9A9';
            __sccn.style.fontSize = '12px';
            __sccn.style.verticalAlign = 'middle';
            var AntennaBorderTransparentFunct = function () {
                if (this.checked) {
					r3varmi = true;
                    slither.atc1 = "transparent";
					if(document.getElementById('mycheckbox').checked == false)
					{
					document.getElementById('mycheckbox').click();
					}
                } else {
                    slither.atc1 = document.getElementById("antenna_border_color").value;
                }
                window.__skins["atc1"] = slither.atc1;
            };
            __sccn.onclick = AntennaBorderTransparentFunct;
            skMainWidth.appendChild(__sccn);

// Eye color - Eye lens color

            var skMain = document.createElement('div');
            _scws.appendChild(skMain);
            var skMainDiv = document.createElement('div');
            skMainDiv.style.marginBottom = '2px';
            skMain.appendChild(skMainDiv);
            var skMainWidth = document.createElement('div');
            skMainWidth.textContent = 'Eye Color:';
            skMainWidth.style.position = 'relative';
            skMainWidth.style.display = 'inline-block';
            skMainWidth.style.marginRight = '13px';
            skMainDiv.appendChild(skMainWidth);
            var sccn = document.createElement('input');
            sccn.type = 'color';
            sccn.min = 1;
            sccn.id = "eye_color";
            sccn.style.marginLeft = '10px';
            sccn.style.width = '50px';
            sccn.style.height = '20px';
            sccn.style.border = '1px solid #A9A9A9';
            sccn.style.fontSize = '12px';
            sccn.style.verticalAlign = 'middle';
			sccn.value = "#000000";
            var eyeColorFunct = function () {
				r1varmi = true;
                slither.ppc = this.value;
                window.__skins["ppc"] = slither.ppc;
				if(document.getElementById('transparen3').checked == true)
				{
				document.getElementById('transparen3').checked = false;
				}
            };
            sccn.onchange = eyeColorFunct;
            sccn.onkeyup = eyeColorFunct;
            sccn.onclick = eyeColorFunct;
            skMainWidth.appendChild(sccn);
            var skMainWidth = document.createElement('div');
            skMainWidth.textContent = 'Transparent:';
            skMainWidth.style.position = 'relative';
            skMainWidth.style.display = 'inline-block';
            skMainWidth.style.marginRight = '13px';
            skMainDiv.appendChild(skMainWidth);
            var __sccn = document.createElement('input');
            __sccn.type = 'checkbox';
            __sccn.style.marginLeft = '10px';
            __sccn.style.width = '50px';
			__sccn.id = 'transparen3';
            __sccn.style.height = '20px';
            __sccn.style.border = '1px solid #A9A9A9';
            __sccn.style.fontSize = '12px';
            __sccn.style.verticalAlign = 'middle';
            var EyeTransparentFunct = function () {
                if (this.checked) {
                    slither.ppc = "transparent";
					r1varmi = true;
                } else {
                    slither.ppc = document.getElementById("eye_color").value;
                }
                window.__skins["ppc"] = slither.ppc;
            };
            __sccn.onclick = EyeTransparentFunct;
            skMainWidth.appendChild(__sccn);
            var skMain = document.createElement('div');
            _scws.appendChild(skMain);
            var skMainDiv = document.createElement('div');
            skMainDiv.style.marginBottom = '2px';
            skMain.appendChild(skMainDiv);
            var skMainHeight = document.createElement('div');
            skMainHeight.textContent = 'Eye Lens Color:';
            skMainHeight.style.position = 'relative';
            skMainHeight.style.display = 'inline-block';
            skMainDiv.appendChild(skMainHeight);
            var __sccn = document.createElement('input');
            __sccn.type = 'color';
            __sccn.min = 1;
            __sccn.id = "eye_lens_color";
            __sccn.style.marginLeft = '10px';
            __sccn.style.width = '50px';
            __sccn.style.height = '20px';
            __sccn.style.border = '1px solid #A9A9A9';
            __sccn.style.fontSize = '12px';
            __sccn.style.verticalAlign = 'middle';
			__sccn.value = "#FFFFFF";
            var EyeLensColorFunct = function () {
				r2varmi = true;
                slither.ec = this.value;
                window.__skins["ec"] = slither.ec;
				if(document.getElementById('transparen4').checked == true)
				{
				document.getElementById('transparen4').checked = false;
				}
            };
            __sccn.onchange = EyeLensColorFunct;
            __sccn.onkeyup = EyeLensColorFunct;
            __sccn.onclick = EyeLensColorFunct;
            skMainHeight.appendChild(__sccn);
            var skMainWidth = document.createElement('div');
            skMainWidth.textContent = 'Transparent:';
            skMainWidth.style.position = 'relative';
            skMainWidth.style.display = 'inline-block';
            skMainWidth.style.marginLeft = '8px';
            skMainDiv.appendChild(skMainWidth);
            var __sccn = document.createElement('input');
            __sccn.type = 'checkbox';
			__sccn.id = 'transparen4';
            __sccn.style.marginLeft = '10px';
            __sccn.style.width = '50px';
            __sccn.style.height = '20px';
            __sccn.style.border = '1px solid #A9A9A9';
            __sccn.style.fontSize = '12px';
            __sccn.style.verticalAlign = 'middle';
            var EyeLensTransparentFunct = function () {
                if (this.checked) {
                    slither.ec = "transparent";
					r2varmi = true;
                } else {
                    slither.ec = document.getElementById("eye_lens_color").value;
                }
                window.__skins["ec"] = slither.ec;
            };
            __sccn.onclick = EyeLensTransparentFunct;
            skMainWidth.appendChild(__sccn);

    var scdef = document.createElement('div');
    scdef.style.display = 'none';
    scdef.style.width = '100%';
    scdef.style.position = 'absolute';
    scdef.style.top = '50%';
    scdef.style.transform = 'translate(0, -50%)';
    scdef.style.textAlign = 'center';
    scdef.style.opacity = 0.75;
    scws.appendChild(scdef);

    var scsorry = document.createElement('div');
    scsorry.textContent = "Sorry, you can't change default skins.";
    scdef.appendChild(scsorry);

    var scnew = document.createElement('div');
    scnew.textContent = 'Create new';
    scnew.className = 'slithereskin-blue';
    scnew.style.fontWeight = 'bold';
    scnew.onclick = newSkin;
    scdef.appendChild(scnew);

    var sccss = document.createElement('div');
    scws.appendChild(sccss);

    var scadd = document.createElement('div');
    scadd.innerHTML = '<span class="slithereskin-blue">Add color stop</span>';
    scadd.style.display = 'none';
    scadd.firstChild.onclick = function() {
        var prevColor = +sccss.lastChild.firstChild.childNodes[1].dataset.color, push;
        if (sccss.firstChild.childNodes[1].lastChild.disabled) {
            slither.rbcs = [];
            for (var i = 0; i < 7; i++)
                slither.rbcs.push(prevColor);
        }
        do {
            push = Math.floor(Math.random() * rrs.length);
        } while (push == prevColor);
        for (var i = 0; i < 7; i++)
            slither.rbcs.push(push);
        updateSkin();
        workspace();
    };
    scws.appendChild(scadd);

    var scprops = document.createElement('div');
    scprops.style.display = 'none';
    scws.appendChild(scprops);

    function onChange(prop, value, up = false) {
        var value = this[value];
        up ? (skins[slither.rcv - max_skin_cv - 1][prop] = value) : (skins[slither.rcv - max_skin_cv - 1].skin[prop] = value);
        var storageSkins = JSON.parse(localStorage.getItem('slithereskin-skins'));
        up ? (storageSkins[slither.rcv - max_skin_cv - 1][prop] = value) : (storageSkins[slither.rcv - max_skin_cv - 1].skin[prop] = value);
        localStorage.setItem('slithereskin-skins', JSON.stringify(storageSkins));
        setSkin(slither, slither.rcv, null);
    }

    function slitherSwitch(prop, name, up = false) {
        var scprop = document.createElement('div');
        scprop.innerHTML = '<input type="checkbox" id="slithereskin-' + prop + '"> <label for="slithereskin-' + prop + '">' + name + '</label>';
        scprop.dataset.prop = prop;
        scprop.firstChild.style.margin = scprop.lastChild.style.margin = 0;
        scprop.firstChild.onchange = function() {
            onChange.apply(this, [prop, 'checked', up]);
        };
        scprops.appendChild(scprop);
        return scprop;
    }
    slitherSwitch('slg', 'Slogoman eyes');
    slitherSwitch('jyt', 'Jelly face');
    slitherSwitch('one_eye', 'Jacksepticeye');

    var scskin = document.createElement('div');
    scskin.style.display = 'none';
    scskin.style.marginTop = '7px';
    scws.appendChild(scskin);

    var sccreate = document.createElement('span');
    sccreate.textContent = 'Create new skin';
    sccreate.className = 'slithereskin-blue';
    sccreate.onclick = newSkin;
    scskin.appendChild(sccreate);

    bullet = bullet.cloneNode();
    scskin.appendChild(bullet);

    var scdelete = document.createElement('span');
    scdelete.textContent = 'Delete this skin';
    scdelete.className = 'slithereskin-blue';
    scdelete.onclick = function() {
        skins.splice(slither.rcv - max_skin_cv - 1, 1);
        var storageSkins = JSON.parse(localStorage.getItem('slithereskin-skins'));
        storageSkins.splice(slither.rcv - max_skin_cv - 1, 1);
        localStorage.setItem('slithereskin-skins', JSON.stringify(storageSkins));
        setSkin(slither, slither.rcv - 1, null);
    };
    scskin.appendChild(scdelete);

    var sccm = document.createElement('div'), colors;
    sccm.style.position = 'absolute';
    sccm.style.top = '0px';
    sccm.style.left = '-310px';
    sccm.style.padding = '3px 7px';
    sccm.style.width = '350px';
    sccm.style.border = '1px solid #A9A9A9';
    sccm.style.background = 'white';
    sccm.style.zIndex = 100000001;
    sccm.onclick = function (e) {
        e.stopPropagation();
    };

    var scdefc = document.createElement('div');
    scdefc.textContent = 'Default colors:';
    var sccc = document.createElement('div');
    sccc.textContent = 'Custom colors:';

    var sccset = document.createElement('div');
    sccset.innerHTML = '<span class="slithereskin-blue">Color settings</span>';
    sccset.firstChild.className = 'slithereskin-blue';
    sccset.firstChild.onclick = function() {
        ccblackout.style.visibility = 'visible';
        ccblackout.style.opacity = 1;
        sccm.parentNode.removeChild(sccm);
    };

    function colorMenu() {
        colors = [], sccm.innerHTML = '';
        sccm.appendChild(scdefc);
        for (var i = 0; i < rrs.length; i++) {
            if (i == ncolors)
                sccm.appendChild(sccc);
            var scc = document.createElement('div');
            scc.dataset.color = i;
            scc.style.display = 'inline-block';
            scc.style.margin = '2px';
            scc.style.width = '18px';
            scc.style.height = '18px';
            scc.style.border = '1px solid rgba(0,0,0,0.75)';
            scc.style.backgroundColor = 'rgb('+rrs[i]+','+ggs[i]+','+bbs[i]+')';
            if (i == 10) scc.style.backgroundImage = ' url("http://i.imgur.com/kk1pXVE.png")';
            if (i == 19) scc.style.backgroundImage = ' url("http://i.imgur.com/DfUUkyT.png")';
            if (i == 20) scc.style.backgroundImage = ' url("http://i.imgur.com/i57h7xx.png")';
            if (i == 24) scc.style.boxShadow = 'inset 0 0 8px #CCCC00';
            if (i == 26) scc.style.boxShadow = 'inset 0 0 8px #FFFFE6';
            if (i == 27) scc.style.boxShadow = 'inset 0 0 8px #FFCCCC';
            scc.style.cursor = 'pointer';
            scc.onclick = function() {
                for (var j = 0; j < sccm.parentNode.nextSibling.lastChild.value; j++)
                    slither.rbcs[+sccm.parentNode.parentNode.dataset.position + j] = +this.dataset.color;
                updateSkin();
                workspace();
            };
            sccm.appendChild(scc);
            colors.push(scc);
        }
        sccm.appendChild(sccset);
    }

    // </Skin Constructor>

    // <Special Skins>

    var ssblackout = createWindow(),
        ssdiv = ssblackout.firstChild;

    var ssheader = document.createElement('h2');
    ssheader.textContent = 'Special skins';
    ssdiv.appendChild(ssheader);

    var ssp = document.createElement('div');
    ssp.textContent = 'Check the skins you want to use:';
    ssp.style.textAlign = 'center';
    ssdiv.appendChild(ssp);

    var ssskins = document.createElement('div');
    ssskins.style.marginTop = '5px';
    ssdiv.appendChild(ssskins);

    window.sskins = [
        {
            opt: 'usa',
            text: 'America',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/useheads1.png',
            skin: {
                atc1: "#ffffff",
                atc2: "#ffffff",
				blbx: -30,
				blby: -120,
                bsc: .15,
                rbcs: [7,9,7,9,7,9,7,9,7,9,7,10,10,10,10,10,10,10,10,10]
            }
        }, {
            opt: 'rus',
            text: 'Russia',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/rshead.png',
            skin: {
                atc1: "#ffffff",
                atc2: "#ffffff",
				blbx: -30,
				blby: -120,
                bsc: .15,
                rbcs: [9,9,9,9,9,1,1,1,1,1,7,7,7,7,7]
            }
        }, {
            opt: 'can',
            text: 'Canada',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/canhead.png',
            skin: {
                atc1: "#ffffff",
                atc2: "#ffffff",
				blbx: -30,
				blby: -120,
                bsc: .15,
                rbcs: [7,7,9,9,7,7,9,9,7,7,7,9,9,9]
            }
        }, {
            opt: 'fr',
            text: 'France',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/frhead.png',
            skin: {
                atc1: "#ffffff",
                atc2: "#ffffff",
				blbx: -30,
				blby: -120,
                bsc: .15,
                rbcs: [14,14,14,14,14,9,9,9,9,9,7,7,7,7,7]
            }
        }, {
            opt: 'ing',
            text: 'England',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/inghead.png',
            skin: {
                atc1: "#ffffff",
                atc2: "#ffffff",
				blbx: -30,
				blby: -120,
                bsc: .15,
                rbcs: [9,9,9,9,9,21,21,21,21,21,7,7,7,7,7]
            }
        }, {
            opt: 'tr',
            text: 'Turkey',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/trhead1.png',
            skin: {
                atc1: "#ffffff",
                atc2: "#ffffff",
				blbx: -30,
				blby: -120,
                bsc: .15,
                rbcs: [7,7,7,9,9,9]
            }
        }, {
            opt: 'ger',
            text: 'Germany',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/grhead.png',
            skin: {
                atc1: "#ffffff",
                atc2: "#ffffff",
				blbx: -30,
				blby: -120,
                bsc: .15,
                rbcs: [11,11,11,11,11,7,7,7,7,7,12,12,12,12,12]
            }
        }, {
            opt: 'neth',
            text: 'Netherland',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/nethead.png',
            skin: {
                atc1: "#ffffff",
                atc2: "#ffffff",
				blbx: -30,
				blby: -120,
                bsc: .15,
                rbcs: [7,7,7,7,9,9,9,9,16,16,16,16]
            }
        }, {
            opt: 'spa',
            text: 'Spain',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/spahead.png',
            skin: {
                atc1: "#ffffff",
                atc2: "#ffffff",
				blbx: -30,
				blby: -120,
                bsc: .15,
                rbcs: [7,7,7,7,7,7,7,7,18,18,18,18,18,18,18,18]
            }
        },  {
            opt: 'por',
            text: 'Portugal',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/porthead.png',
            skin: {
                atc1: "#000000",
                atc2: "#009933",
				blbx: -30,
				blby: -120,
                bsc: .15,
                rbcs: [7,7,7,7,7,7,7,13,13,13,13]
            }
        }, {
            opt: 'ita',
            text: 'Italy',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/itahead.png',
            skin: {
                atc1: "#ffffff",
                atc2: "#ffffff",
				blbx: -30,
				blby: -120,
                bsc: .15,
                rbcs: [7,7,7,7,7,9,9,9,9,9,13,13,13,13,13]
            }
        }, {
            opt: 'cin',
            text: 'China',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/cinhead.png',
            skin: {
                atc1: "#ffffff",
                atc2: "#ffffff",
				blbx: -30,
				blby: -120,
                bsc: .15,
                rbcs: [7, 18,7,7]
            }
        }, {
            opt: 'ind',
            text: 'India',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/indhead.png',
            skin: {
                atc1: "#ffffff",
                atc2: "#ffffff",
				blbx: -30,
				blby: -120,
                bsc: .15,
                rbcs: [5,5,5,5,5,5,5,9,9,9,9,9,9,9,13,13,13,13,13,13,13]
            }
        }, {
            opt: 'mex',
            text: 'Mexico',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/mexhead.png',
            skin: {
                atc1: "#ffffff",
                atc2: "#ffffff",
				blbx: -30,
				blby: -120,
                bsc: .15,
                rbcs: [13,13,13,13,9,9,9,9,7,7,7,7]
            }
        }, {
            opt: 'bra',
            text: 'Brasil',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/brhead.png',
            skin: {
                atc1: "#ffffff",
                atc2: "#ffffff",
				blbx: -30,
				blby: -120,
                bsc: .15,
                rbcs: [3,3,3,3,3,3,3,18,18,18,18,18,18,20,19,20,19,20,19,20,18,18,18,18,18,18]
            }
        }, {
            opt: 'arg',
            text: 'Argentina',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/arghead.png',
            skin: {
                atc1: "#ffffff",
                atc2: "#ffffff",
				blbx: -30,
				blby: -120,
                bsc: .15,
                rbcs: [ncolors+3,ncolors+3,ncolors+3,ncolors+3,ncolors+3,ncolors+3,ncolors+3,9,9,9,9,9,9,9]
            }
        }, {
            opt: 'col',
            text: 'Colombia',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/colhead.png',
            skin: {
                atc1: "#ffffff",
                atc2: "#ffffff",
				blbx: -30,
				blby: -120,
                bsc: .15,
                rbcs: [18,18,18,18,18,18,ncolors+3,ncolors+3,ncolors+3,7,7,7]
            }
        }, {
            opt: 'isr',
            text: 'Israel',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/isrhead.png',
            skin: {
                atc1: "#005cd7",
                atc2: "#005cd7",
				blbx: -30,
				blby: -120,
                bsc: .15,
                rbcs: [9,9,9,9,9,16,16,16,16,16]
            }
        }, {
            opt: 'den',
            text: 'Denmark',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/denhead.png',
            skin: {
                atc1: "#999999",
                atc2: "#ff0000",
				blbx: -30,
				blby: -120,
                bsc: .15,
                rbcs: [9,9,9,9,9,9,9,7,7,7,7,9,7,7,7,7]
            }
        }, {
            opt: 'aust',
            text: 'Australia',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/austhead.png',
            skin: {
                atc1: "#ffffff",
                atc2: "#ffffff",
				blbx: -30,
				blby: -120,
                bsc: .15,
                rbcs: [16,16,16,16,9,9,9,9,7,7,7,7]
            }
        }, {
            opt: 'belgi',
            text: 'Belgium',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/belgihead.png',
            skin: {
                atc1: "#ffffff",
                atc2: "#ffffff",
				blbx: -30,
				blby: -120,
                bsc: .15,
                rbcs: [ncolors+5,ncolors+5,ncolors+5,ncolors+5,18,18,18,18,7,7,7,7]
            }
        }, {
            opt: 'austrai',
            text: 'Austria',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/austrhead.png',
            skin: {
                atc1: "#ffffff",
                atc2: "#ffffff",
				blbx: -30,
				blby: -120,
                bsc: .15,
                rbcs: [7,7,7,7,11,11,11,11,9,9,9,9]
            }
        }, {
            opt: 'jpn',
            text: 'Japan',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/jpnhead.png',
            skin: {
                atc1: "#ff0000",
                atc2: "#ff0000",
				blbx: -30,
				blby: -120,
                bsc: .15,
                rbcs: [9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,7,7,7]
            }
        },
		{
            opt: 'skore',
            text: 'North Korea',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/skore.png',
            skin: {
                atc1: "#ffffff",
                atc2: "#ffffff",
				blbx: -30,
				blby: -120,
                bsc: .15,
                rbcs: [16,16,16,16,7,7,7,7,9,9,9,9]
            }
        },
		{
            opt: 'nkore',
            text: 'South Korea',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/nkore.png',
            skin: {
                atc1: "#ffffff",
                atc2: "#ffffff",
				blbx: -30,
				blby: -120,
                bsc: .15,
                rbcs: [7,7,7,7,16,16,16,16,16,9,9]
            }
        },
		{
            opt: 'nor',
            text: 'Norway',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/norhead.png',
            skin: {
                atc1: "#ffffff",
                atc2: "#ffffff",
				blbx: -30,
				blby: -120,
                bsc: .15,
                rbcs: [7,7,7,7,7,7,7,9,16,16,16,16,16,16,16,9]
            }
        }, {
            opt: 'swe',
            text: 'Sweden',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/swehead.png',
            skin: {
                atc1: "#ffffff",
                atc2: "#ffffff",
				blbx: -30,
				blby: -120,
                bsc: .15,
                rbcs: [15,15,15,15,15,15,15,4,4,4,4,4,4,4]
            }
        }, {
            opt: 'ukr',
            text: 'Ukrania',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/ukrhead.png',
            skin: {
                atc1: "#ffffff",
                atc2: "#ffffff",
				blbx: -30,
				blby: -120,
                bsc: .15,
                rbcs: [23,23,23,23,23,23,23,23,23,18,18,18,18,18,18,18,18,18]
            }
        }, {
            opt: 'indo',
            text: 'Indonesia',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/indohead.png',
            skin: {
                atc1: "#999999",
                atc2: "#ffffff",
				blbx: -30,
				blby: -120,
                bsc: .15,
                rbcs: [7,7,7,7,7,9,9,9,9,9]
            }
        }, {
            opt: 'egy',
            text: 'Egypt',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/egyhead.png',
            skin: {
                atc1: "#999999",
                atc2: "#ffffff",
				blbx: -30,
				blby: -120,
                bsc: .15,
                rbcs: [7,7,7,9,9,9,11,11,11]
            }
        }, {
            opt: 'phli',
            text: 'Philippines',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/phlihead.png',
            skin: {
                atc1: "#999999",
                atc2: "#ff0000",
				blbx: -30,
				blby: -120,
                bsc: .15,
                rbcs: [9,9,9,9,16,16,16,16,7,7,7,7]
            }
        }, {
            opt: 'rom',
            text: 'Romania',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/romhead.png',
            skin: {
                atc1: "#ffffff",
                atc2: "#ffffff",
				blbx: -30,
				blby: -120,
                bsc: .15,
                rbcs: [16,16,16,16,16,16,16,18,18,18,18,18,18,18,7,7,7,7,7,7,7]
            }
        }, {
            opt: 'gerg',
            text: 'Georgia',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/gerghead.png',
            skin: {
                atc1: "#ffffff",
                atc2: "#ffffff",
				blbx: -30,
				blby: -120,
                bsc: .15,
                rbcs: [7,7,7,7,7,7,7,7,9,9,9,9,9,9,9,9]
            }
        },  {
            opt: 'serb',
            text: 'Serbia',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/serbhead.png',
            skin: {
                atc1: "#ffffff",
                atc2: "#ffffff",
				blbx: -30,
				blby: -120,
                bsc: .15,
                rbcs: [7,7,7,16,16,16,9,9,9]
            }
        }, {
            opt: 'alg',
            text: 'Algeria',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/alghead.png',
            skin: {
                atc1: "#ffffff",
                atc2: "#047a18",
				blbx: -30,
				blby: -120,
                bsc: .15,
                rbcs: [9,9,9,9,9,13,13,13,13,13,7,7,7,7,7]
            }
        }, {
            opt: 'alb',
            text: 'Albania',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/albhead.png',
            skin: {
                atc1: "#ffffff",
                atc2: "#ffffff",
				blbx: -30,
				blby: -120,
                bsc: .15,
                rbcs: [7,7,7,7,7,7,7,7,11,11,11,11,11,11,11,11]
            }
        }, {
            opt: 'yun',
            text: 'Greece',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/yunhead.png',
            skin: {
                atc1: "#ffffff",
                atc2: "#ffffff",
				blbx: -30,
				blby: -120,
                bsc: .15,
                rbcs: [21,21,21,21,21,21,21,21,9,9,9,9,9,9,9,9]
            }
        }, {
            opt: 'az',
            text: 'Azerbaijan',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/azhead.png',
            skin: {
                atc1: "#ffffff",
                atc2: "#ffffff",
				blbx: -30,
				blby: -120,
                bsc: .15,
                rbcs: [ncolors+3,ncolors+3,ncolors+3,ncolors+3,ncolors+3,ncolors+2,ncolors+2,ncolors+2,ncolors+2,ncolors+2,ncolors+1,ncolors+1,ncolors+1,ncolors+1,ncolors+1]
            }
        }, {
            opt: 'ec',
            text: 'Ecuador',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/ecuadorhead.png',
            skin: {
                atc1: "#ffffff",
                atc2: "#ffffff",
				blbx: -30,
				blby: -120,
                bsc: .15,
                rbcs: [18,18,18,18,18,16,16,16,7,7,7]
            }
        }, {
            opt: 'tha',
            text: 'Thailand',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/thahead.png',
            skin: {
                atc1: "#ffffff",
                atc2: "#ffffff",
				blbx: -30,
				blby: -120,
                bsc: .15,
                rbcs: [7,7,7,7,7,7,7,9,9,9,16,16,16,16,16,9,9,9]
            }
        }, {
            opt: 'ven',
            text: 'Venezuela',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/venehead.png',
            skin: {
                atc1: "#ffffff",
                atc2: "#ffffff",
				blbx: -30,
				blby: -120,
                bsc: .15,
                rbcs: [18,18,18,16,16,16,7,7,7]
            }
        }, {
            opt: 'bosna',
            text: 'Bosnia',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/boshead.png',
            skin: {
                atc1: "#ffffff",
                atc2: "#ffffff",
				blbx: -30,
				blby: -120,
                bsc: .15,
                rbcs: [ncolors+3,ncolors+3,ncolors+3,18,18,18]
            }
        }, {
            opt: 'vin',
            text: 'Venice',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/vinhead.png',
            skin: {
                atc1: "#ffffff",
                atc2: "#ffffff",
				blbx: -30,
				blby: -120,
                bsc: .15,
                rbcs: [ncolors+2,ncolors+2,ncolors+2,18,18]
            }
        }, {
            opt: 'pol',
            text: 'Poland',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/polhead2.png',
            skin: {
                atc1: "#ff0000",
                atc2: "#ff0000",
				blbx: -30,
				blby: -120,
                bsc: .15,
                rbcs: [9,9,9,9,9,9,9,7,7,7,7,7,7,7]
            }
        }, {
            opt: 'barca',
            text: 'Barcelona',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/barcahead.png',
            skin: {
                atc1: "#004d98",
                atc2: "#a50044",
				blbx: -35,
				blby: -150,
				blbh: 300,
                bsc: .15,
                rbcs: [21,21,21,21,7,7,7,7]
            }
        }, {
            opt: 'rm',
            text: 'Real Madrid',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/rmhead.png',
            skin: {
                atc1: "#033e86",
                atc2: "#033e86",
				blbx: -35,
				blby: -131,
				blbh: 285,
                bsc: .16,
                rbcs: [9]
            }
        }, {
            opt: 'atm',
            text: 'Atletico Madrid',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/atmhead.png',
            skin: {
                atc1: "#0004FF",
                atc2: "#000000",
				blbx: -15,
				blby: -170,
                bsc: .15,
                rbcs: [7,7,7,9,9,9,21,21,21]
            }
        }, {
            opt: 'chelsea',
            text: 'Chelsea',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/chead.png',
            skin: {
                atc1: "transparent",
                atc2: "#fff",
				blbx: -15,
				blby: -155,
                bsc: .16,
                rbcs: [16,16,16,16,16,9]
            }
        }, {
            opt: 'live',
            text: 'Liverpool',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/livehead.png',
            skin: {
                atc1: "transparent",
                atc2: "#fff",
				blbx: -15,
				blby: -155,
                bsc: .16,
                rbcs: [7,7,7,7,7,9]
            }
        }, {
            opt: 'arse',
            text: 'Arsenal',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/arseheadz.png',
            skin: {
                atc1: "#0004FF",
                atc2: "#fff",
				blbx: -15,
				blby: -170,
                bsc: .15,
                rbcs: [7,7,7,7,7,7,9,16,16,9]
            }
        }, {
            opt: 'mcity',
            text: 'Manchester City',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/mancity.png',
            skin: {
                atc1: "#97ffff",
                atc2: "#fff",
				blbx: -15,
				blby: -170,
                bsc: .15,
                rbcs: [12,12,12,12,12,9,ncolors+3,ncolors+3,ncolors+3,ncolors+3,ncolors+3,9]
            }
        }, {
            opt: 'manu',
            text: 'Manchester United',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/manuhead.png',
            skin: {
                atc1: "#ff0000",
                atc2: "#fff",
				blbx: -15,
				blby: -170,
                bsc: .15,
                rbcs: [18,18,18,18,18,11,7,7,7,7,7,11]
            }
        }, {
            opt: 'tote',
            text: 'Tottenham',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/totte.png',
            skin: {
                atc1: "transparent",
                atc2: "#fff",
				blbx: -15,
				blby: -170,
                bsc: .16,
                rbcs: [16,16,16,16,16,9]
            }
        }, {
            opt: 'lei',
            text: 'Leichester City',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/leiheadsz.png',
            skin: {
                atc1: "transparent",
                atc2: "#0883e0",
				blbx: -15,
				blby: -170,
                bsc: .15,
                rbcs: [9,9,9,9,9,9,16,16,16,16,16,16]
            }
        }, {
            opt: 'psg',
            text: 'Paris Saint Germain',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/psghead1.png',
            skin: {
                atc1: "#2a1269",
                atc2: "#2a1269",
				blbx: -35,
				blby: -168,
				blbh: 330,
                bsc: .15,
                rbcs: [21,21,21,9,7,9]
            }
        }, {
            opt: 'bmnh',
            text: 'Bayern Munich',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/bmunihhead.png',
            skin: {
                atc1: "#000000",
                atc2: "#0300e0",
				blbx: -15,
                bsc: .15,
                rbcs: [7,7,7,7,7,7,7,7,21,21,21,21,21,21,21]
            }
        }, {
            opt: 'drd',
            text: 'Dordmund',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/drdmundhead.png',
            skin: {
                atc1: "#111111",
                atc2: "#222222",
				blbx: -15,
                bsc: .15,
                rbcs: [18,18,18,18,11,11,11,11]
            }
        }, {
            opt: 'juv',
            text: 'Juventus',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/juvehead.png',
            skin: {
                atc1: "#000000",
                atc2: "#ffffff",
				blbx: -35,
				blby: -175,
                bsc: .15,
                rbcs: [9,9,9,9,9,11,11,11,11,11]
            }
        }, {
            opt: 'mil',
            text: 'Milan',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/milahead.png',
            skin: {
                atc1: "#000000",
                atc2: "#ffffff",
				blbx: -35,
				blby: -194,
				blbh: 360,
                bsc: .16,
                rbcs: [11,11,11,11,7,7,7,7]
            }
        }, {
            opt: 'inter',
            text: 'Inter',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/inthead.png',
            skin: {
                atc1: "#0004FF",
                atc2: "#000000",
				blbx: -15,
                bsc: .15,
                rbcs: [11,11,11,11,1,1,1,1]
            }
        }, {
            opt: 'Fenerbahce',
            text: 'Fenerbahce',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/fenerbahcehead1.png',
            skin: {
                atc1: "#0004FF",
                atc2: "#EEFF00",
				blbx: -15,
                bsc: .15,
                rbcs: [18,18,18,18,16,16,16,16]
            }
        }, {
            opt: 'gs',
            text: 'Galatasaray',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/gshead1.png',
            skin: {
                atc1: "#FF0000",
                atc2: "#EEFF00",
				blbx: -40,
                bsc: .15,
                rbcs: [18,18,18,18,7,7,7,7]
            }
        }, {
            opt: 'bjk',
            text: 'Besiktas',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/bjkhead.png',
            skin: {
                atc1: "#000000",
                atc2: "#ffffff",
				blbx: -35,
				blby: -168,
                bsc: .15,
                rbcs: [11,11,11,11,9,9,9,9]
            }
        }, {
            opt: 'euro',
            text: 'Euro 2016',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/e2016.png',
            skin: {
                atc1: "#000",
                atc2: "#fff",
                bsc: .14,
                rbcs: [7,7,7,7,7,16,16,9,16,16,7,9,9,16,9,9,7,7,7,7,7,7]
            }
        }, {
            opt: 'futbol',
            text: 'Football',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/football.png',
            skin: {
                atc1: "#000",
                atc2: "#fff",
				blbx: -15,
                bsc: .14,
                rbcs: [9,ncolors+5]
            }
        }, {
            opt: 'basket',
            text: 'Basketball',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/basketball.png',
            skin: {
                atc1: "#000",
                atc2: "#C36523",
				blbx: -15,
                bsc: .14,
                rbcs: [5,5,5,ncolors+5]
            }
        }, {
            opt: 'footbal2',
            text: 'Football 2',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/footballrugby.png',
            skin: {
                atc1: "#000",
                atc2: "#793607",
				blbx: -15,
                bsc: .14,
                rbcs: [9,ncolors+14,ncolors+14,ncolors+14]
            }
        }, {
            opt: 'tennis',
            text: 'Tennis',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/tennis.png',
            skin: {
                atc1: "#000",
                atc2: "#ffff00",
				blbx: -15,
                bsc: .14,
                rbcs: [18,18,18,9]
            }
        }, {
            opt: 'steam',
            text: 'Steam',
			bulb: 'http://wormax.org/chrome3kafa/steam.png',
            initial: true,
            skin: {
                atc1: "#000",
                atc2: "#323232",
				bsc: 0.11,
				blby: -153,
				blbx: -30,
				atx: new Float32Array(11),
                aty: new Float32Array(11),
                atvx: new Float32Array(11),
                atvy: new Float32Array(11),
                atax: new Float32Array(11),
                atay: new Float32Array(11),
                rbcs: [ncolors+21]
            }
        }, {
            opt: 'org',
            text: 'Origin',
			bulb: 'http://wormax.org/chrome3kafa/origin.png',
            initial: true,
            skin: {
                atc1: "#000",
                atc2: "#ee5921",
				bsc: 0.11,
				blby: -153,
				blbx: -30,
				atx: new Float32Array(11),
                aty: new Float32Array(11),
                atvx: new Float32Array(11),
                atvy: new Float32Array(11),
                atax: new Float32Array(11),
                atay: new Float32Array(11),
                rbcs: [ncolors+22]
            }
        }, {
            opt: 'fb',
            text: 'Facebook',
			bulb: 'http://wormax.org/chrome3kafa/facebookhead.png',
            initial: true,
            skin: {
                atc1: "#000",
                atc2: "#3a5897",
				bsc: 0.11,
				blby: -153,
				blbx: -30,
				atx: new Float32Array(11),
                aty: new Float32Array(11),
                atvx: new Float32Array(11),
                atvy: new Float32Array(11),
                atax: new Float32Array(11),
                atay: new Float32Array(11),
                rbcs: [ncolors+9]
            }
        }, {
            opt: 'twi',
            text: 'Twitter',
			bulb: 'http://wormax.org/chrome3kafa/twitterheadz.png',
            initial: true,
            skin: {
                atc1: "#000",
                atc2: "#65afe2",
				bsc: 0.11,
				blby: -153,
				blbx: -30,
				atx: new Float32Array(11),
                aty: new Float32Array(11),
                atvx: new Float32Array(11),
                atvy: new Float32Array(11),
                atax: new Float32Array(11),
                atay: new Float32Array(11),
                rbcs: [ncolors+10]
            }
        }, {
            opt: 'insta',
            text: 'Instagram',
			bulb: 'http://wormax.org/chrome3kafa/instahead.png',
            initial: true,
            skin: {
                atc1: "#000",
                atc2: "#fff",
				bsc: 0.11,
				blby: -153,
				blbx: -30,
				atx: new Float32Array(11),
                aty: new Float32Array(11),
                atvx: new Float32Array(11),
                atvy: new Float32Array(11),
                atax: new Float32Array(11),
                atay: new Float32Array(11),
                rbcs: [16,16,16,8,8,8,7,7,7,18,18,18]
            }
        }, {
            opt: 'youtbe',
            text: 'Youtube',
			bulb: 'http://wormax.org/chrome3kafa/youtubehead.png',
            initial: true,
            skin: {
                atc1: "#000",
                atc2: "#fff",
				bsc: 0.11,
				blby: -153,
				blbx: -30,
				atx: new Float32Array(11),
                aty: new Float32Array(11),
                atvx: new Float32Array(11),
                atvy: new Float32Array(11),
                atax: new Float32Array(11),
                atay: new Float32Array(11),
                rbcs: [7,7,7,7,7,7,7,7,7,9,9]
            }
        }, {
            opt: 'twitch',
            text: 'Twitch',
			bulb: 'http://wormax.org/chrome3kafa/twitchhead.png',
            initial: true,
            skin: {
                atc1: "#000",
                atc2: "#6441a5",
				bsc: 0.11,
				blby: -153,
				blbx: -30,
				atx: new Float32Array(11),
                aty: new Float32Array(11),
                atvx: new Float32Array(11),
                atvy: new Float32Array(11),
                atax: new Float32Array(11),
                atay: new Float32Array(11),
                rbcs: [ncolors+11]
            }
        }, {
            opt: 'yt1',
            text: 'YT',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/yt1head.png',
            skin: {
                atc1: "transparent",
                atc2: "#000",
				blbx: -55,
				blby: -125,
                bsc: .15,
                rbcs: [11,16,14]
            }
        }, {
            opt: 'slithere',
            text: 'Slithere.com',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/slitlogo.png',
            skin: {
                atc1: "#000",
                atc2: "#ffffff",
				blbx: -50,
				blby: -155,
				er: 7,
				pr: 5,
                bsc: .20,
                rbcs: [18,18,18,18,3,13,3,25,3]
            }
        }, {
            opt: 'Donut',
            text: 'Donut',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/headdonut.png',
            skin: {
                atc1: "#003300",
                atc2: "#66cc00",
                bsc: .15,
				blbx: -16,
                rbcs: [9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,ncolors,ncolors,ncolors,ncolors,ncolors,ncolors,ncolors,ncolors,ncolors,ncolors,ncolors+1,ncolors+1,ncolors+1,ncolors+1,ncolors+1,ncolors+1,ncolors+1,ncolors+1,ncolors+1,ncolors+1]
            }
        }, {
            opt: 'elmas',
            text: 'Crystal',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/elmashead.png',
            skin: {
                atc1: "#000000",
                atc2: "#69D0F1",
                blbx: -20,
				blby: -125,
				bsc: .18,
                rbcs: [23]
            }
        }, {
            opt: 'andro',
            text: 'Andro',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/androhead.png',
            skin: {
                atc1: "#000000",
                atc2: "#485aff",
                blbx: -5,
				blby: -50,
				bsc: .23,
				atx: new Float32Array(10),
                aty: new Float32Array(10),
                atvx: new Float32Array(10),
                atvy: new Float32Array(10),
                atax: new Float32Array(10),
                atay: new Float32Array(10),
				scale: 0.3,
                rbcs: [9, 9, 9, 16]
            }
        }, {
            opt: 'venomextreme',
            text: 'Venom Extreme',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/venomhead.png',
            skin: {
                atc1: "#000",
                atc2: "#999999",
				blbx: -15,
                bsc: .16,
                rbcs: [9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,11]
            }
        }, {
            opt: 'her',
            text: 'Hero',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/herohead.png',
            skin: {
                atc1: "#000000",
                atc2: "#333333",
                blbx: -5,
				blby: -75,
				bsc: .24,
				atx: new Float32Array(9),
                aty: new Float32Array(9),
                atvx: new Float32Array(9),
                atvy: new Float32Array(9),
                atax: new Float32Array(9),
                atay: new Float32Array(9),
				scale: 0.3,
                rbcs: [7]
            }
        }, {
            opt: 'jum',
            text: 'Jumbo',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/jumbohead.png',
            skin: {
                atc1: "#ffff00",
                atc2: "#777",
                blbx: -5,
				blby: -65,
				bsc: .35,
				atx: new Float32Array(9),
                aty: new Float32Array(9),
                atvx: new Float32Array(9),
                atvy: new Float32Array(9),
                atax: new Float32Array(9),
                atay: new Float32Array(9),
				scale: 0.3,
                rbcs: [24]
            }
        }, {
            opt: 'mast',
            text: 'MasterOV',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/whead.png',
            skin: {
                atc1: "#000000",
                atc2: "#DBD444",
                blbx: -25,
				blby: -60,
				bsc: .28,
				atx:  new Float32Array(10),
                aty: new Float32Array(10),
                atvx: new Float32Array(10),
                atvy: new Float32Array(10),
                atax: new Float32Array(10),
                atay: new Float32Array(10),
				scale: 0.4,
                rbcs: [18]
            }
        }, {
            opt: 'trtle',
            text: 'Turtle',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/turtlehead.png',
            skin: {
                atc1: "#000000",
                atc2: "#3dba48",
                blbx: -60,
				blby: -33,
				bsc: .35,
				er: 7.2, ec: '#000000', eca: 1, ppc: '#3DBA48', swell: 0.04,
				atx:  new Float32Array(20),
                aty: new Float32Array(20),
                atvx: new Float32Array(20),
                atvy: new Float32Array(20),
                atax: new Float32Array(20),
                atay: new Float32Array(20),
				scale: 0.44,
                rbcs: [26, 26, 26, 26, 26, 26, 3, 25]
            }
        }, {
            opt: 'nbk',
            text: 'NBK',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/nbkhead.png',
            skin: {
                atc1: "#000000",
                atc2: "#0045BE",
                blbx: -60,
				blby: -33,
				bsc: .30,
				atx:  new Float32Array(9),
                aty: new Float32Array(9),
                atvx: new Float32Array(9),
                atvy: new Float32Array(9),
                atax: new Float32Array(9),
                atay: new Float32Array(9),
				scale: 0.36,
                rbcs: [19, 19, 19, 10, 14, 15, 20]
            }
        }, {
            opt: 'Pumba',
            text: 'Pumba',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/pumbahead.png',
            skin: {
                atc1: "#000000",
                atc2: "#brown",
                blbx: -60,
				blby: -150,
				bsc: .16,
				atx:  new Float32Array(9),
                aty: new Float32Array(9),
                atvx: new Float32Array(9),
                atvy: new Float32Array(9),
                atax: new Float32Array(9),
                atay: new Float32Array(9),
				scale: 0.36,
                rbcs: [ncolors+14,ncolors+14,ncolors+14,ncolors+14,ncolors+14,ncolors+14,ncolors+5]
            }
        }, {
            opt: 'pinksheep',
            text: 'Pink Sheep',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/pnkshp2.png',
            skin: {
                atc1: "transparent",
                atc2: "transparent",
				ppc: "transparent",
                ec: "transparent",
                blbx: -200,
				blby: -160,
				atba: true,
				antenna: true,
				abrot: true,
				bsc: 0.15,
				atx: new Float32Array(2),
                aty: new Float32Array(2),
                atvx: new Float32Array(2),
                atvy: new Float32Array(2),
                atax: new Float32Array(2),
                atay: new Float32Array(2),
                rbcs: [6,6,6,6,6,6,6,6,6,6,6,6,6,ncolors+5]
            }
        }, {
            opt: 'purplesheep',
            text: 'Purple Sheep',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/prpleshp.png',
            skin: {
                atc1: "transparent",
                atc2: "transparent",
				ppc: "transparent",
                ec: "transparent",
                blbx: -200,
				blby: -160,
				atba: true,
				antenna: true,
				abrot: true,
				bsc: 0.15,
				atx: new Float32Array(2),
                aty: new Float32Array(2),
                atvx: new Float32Array(2),
                atvy: new Float32Array(2),
                atax: new Float32Array(2),
                atay: new Float32Array(2),
                rbcs: [17,17,17,17,17,17,17,17,17,17,17,17,17,ncolors+5]
            }
        }, {
            opt: 'illu',
            text: 'Illuminati',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/illuhead.png',
            skin: {
				atc1: 'transparent',
				atc2: 'transparent',
				blbx: -5,
                bsc: .15,
				atx: new Float32Array(2),
                aty: new Float32Array(2),
                atvx: new Float32Array(2),
                atvy: new Float32Array(2),
                atax: new Float32Array(2),
                atay: new Float32Array(2),
                rbcs: [13,13,13,13,13,13,13,13,13,ncolors+5,25,ncolors+5]
            }
        }, {
            opt: 'itf',
            text: 'Hat Orange',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/tythead2.png',
            skin: {
                atc1: "transparent",
                atc2: "transparent",
                blbx: -20,
				blby: -101,
				atba: true,
				antenna: true,
				abrot: true,
				bsc: 0.25,
				er: 2,
				alpha: 1,
				scale: 0.28,
				atx: new Float32Array(2),
                aty: new Float32Array(2),
                atvx: new Float32Array(2),
                atvy: new Float32Array(2),
                atax: new Float32Array(2),
                atay: new Float32Array(2),
				ec: "#000000",
				eca: 1,
				ppc: 'transparent',
				swell: 0.04,
                rbcs: [9, 9, 9, 22, 22, 22]
            }
        }, {
            opt: 'nurse',
            text: 'Nurse',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/nursehead.png',
            skin: {
                atc1: "transparent",
                atc2: "transparent",
                blbx: -40,
				blby: -98,
				atba: true,
				antenna: true,
				abrot: true,
				bsc: 0.24,
				atx: new Float32Array(2),
                aty: new Float32Array(2),
                atvx: new Float32Array(2),
                atvy: new Float32Array(2),
                atax: new Float32Array(2),
                atay: new Float32Array(2),
                rbcs: [9,9,9,9,9,9,9,7,7]
            }
        }, {
            opt: 'police',
            text: 'Police',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/viking.png',
            skin: {
                atc1: "transparent",
                atc2: "transparent",
                blbx: -30,
				blby: -101,
				atba: true,
				antenna: true,
				abrot: true,
				bsc: 0.25,
				atx: new Float32Array(2),
                aty: new Float32Array(2),
                atvx: new Float32Array(2),
                atvy: new Float32Array(2),
                atax: new Float32Array(2),
                atay: new Float32Array(2),
                rbcs: [4,4,4,4,4,9,7,7,9]
            }
        }, {
            opt: 'police',
            text: 'Police',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/policmisin.png',
            skin: {
                atc1: "transparent",
                atc2: "transparent",
                blbx: -30,
				blby: -101,
				atba: true,
				antenna: true,
				abrot: true,
				bsc: 0.25,
				atx: new Float32Array(2),
                aty: new Float32Array(2),
                atvx: new Float32Array(2),
                atvy: new Float32Array(2),
                atax: new Float32Array(2),
                atay: new Float32Array(2),
                rbcs: [ncolors+16,ncolors+16,ncolors+16,ncolors+16,ncolors+16,ncolors+16,ncolors+16,7,7,7]
            }
        }, {
            opt: 'soldier',
            text: 'Soldier',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/solidmisin.png',
            skin: {
                atc1: "transparent",
                atc2: "transparent",
                blbx: -50,
				blby: -98,
				atba: true,
				antenna: true,
				abrot: true,
				bsc: 0.24,
				atx: new Float32Array(2),
                aty: new Float32Array(2),
                atvx: new Float32Array(2),
                atvy: new Float32Array(2),
                atax: new Float32Array(2),
                atay: new Float32Array(2),
                rbcs: [13,13,13,13,13,13,13,13,25,25,13,25,25]
            }
        },  {
            opt: 'rome',
            text: 'Rome Soldier',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/romemisin.png',
            skin: {
                atc1: "transparent",
                atc2: "transparent",
                blbx: -28,
				blby: -100,
				atba: true,
				antenna: true,
				abrot: true,
				bsc: 0.26,
				atx: new Float32Array(2),
                aty: new Float32Array(2),
                atvx: new Float32Array(2),
                atvy: new Float32Array(2),
                atax: new Float32Array(2),
                atay: new Float32Array(2),
                rbcs: [7,7,7,7,7,7,7,7,7,18,18,7,18,18]
            }
        }, {
            opt: 'rome2',
            text: 'Rome Shield',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/romeshield.png',
            skin: {
                atc1: "transparent",
                atc2: "transparent",
                blbx: 0,
				blby: -157,
				bsc: 0.18,
				atx: new Float32Array(2),
                aty: new Float32Array(2),
                atvx: new Float32Array(2),
                atvy: new Float32Array(2),
                atax: new Float32Array(2),
                atay: new Float32Array(2),
				eca: 1,
                rbcs: [18,18,7,7,7,7,7,7,18,18,9]
            }
        }, {
            opt: 'robber',
            text: 'Robber',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/robbermisin4.png',
            skin: {
                atc1: "transparent",
                atc2: "transparent",
				ppc: "transparent",
                ec: "transparent",
                blbx: -130,
				blby: -101,
				atba: true,
				antenna: true,
				abrot: true,
				bsc: 0.22,
				atx: new Float32Array(2),
                aty: new Float32Array(2),
                atvx: new Float32Array(2),
                atvy: new Float32Array(2),
                atax: new Float32Array(2),
                atay: new Float32Array(2),
                rbcs: [ncolors+5,ncolors+5,ncolors+5,ncolors+5,ncolors+5,ncolors+5,ncolors+5,ncolors+5,ncolors+5,11,9,11]
            }
        }, {
            opt: 'prt',
            text: 'Party',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/prtyhead.png',
            skin: {
                atc1: "transparent",
                atc2: "transparent",
                blbx: -20,
				blby: -101,
				atba: true,
				antenna: true,
				abrot: true,
				bsc: 0.21,
				alpha: 1,
				atx: new Float32Array(2),
                aty: new Float32Array(2),
                atvx: new Float32Array(2),
                atvy: new Float32Array(2),
                atax: new Float32Array(2),
                atay: new Float32Array(2),
				eca: 1,
                rbcs: [3,4,5,6,7,8,2,10]
            }
        }, {
            opt: 'butter',
            text: 'Butterfly',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/butterhead.png',
            skin: {
                atc1: "transparent",
                atc2: "transparent",
                blbx: -85,
				blby: -162,
				atba: true,
				antenna: true,
				abrot: true,
				bsc: 0.27,
				alpha: 1,
				atx: new Float32Array(2),
                aty: new Float32Array(2),
                atvx: new Float32Array(2),
                atvy: new Float32Array(2),
                atax: new Float32Array(2),
                atay: new Float32Array(2),
				eca: 1,
                rbcs: [14,14,14,15,16,16,16,11]
            }
        }, {
            opt: 'angel',
            text: 'Angel',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/angelhead2.png',
            skin: {
                atc1: "transparent",
                atc2: "transparent",
                blbx: -145,
				blby: -162,
				atba: true,
				antenna: true,
				abrot: true,
				bsc: 0.27,
				alpha: 1,
				atx: new Float32Array(2),
                aty: new Float32Array(2),
                atvx: new Float32Array(2),
                atvy: new Float32Array(2),
                atax: new Float32Array(2),
                atay: new Float32Array(2),
				eca: 1,
                rbcs: [9]
            }
        }, {
            opt: 'devil',
            text: 'Devil',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/devilheadz.png',
            skin: {
                ec: "transparent",
				ppc: "transparent",
                atc1: "transparent",
                atc2: "transparent",
				blbx: -200,
                bsc: 0.16,
				atx: new Float32Array(2),
                aty: new Float32Array(2),
                atvx: new Float32Array(2),
                atvy: new Float32Array(2),
                atax: new Float32Array(2),
                atay: new Float32Array(2),
                rbcs: [11,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7]
            }
        }, {
            opt: 'fnaf',
            text: 'FNAF',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/fnafz.png',
            skin: {
                ec: "#fff",
				ppc: "#000",
                atc1: "#000",
                atc2: "#000",
				blbx: -30,
                bsc: 0.16,
				atx: new Float32Array(15),
                aty: new Float32Array(15),
                atvx: new Float32Array(15),
                atvy: new Float32Array(15),
                atax: new Float32Array(15),
                atay: new Float32Array(15),
                rbcs: [ncolors+5,ncolors+6,ncolors+6,ncolors+6]
            }
        }, {
            opt: 'kng',
            text: 'King',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/kngheads.png',
            skin: {
                atc1: "transparent",
                atc2: "transparent",
                blbx: -20,
				blby: -171,
				atba: true,
				antenna: true,
				abrot: true,
				blbh: 540,
				blbw: 430,
				alpha: 1,
				atx: new Float32Array(2),
                aty: new Float32Array(2),
                atvx: new Float32Array(2),
                atvy: new Float32Array(2),
                atax: new Float32Array(2),
                atay: new Float32Array(2),
				eca: 1,
                rbcs: [5,5,5,5,5,5,5,11]
            }
        }, {
            opt: 'ninja',
            text: 'Ninja 1',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/ninjasowr.png',
            skin: {
                atc1: "transparent",
                atc2: "#fff",
				ec: "#222",
				ppc: "#555",
				atx: new Float32Array(2),
                aty: new Float32Array(2),
                atvx: new Float32Array(2),
                atvy: new Float32Array(2),
                atax: new Float32Array(2),
                atay: new Float32Array(2),
				blbx: -105,
                bsc: .20,
                rbcs: [11]
            }
        }, {
            opt: 'ninja2',
            text: 'Ninja 2',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/ninjabullr.png',
            skin: {
                atc1: "#000",
                atc2: "#a551ff",
				atx: new Float32Array(15),
                aty: new Float32Array(15),
                atvx: new Float32Array(15),
                atvy: new Float32Array(15),
                atax: new Float32Array(15),
                atay: new Float32Array(15),
				blbx: -105,
                bsc: .18,
                rbcs: [11,11,11,17]
            }
        }, {
            opt: 'tramp',
            text: 'Trump',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/tramphead1.png',
            skin: {
                atc1: "transparent",
                atc2: "transparent",
                blbx: -210,
				blby: -165,
				atba: true,
				antenna: true,
				abrot: true,
				bsc: 0.15,
				alpha: 1,
				atx: new Float32Array(2),
                aty: new Float32Array(2),
                atvx: new Float32Array(2),
                atvy: new Float32Array(2),
                atax: new Float32Array(2),
                atay: new Float32Array(2),
				eca: 0,
				ppc: 'transparent',
                rbcs: [5]
            }
        }, {
            opt: 'obama',
            text: 'Obama',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/obamahead1.png',
            skin: {
                atc1: "transparent",
                atc2: "transparent",
                blbx: -220,
				blby: -165,
				atba: true,
				antenna: true,
				abrot: true,
				bsc: 0.15,
				alpha: 1,
				atx: new Float32Array(2),
                aty: new Float32Array(2),
                atvx: new Float32Array(2),
                atvy: new Float32Array(2),
                atax: new Float32Array(2),
                atay: new Float32Array(2),
				eca: 0,
				ppc: 'transparent',
                rbcs: [ncolors+7]
            }
        }, {
            opt: 'putin',
            text: 'Putin',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/putinhead.png',
            skin: {
                atc1: "transparent",
                atc2: "transparent",
                blbx: -220,
				blby: -165,
				atba: true,
				antenna: true,
				abrot: true,
				bsc: 0.15,
				alpha: 1,
				atx: new Float32Array(2),
                aty: new Float32Array(2),
                atvx: new Float32Array(2),
                atvy: new Float32Array(2),
                atax: new Float32Array(2),
                atay: new Float32Array(2),
				eca: 0,
				ppc: 'transparent',
                rbcs: [ncolors+8]
            }
        }, {
            opt: 'sonc',
            text: 'Sonic',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/sonicheadz.png',
            skin: {
                atc1: "transparent",
                atc2: "transparent",
                blbx: -230,
				blby: -160,
				atba: true,
				antenna: true,
				abrot: true,
				bsc: 0.17,
				alpha: 1,
				atx: new Float32Array(2),
                aty: new Float32Array(2),
                atvx: new Float32Array(2),
                atvy: new Float32Array(2),
                atax: new Float32Array(2),
                atay: new Float32Array(2),
				eca: 0,
				ppc: 'transparent',
                rbcs: [16,16,16,16,16,16,16,16,16,16,18,18]
            }
        }, {
            opt: 'smu',
            text: 'Smurf',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/smurfheadz.png',
            skin: {
                atc1: "transparent",
                atc2: "transparent",
                blbx: -250,
				blby: -145,
				atba: true,
				antenna: true,
				abrot: true,
				bsc: 0.17,
				alpha: 1,
				atx: new Float32Array(2),
                aty: new Float32Array(2),
                atvx: new Float32Array(2),
                atvy: new Float32Array(2),
                atax: new Float32Array(2),
                atay: new Float32Array(2),
				eca: 0,
				ppc: 'transparent',
                rbcs: [ncolors+3,ncolors+3,ncolors+3,ncolors+3,ncolors+3,ncolors+3,ncolors+3,ncolors+3,ncolors+3,ncolors+3,ncolors+3,ncolors+3,ncolors+3,7,7,9,9,7,7]
            }
        }, {
            opt: 'gar',
            text: 'Garfield',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/garfield.png',
            skin: {
                atc1: "transparent",
                atc2: "transparent",
                blbx: -250,
				blby: -149,
				atba: true,
				antenna: true,
				abrot: true,
				bsc: 0.17,
				alpha: 1,
				atx: new Float32Array(2),
                aty: new Float32Array(2),
                atvx: new Float32Array(2),
                atvy: new Float32Array(2),
                atax: new Float32Array(2),
                atay: new Float32Array(2),
				eca: 0,
				ppc: 'transparent',
                rbcs: [12]
            }
        }, {
            opt: 'pink',
            text: 'Pink Panther',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/pinkpanth6.png',
            skin: {
                atc1: "transparent",
                atc2: "transparent",
                blbx: -230,
				blby: -155,
				atba: true,
				antenna: true,
				abrot: true,
				bsc: 0.17,
				alpha: 1,
				atx: new Float32Array(2),
                aty: new Float32Array(2),
                atvx: new Float32Array(2),
                atvy: new Float32Array(2),
                atax: new Float32Array(2),
                atay: new Float32Array(2),
				eca: 0,
				ppc: 'transparent',
                rbcs: [6]
            }
        }, {
            opt: 'mari',
            text: 'Mario',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/marihead.png',
            skin: {
                atc1: "transparent",
                atc2: "transparent",
                blbx: -230,
				blby: -150,
				atba: true,
				antenna: true,
				abrot: true,
				bsc: 0.17,
				alpha: 1,
				atx: new Float32Array(2),
                aty: new Float32Array(2),
                atvx: new Float32Array(2),
                atvy: new Float32Array(2),
                atax: new Float32Array(2),
                atay: new Float32Array(2),
				eca: 0,
				ppc: 'transparent',
                rbcs: [7,7,7,7,7,7,7,7,16,16,16]
            }
        }, {
            opt: 'angr',
            text: 'Angry Bird',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/angrhead.png',
            skin: {
                atc1: "transparent",
                atc2: "transparent",
                blbx: -230,
				blby: -150,
				atba: true,
				antenna: true,
				abrot: true,
				bsc: 0.16,
				alpha: 1,
				atx: new Float32Array(2),
                aty: new Float32Array(2),
                atvx: new Float32Array(2),
                atvy: new Float32Array(2),
                atax: new Float32Array(2),
                atay: new Float32Array(2),
				eca: 0,
				ppc: 'transparent',
                rbcs: [7]
            }
        }, {
            opt: 'pacman',
            text: 'Pacman',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/pacmanheadz.png',
            skin: {
                atc1: "transparent",
                atc2: "transparent",
                blbx: -295,
				blby: -160,
				atba: true,
				antenna: true,
				abrot: true,
				bsc: 0.15,
				alpha: 1,
				atx: new Float32Array(2),
                aty: new Float32Array(2),
                atvx: new Float32Array(2),
                atvy: new Float32Array(2),
                atax: new Float32Array(2),
                atay: new Float32Array(2),
				eca: 0,
				ppc: 'transparent',
                rbcs: [ncolors+13]
            }
        }, {
            opt: 'nyancat',
            text: 'Nyan Cat',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/nyancatheadz.png',
            skin: {
                atc1: "transparent",
                atc2: "transparent",
                blbx: -200,
				blby: -105,
				atba: true,
				antenna: true,
				abrot: true,
				bsc: 0.24,
				alpha: 1,
				atx: new Float32Array(2),
                aty: new Float32Array(2),
                atvx: new Float32Array(2),
                atvy: new Float32Array(2),
                atax: new Float32Array(2),
                atay: new Float32Array(2),
				eca: 0,
				ppc: 'transparent',
                rbcs: [7,5,18,13,16,17]
            }
        }, {
            opt: 'turtles',
            text: 'Turtle',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/turtleshell.png',
            skin: {
                atc1: "transparent",
                atc2: "transparent",
                blbx: -35,
				blby: -157,
				bsc: 0.18,
				atx: new Float32Array(2),
                aty: new Float32Array(2),
                atvx: new Float32Array(2),
                atvy: new Float32Array(2),
                atax: new Float32Array(2),
                atay: new Float32Array(2),
				eca: 1,
                rbcs: [25,ncolors-1,25,25,25]
            }
        }, {
            opt: 'spr',
            text: 'Cape',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/pelerines.png',
            skin: {
                atc1: "transparent",
                atc2: "transparent",
				ppc: "#ff0000",
                blbx: 0,
				blby: -246,
				atba: true,
				antenna: true,
				abrot: true,
				blbh: 790,
				blbw: 710,
				alpha: 1,
				atx: new Float32Array(2),
                aty: new Float32Array(2),
                atvx: new Float32Array(2),
                atvy: new Float32Array(2),
                atax: new Float32Array(2),
                atay: new Float32Array(2),
				eca: 1,
                rbcs: [7,7,7,7,11]
            }
        }, {
            opt: 'ame',
            text: 'Captain America',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/amerishield.png',
            skin: {
                atc1: "transparent",
                atc2: "transparent",
                blbx: 0,
				blby: -157,
				bsc: 0.18,
				atx: new Float32Array(2),
                aty: new Float32Array(2),
                atvx: new Float32Array(2),
                atvy: new Float32Array(2),
                atax: new Float32Array(2),
                atay: new Float32Array(2),
				eca: 1,
                rbcs: [16, 16, 16, 16, 7, 7, 7, 9, 9, 10, 10, 10, 9, 9, 7, 7, 7]
            }
        }, {
            opt: 'spilog',
            text: 'Spiderman 2',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/spilogged.png',
            skin: {
				ec: "transparent",
				ppc: "transparent",
                atc1: "transparent",
                atc2: "transparent",
				blbx: -250,
                bsc: 0.15,
				atx: new Float32Array(2),
                aty: new Float32Array(2),
                atvx: new Float32Array(2),
                atvy: new Float32Array(2),
                atax: new Float32Array(2),
                atay: new Float32Array(2),
                rbcs: [7,7,7,7,7,7,7,7,7,11,11,11,11]
            }
        },	{
            opt: 'irolog',
            text: 'Ironman',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/irologs.png',
            skin: {
				ec: "transparent",
				ppc: "transparent",
                atc1: "transparent",
                atc2: "transparent",
				blbx: -250,
                bsc: 0.15,
				atx: new Float32Array(2),
                aty: new Float32Array(2),
                atvx: new Float32Array(2),
                atvy: new Float32Array(2),
                atax: new Float32Array(2),
                atay: new Float32Array(2),
                rbcs: [12, 7, 7, 7, 7, 9, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7]
            }
        }, {
            opt: 'hulklog',
            text: 'Hulk',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/hulklogsz.png',
            skin: {
				ec: "transparent",
				ppc: "transparent",
                atc1: "transparent",
                atc2: "transparent",
				blbx: -250,
                bsc: 0.15,
				atx: new Float32Array(2),
                aty: new Float32Array(2),
                atvx: new Float32Array(2),
                atvy: new Float32Array(2),
                atax: new Float32Array(2),
                atay: new Float32Array(2),
                rbcs: [3]
            }
        }, {
            opt: 'thor',
            text: 'Thor',
			bulb: 'http://wormax.org/chrome3kafa/thorcekic.png',
            initial: true,
            skin: {
				atc1: "#000",
                atc2: "#888",
				blbh: 300,
				blbw: 340,
				bsc: 0.18,
				blby: -149,
				blbx: -153,
				atx: new Float32Array(9),
                aty: new Float32Array(9),
                atvx: new Float32Array(9),
                atvy: new Float32Array(9),
                atax: new Float32Array(9),
                atay: new Float32Array(9),
                rbcs: [9,11,9,9,9,9,9,9,9,9,9,9,11]
            }
        }, {
            opt: 'spiyt',
            text: 'Spiderman 1',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/spidyt.png',
            skin: {
                atc1: "transparent",
                atc2: "#dbdbdb",
				blbx: -15,
				blby: -154,
                bsc: .15,
                rbcs: [7,7,7,7,7,7,7,16,16,16,16,16,16,16]
            }
        }, {
            opt: 'harleyq',
            text: 'Harley Quinn',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/harleyquinn.png',
            skin: {
                atc1: "transparent",
                atc2: "#dbdbdb",
				blbx: -5,
				blby: -93,
                bsc: .25,
                rbcs: [23,23,7,7,9]
            }
        }, {
            opt: 'jokeryt',
            text: 'Joker',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/jokerhead.png',
            skin: {
                atc1: "transparent",
                atc2: "#dbdbdb",
				blbx: -15,
				blby: -154,
                bsc: .15,
                rbcs: [17,13,ncolors-1]
            }
        }, {
            opt: 'ninjat',
            text: 'Ninja Turtles',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/ninjat.png',
            skin: {
                atc1: "#000000",
                atc2: "#000000",
                blbx: -5,
				blby: -98,
				atba: true,
				antenna: true,
				abrot: true,
				bsc: 0.35,
				atx: new Float32Array(8),
                aty: new Float32Array(8),
                atvx: new Float32Array(8),
                atvy: new Float32Array(8),
                atax: new Float32Array(8),
                atay: new Float32Array(8),
                rbcs: [ncolors-1]
            }
        }, {
            opt: 'batmanlog',
            text: 'Batman Logo',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/batmanlogz.png',
            skin: {
				ec: "#333333",
				ppc: "#ffffff",
                atc1: "#000000",
                atc2: "#000000",
				blbx: -20,
                bsc: 0.15,
				atx: new Float32Array(10),
                aty: new Float32Array(10),
                atvx: new Float32Array(10),
                atvy: new Float32Array(10),
                atax: new Float32Array(10),
                atay: new Float32Array(10),
                rbcs: [11,11,11,11,18]
            }
        }, {
            opt: 'superlog',
            text: 'Super Logo',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/superlog.png',
            skin: {
				ec: "#ff0000",
				ppc: "#000000",
                atc1: "#000000",
                atc2: "#000000",
				blbx: 0,
                bsc: 0.15,
				smell: 0.01,
				atx: new Float32Array(10),
                aty: new Float32Array(10),
                atvx: new Float32Array(10),
                atvy: new Float32Array(10),
                atax: new Float32Array(10),
                atay: new Float32Array(10),
                rbcs: [11,11,11,11,7]
            }
        }, {
            opt: 'flasglog',
            text: 'Flash Logo',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/flashlog.png',
            skin: {
				ec: "#fff",
				ppc: "#000000",
                atc1: "#000000",
                atc2: "#000000",
				blbx: 0,
                bsc: 0.15,
				smell: 0.01,
				atx: new Float32Array(10),
                aty: new Float32Array(10),
                atvx: new Float32Array(10),
                atvy: new Float32Array(10),
                atax: new Float32Array(10),
                atay: new Float32Array(10),
                rbcs: [7,7,7,7,7,18,18,9]
            }
        }, {
            opt: 'alien',
            text: 'Alien',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/alien.png',
            skin: {
				ec: "transparent",
				ppc: "transparent",
                atc1: "transparent",
                atc2: "transparent",
				blbx: -225,
				blby: -160,
                bsc: 0.14,
				atx: new Float32Array(2),
                aty: new Float32Array(2),
                atvx: new Float32Array(2),
                atvy: new Float32Array(2),
                atax: new Float32Array(2),
                atay: new Float32Array(2),
                rbcs: [9,9,9,9,9,9,9,9,ncolors+21]
            }
        }, {
            opt: 'hallowen',
            text: 'Hallowen Head',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/halhead.png',
            skin: {
				ec: "transparent",
				ppc: "transparent",
                atc1: "transparent",
                atc2: "transparent",
				blbx: -225,
				blby: -160,
                bsc: 0.15,
				atx: new Float32Array(2),
                aty: new Float32Array(2),
                atvx: new Float32Array(2),
                atvy: new Float32Array(2),
                atax: new Float32Array(2),
                atay: new Float32Array(2),
                rbcs: [ncolors+22,ncolors+22,ncolors+22,ncolors+22,ncolors+22,ncolors+22,ncolors+17]
            }
        }, {
            opt: 'pengu',
            text: 'Penguin',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/pengus.png',
            skin: {
				ec: "transparent",
				ppc: "transparent",
                atc1: "transparent",
                atc2: "transparent",
				blbx: -225,
				blby: -160,
                bsc: 0.14,
				atx: new Float32Array(2),
                aty: new Float32Array(2),
                atvx: new Float32Array(2),
                atvy: new Float32Array(2),
                atax: new Float32Array(2),
                atay: new Float32Array(2),
                rbcs: [ncolors+5]
            }
        }, {
            opt: 'deadpool',
            text: 'Deadpool',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/dphead.png',
            skin: {
				ec: "transparent",
				ppc: "transparent",
                atc1: "transparent",
                atc2: "transparent",
				blbx: -225,
				blby: -160,
                bsc: 0.16,
				atx: new Float32Array(2),
                aty: new Float32Array(2),
                atvx: new Float32Array(2),
                atvy: new Float32Array(2),
                atax: new Float32Array(2),
                atay: new Float32Array(2),
                rbcs: [7,7,7,7,7,7,7,11,11,7,7,11,11]
            }
        }, {
            opt: 'wolverine',
            text: 'X-MEN',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/wolverhead.png',
            skin: {
				ec: "transparent",
				ppc: "transparent",
                atc1: "transparent",
                atc2: "transparent",
				blbx: -315,
				blby: -156,
                bsc: 0.24,
				atx: new Float32Array(2),
                aty: new Float32Array(2),
                atvx: new Float32Array(2),
                atvy: new Float32Array(2),
                atax: new Float32Array(2),
                atay: new Float32Array(2),
                rbcs: [11,11,11,11,11,ncolors+8,9,ncolors+7]
            }
        }, {
            opt: 'thug',
            text: 'Thug Life',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/thuglifes.png',
            skin: {
				ec: "transparent",
				ppc: "transparent",
                atc1: "transparent",
                atc2: "transparent",
				blbx: -260,
                bsc: 0.15,
				atx: new Float32Array(2),
                aty: new Float32Array(2),
                atvx: new Float32Array(2),
                atvy: new Float32Array(2),
                atax: new Float32Array(2),
                atay: new Float32Array(2),
                rbcs: [12,11,11,11,11,11,11,11,11,11]
            }
        }, {
            opt: 'troll',
            text: 'Troll Face',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/trollhead.png',
            skin: {
				ec: "transparent",
				ppc: "transparent",
                atc1: "transparent",
                atc2: "transparent",
				blbx: -210,
                bsc: 0.16,
				atx: new Float32Array(2),
                aty: new Float32Array(2),
                atvx: new Float32Array(2),
                atvy: new Float32Array(2),
                atax: new Float32Array(2),
                atay: new Float32Array(2),
                rbcs: [9]
            }
        }, {
            opt: 'minc',
            text: 'Steve',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/mincrafthead.png',
            skin: {
				ec: "transparent",
				ppc: "transparent",
                atc1: "transparent",
                atc2: "transparent",
				blbx: -205,
                bsc: 0.13,
				atx: new Float32Array(2),
                aty: new Float32Array(2),
                atvx: new Float32Array(2),
                atvy: new Float32Array(2),
                atax: new Float32Array(2),
                atay: new Float32Array(2),
                rbcs: [11,5,5,5,5,5,5,5,5,11]
            }
        }, {
            opt: 'cre',
            text: 'Creeper',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/crehead.png',
            skin: {
				ec: "transparent",
				ppc: "transparent",
                atc1: "transparent",
                atc2: "transparent",
				blbx: -205,
                bsc: 0.13,
				atx: new Float32Array(2),
                aty: new Float32Array(2),
                atvx: new Float32Array(2),
                atvy: new Float32Array(2),
                atax: new Float32Array(2),
                atay: new Float32Array(2),
                rbcs: [3]
            }
        }, {
            opt: 'Black',
            text: 'Black Fire',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/blackfireheadz.png',
            skin: {
                atc1: "transparent",
                atc2: "transparent",
				blby: 30,
				bsc: 0.7,
				atx: new Float32Array(2),
                aty: new Float32Array(2),
                atvx: new Float32Array(2),
                atvy: new Float32Array(2),
                atax: new Float32Array(2),
                atay: new Float32Array(2),
                rbcs: [ncolors+5,ncolors+5,ncolors+5,ncolors+5,7]
            }
        }, {
            opt: 'clown',
            text: 'Clown',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/clawnhead.png',
            skin: {
                atc1: "transparent",
                atc2: "transparent",
				ppc: "transparent",
                ec: "transparent",
                blbx: -175,
				blby: -101,
				atba: true,
				antenna: true,
				abrot: true,
				bsc: 0.26,
				atx: new Float32Array(2),
                aty: new Float32Array(2),
                atvx: new Float32Array(2),
                atvy: new Float32Array(2),
                atax: new Float32Array(2),
                atay: new Float32Array(2),
                rbcs: [3,3,3,3,3,7,7,7,7,7,9,9,9,9,9,18,18,18,18,18]
            }
        }, {
            opt: 'vandetta',
            text: 'Vendetta',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/vandettahead.png',
            skin: {
				ec: "transparent",
				ppc: "transparent",
                atc1: "transparent",
                atc2: "transparent",
				blbx: -225,
				blby: -160,
                bsc: 0.15,
				atx: new Float32Array(2),
                aty: new Float32Array(2),
                atvx: new Float32Array(2),
                atvy: new Float32Array(2),
                atax: new Float32Array(2),
                atay: new Float32Array(2),
                rbcs: [9,11,11,11,11,11,11,11,11,11,11,11,11,9,9,6,9]
            }
        }, {
            opt: 'testere',
            text: 'Saw',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/testerehead.png',
            skin: {
				ec: "transparent",
				ppc: "transparent",
                atc1: "transparent",
                atc2: "transparent",
				blbx: -225,
				blby: -160,
                bsc: 0.15,
				atx: new Float32Array(2),
                aty: new Float32Array(2),
                atvx: new Float32Array(2),
                atvy: new Float32Array(2),
                atax: new Float32Array(2),
                atay: new Float32Array(2),
                rbcs: [ncolors+5,11,11,11,11,11,11,11,11,11,11,11,11,ncolors+5,7]
            }
        }, {
            opt: 'ciglik',
            text: 'Scream',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/screamhead.png',
            skin: {
				ec: "transparent",
				ppc: "transparent",
                atc1: "transparent",
                atc2: "transparent",
				blbx: -245,
				blby: -160,
                bsc: 0.15,
				atx: new Float32Array(2),
                aty: new Float32Array(2),
                atvx: new Float32Array(2),
                atvy: new Float32Array(2),
                atax: new Float32Array(2),
                atay: new Float32Array(2),
                rbcs: [ncolors+5,11,11,11,11,11,11,11,11,11,11,11,11,ncolors+5,9,11,9]
            }
        }, {
            opt: 'chaki',
            text: 'Chaki',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/chackie.png',
            skin: {
				ec: "transparent",
				ppc: "transparent",
                atc1: "transparent",
                atc2: "transparent",
				blbx: -225,
				blby: -150,
                bsc: 0.16,
				atx: new Float32Array(2),
                aty: new Float32Array(2),
                atvx: new Float32Array(2),
                atvy: new Float32Array(2),
                atax: new Float32Array(2),
                atay: new Float32Array(2),
                rbcs: [5,5,5,5,5,5,5,5,5,5,5,5,5,7,7,ncolors+5,7,7]
            }
        }, {
            opt: 'sonn',
            text: 'Sonic 2',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/sonic4.png',
            skin: {
                atc1: "transparent",
                atc2: "transparent",
                blbx: -240,
				blby: -164,
				atba: true,
				antenna: true,
				abrot: true,
				bsc: 0.16,
				alpha: 1,
				atx: new Float32Array(2),
                aty: new Float32Array(2),
                atvx: new Float32Array(2),
                atvy: new Float32Array(2),
                atax: new Float32Array(2),
                atay: new Float32Array(2),
				eca: 0,
				ppc: 'transparent',
                rbcs: [14,14,14,14,14,14,14,14,14,14,14,14,ncolors+5,18,18,ncolors+5]
            }
        }, {
            opt: 'taz',
            text: 'Tazmania',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/tazhead.png',
            skin: {
				ec: "transparent",
				ppc: "transparent",
                atc1: "transparent",
                atc2: "transparent",
				blbx: -225,
				blby: -158,
                bsc: 0.15,
				atx: new Float32Array(2),
                aty: new Float32Array(2),
                atvx: new Float32Array(2),
                atvy: new Float32Array(2),
                atax: new Float32Array(2),
                atay: new Float32Array(2),
                rbcs: [ncolors+7]
            }
        }, {
            opt: 'mike',
            text: 'Mike',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/mikeface.png',
            skin: {
                atc1: "transparent",
                atc2: "transparent",
                blbx: -220,
				blby: -160,
				atba: true,
				antenna: true,
				abrot: true,
				bsc: 0.17,
				alpha: 1,
				atx: new Float32Array(2),
                aty: new Float32Array(2),
                atvx: new Float32Array(2),
                atvy: new Float32Array(2),
                atax: new Float32Array(2),
                atay: new Float32Array(2),
				eca: 0,
				ppc: 'transparent',
                rbcs: [ncolors+20]
            }
        }, {
            opt: 'sulley',
            text: 'Sulley',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/sulleyface.png',
            skin: {
                atc1: "transparent",
                atc2: "transparent",
                blbx: -200,
				blby: -162,
				atba: true,
				antenna: true,
				abrot: true,
				bsc: 0.18,
				alpha: 1,
				atx: new Float32Array(2),
                aty: new Float32Array(2),
                atvx: new Float32Array(2),
                atvy: new Float32Array(2),
                atax: new Float32Array(2),
                atay: new Float32Array(2),
				eca: 0,
				ppc: 'transparent',
                rbcs: [ncolors+19]
            }
        }, {
            opt: 'minion',
            text: 'Minion',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/minionheada.png',
            skin: {
				ec: "transparent",
				ppc: "transparent",
                atc1: "transparent",
                atc2: "transparent",
				blbx: -225,
				blby: -155,
                bsc: 0.15,
				atx: new Float32Array(2),
                aty: new Float32Array(2),
                atvx: new Float32Array(2),
                atvy: new Float32Array(2),
                atax: new Float32Array(2),
                atay: new Float32Array(2),
                rbcs: [18,18,18,18,18,18,18,18,18,18,18,ncolors+5,ncolors+5]
            }
        }, {
            opt: 'frank',
            text: 'Frankenstein',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/frankensteinhead.png',
            skin: {
				ec: "transparent",
				ppc: "transparent",
                atc1: "transparent",
                atc2: "transparent",
				blbx: -225,
				blby: -187,
                bsc: 0.15,
				blbw: 370,
				blbh: 380,
				atx: new Float32Array(2),
                aty: new Float32Array(2),
                atvx: new Float32Array(2),
                atvy: new Float32Array(2),
                atax: new Float32Array(2),
                atay: new Float32Array(2),
                rbcs: [ncolors+18,ncolors+18,ncolors+18,ncolors+18,ncolors+18,ncolors+18,ncolors+18,ncolors+18,ncolors+18,ncolors+18,ncolors+18,ncolors+18,ncolors+5,ncolors+18,ncolors+5]
            }
        }, {
            opt: 'clashr',
            text: 'Clash Royale 1',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/clashroy1.png',
            skin: {
				ec: "transparent",
				ppc: "transparent",
                atc1: "transparent",
                atc2: "transparent",
				blbx: -175,
                bsc: 0.17,
				atx: new Float32Array(2),
                aty: new Float32Array(2),
                atvx: new Float32Array(2),
                atvy: new Float32Array(2),
                atax: new Float32Array(2),
                atay: new Float32Array(2),
                rbcs: [5]
            }
        }, {
            opt: 'clashr',
            text: 'Clash Royale 2',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/clashroy2.png',
            skin: {
				ec: "transparent",
				ppc: "transparent",
                atc1: "transparent",
                atc2: "transparent",
				blbx: -175,
                bsc: 0.17,
				atx: new Float32Array(2),
                aty: new Float32Array(2),
                atvx: new Float32Array(2),
                atvy: new Float32Array(2),
                atax: new Float32Array(2),
                atay: new Float32Array(2),
                rbcs: [22]
            }
        }, {
            opt: 'dog',
            text: 'Doge',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/dogehead.png',
            skin: {
				ec: "transparent",
				ppc: "transparent",
                atc1: "transparent",
                atc2: "transparent",
				blbx: -180,
				blby: -150,
                bsc: 0.16,
				atx: new Float32Array(2),
                aty: new Float32Array(2),
                atvx: new Float32Array(2),
                atvy: new Float32Array(2),
                atax: new Float32Array(2),
                atay: new Float32Array(2),
                rbcs: [12]
            }
        }, {
            opt: 'poo',
            text: 'Poo',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/poohead1.png',
            skin: {
                ec: "transparent",
				ppc: "transparent",
                atc1: "transparent",
                atc2: "transparent",
				blbx: -174,
                bsc: 0.18,
				atx: new Float32Array(2),
                aty: new Float32Array(2),
                atvx: new Float32Array(2),
                atvy: new Float32Array(2),
                atax: new Float32Array(2),
                atay: new Float32Array(2),
                rbcs: [ncolors+7]
            }
        }, {
            opt: 'ghost2',
            text: 'Ghost',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/ghosthead2.png',
            skin: {
				ec: "transparent",
				ppc: "transparent",
                atc1: "transparent",
                atc2: "transparent",
				blbx: -210,
				blby: -160,
                bsc: 0.18,
				atx: new Float32Array(2),
                aty: new Float32Array(2),
                atvx: new Float32Array(2),
                atvy: new Float32Array(2),
                atax: new Float32Array(2),
                atay: new Float32Array(2),
                rbcs: [9]
            }
        }, {
            opt: 'simson',
            text: 'Simsons',
			bulb: 'http://wormax.org/chrome3kafa/simsonhead.png',
            initial: true,
            skin: {
                atc1: "#000",
                atc2: "#ffff56",
				ppc: "#000",
				ec: "#fff",
				swell: 0.03,
				er: 8.5,
				bsc: 0.17,
				blby: -125,
				blbx: -30,
				atx: new Float32Array(11),
                aty: new Float32Array(11),
                atvx: new Float32Array(11),
                atvy: new Float32Array(11),
                atax: new Float32Array(11),
                atay: new Float32Array(11),
                rbcs: [18]
            }
        }, {
            opt: 'south',
            text: 'South Park',
			bulb: 'http://wormax.org/chrome3kafa/southpark.png',
            initial: true,
            skin: {
                atc1: "#000",
                atc2: "orange",
				ppc: "#000",
				ec: "#fff",
				bsc: 0.16,
				blby: -155,
				blbx: -10,
				atx: new Float32Array(11),
                aty: new Float32Array(11),
                atvx: new Float32Array(11),
                atvy: new Float32Array(11),
                atax: new Float32Array(11),
                atay: new Float32Array(11),
                rbcs: [5]
            }
        }, {
            opt: 'poke',
            text: 'Pokeball',
			bulb: 'http://wormax.org/chrome3kafa/pokeballhead.png',
            initial: true,
            skin: {
                atc1: "#000",
                atc2: "#ff0000",
				ppc: "#000",
				ec: "#fff",
				bsc: 0.16,
				blby: -155,
				blbx: -30,
				atx: new Float32Array(11),
                aty: new Float32Array(11),
                atvx: new Float32Array(11),
                atvy: new Float32Array(11),
                atax: new Float32Array(11),
                atay: new Float32Array(11),
                rbcs: [7,7,7,7,7,11,11,9,9,9,9,9,11,11]
            }
        }, {
            opt: 'pika',
            text: 'Pikachu',
			bulb: 'http://wormax.org/chrome3kafa/pikahead.png',
            initial: true,
            skin: {
                atc1: "#000",
                atc2: "#ffff00",
				ppc: "#000",
				ec: "#fff",
				bsc: 0.16,
				blby: -155,
				blbx: -30,
				atx: new Float32Array(11),
                aty: new Float32Array(11),
                atvx: new Float32Array(11),
                atvy: new Float32Array(11),
                atax: new Float32Array(11),
                atay: new Float32Array(11),
                rbcs: [18,18,18,18,18,18,18,11]
            }
        }, {
            opt: 'spongebob',
            text: 'Spongebob',
			bulb: 'http://wormax.org/chrome3kafa/spongehead.png',
            initial: true,
            skin: {
                atc1: "#000",
                atc2: "#ffff00",
				blbh: 420,
				blbw: 350,
				blby: -200,
				blbx: -90,
				atx: new Float32Array(13),
                aty: new Float32Array(13),
                atvx: new Float32Array(13),
                atvy: new Float32Array(13),
                atax: new Float32Array(13),
                atay: new Float32Array(13),
                rbcs: [18,18,18,18,18, ncolors+15,ncolors+15]
            }
        }, {
            opt: 'earth',
            text: 'Earth',
			bulb: 'http://wormax.org/chrome3kafa/earthhead.png',
            initial: true,
            skin: {
                atc1: "#0653aa",
                atc2: "#08a6e0",
				bsc: 0.16,
				blby: -175,
				blbx: -30,
				atx: new Float32Array(9),
                aty: new Float32Array(9),
                atvx: new Float32Array(9),
                atvy: new Float32Array(9),
                atax: new Float32Array(9),
                atay: new Float32Array(9),
                rbcs: [19,ncolors-3,19,19,19]
            }
        }, {
            opt: 'taco',
            text: 'Taco',
			bulb: 'http://wormax.org/chrome3kafa/tacohead.png',
            initial: true,
            skin: {
                atc1: "transparent",
                atc2: "#ca7f4c",
				blbh: 270,
				blbw: 310,
				bsc: 0.18,
				blby: -135,
				blbx: -30,
				atx: new Float32Array(9),
                aty: new Float32Array(9),
                atvx: new Float32Array(9),
                atvy: new Float32Array(9),
                atax: new Float32Array(9),
                atay: new Float32Array(9),
                rbcs: [5]
            }
        }, {
            opt: 'swomin',
            text: 'Sword',
			bulb: 'http://wormax.org/chrome3kafa/swomin.png',
            initial: true,
            skin: {
				atc1: "#000",
                atc2: "cyan",
				blbh: 290,
				blbw: 330,
				blby: -107,
				blbx: -80,
				atx: new Float32Array(9),
                aty: new Float32Array(9),
                atvx: new Float32Array(9),
                atvy: new Float32Array(9),
                atax: new Float32Array(9),
                atay: new Float32Array(9),
                rbcs: [14,10,10,23,9]
            }
        }, {
            opt: 'minmin',
            text: 'Digger',
			bulb: 'http://wormax.org/chrome3kafa/minmin.png',
            initial: true,
            skin: {
                atc1: "#000",
                atc2: "dodgerblue",
				blbh: 290,
				blbw: 330,
				blby: -143,
				blbx: -127,
				atx: new Float32Array(11),
                aty: new Float32Array(11),
                atvx: new Float32Array(11),
                atvy: new Float32Array(11),
                atax: new Float32Array(11),
                atay: new Float32Array(11),
                rbcs: [ncolors+3,19,9,ncolors+3]
            }
        }, {
            opt: 'minseed',
            text: 'Diamond',
			bulb: 'http://wormax.org/chrome3kafa/minseed.png',
            initial: true,
            skin: {
                atc1: "#000",
                atc2: "dodgerblue",
				blbh: 280,
				blbw: 280,
				blby: -143,
				blbx: -25,
				atx: new Float32Array(14),
                aty: new Float32Array(14),
                atvx: new Float32Array(14),
                atvy: new Float32Array(14),
                atax: new Float32Array(14),
                atay: new Float32Array(14),
                rbcs: [ncolors+3,ncolors+3,ncolors+3,10,20,10]
            }
        }, {
            opt: 'lck',
            text: 'Lucky Box',
			bulb: 'http://wormax.org/chrome3kafa/luckbox.png',
            initial: true,
            skin: {
                atc1: "#ffffff",
                atc2: "#ffffff",
				blbh: 290,
				blbw: 330,
				blby: -143,
				blbx: -30,
				atx: new Float32Array(13),
                aty: new Float32Array(13),
                atvx: new Float32Array(13),
                atvy: new Float32Array(13),
                atax: new Float32Array(13),
                atay: new Float32Array(13),
                rbcs: [18,18,9]
            }
        }, {
            opt: 'tnt',
            text: 'TNT',
			bulb: 'http://wormax.org/chrome3kafa/tntbox.png',
            initial: true,
            skin: {
                atc1: "#ffffff",
                atc2: "#ffffff",
				blbh: 290,
				blbw: 330,
				blby: -143,
				blbx: -30,
				atx: new Float32Array(13),
                aty: new Float32Array(13),
                atvx: new Float32Array(13),
                atvy: new Float32Array(13),
                atax: new Float32Array(13),
                atay: new Float32Array(13),
                rbcs: [ncolors+14,ncolors+14,ncolors+14,9]
            }
        }, {
            opt: 'chr',
            text: 'Cherry Bomb',
			bulb: 'http://wormax.org/chrome3kafa/chrhead.png',
            initial: true,
            skin: {
                atc1: "#000",
                atc2: "#ff0000",
				blbh: 320,
				blbw: 320,
				blby: -143,
				blbx: -30,
				atx: new Float32Array(8),
                aty: new Float32Array(8),
                atvx: new Float32Array(8),
                atvy: new Float32Array(8),
                atax: new Float32Array(8),
                atay: new Float32Array(8),
                rbcs: [ncolors-2,7,11,7,7]
            }
        }, {
            opt: 'balon',
            text: 'Baloon',
			bulb: 'http://wormax.org/chrome3kafa/balonhead.png',
            initial: true,
            skin: {
                atc1: "#ffffff",
                atc2: "#ffffff",
				blbh: 270,
				blbw: 310,
				blby: -135,
				blbx: -30,
				atx: new Float32Array(13),
                aty: new Float32Array(13),
                atvx: new Float32Array(13),
                atvy: new Float32Array(13),
                atax: new Float32Array(13),
                atay: new Float32Array(13),
                rbcs: [7]
            }
        }, {
            opt: 'pony',
            text: 'Pony',
			bulb: 'http://wormax.org/chrome3kafa/ponyhead.png',
            initial: true,
            skin: {
                abrot: !0,
				atba: 0,
				blbx: -40,
				blby: -40,
				bsc: .45,
				blba: .9,
				atc1: "#72bfd7",
				atc2: "#95cce1",
				rbcs: [7, 7, 22, 22, 12, 12, 25, 25, 21, 21, 23, 23, 23, 23, 23, 23, 23]
            }
        }, {
            opt: 'billchip',
            text: 'Bill Cipher',
			bulb: 'http://wormax.org/chrome3kafa/yello.png',
            initial: true,
            skin: {
                atc1: "#000",
                atc2: "#00ffff",
				bsc: 0.19,
				blby: -147,
				blbx: -15,
				atx: new Float32Array(11),
                aty: new Float32Array(11),
                atvx: new Float32Array(11),
                atvy: new Float32Array(11),
                atax: new Float32Array(11),
                atay: new Float32Array(11),
                rbcs: [ncolors+19,ncolors+20,ncolors+20,ncolors+20,ncolors+20,ncolors+20]
            }
        }, {
            opt: 'saltbae',
            text: 'Saltbae',
			bulb: 'http://wormax.org/chrome3kafa/salties.png',
            initial: true,
            skin: {
                atc1: "#000",
                atc2: "#e1bc97",
				bsc: 0.13,
				blby: -60,
				blbx: -30,
				atx: new Float32Array(5),
                aty: new Float32Array(5),
                atvx: new Float32Array(5),
                atvy: new Float32Array(5),
                atax: new Float32Array(5),
                atay: new Float32Array(5),
                rbcs: [ncolors+5,ncolors+5,ncolors+5,ncolors+5,ncolors+5,ncolors+5,5,5,9,5,5]
            }
        }, {
            opt: 'gta5',
            text: 'GTA 5',
			bulb: 'http://wormax.org/chrome3kafa/gta5png.png',
            initial: true,
            skin: {
                atc1: "#000",
                atc2: "#325c11",
				bsc: 0.13,
				blby: -164,
				blbx: -30,
				atx: new Float32Array(11),
                aty: new Float32Array(11),
                atvx: new Float32Array(11),
                atvy: new Float32Array(11),
                atax: new Float32Array(11),
                atay: new Float32Array(11),
                rbcs: [ncolors+12,ncolors+12,ncolors+12,ncolors+12,ncolors+12]
            }
        }, {
            opt: 'snow',
            text: 'Snow',
			bulb: 'http://wormax.org/chrome3kafa/snowt.png',
            initial: true,
            skin: {
                atc1: "#000",
                atc2: "#fff",
				bsc: 0.13,
				blby: -164,
				blbx: -30,
				atx: new Float32Array(11),
                aty: new Float32Array(11),
                atvx: new Float32Array(11),
                atvy: new Float32Array(11),
                atax: new Float32Array(11),
                atay: new Float32Array(11),
                rbcs: [9]
            }
        }, {
            opt: 'noelf',
            text: 'Noel 1',
			bulb: 'http://wormax.org/chrome3kafa/noelff.png',
            initial: true,
            skin: {
                atc1: "#000",
                atc2: "#fff",
				bsc: 0.22,
				blby: -84,
				blbx: -20,
				atx: new Float32Array(11),
                aty: new Float32Array(11),
                atvx: new Float32Array(11),
                atvy: new Float32Array(11),
                atax: new Float32Array(11),
                atay: new Float32Array(11),
                rbcs: [7,7,7,7,7,7,9,5,9]
            }
        }, {
            opt: 'noelff',
            text: 'Noel 2',
			bulb: 'http://wormax.org/chrome3kafa/noelgeyi.png',
            initial: true,
            skin: {
                atc1: "#000",
                atc2: "#fff",
				bsc: 0.4,
				blby: -40,
				blbx: -20,
				atx: new Float32Array(8),
                aty: new Float32Array(8),
                atvx: new Float32Array(8),
                atvy: new Float32Array(8),
                atax: new Float32Array(8),
                atay: new Float32Array(8),
                rbcs: [5,5,5,5,5,5,7,9,7]
            }
        }, {
            opt: 'noelhead',
            text: 'Noel Father',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/noelhead.png',
            skin: {
				ec: "transparent",
				ppc: "transparent",
                atc1: "transparent",
                atc2: "transparent",
				blbx: -175,
				blby: -178,
                bsc: 0.18,
				atx: new Float32Array(2),
                aty: new Float32Array(2),
                atvx: new Float32Array(2),
                atvy: new Float32Array(2),
                atax: new Float32Array(2),
                atay: new Float32Array(2),
                rbcs: [9,9,9,9,9,9,9,9,9,9,9,7,7,5,9,5,7,7]
            }
        }, {
            opt: 'noelbox',
            text: 'Noel Box',
			bulb: 'http://wormax.org/chrome3kafa/noelbox.png',
            initial: true,
            skin: {
                atc1: "#ffffff",
                atc2: "#ffffff",
				blbh: 300,
				blbw: 330,
				blby: -147,
				blbx: -30,
				atx: new Float32Array(13),
                aty: new Float32Array(13),
                atvx: new Float32Array(13),
                atvy: new Float32Array(13),
                atax: new Float32Array(13),
                atay: new Float32Array(13),
                rbcs: [5,5,5,5,5,5,5,7,9,9,7]
            }
        }, {
            opt: 'noeltree',
            text: 'Noel Tree',
			bulb: 'http://wormax.org/chrome3kafa/noeltree.png',
            initial: true,
            skin: {
                atc1: "#7f3f00",
                atc2: "#7f3f00",
				blbh: 300,
				blbw: 550,
				blby: -152,
				blbx: -30,
				atx: new Float32Array(13),
                aty: new Float32Array(13),
                atvx: new Float32Array(13),
                atvy: new Float32Array(13),
                atax: new Float32Array(13),
                atay: new Float32Array(13),
                rbcs: [13,13,13,13,13,13,13,13,5,5,5,5 ]
            }
        }, {
            opt: 'snowman',
            text: 'Snowman',
			bulb: 'http://wormax.org/chrome3kafa/snowman.png',
            initial: true,
            skin: {
                atc1: "#000",
                atc2: "#fff",
				blbh: 360,
				blbw: 450,
				blby: -185,
				blbx: -30,
				atx: new Float32Array(13),
                aty: new Float32Array(13),
                atvx: new Float32Array(13),
                atvy: new Float32Array(13),
                atax: new Float32Array(13),
                atay: new Float32Array(13),
                rbcs: [9,9,9,9,9,9,9,9,9,7,ncolors+5,7 ]
            }
        },  {
            opt: 'noelcap',
            text: 'Noel Cap',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/noelspk.png',
            skin: {
                atc1: "transparent",
                atc2: "transparent",
                blbx: -35,
				blby: -103,
				atba: true,
				antenna: true,
				abrot: true,
				bsc: 0.23,
				atx: new Float32Array(2),
                aty: new Float32Array(2),
                atvx: new Float32Array(2),
                atvy: new Float32Array(2),
                atax: new Float32Array(2),
                atay: new Float32Array(2),
                rbcs: [7,7,7,7,7,7,7,7,7,9,9]
            }
        }, {
            opt: 'elfcap',
            text: 'Elf Cap',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/noelelf.png',
            skin: {
                atc1: "transparent",
                atc2: "transparent",
                blbx: -33,
				blby: -96,
				atba: true,
				antenna: true,
				abrot: true,
				bsc: 0.23,
				atx: new Float32Array(2),
                aty: new Float32Array(2),
                atvx: new Float32Array(2),
                atvy: new Float32Array(2),
                atax: new Float32Array(2),
                atay: new Float32Array(2),
                rbcs: [13,13,13,13,13,13,13,13,13,7,7]
            }
        }, {
            opt: 'zombiehead',
            text: 'Zombie',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/zombiehead.png',
            skin: {
				ec: "transparent",
				ppc: "transparent",
                atc1: "transparent",
                atc2: "transparent",
				blbx: -175,
				blby: -100,
                bsc: 0.24,
				atx: new Float32Array(2),
                aty: new Float32Array(2),
                atvx: new Float32Array(2),
                atvy: new Float32Array(2),
                atax: new Float32Array(2),
                atay: new Float32Array(2),
                rbcs: [6,6,6,6,7,7,7]
            }
        }, {
            opt: 'agario',
            text: 'Agar.io',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/aghead.png',
            skin: {
				ec: "transparent",
				ppc: "transparent",
                atc1: "transparent",
                atc2: "transparent",
				blbx: -225,
				blby: -155,
                bsc: 0.16,
				atx: new Float32Array(2),
                aty: new Float32Array(2),
                atvx: new Float32Array(2),
                atvy: new Float32Array(2),
                atax: new Float32Array(2),
                atay: new Float32Array(2),
                rbcs: [13,13,11,3,3,18]
            }
        }, {
            opt: 'diepio',
            text: 'Diep.io',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/diephead.png',
            skin: {
				ec: "transparent",
				ppc: "transparent",
                atc1: "transparent",
                atc2: "transparent",
				blbx: -275,
				blby: -155,
                bsc: 0.19,
				atx: new Float32Array(2),
                aty: new Float32Array(2),
                atvx: new Float32Array(2),
                atvy: new Float32Array(2),
                atax: new Float32Array(2),
                atay: new Float32Array(2),
                rbcs: [ncolors+3,ncolors+3,ncolors+3,ncolors+3,ncolors+3,ncolors+3,ncolors+3,11]
            }
        }, {
            opt: 'Grey',
            text: 'Grey',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/grnmez.png',
            skin: {
                atc1: "transparent",
                atc2: "transparent",
                rbcs: [11]
            }
        }, {
            opt: 'Black',
            text: 'Black',
            initial: true,
            bulb: 'http://wormax.org/chrome3kafa/grnmez.png',
            skin: {
                atc1: "transparent",
                atc2: "transparent",
                rbcs: [ncolors+5]
            }
        }
], scolors = [[179,74,0],[153,255,0],[255,25,0],[0,213,255],[132,184,25],[0,0,0],[129,94,57],[162,118,93],[215,165,135],[58,88,151],[100,174,226],[100,65,165],[50,92,17],[242,240,0],[170,53,20],[194,129,46],[39,76,160],[227,199,17],[160,178,136],[10,159,138],[140,199,49],[50,50,50],[237,88,33]];

    for (var i = 0; i < scolors.length; i++) {
        rrs.push(scolors[i][0]);
        ggs.push(scolors[i][1]);
        bbs.push(scolors[i][2]);
        applyColor(ncolors++);
    }

    for (var i = 0; i < sskins.length; i++) {(function(i){
        var s = sskins[i], skin = s.skin,
        bulb = document.createElement("canvas"), img = document.createElement("img");
        bulb.width = 320;
        bulb.height = 320;
        img.onload = function() {
            f = bulb.getContext('2d');
            f.drawImage(img, 0, 0);
        };
        img.src = s.bulb;

        var ss = setSkin;
        s.n = max_skin_cv + 1;
        setSkin = function(b, h, cusk) {
            if (!slither) h = localStorage.getItem('snakercv');
            ss(b, h, cusk);
            if (h == s.n && switches[s.opt]) {
                b.eca = 1;
                b.antenna = true;
                b.atba = 0;
                b.atwg = true;
                b.atia = 1;
                b.abrot = true;
                c = 9;
                b.atx = new Float32Array(c);
                b.aty = new Float32Array(c);
                b.atvx = new Float32Array(c);
                b.atvy = new Float32Array(c);
                b.atax = new Float32Array(c);
                b.atay = new Float32Array(c);
                for (--c; 0 <= c; c--) b.atx[c] = b.xx, b.aty[c] = b.yy;
                b.bulb = bulb;
                b.blbx = 5;
                b.blby = -160;
                b.blbw = 320;
                b.blbh = 320;
                b.bsc = .15;
                b.blba = 1;
                for (var prop in skin) b[prop] = skin[prop];
            }
        };

        var ssskin = document.createElement('div');
        ssskins.appendChild(ssskin);

        function switchSkin() {
            max_skin_cv += switches[s.opt] ? 1 : -1;
            for (var j = i+1; j < sskins.length; j++) {
                sskins[j].n += switches[s.opt] ? 1 : -1;
            }
            if (slither && slither.rcv >= s.n) setSkin(slither, slither.rcv + (switches[s.opt] ? 1 : -1), null);
        }

        createSwitch(ssskin, s.opt, s.text, switchSkin, s.initial);
        ssskin.lastChild.style.display = 'inline-block';

        var sslogo = img.cloneNode();
        sslogo.style.marginLeft = '7px';
        sslogo.style.width = sslogo.style.height = '26px';
        sslogo.style.verticalAlign = 'middle';
        sslogo.style.transform = 'rotate(' + (s.deg || 180) + 'deg)';
        ssskin.appendChild(sslogo);

        var sswrap = document.createElement('div');
        sswrap.style.float = 'right';
        sswrap.style.display = 'none';
        ssskin.appendChild(sswrap);
    })(i);}

    var ssok = makeTextBtn('OK', 36, 16, 18, 1).elem;
    ssok.style.position = 'relative';
    ssok.style.margin = '8px auto 5px auto';
    ssok.style.removeProperty('box-shadow');
    ssok.onclick = function() {
        ssblackout.style.opacity = 0;
        setTimeout(function() {
            ssblackout.style.visibility = 'hidden';
            for (var  i = 0; i < ssskins.childNodes.length; i++) {
                ssskins.childNodes[i].lastChild.style.display = 'none';
            }
        }, 500);
    };
    ssdiv.appendChild(ssok);

    // </Special Skins>

    setColors();
    colorMenu();
    var skins = JSON.parse(localStorage.getItem('slithereskin-skins')) || [];
    if (!(skins instanceof Array)) skins = [];
    if (skins.length > 0 && skins[0] instanceof Array) {
        for (var i = 0; i < skins.length; i++)
            skins[i] = {skin:{rbcs:skins[i]}};
        localStorage.setItem('slithereskin-skins', JSON.stringify(skins));
    }
    var storageSkins = JSON.parse(JSON.stringify(skins));
    for (var i = 0; i < skins.length; i++)
        for (var j = 0; j < skins[i].skin.rbcs.length; j++) {
            if (skins[i].skin.rbcs[j] >= ncolors) storageSkins[i].skin.rbcs[j] = skins[i].skin.rbcs[j] = ((skins[i].skin.rbcs[j] - ncolors + 1) > ccolors.length ? ncolors - 1 : ~skins[i].skin.rbcs[j] + ncolors), localStorage.setItem('slithereskin-skins', JSON.stringify(storageSkins));
            if (-skins[i].skin.rbcs[j] > ccolors.length) storageSkins[i].skin.rbcs[j] = skins[i].skin.rbcs[j] = -ccolors.length, localStorage.setItem('slithereskin-skins', JSON.stringify(storageSkins));
            if (skins[i].skin.rbcs[j] < 0) skins[i].skin.rbcs[j] = ~skins[i].skin.rbcs[j] + ncolors;
        }

    // <Nickname Cache>

    if (localStorage.getItem('slithereskin-nikcname')) nick.value = localStorage.getItem('slithereskin-nikcname');

    nick.onchange = function() {
        localStorage.setItem('slithereskin-nikcname', this.value);
    };

    // </Nickname Cache>

    cskh.onclick = function() {
        div.style.display = 'block';
        setTimeout(function() {
            div.style.opacity = 1;
        }, 0);
        if (localStorage.getItem('snakercv') > max_skin_cv + skins.length) setSkin(slither, max_skin_cv + skins.length, null), localStorage.setItem('snakercv', max_skin_cv + skins.length, null);
    };

    skodiv.lastChild.onclick = function() {
        div.style.opacity = 0;
        setTimeout(function() {
            div.style.display = 'none';
        }, 1000);
        Constructor(true);
    };

    psk.onclick = function() {
        if (playing && slither) {
            var c = slither.rcv;
            c--;
            0 > c && (c = max_skin_cv + skins.length);
            currentSkin = c;
            setSkin(slither, c, null);
        }
        return false;
    };
    nsk.onclick = function() {
        if (playing && slither) {
            var c = slither.rcv;
            c++;
            c > max_skin_cv + skins.length && (c = 0);
            currentSkin = c;
            setSkin(slither, c, null);
        }
        return false;
    };

    var onkeyup = document.onkeyup;
    document.onkeyup = function(e) {
        onkeyup();
        switch (e.which) {
            case 87:
                Constructor(true);
                    csinput.checked = !csinput.checked;
                    csinput.onchange();
                break;
        }
    };

    body.onclick = function() {
        if (sccm.parentNode) sccm.parentNode.removeChild(sccm);
    };
    body.onmousemove = function(e) {
        if (currentColor) {
            e.preventDefault();
            var x = Math.min(255, e.pageX - currentColor.parentNode.parentNode.offsetLeft - currentColor.offsetLeft);
            if (x < 0) x = 0;
            var rgb = parseColor(currentColor.parentNode.parentNode.firstChild.style.backgroundColor);
            for (var i = 0; i < currentColor.parentNode.childNodes.length; i++)
                if (currentColor.parentNode.childNodes[i] === currentColor) rgb[i] = x;
            setColor(rgb, currentColor.parentNode.parentNode);
        }
    };
    body.onmouseup = function() {
        currentColor = null;
    };

    var oldResize = resize;
    resize = function() {
        oldResize();
        skodiv.style.top = Math.round(hh / 2 + (sc ? -130 : 120)) + "px";
        pskh.style.top = Math.round(hh / 2 - (sc ? 294 : 44)) + "px";
        nskh.style.top = Math.round(hh / 2 - (sc ? 294 : 44)) + "px";
        mc.style.top = Math.floor(hh / 2 - mhh / 2) - (sc ? 250 : 0) + "px";
        stylesheet.insertRule('.slithereskin-window{max-height:' + (hh-50) + 'px;' + '}', stylesheet.cssRules.length);
    };

        var oldRedraw = redraw, crash = false;
    redraw = function() {
        if (!crash)
            try {
                oldRedraw();
            } catch(err) {
                crash = true;
                var crashblackout = createWindow();
                crashblackout.style.visibility = 'visible';
                crashblackout.style.opacity = 1;
                body.appendChild(crashblackout);

                var crashdiv = crashblackout.firstChild;
                crashdiv.id = 'slithereskin-crashdiv';
                crashdiv.innerHTML = '<div style="text-align: center;">' + "Something went wrong. Try to reload the page, and if it doesn't help: " + '<a href="https://www.facebook.com/messages/slitherecom" class="slithereskin-blue" target="_blank">report the bug</a>, and it will be fixed as soon as possible. Sorry for this problem.</div><h2>How to report a bug</h2><ul style="margin: 0;"><li>Provide as much information about the bug as you can.</li><li>If you can, <a href="http://imgur.com/" class="slithereskin-blue">upload</a> a screenshot and link it from your bug report.</li><li style="font-weight: bold;">Copy and include this into your report:<input type="text" style="font-family: ' + "'Courier New', Courier, monospace" + '; font-size: 12px; margin-left: 5px; height: 19px;" readonly></li><center><h2>How to fix by yourself</h2></center><li>Be sure that you do not have other slither.io mods. Only use SLITHERE MOD.</li><li>You can <span class="slithereskin-blue">DELETE (click)</span>' + " all your skins and colors.</li></ul>";
                crashdiv.style.maxWidth = '500px';

                document.querySelector('#slithereskin-crashdiv input').value = 'Skins: ' + localStorage['slithereskin-skins'] + ', colors: ' + localStorage['slithereskin-colors'] + ', rcv: ' + slither.rcv + ', slithereskin: ' + window.slitherenabled;
                document.querySelector('#slithereskin-crashdiv input').onclick = function() {
                    setTimeout(function(){
                        document.querySelector('#slithereskin-crashdiv input').select();
                    },0);
                };
                crashdiv.lastChild.lastChild.lastElementChild.onclick = function() {
                    localStorage.removeItem('slithereskin-colors');
                    localStorage.removeItem('slithereskin-skins');
                    location.reload();
                };

                var crashbtn = makeTextBtn('Reload page', 36, 16, 18, 2).elem;
                crashbtn.style.position = 'relative';
                crashbtn.style.margin = '7px auto 0 auto';
                crashbtn.style.removeProperty('box-shadow');
                crashbtn.onclick = function() {
                    location.reload();
                };
                crashdiv.appendChild(crashbtn);
            }
    }
})();
 (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-79914328-1', 'auto');
  ga('send', 'pageview', "/slitherioresmi");
