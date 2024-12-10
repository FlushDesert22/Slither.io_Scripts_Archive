// ==UserScript==
// @name         Slither Sessions (Client Side)
// @namespace    http://tampermonkey.net/
// @version      2024-10-17
// @description  try to take over the world!
// @author       You
// @match        *://slither.com/io
// @match        *://slither.io/
// @require      https://code.jquery.com/jquery-3.7.1.min.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=slither.com
// @run-at       document-start
// @grant        none
// ==/UserScript==

const css = `
#ss-ip-box {
  position: fixed;
  top: 16px;
  left: 8px;
  color: lightgray;
  z-index:99999999;
  font-family: 'Consolas, Verdana';
}

label#ss-ip-connect {
  float: right;
  text-align: center;
  border-radius: 16px;
  color: white;
  cursor: pointer;
  padding: 3px 12px;
  width: 100px;
  margin-left: 10px;
  background-color: #4c447c;
}

label#ss-ip-connect:hover {
  background-color: #6f669f;
}

label#ss-ip-connect:active {
  background-color: #2a225a;
}

#ss-fps-box {
  position:fixed;
  bottom: 160px;
  right: 20px; color: lightgray;
  z-index:99999999;
}

#ss-fps-value {

}

#ss-tag-holder,
#ss-ip-select {
  width: 110px;
  height: 43px;
  margin-top: 10px;
  margin-right: 20px;
  opacity: 1;
  background: rgb(76, 68, 124);
  box-shadow: rgb(0, 0, 0) 0px 6px 50px;
}

#ss-ip-select {
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  opacity: 1;
}


select#tag,
select#ss-ip {
  width: 85px;
  top: 0px;
  outline: 0;
  height: 35px;
  padding: 5px;
  background: rgb(76, 68, 124);
  border-radius:6px;
}
`;
const style = document.createElement("style");
style.innerHTML = css;
document.head.append(style);

var ss = (window.ss = (function () {
  return {
    mods: [],
    options: {
      leaderBoardTitle: "Slither Sessions",
      rotateSkins: false,
      useLastHost: false,
    },

    version: function () {
      return "2.2.20";
    },

    isInt: function (n) {
      return !isNaN(n) && Number(n) === n && n % 1 === 0;
    },

    connect: function () {
      if (ss.options.useLastHost) {
        var host = ss.loadOption("lastHost");
        if (host && host.length > 0) {
          var addy = host.split(":")[0].trim(),
            port = host.split(":")[1].trim();
          forceServer(addy, port);
        }
      }

      window.connect();
    },

    connectToHost: function () {
      defaultIp = ss.loadOption("lastHost", "");
      eipaddr = prompt("Enter the IP address:", defaultIp);
      if (eipaddr && eipaddr.indexOf(":") != -1 && eipaddr.indexOf(".") != -1) {
        ss.saveOption("lastHost", eipaddr);
        var addy = eipaddr.split(":")[0].trim(),
          port = eipaddr.split(":")[1].trim();
        forceServer(addy, port);
        connect();
        ss.waitForSlither(function (s) {
          setSkin(s, ss.skins.skin);
        });
      }
    },

    /** Returns the current IP as provided by Slither */
    currentIp: function () {
      return typeof bso != "undefined" ? bso.ip + ":" + bso.po : false;
    },

    forceLastHost: function () {
      var host = ss.loadOption("lastHost");
      if (host && host.length > 0) {
        var addy = host.split(":")[0].trim(),
          port = host.split(":")[1].trim();
        forceServer(addy, port);
      }
    },

    register: function (mod) {
      ss.mods.push(mod);
      ss[mod.slug] = mod;
      return ss;
    },

    quit: function () {
      return window.userInterface.quit();
    },

    saveOption: function (key, val) {
      return window.userInterface.savePreference(key, val);
    },

    /** Sets background to the given image URL.
        Defaults to slither.io's internal background. */
    setBackground: function (url) {
      url = typeof url !== "undefined" ? url : "/s/bg45.jpg";
      window.ii.src = url;
    },

    loadOption: function (key, d) {
      return window.userInterface.loadPreference(key, d);
    },

    log: function () {
      if (window.logDebugging) console.log.apply(console, arguments);
    },

    onFrameUpdate: function () {
      if (!window.playing || window.slither === null) {
        if (!$(userInterface.connect).is(":visible")) $(userInterface.connect).fadeIn();
        return;
      }

      // Botstatus overlay
      if (window.playing && window.slither !== null) {
        let oContent = [];

        oContent.push("fps: " + userInterface.framesPerSecond.fps);

        // Display the X and Y of the slither
        oContent.push("x: " + (Math.round(window.slither.xx) || 0) + " y: " + (Math.round(window.slither.yy) || 0));

        if (window.goalCoordinates) {
          oContent.push("target");
          oContent.push("x: " + window.goalCoordinates.x + " y: " + window.goalCoordinates.y);
          if (window.goalCoordinates.sz) {
            oContent.push("sz: " + window.goalCoordinates.sz);
          }
        }

        userInterface.overlays.botOverlay.innerHTML = oContent.join("<br/>");

        if (userInterface.gfxOverlay) {
          let gContent = [];

          gContent.push("<b>" + window.slither.nk + "</b>");
          gContent.push(bot.slitherLength);
          gContent.push("[" + window.rank + "/" + window.slither_count + "]");

          userInterface.gfxOverlay.innerHTML = gContent.join("<br/>");
        }
      }

      if (window.playing && window.visualDebugging) {
        // Only draw the goal when a bot has a goal.
        if (window.goalCoordinates && bot.isBotEnabled) {
          var headCoord = { x: window.slither.xx, y: window.slither.yy };
          canvas.drawLine(headCoord, window.goalCoordinates, "green");
          canvas.drawCircle(window.goalCoordinates, "red", true);
        }
      }

      if ($(userInterface.connect).is(":visible")) $(userInterface.connect).fadeOut();

      // customize leaderboard title
      if (typeof window.lbh != "undefined" && window.lbh.textContent != ss.options.leaderBoardTitle) {
        window.log("[SS] Updated leaderboard title: " + ss.options.leaderBoardTitle);
        window.lbh.textContent = ss.options.leaderBoardTitle;
      }

      // save last host when it changes
      if (window.bso !== undefined && userInterface.overlays.serverOverlay.innerHTML !== window.bso.ip + ":" + window.bso.po) {
        userInterface.overlays.serverOverlay.innerHTML = window.bso.ip + ":" + window.bso.po;
        ss.saveOption("lastHost", window.bso.ip + ":" + window.bso.po);

        if (typeof ss.onHostChanged != "undefined") ss.onHostChanged();
      }
    },

    /** Override this to react when the server address changes */
    onHostChanged: function () {},

    /** Wait for the player's slither to become available */
    waitForSlither: function (callback, retries) {
      if (!ss.isInt(retries)) retries = 4;

      var r = 0;

      function _waitForSlither() {
        if (r > retries) return;

        if (!window.slither) {
          ss.log("[SS] waiting for slither r=" + r + "...");
          ++r;
          setTimeout(_waitForSlither, 300);
          return;
        }

        callback(window.slither);
      }

      return _waitForSlither();
    },

    quit: function () {
      userInterface.quit();
    },
  };
})());
window.log = function () {
  if (window.logDebugging) {
    console.log.apply(console, arguments);
  }
};

var canvas = (window.canvas = (function (window) {
  return {
    // Spoofs moving the mouse to the provided coordinates.
    setMouseCoordinates: function (point) {
      window.xm = point.x;
      window.ym = point.y;
    },

    // Convert map coordinates to mouse coordinates.
    mapToMouse: function (point) {
      var mouseX = (point.x - window.slither.xx) * window.gsc;
      var mouseY = (point.y - window.slither.yy) * window.gsc;
      return { x: mouseX, y: mouseY };
    },

    // Map cordinates to Canvas cordinate shortcut
    mapToCanvas: function (point) {
      var c = {
        x: window.mww2 + (point.x - window.view_xx) * window.gsc,
        y: window.mhh2 + (point.y - window.view_yy) * window.gsc,
      };
      return c;
    },

    // Map to Canvas coordinate conversion for drawing circles.
    // Radius also needs to scale by .gsc
    circleMapToCanvas: function (circle) {
      var newCircle = canvas.mapToCanvas({
        x: circle.x,
        y: circle.y,
      });
      return canvas.circle(newCircle.x, newCircle.y, circle.radius * window.gsc);
    },

    // Constructor for point type
    point: function (x, y) {
      var p = {
        x: Math.round(x),
        y: Math.round(y),
      };

      return p;
    },

    // Constructor for rect type
    rect: function (x, y, w, h) {
      var r = {
        x: Math.round(x),
        y: Math.round(y),
        width: Math.round(w),
        height: Math.round(h),
      };

      return r;
    },

    // Constructor for circle type
    circle: function (x, y, r) {
      var c = {
        x: Math.round(x),
        y: Math.round(y),
        radius: Math.round(r),
      };

      return c;
    },

    // Fast atan2
    fastAtan2: function (y, x) {
      const QPI = Math.PI / 4;
      const TQPI = (3 * Math.PI) / 4;
      var r = 0.0;
      var angle = 0.0;
      var abs_y = Math.abs(y) + 1e-10;
      if (x < 0) {
        r = (x + abs_y) / (abs_y - x);
        angle = TQPI;
      } else {
        r = (x - abs_y) / (x + abs_y);
        angle = QPI;
      }
      angle += (0.1963 * r * r - 0.9817) * r;
      if (y < 0) {
        return -angle;
      }

      return angle;
    },

    // Adjusts zoom in response to the mouse wheel.
    setZoom: function (e) {
      // Scaling ratio
      if (window.gsc) {
        window.gsc *= Math.pow(0.9, e.wheelDelta / -120 || e.detail / 2 || 0);
        window.desired_gsc = window.gsc;
      }
    },

    // Restores zoom to the default value.
    resetZoom: function () {
      window.gsc = 0.9;
      window.desired_gsc = 0.9;
    },

    // Maintains Zoom
    maintainZoom: function () {
      if (window.desired_gsc !== undefined) {
        window.gsc = window.desired_gsc;
      }
    },

    // Sets background to the given image URL.
    // Defaults to slither.io's own background.
    setBackground: function (url) {
      url = typeof url !== "undefined" ? url : "/s/bg45.jpg";
      window.ii.src = url;
    },

    // Draw a rectangle on the canvas.
    drawRect: function (rect, color, fill, alpha) {
      if (alpha === undefined) alpha = 1;

      var context = window.mc.getContext("2d");
      var lc = canvas.mapToCanvas({ x: rect.x, y: rect.y });

      context.save();
      context.globalAlpha = alpha;
      context.strokeStyle = color;
      context.rect(lc.x, lc.y, rect.width * window.gsc, rect.height * window.gsc);
      context.stroke();
      if (fill) {
        context.fillStyle = color;
        context.fill();
      }
      context.restore();
    },

    // Draw a circle on the canvas.
    drawCircle: function (circle, color, fill, alpha) {
      if (alpha === undefined) alpha = 1;
      if (circle.radius === undefined) circle.radius = 5;

      var context = window.mc.getContext("2d");
      var drawCircle = canvas.circleMapToCanvas(circle);

      context.save();
      context.globalAlpha = alpha;
      context.beginPath();
      context.strokeStyle = color;
      context.arc(drawCircle.x, drawCircle.y, drawCircle.radius, 0, Math.PI * 2);
      context.stroke();
      if (fill) {
        context.fillStyle = color;
        context.fill();
      }
      context.restore();
    },

    // Draw an angle.
    // @param {number} start -- where to start the angle
    // @param {number} angle -- width of the angle
    // @param {bool} danger -- green if false, red if true
    drawAngle: function (start, angle, color, fill, alpha) {
      if (alpha === undefined) alpha = 0.6;

      var context = window.mc.getContext("2d");

      context.save();
      context.globalAlpha = alpha;
      context.beginPath();
      context.moveTo(window.mc.width / 2, window.mc.height / 2);
      context.arc(window.mc.width / 2, window.mc.height / 2, window.gsc * 100, start, angle);
      context.lineTo(window.mc.width / 2, window.mc.height / 2);
      context.closePath();
      context.stroke();
      if (fill) {
        context.fillStyle = color;
        context.fill();
      }
      context.restore();
    },

    // Draw a line on the canvas.
    drawLine: function (p1, p2, color, width) {
      if (width === undefined) width = 5;

      var context = window.mc.getContext("2d");
      var dp1 = canvas.mapToCanvas(p1);
      var dp2 = canvas.mapToCanvas(p2);

      context.save();
      context.beginPath();
      context.lineWidth = width * window.gsc;
      context.strokeStyle = color;
      context.moveTo(dp1.x, dp1.y);
      context.lineTo(dp2.x, dp2.y);
      context.stroke();
      context.restore();
    },

    // Given the start and end of a line, is point left.
    isLeft: function (start, end, point) {
      return (end.x - start.x) * (point.y - start.y) - (end.y - start.y) * (point.x - start.x) > 0;
    },

    // Get distance squared
    getDistance2: function (x1, y1, x2, y2) {
      var distance2 = Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
      return distance2;
    },

    getDistance2FromSlither: function (point) {
      point.distance = canvas.getDistance2(window.slither.xx, window.slither.yy, point.xx, point.yy);
      return point;
    },

    // return unit vector in the direction of the argument
    unitVector: function (v) {
      var l = Math.sqrt(v.x * v.x + v.y * v.y);
      if (l > 0) {
        return {
          x: v.x / l,
          y: v.y / l,
        };
      } else {
        return {
          x: 0,
          y: 0,
        };
      }
    },

    // Check if point in Rect
    pointInRect: function (point, rect) {
      if (rect.x <= point.x && rect.y <= point.y && rect.x + rect.width >= point.x && rect.y + rect.height >= point.y) {
        return true;
      }
      return false;
    },

    // check if point is in polygon
    pointInPoly: function (point, poly) {
      if (point.x < poly.minx || point.x > poly.maxx || point.y < poly.miny || point.y > poly.maxy) {
        return false;
      }
      let c = false;
      const l = poly.pts.length;
      for (let i = 0, j = l - 1; i < l; j = i++) {
        if (poly.pts[i].y > point.y != poly.pts[j].y > point.y && point.x < ((poly.pts[j].x - poly.pts[i].x) * (point.y - poly.pts[i].y)) / (poly.pts[j].y - poly.pts[i].y) + poly.pts[i].x) {
          c = !c;
        }
      }
      return c;
    },

    addPolyBox: function (poly) {
      var minx = poly.pts[0].x;
      var maxx = poly.pts[0].x;
      var miny = poly.pts[0].y;
      var maxy = poly.pts[0].y;
      for (let p = 1, l = poly.pts.length; p < l; p++) {
        if (poly.pts[p].x < minx) {
          minx = poly.pts[p].x;
        }
        if (poly.pts[p].x > maxx) {
          maxx = poly.pts[p].x;
        }
        if (poly.pts[p].y < miny) {
          miny = poly.pts[p].y;
        }
        if (poly.pts[p].y > maxy) {
          maxy = poly.pts[p].y;
        }
      }
      return {
        pts: poly.pts,
        minx: minx,
        maxx: maxx,
        miny: miny,
        maxy: maxy,
      };
    },

    cross: function (o, a, b) {
      return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
    },

    convexHullSort: function (a, b) {
      return a.x == b.x ? a.y - b.y : a.x - b.x;
    },

    convexHull: function (points) {
      points.sort(canvas.convexHullSort);

      var lower = [];
      for (let i = 0, l = points.length; i < l; i++) {
        while (lower.length >= 2 && canvas.cross(lower[lower.length - 2], lower[lower.length - 1], points[i]) <= 0) {
          lower.pop();
        }
        lower.push(points[i]);
      }

      var upper = [];
      for (let i = points.length - 1; i >= 0; i--) {
        while (upper.length >= 2 && canvas.cross(upper[upper.length - 2], upper[upper.length - 1], points[i]) <= 0) {
          upper.pop();
        }
        upper.push(points[i]);
      }

      upper.pop();
      lower.pop();
      return lower.concat(upper);
    },

    // Check if circles intersect
    circleIntersect: function (circle1, circle2) {
      var bothRadii = circle1.radius + circle2.radius;
      var point = {};

      // Pretends the circles are squares for a quick collision check.
      // If it collides, do the more expensive circle check.
      if (circle1.x + bothRadii > circle2.x && circle1.y + bothRadii > circle2.y && circle1.x < circle2.x + bothRadii && circle1.y < circle2.y + bothRadii) {
        var distance2 = canvas.getDistance2(circle1.x, circle1.y, circle2.x, circle2.y);

        if (distance2 < bothRadii * bothRadii) {
          point = {
            x: (circle1.x * circle2.radius + circle2.x * circle1.radius) / bothRadii,
            y: (circle1.y * circle2.radius + circle2.y * circle1.radius) / bothRadii,
            ang: 0.0,
          };

          point.ang = canvas.fastAtan2(point.y - window.slither.yy, point.x - window.slither.xx);

          if (window.visualDebugging) {
            var collisionPointCircle = canvas.circle(point.x, point.y, 5);
            canvas.drawCircle(circle2, "#ff9900", false);
            canvas.drawCircle(collisionPointCircle, "#66ff66", true);
          }
          return point;
        }
      }
      return false;
    },
  };
})(window));

var bot = (window.bot = (function (window) {
  return {
    isBotRunning: false,
    isBotEnabled: true,
    stage: "grow",
    collisionPoints: [],
    collisionAngles: [],
    foodAngles: [],
    scores: [],
    foodTimeout: undefined,
    sectorBoxSide: 0,
    defaultAccel: 0,
    sectorBox: {},
    currentFood: {},
    opt: {
      // target fps
      targetFps: 20,
      // size of arc for collisionAngles
      arcSize: Math.PI / 8,
      // radius multiple for circle intersects
      radiusMult: 10,
      // food cluster size to trigger acceleration
      foodAccelSz: 200,
      // maximum angle of food to trigger acceleration
      foodAccelDa: Math.PI / 2,
      // how many frames per action
      actionFrames: 2,
      // how many frames to delay action after collision
      collisionDelay: 10,
      // base speed
      speedBase: 5.78,
      // front angle size
      frontAngle: Math.PI / 2,
      // percent of angles covered by same slither to be considered an encircle attempt
      enCircleThreshold: 0.5625,
      // percent of angles covered by all slithers to move to safety
      enCircleAllThreshold: 0.5625,
      // distance multiplier for enCircleAllThreshold
      enCircleDistanceMult: 20,
      // slither score to start circling on self
      followCircleLength: 5000,
      // direction for followCircle: +1 for counter clockwise and -1 for clockwise
      followCircleDirection: +1,
    },
    MID_X: 0,
    MID_Y: 0,
    MAP_R: 0,
    MAXARC: 0,

    getSlitherWidth: function (sc) {
      if (sc === undefined) sc = window.slither.sc;
      return Math.round(sc * 29.0);
    },

    quickRespawn: function () {
      window.dead_mtm = 0;
      window.login_fr = 0;

      bot.isBotRunning = false;
      window.forcing = true;
      bot.connect();
      window.forcing = false;
    },

    connect: function () {
      if (window.force_ip && window.force_port) {
        window.forceServer(window.force_ip, window.force_port);
      }

      window.connect();
    },

    // angleBetween - get the smallest angle between two angles (0-pi)
    angleBetween: function (a1, a2) {
      var r1 = 0.0;
      var r2 = 0.0;

      r1 = (a1 - a2) % Math.PI;
      r2 = (a2 - a1) % Math.PI;

      return r1 < r2 ? -r1 : r2;
    },

    // Change heading to ang
    changeHeadingAbs: function (angle) {
      var cos = Math.cos(angle);
      var sin = Math.sin(angle);

      window.goalCoordinates = {
        x: Math.round(window.slither.xx + bot.headCircle.radius * cos),
        y: Math.round(window.slither.yy + bot.headCircle.radius * sin),
      };

      /*if (window.visualDebugging) {
                canvas.drawLine({
                    x: window.slither.xx,
                    y: window.slither.yy},
                    window.goalCoordinates, 'yellow', '8');
            }*/

      canvas.setMouseCoordinates(canvas.mapToMouse(window.goalCoordinates));
    },

    // Change heading by ang
    // +0-pi turn left
    // -0-pi turn right

    changeHeadingRel: function (angle) {
      var heading = {
        x: window.slither.xx + 500 * bot.cos,
        y: window.slither.yy + 500 * bot.sin,
      };

      var cos = Math.cos(-angle);
      var sin = Math.sin(-angle);

      window.goalCoordinates = {
        x: Math.round(cos * (heading.x - window.slither.xx) - sin * (heading.y - window.slither.yy) + window.slither.xx),
        y: Math.round(sin * (heading.x - window.slither.xx) + cos * (heading.y - window.slither.yy) + window.slither.yy),
      };

      canvas.setMouseCoordinates(canvas.mapToMouse(window.goalCoordinates));
    },

    // Change heading to the best angle for avoidance.
    headingBestAngle: function () {
      var best;
      var distance;
      var openAngles = [];
      var openStart;

      var sIndex = bot.getAngleIndex(window.slither.ehang) + bot.MAXARC / 2;
      if (sIndex > bot.MAXARC) sIndex -= bot.MAXARC;

      for (var i = 0; i < bot.MAXARC; i++) {
        if (bot.collisionAngles[i] === undefined) {
          distance = 0;
          if (openStart === undefined) openStart = i;
        } else {
          distance = bot.collisionAngles[i].distance;
          if (openStart) {
            openAngles.push({
              openStart: openStart,
              openEnd: i - 1,
              sz: i - 1 - openStart,
            });
            openStart = undefined;
          }
        }

        if (best === undefined || (best.distance < distance && best.distance !== 0)) {
          best = {
            distance: distance,
            aIndex: i,
          };
        }
      }

      if (openStart && openAngles[0]) {
        openAngles[0].openStart = openStart;
        openAngles[0].sz = openAngles[0].openEnd - openStart;
        if (openAngles[0].sz < 0) openAngles[0].sz += bot.MAXARC;
      } else if (openStart) {
        openAngles.push({ openStart: openStart, openEnd: openStart, sz: 0 });
      }

      if (openAngles.length > 0) {
        openAngles.sort(bot.sortSz);
        bot.changeHeadingAbs((openAngles[0].openEnd - openAngles[0].sz / 2) * bot.opt.arcSize);
      } else {
        bot.changeHeadingAbs(best.aIndex * bot.opt.arcSize);
      }
    },

    // Avoid collision point by ang
    // ang radians <= Math.PI (180deg)
    avoidCollisionPoint: function (point, ang) {
      if (ang === undefined || ang > Math.PI) {
        ang = Math.PI;
      }

      var end = {
        x: window.slither.xx + 2000 * bot.cos,
        y: window.slither.yy + 2000 * bot.sin,
      };

      if (window.visualDebugging) {
        canvas.drawLine({ x: window.slither.xx, y: window.slither.yy }, end, "orange", 5);
        canvas.drawLine({ x: window.slither.xx, y: window.slither.yy }, { x: point.x, y: point.y }, "red", 5);
      }

      if (canvas.isLeft({ x: window.slither.xx, y: window.slither.yy }, end, { x: point.x, y: point.y })) {
        bot.changeHeadingAbs(point.ang - ang);
      } else {
        bot.changeHeadingAbs(point.ang + ang);
      }
    },

    // get collision angle index, expects angle +/i 0 to Math.PI
    getAngleIndex: function (angle) {
      var index;

      if (angle < 0) {
        angle += 2 * Math.PI;
      }

      index = Math.round(angle * (1 / bot.opt.arcSize));

      if (index === bot.MAXARC) {
        return 0;
      }
      return index;
    },

    // Add to collisionAngles if distance is closer
    addCollisionAngle: function (sp) {
      var ang = canvas.fastAtan2(Math.round(sp.yy - window.slither.yy), Math.round(sp.xx - window.slither.xx));
      var aIndex = bot.getAngleIndex(ang);

      var actualDistance = Math.round(Math.pow(Math.sqrt(sp.distance) - sp.radius, 2));

      if (bot.collisionAngles[aIndex] === undefined || bot.collisionAngles[aIndex].distance > sp.distance) {
        bot.collisionAngles[aIndex] = {
          x: Math.round(sp.xx),
          y: Math.round(sp.yy),
          ang: ang,
          slither: sp.slither,
          distance: actualDistance,
          radius: sp.radius,
          aIndex: aIndex,
        };
      }
    },

    // Add and score foodAngles
    addFoodAngle: function (f) {
      var ang = canvas.fastAtan2(Math.round(f.yy - window.slither.yy), Math.round(f.xx - window.slither.xx));

      var aIndex = bot.getAngleIndex(ang);

      canvas.getDistance2FromSlither(f);

      if (bot.collisionAngles[aIndex] === undefined || Math.sqrt(bot.collisionAngles[aIndex].distance) > Math.sqrt(f.distance) + (bot.slitherRadius * bot.opt.radiusMult * bot.speedMult) / 2) {
        if (bot.foodAngles[aIndex] === undefined) {
          bot.foodAngles[aIndex] = {
            x: Math.round(f.xx),
            y: Math.round(f.yy),
            ang: ang,
            da: Math.abs(bot.angleBetween(ang, window.slither.ehang)),
            distance: f.distance,
            sz: f.sz,
            score: Math.pow(f.sz, 2) / f.distance,
          };
        } else {
          bot.foodAngles[aIndex].sz += Math.round(f.sz);
          bot.foodAngles[aIndex].score += Math.pow(f.sz, 2) / f.distance;
          if (bot.foodAngles[aIndex].distance > f.distance) {
            bot.foodAngles[aIndex].x = Math.round(f.xx);
            bot.foodAngles[aIndex].y = Math.round(f.yy);
            bot.foodAngles[aIndex].distance = f.distance;
          }
        }
      }
    },

    // Get closest collision point per slither.
    getCollisionPoints: function () {
      var scPoint;

      bot.collisionPoints = [];
      bot.collisionAngles = [];

      for (var slither = 0, ls = window.slithers.length; slither < ls; slither++) {
        scPoint = undefined;

        if (window.slithers[slither].id !== window.slither.id && window.slithers[slither].alive_amt === 1) {
          var s = window.slithers[slither];
          var sRadius = bot.getSlitherWidth(s.sc) / 2;
          var sSpMult = Math.min(1, s.sp / 5.78 - 1);

          scPoint = {
            xx: s.xx + (Math.cos(s.ehang) * sRadius * sSpMult * bot.opt.radiusMult) / 2,
            yy: s.yy + (Math.sin(s.ehang) * sRadius * sSpMult * bot.opt.radiusMult) / 2,
            slither: slither,
            radius: bot.headCircle.radius,
            head: true,
          };

          canvas.getDistance2FromSlither(scPoint);
          bot.addCollisionAngle(scPoint);
          bot.collisionPoints.push(scPoint);

          if (window.visualDebugging) {
            canvas.drawCircle(canvas.circle(scPoint.xx, scPoint.yy, scPoint.radius), "red", false);
          }

          scPoint = undefined;

          for (var pts = 0, lp = s.pts.length; pts < lp; pts++) {
            if (
              !s.pts[pts].dying &&
              canvas.pointInRect(
                {
                  x: s.pts[pts].xx,
                  y: s.pts[pts].yy,
                },
                bot.sectorBox
              )
            ) {
              var collisionPoint = {
                xx: s.pts[pts].xx,
                yy: s.pts[pts].yy,
                slither: slither,
                radius: sRadius,
              };

              if (window.visualDebugging && true === false) {
                canvas.drawCircle(canvas.circle(collisionPoint.xx, collisionPoint.yy, collisionPoint.radius), "#00FF00", false);
              }

              canvas.getDistance2FromSlither(collisionPoint);
              bot.addCollisionAngle(collisionPoint);

              if (collisionPoint.distance <= Math.pow(bot.headCircle.radius + collisionPoint.radius, 2)) {
                bot.collisionPoints.push(collisionPoint);
                if (window.visualDebugging) {
                  canvas.drawCircle(canvas.circle(collisionPoint.xx, collisionPoint.yy, collisionPoint.radius), "red", false);
                }
              }
            }
          }
        }
      }

      // WALL
      if (canvas.getDistance2(bot.MID_X, bot.MID_Y, window.slither.xx, window.slither.yy) > Math.pow(bot.MAP_R - 1000, 2)) {
        var midAng = canvas.fastAtan2(window.slither.yy - bot.MID_X, window.slither.xx - bot.MID_Y);
        scPoint = {
          xx: bot.MID_X + bot.MAP_R * Math.cos(midAng),
          yy: bot.MID_Y + bot.MAP_R * Math.sin(midAng),
          slither: -1,
          radius: bot.slitherWidth,
        };
        canvas.getDistance2FromSlither(scPoint);
        bot.collisionPoints.push(scPoint);
        bot.addCollisionAngle(scPoint);
        if (window.visualDebugging) {
          canvas.drawCircle(canvas.circle(scPoint.xx, scPoint.yy, scPoint.radius), "yellow", false);
        }
      }

      bot.collisionPoints.sort(bot.sortDistance);
      if (window.visualDebugging) {
        for (var i = 0; i < bot.collisionAngles.length; i++) {
          if (bot.collisionAngles[i] !== undefined) {
            canvas.drawLine({ x: window.slither.xx, y: window.slither.yy }, { x: bot.collisionAngles[i].x, y: bot.collisionAngles[i].y }, "red", 2);
          }
        }
      }
    },

    // Is collisionPoint (xx) in frontAngle
    inFrontAngle: function (point) {
      var ang = canvas.fastAtan2(Math.round(point.y - window.slither.yy), Math.round(point.x - window.slither.xx));

      if (Math.abs(bot.angleBetween(ang, window.slither.ehang)) < bot.opt.frontAngle) {
        return true;
      } else {
        return false;
      }
    },

    // Checks to see if you are going to collide with anything in the collision detection radius
    checkCollision: function () {
      var point;

      bot.getCollisionPoints();
      if (bot.collisionPoints.length === 0) return false;

      for (var i = 0; i < bot.collisionPoints.length; i++) {
        var collisionCircle = canvas.circle(bot.collisionPoints[i].xx, bot.collisionPoints[i].yy, bot.collisionPoints[i].radius);

        // -1 slither is special case for non slither object.
        if ((point = canvas.circleIntersect(bot.headCircle, collisionCircle)) && bot.inFrontAngle(point)) {
          if (bot.collisionPoints[i].slither !== -1 && bot.collisionPoints[i].head && window.slithers[bot.collisionPoints[i].slither].sp > 10) {
            window.setAcceleration(1);
          } else {
            window.setAcceleration(bot.defaultAccel);
          }
          bot.avoidCollisionPoint(point);
          return true;
        }
      }

      window.setAcceleration(bot.defaultAccel);
      return false;
    },

    checkEncircle: function () {
      var enSlither = [];
      var high = 0;
      var highSlither;
      var enAll = 0;

      for (var i = 0; i < bot.collisionAngles.length; i++) {
        if (bot.collisionAngles[i] !== undefined) {
          var s = bot.collisionAngles[i].slither;
          if (enSlither[s]) {
            enSlither[s]++;
          } else {
            enSlither[s] = 1;
          }
          if (enSlither[s] > high) {
            high = enSlither[s];
            highSlither = s;
          }

          if (bot.collisionAngles[i].distance < Math.pow(bot.slitherRadius * bot.opt.enCircleDistanceMult, 2)) {
            enAll++;
          }
        }
      }

      if (high > bot.MAXARC * bot.opt.enCircleThreshold) {
        bot.headingBestAngle();

        if (high !== bot.MAXARC && window.slithers[highSlither].sp > 10) {
          window.setAcceleration(1);
        } else {
          window.setAcceleration(bot.defaultAccel);
        }

        if (window.visualDebugging) {
          canvas.drawCircle(canvas.circle(window.slither.xx, window.slither.yy, bot.opt.radiusMult * bot.slitherRadius), "red", true, 0.2);
        }
        return true;
      }

      if (enAll > bot.MAXARC * bot.opt.enCircleAllThreshold) {
        bot.headingBestAngle();
        window.setAcceleration(bot.defaultAccel);

        if (window.visualDebugging) {
          canvas.drawCircle(canvas.circle(window.slither.xx, window.slither.yy, bot.slitherRadius * bot.opt.enCircleDistanceMult), "yellow", true, 0.2);
        }
        return true;
      } else {
        if (window.visualDebugging) {
          canvas.drawCircle(canvas.circle(window.slither.xx, window.slither.yy, bot.slitherRadius * bot.opt.enCircleDistanceMult), "yellow");
        }
      }

      window.setAcceleration(bot.defaultAccel);
      return false;
    },

    populatePts: function () {
      let x = window.slither.xx + window.slither.fx;
      let y = window.slither.yy + window.slither.fy;
      let l = 0.0;
      bot.pts = [
        {
          x: x,
          y: y,
          len: l,
        },
      ];
      for (let p = window.slither.pts.length - 1; p >= 0; p--) {
        if (window.slither.pts[p].dying) {
          continue;
        } else {
          let xx = window.slither.pts[p].xx + window.slither.pts[p].fx;
          let yy = window.slither.pts[p].yy + window.slither.pts[p].fy;
          let ll = l + Math.sqrt(canvas.getDistance2(x, y, xx, yy));
          bot.pts.push({
            x: xx,
            y: yy,
            len: ll,
          });
          x = xx;
          y = yy;
          l = ll;
        }
      }
      bot.len = l;
    },

    // set the direction of rotation based on the velocity of
    // the head with respect to the center of mass
    determineCircleDirection: function () {
      // find center mass (cx, cy)
      let cx = 0.0;
      let cy = 0.0;
      let pn = bot.pts.length;
      for (let p = 0; p < pn; p++) {
        cx += bot.pts[p].x;
        cy += bot.pts[p].y;
      }
      cx /= pn;
      cy /= pn;

      // vector from (cx, cy) to the head
      let head = {
        x: window.slither.xx + window.slither.fx,
        y: window.slither.yy + window.slither.fy,
      };
      let dx = head.x - cx;
      let dy = head.y - cy;

      // check the sign of dot product of (bot.cos, bot.sin) and (-dy, dx)
      if (-dy * bot.cos + dx * bot.sin > 0) {
        // clockwise
        bot.opt.followCircleDirection = -1;
      } else {
        // couter clockwise
        bot.opt.followCircleDirection = +1;
      }
    },

    // returns a point on slither's body on given length from the head
    // assumes that bot.pts is populated
    smoothPoint: function (t) {
      // range check
      if (t >= bot.len) {
        let tail = bot.pts[bot.pts.length - 1];
        return {
          x: tail.x,
          y: tail.y,
        };
      } else if (t <= 0) {
        return {
          x: bot.pts[0].x,
          y: bot.pts[0].y,
        };
      }
      // binary search
      let p = 0;
      let q = bot.pts.length - 1;
      while (q - p > 1) {
        let m = Math.round((p + q) / 2);
        if (t > bot.pts[m].len) {
          p = m;
        } else {
          q = m;
        }
      }
      // now q = p + 1, and the point is in between;
      // compute approximation
      let wp = bot.pts[q].len - t;
      let wq = t - bot.pts[p].len;
      let w = wp + wq;
      return {
        x: (wp * bot.pts[p].x + wq * bot.pts[q].x) / w,
        y: (wp * bot.pts[p].y + wq * bot.pts[q].y) / w,
      };
    },

    // finds a point on slither's body closest to the head;
    // returns length from the head
    // excludes points close to the head
    closestBodyPoint: function () {
      let head = {
        x: window.slither.xx + window.slither.fx,
        y: window.slither.yy + window.slither.fy,
      };

      let ptsLength = bot.pts.length;

      // skip head area
      let start_n = 0;
      let start_d2 = 0.0;
      for (;;) {
        let prev_d2 = start_d2;
        start_n++;
        start_d2 = canvas.getDistance2(head.x, head.y, bot.pts[start_n].x, bot.pts[start_n].y);
        if (start_d2 < prev_d2 || start_n == ptsLength - 1) {
          break;
        }
      }

      if (start_n >= ptsLength || start_n <= 1) {
        return bot.len;
      }

      // find closets point in bot.pts
      let min_n = start_n;
      let min_d2 = start_d2;
      for (let n = min_n + 1; n < ptsLength; n++) {
        let d2 = canvas.getDistance2(head.x, head.y, bot.pts[n].x, bot.pts[n].y);
        if (d2 < min_d2) {
          min_n = n;
          min_d2 = d2;
        }
      }

      // find second closest point
      let next_n = min_n;
      let next_d2 = min_d2;
      if (min_n == ptsLength - 1) {
        next_n = min_n - 1;
        next_d2 = canvas.getDistance2(head.x, head.y, bot.pts[next_n].x, bot.pts[next_n].y);
      } else {
        let d2m = canvas.getDistance2(head.x, head.y, bot.pts[min_n - 1].x, bot.pts[min_n - 1].y);
        let d2p = canvas.getDistance2(head.x, head.y, bot.pts[min_n + 1].x, bot.pts[min_n + 1].y);
        if (d2m < d2p) {
          next_n = min_n - 1;
          next_d2 = d2m;
        } else {
          next_n = min_n + 1;
          next_d2 = d2p;
        }
      }

      // compute approximation
      let t2 = bot.pts[min_n].len - bot.pts[next_n].len;
      t2 *= t2;

      if (t2 == 0) {
        return bot.pts[min_n].len;
      } else {
        let min_w = t2 - (min_d2 - next_d2);
        let next_w = t2 + (min_d2 - next_d2);
        return (bot.pts[min_n].len * min_w + bot.pts[next_n].len * next_w) / (2 * t2);
      }
    },

    bodyDangerZone: function (offset, targetPoint, targetPointNormal, closePointDist, pastTargetPoint, closePoint) {
      var head = {
        x: window.slither.xx + window.slither.fx,
        y: window.slither.yy + window.slither.fy,
      };
      const o = bot.opt.followCircleDirection;
      var pts = [
        {
          x: head.x - o * offset * bot.sin,
          y: head.y + o * offset * bot.cos,
        },
        {
          x: head.x + bot.slitherWidth * bot.cos + offset * (bot.cos - o * bot.sin),
          y: head.y + bot.slitherWidth * bot.sin + offset * (bot.sin + o * bot.cos),
        },
        {
          x: head.x + 1.75 * bot.slitherWidth * bot.cos + o * 0.3 * bot.slitherWidth * bot.sin + offset * (bot.cos - o * bot.sin),
          y: head.y + 1.75 * bot.slitherWidth * bot.sin - o * 0.3 * bot.slitherWidth * bot.cos + offset * (bot.sin + o * bot.cos),
        },
        {
          x: head.x + 2.5 * bot.slitherWidth * bot.cos + o * 0.7 * bot.slitherWidth * bot.sin + offset * (bot.cos - o * bot.sin),
          y: head.y + 2.5 * bot.slitherWidth * bot.sin - o * 0.7 * bot.slitherWidth * bot.cos + offset * (bot.sin + o * bot.cos),
        },
        {
          x: head.x + 3 * bot.slitherWidth * bot.cos + o * 1.2 * bot.slitherWidth * bot.sin + offset * bot.cos,
          y: head.y + 3 * bot.slitherWidth * bot.sin - o * 1.2 * bot.slitherWidth * bot.cos + offset * bot.sin,
        },
        {
          x: targetPoint.x + targetPointNormal.x * (offset + 0.5 * Math.max(closePointDist, 0)),
          y: targetPoint.y + targetPointNormal.y * (offset + 0.5 * Math.max(closePointDist, 0)),
        },
        {
          x: pastTargetPoint.x + targetPointNormal.x * offset,
          y: pastTargetPoint.y + targetPointNormal.y * offset,
        },
        pastTargetPoint,
        targetPoint,
        closePoint,
      ];
      pts = canvas.convexHull(pts);
      var poly = {
        pts: pts,
      };
      poly = canvas.addPolyBox(poly);
      return poly;
    },

    followCircleSelf: function () {
      bot.populatePts();
      bot.determineCircleDirection();
      const o = bot.opt.followCircleDirection;

      // exit if too short
      if (bot.len < 9 * bot.slitherWidth) {
        return;
      }

      var head = {
        x: window.slither.xx + window.slither.fx,
        y: window.slither.yy + window.slither.fy,
      };

      let closePointT = bot.closestBodyPoint();
      let closePoint = bot.smoothPoint(closePointT);

      // approx tangent and normal vectors and closePoint
      var closePointNext = bot.smoothPoint(closePointT - bot.slitherWidth);
      var closePointTangent = canvas.unitVector({
        x: closePointNext.x - closePoint.x,
        y: closePointNext.y - closePoint.y,
      });
      var closePointNormal = {
        x: -o * closePointTangent.y,
        y: o * closePointTangent.x,
      };

      // angle wrt closePointTangent
      var currentCourse = Math.asin(Math.max(-1, Math.min(1, bot.cos * closePointNormal.x + bot.sin * closePointNormal.y)));

      // compute (oriented) distance from the body at closePointDist
      var closePointDist = (head.x - closePoint.x) * closePointNormal.x + (head.y - closePoint.y) * closePointNormal.y;

      // construct polygon for slither inside
      var insidePolygonStartT = 5 * bot.slitherWidth;
      var insidePolygonEndT = closePointT + 5 * bot.slitherWidth;
      var insidePolygonPts = [bot.smoothPoint(insidePolygonEndT), bot.smoothPoint(insidePolygonStartT)];
      for (let t = insidePolygonStartT; t < insidePolygonEndT; t += bot.slitherWidth) {
        insidePolygonPts.push(bot.smoothPoint(t));
      }

      var insidePolygon = canvas.addPolyBox({
        pts: insidePolygonPts,
      });

      // get target point; this is an estimate where we land if we hurry
      var targetPointT = closePointT;
      var targetPointFar = 0.0;
      let targetPointStep = bot.slitherWidth / 64;
      for (let h = closePointDist, a = currentCourse; h >= 0.125 * bot.slitherWidth; ) {
        targetPointT -= targetPointStep;
        targetPointFar += targetPointStep * Math.cos(a);
        h += targetPointStep * Math.sin(a);
        a = Math.max(-Math.PI / 4, a - targetPointStep / bot.slitherWidth);
      }

      var targetPoint = bot.smoothPoint(targetPointT);

      var pastTargetPointT = targetPointT - 3 * bot.slitherWidth;
      var pastTargetPoint = bot.smoothPoint(pastTargetPointT);

      // look for danger from enemies
      var enemyBodyOffsetDelta = 0.25 * bot.slitherWidth;
      var enemyHeadDist2 = 64 * 64 * bot.slitherWidth * bot.slitherWidth;
      for (let slither = 0, slithersNum = window.slithers.length; slither < slithersNum; slither++) {
        if (window.slithers[slither].id !== window.slither.id && window.slithers[slither].alive_amt === 1) {
          let enemyHead = {
            x: window.slithers[slither].xx + window.slithers[slither].fx,
            y: window.slithers[slither].yy + window.slithers[slither].fy,
          };
          let enemyAhead = {
            x: enemyHead.x + Math.cos(window.slithers[slither].ang) * bot.slitherWidth,
            y: enemyHead.y + Math.sin(window.slithers[slither].ang) * bot.slitherWidth,
          };
          // heads
          if (!canvas.pointInPoly(enemyHead, insidePolygon)) {
            enemyHeadDist2 = Math.min(enemyHeadDist2, canvas.getDistance2(enemyHead.x, enemyHead.y, targetPoint.x, targetPoint.y), canvas.getDistance2(enemyAhead.x, enemyAhead.y, targetPoint.x, targetPoint.y));
          }
          // bodies
          let offsetSet = false;
          let offset = 0.0;
          let cpolbody = {};
          for (let pts = 0, ptsNum = window.slithers[slither].pts.length; pts < ptsNum; pts++) {
            if (!window.slithers[slither].pts[pts].dying) {
              let point = {
                x: window.slithers[slither].pts[pts].xx + window.slithers[slither].pts[pts].fx,
                y: window.slithers[slither].pts[pts].yy + window.slithers[slither].pts[pts].fy,
              };
              while (!offsetSet || (enemyBodyOffsetDelta >= -bot.slitherWidth && canvas.pointInPoly(point, cpolbody))) {
                if (!offsetSet) {
                  offsetSet = true;
                } else {
                  enemyBodyOffsetDelta -= 0.0625 * bot.slitherWidth;
                }
                offset = 0.5 * (bot.slitherWidth + bot.getSlitherWidth(window.slithers[slither].sc)) + enemyBodyOffsetDelta;
                cpolbody = bot.bodyDangerZone(offset, targetPoint, closePointNormal, closePointDist, pastTargetPoint, closePoint);
              }
            }
          }
        }
      }
      var enemyHeadDist = Math.sqrt(enemyHeadDist2);

      // plot inside polygon
      if (window.visualDebugging) {
        for (let p = 0, l = insidePolygon.pts.length; p < l; p++) {
          let q = p + 1;
          if (q == l) {
            q = 0;
          }
          canvas.drawLine({ x: insidePolygon.pts[p].x, y: insidePolygon.pts[p].y }, { x: insidePolygon.pts[q].x, y: insidePolygon.pts[q].y }, "orange");
        }
      }

      // mark closePoint
      if (window.visualDebugging) {
        canvas.drawCircle(canvas.circle(closePoint.x, closePoint.y, bot.slitherWidth * 0.25), "white", false);
      }

      // mark safeZone
      if (window.visualDebugging) {
        canvas.drawCircle(canvas.circle(targetPoint.x, targetPoint.y, bot.slitherWidth + 2 * targetPointFar), "white", false);
        canvas.drawCircle(canvas.circle(targetPoint.x, targetPoint.y, 0.2 * bot.slitherWidth), "white", false);
      }

      // draw sample cpolbody
      if (window.visualDebugging) {
        let soffset = 0.5 * bot.slitherWidth;
        let scpolbody = bot.bodyDangerZone(soffset, targetPoint, closePointNormal, closePointDist, pastTargetPoint, closePoint);
        for (let p = 0, l = scpolbody.pts.length; p < l; p++) {
          let q = p + 1;
          if (q == l) {
            q = 0;
          }
          canvas.drawLine({ x: scpolbody.pts[p].x, y: scpolbody.pts[p].y }, { x: scpolbody.pts[q].x, y: scpolbody.pts[q].y }, "white");
        }
      }

      // TAKE ACTION

      // expand?
      let targetCourse = currentCourse + 0.25;
      // enemy head nearby?
      let headProx = -1.0 - (2 * targetPointFar - enemyHeadDist) / bot.slitherWidth;
      if (headProx > 0) {
        headProx = 0.125 * headProx * headProx;
      } else {
        headProx = -0.5 * headProx * headProx;
      }
      targetCourse = Math.min(targetCourse, headProx);
      // enemy body nearby?
      targetCourse = Math.min(targetCourse, targetCourse + (enemyBodyOffsetDelta - 0.0625 * bot.slitherWidth) / bot.slitherWidth);
      // small tail?
      var tailBehind = bot.len - closePointT;
      var targetDir = canvas.unitVector({
        x: bot.opt.followCircleTarget.x - head.x,
        y: bot.opt.followCircleTarget.y - head.y,
      });
      var driftQ = targetDir.x * closePointNormal.x + targetDir.y * closePointNormal.y;
      var allowTail = bot.slitherWidth * (2 - 0.5 * driftQ);
      // a line in the direction of the target point
      if (window.visualDebugging) {
        canvas.drawLine({ x: head.x, y: head.y }, { x: head.x + allowTail * targetDir.x, y: head.y + allowTail * targetDir.y }, "red");
      }
      targetCourse = Math.min(targetCourse, (tailBehind - allowTail + (bot.slitherWidth - closePointDist)) / bot.slitherWidth);
      // far away?
      targetCourse = Math.min(targetCourse, (-0.5 * (closePointDist - 4 * bot.slitherWidth)) / bot.slitherWidth);
      // final corrections
      // too fast in?
      targetCourse = Math.max(targetCourse, (-0.75 * closePointDist) / bot.slitherWidth);
      // too fast out?
      targetCourse = Math.min(targetCourse, 1.0);

      var goalDir = {
        x: closePointTangent.x * Math.cos(targetCourse) - o * closePointTangent.y * Math.sin(targetCourse),
        y: closePointTangent.y * Math.cos(targetCourse) + o * closePointTangent.x * Math.sin(targetCourse),
      };
      var goal = {
        x: head.x + goalDir.x * 4 * bot.slitherWidth,
        y: head.y + goalDir.y * 4 * bot.slitherWidth,
      };

      if (window.goalCoordinates && Math.abs(goal.x - window.goalCoordinates.x) < 1000 && Math.abs(goal.y - window.goalCoordinates.y) < 1000) {
        window.goalCoordinates = {
          x: Math.round(goal.x * 0.25 + window.goalCoordinates.x * 0.75),
          y: Math.round(goal.y * 0.25 + window.goalCoordinates.y * 0.75),
        };
      } else {
        window.goalCoordinates = {
          x: Math.round(goal.x),
          y: Math.round(goal.y),
        };
      }

      canvas.setMouseCoordinates(canvas.mapToMouse(window.goalCoordinates));
    },

    // Sorting by property 'score' descending
    sortScore: function (a, b) {
      return b.score - a.score;
    },

    // Sorting by property 'sz' descending
    sortSz: function (a, b) {
      return b.sz - a.sz;
    },

    // Sorting by property 'distance' ascending
    sortDistance: function (a, b) {
      return a.distance - b.distance;
    },

    computeFoodGoal: function () {
      bot.foodAngles = [];

      for (var i = 0; i < window.foods.length && window.foods[i] !== null; i++) {
        var f = window.foods[i];

        if (!f.eaten && !(canvas.circleIntersect(canvas.circle(f.xx, f.yy, 2), bot.sidecircle_l) || canvas.circleIntersect(canvas.circle(f.xx, f.yy, 2), bot.sidecircle_r))) {
          bot.addFoodAngle(f);
        }
      }

      bot.foodAngles.sort(bot.sortScore);

      if (bot.foodAngles[0] !== undefined && bot.foodAngles[0].sz > 0) {
        bot.currentFood = { x: bot.foodAngles[0].x, y: bot.foodAngles[0].y, sz: bot.foodAngles[0].sz, da: bot.foodAngles[0].da };
      } else {
        bot.currentFood = { x: bot.MID_X, y: bot.MID_Y, sz: 0 };
      }
    },

    foodAccel: function () {
      var aIndex = 0;

      if (bot.currentFood && bot.currentFood.sz > bot.opt.foodAccelSz) {
        aIndex = bot.getAngleIndex(bot.currentFood.ang);

        if (bot.collisionAngles[aIndex] && bot.collisionAngles[aIndex].distance > bot.currentFood.distance + bot.slitherRadius * bot.opt.radiusMult && bot.currentFood.da < bot.opt.foodAccelDa) {
          return 1;
        }

        if (bot.collisionAngles[aIndex] === undefined && bot.currentFood.da < bot.opt.foodAccelDa) {
          return 1;
        }
      }

      return bot.defaultAccel;
    },

    toCircle: function () {
      for (var i = 0; i < window.slither.pts.length && window.slither.pts[i].dying; i++);
      const o = bot.opt.followCircleDirection;
      var tailCircle = canvas.circle(window.slither.pts[i].xx, window.slither.pts[i].yy, bot.headCircle.radius);

      if (window.visualDebugging) {
        canvas.drawCircle(tailCircle, "blue", false);
      }

      window.setAcceleration(bot.defaultAccel);
      bot.changeHeadingRel((o * Math.PI) / 32);

      if (canvas.circleIntersect(bot.headCircle, tailCircle)) {
        bot.stage = "circle";
      }
    },

    every: function () {
      bot.MID_X = window.grd;
      bot.MID_Y = window.grd;
      bot.MAP_R = window.grd * 0.98;
      bot.MAXARC = (2 * Math.PI) / bot.opt.arcSize;

      if (bot.opt.followCircleTarget === undefined) {
        bot.opt.followCircleTarget = {
          x: bot.MID_X,
          y: bot.MID_Y,
        };
      }

      bot.sectorBoxSide = Math.floor(Math.sqrt(window.sectors.length)) * window.sector_size;
      bot.sectorBox = canvas.rect(window.slither.xx - bot.sectorBoxSide / 2, window.slither.yy - bot.sectorBoxSide / 2, bot.sectorBoxSide, bot.sectorBoxSide);
      // if (window.visualDebugging) canvas.drawRect(bot.sectorBox, '#c0c0c0', true, 0.1);

      bot.cos = Math.cos(window.slither.ang);
      bot.sin = Math.sin(window.slither.ang);

      bot.speedMult = window.slither.sp / bot.opt.speedBase;
      bot.slitherRadius = bot.getSlitherWidth() / 2;
      bot.slitherWidth = bot.getSlitherWidth();
      bot.slitherLength = Math.floor(15 * (window.fpsls[window.slither.sct] + window.slither.fam / window.fmlts[window.slither.sct] - 1) - 5);

      bot.headCircle = canvas.circle(
        window.slither.xx + ((bot.cos * Math.min(1, bot.speedMult - 1) * bot.opt.radiusMult) / 2) * bot.slitherRadius,
        window.slither.yy + ((bot.sin * Math.min(1, bot.speedMult - 1) * bot.opt.radiusMult) / 2) * bot.slitherRadius,
        (bot.opt.radiusMult / 2) * bot.slitherRadius
      );

      if (window.visualDebugging) {
        canvas.drawCircle(bot.headCircle, "blue", false);
      }

      bot.sidecircle_r = canvas.circle(
        window.slither.xx - (window.slither.yy + bot.sin * bot.slitherWidth - window.slither.yy),
        window.slither.yy + (window.slither.xx + bot.cos * bot.slitherWidth - window.slither.xx),
        bot.slitherWidth * bot.speedMult
      );

      bot.sidecircle_l = canvas.circle(
        window.slither.xx + (window.slither.yy + bot.sin * bot.slitherWidth - window.slither.yy),
        window.slither.yy - (window.slither.xx + bot.cos * bot.slitherWidth - window.slither.xx),
        bot.slitherWidth * bot.speedMult
      );
    },

    // Main bot
    go: function () {
      bot.every();

      if (bot.slitherLength < bot.opt.followCircleLength) {
        bot.stage = "grow";
      }

      if (bot.currentFood && bot.stage !== "grow") {
        bot.currentFood = undefined;
      }

      if (bot.stage === "circle") {
        window.setAcceleration(bot.defaultAccel);
        bot.followCircleSelf();
      } else if (bot.checkCollision() || bot.checkEncircle()) {
        if (bot.actionTimeout) {
          window.clearTimeout(bot.actionTimeout);
          bot.actionTimeout = window.setTimeout(bot.actionTimer, (1000 / bot.opt.targetFps) * bot.opt.collisionDelay);
        }
      } else {
        if (bot.slitherLength > bot.opt.followCircleLength) {
          bot.stage = "tocircle";
        }
        if (bot.actionTimeout === undefined) {
          bot.actionTimeout = window.setTimeout(bot.actionTimer, (1000 / bot.opt.targetFps) * bot.opt.actionFrames);
        }
        window.setAcceleration(bot.foodAccel());
      }
    },

    // Timer version of food check
    actionTimer: function () {
      if (window.playing && window.slither !== null && window.slither.alive_amt === 1) {
        if (bot.stage === "grow") {
          bot.computeFoodGoal();
          window.goalCoordinates = bot.currentFood;
          canvas.setMouseCoordinates(canvas.mapToMouse(window.goalCoordinates));
        } else if (bot.stage === "tocircle") {
          bot.toCircle();
        }
      }
      bot.actionTimeout = undefined;
    },
  };
})(window));

var userInterface = (window.userInterface = (function (window, document) {
  // Save the original slither.io functions so we can modify them, or reenable them later.
  var original_keydown = document.onkeydown;
  var original_onmouseDown = window.onmousedown;
  var original_oef = window.oef;
  var original_redraw = window.redraw;
  var original_onmousemove = window.onmousemove;

  window.oef = function () {};
  window.redraw = function () {};

  return {
    overlays: {},
    gfxEnabled: true,

    initServerIp: function () {
      var parent = document.getElementById("playh");
      var serverDiv = document.createElement("div");
      var serverIn = document.createElement("input");

      serverDiv.style.width = "244px";
      serverDiv.style.margin = "-30px auto";
      serverDiv.style.boxShadow = "rgb(0, 0, 0) 0px 6px 50px";
      serverDiv.style.opacity = 1;
      serverDiv.style.background = "rgb(76, 68, 124)";
      serverDiv.className = "taho";
      serverDiv.style.display = "block";

      serverIn.className = "sumsginp";
      serverIn.placeholder = "0.0.0.0:444";
      serverIn.maxLength = 21;
      serverIn.style.width = "220px";
      serverIn.style.height = "24px";

      serverDiv.appendChild(serverIn);
      parent.appendChild(serverDiv);

      userInterface.server = serverIn;
    },

    initOverlays: function () {
      var botOverlay = document.createElement("div");
      botOverlay.style.position = "fixed";
      botOverlay.style.right = "5px";
      botOverlay.style.bottom = "112px";
      botOverlay.style.width = "150px";
      botOverlay.style.height = "85px";
      // botOverlay.style.background = 'rgba(0, 0, 0, 0.5)';
      botOverlay.style.color = "#C0C0C0";
      botOverlay.style.fontFamily = "Consolas, Verdana";
      botOverlay.style.zIndex = 999;
      botOverlay.style.fontSize = "14px";
      botOverlay.style.padding = "5px";
      botOverlay.style.borderRadius = "5px";
      botOverlay.className = "nsi";
      document.body.appendChild(botOverlay);

      var serverOverlay = document.createElement("div");
      serverOverlay.style.position = "fixed";
      serverOverlay.style.right = "5px";
      serverOverlay.style.bottom = "5px";
      serverOverlay.style.width = "160px";
      serverOverlay.style.height = "14px";
      serverOverlay.style.color = "#C0C0C0";
      serverOverlay.style.fontFamily = "Consolas, Verdana";
      serverOverlay.style.zIndex = 999;
      serverOverlay.style.fontSize = "14px";
      serverOverlay.className = "nsi";
      document.body.appendChild(serverOverlay);

      var prefOverlay = document.createElement("div");
      prefOverlay.style.position = "fixed";
      prefOverlay.style.left = "10px";
      prefOverlay.style.top = "75px";
      prefOverlay.style.width = "260px";
      prefOverlay.style.height = "210px";
      // prefOverlay.style.background = 'rgba(0, 0, 0, 0.5)';
      prefOverlay.style.color = "#C0C0C0";
      prefOverlay.style.fontFamily = "Consolas, Verdana";
      prefOverlay.style.zIndex = 999;
      prefOverlay.style.fontSize = "14px";
      prefOverlay.style.padding = "5px";
      prefOverlay.style.borderRadius = "5px";
      prefOverlay.className = "nsi";
      document.body.appendChild(prefOverlay);

      var statsOverlay = document.createElement("div");
      statsOverlay.style.position = "fixed";
      statsOverlay.style.left = "10px";
      statsOverlay.style.top = "295px";
      statsOverlay.style.width = "140px";
      statsOverlay.style.height = "210px";
      // statsOverlay.style.background = 'rgba(0, 0, 0, 0.5)';
      statsOverlay.style.color = "#C0C0C0";
      statsOverlay.style.fontFamily = "Consolas, Verdana";
      statsOverlay.style.zIndex = 998;
      statsOverlay.style.fontSize = "14px";
      statsOverlay.style.padding = "5px";
      statsOverlay.style.borderRadius = "5px";
      statsOverlay.className = "nsi";
      document.body.appendChild(statsOverlay);

      userInterface.overlays.botOverlay = botOverlay;
      userInterface.overlays.serverOverlay = serverOverlay;
      userInterface.overlays.prefOverlay = prefOverlay;
      userInterface.overlays.statsOverlay = statsOverlay;
    },

    toggleOverlays: function () {
      Object.keys(userInterface.overlays).forEach(function (okey) {
        var oVis = userInterface.overlays[okey].style.visibility !== "hidden" ? "hidden" : "visible";
        userInterface.overlays[okey].style.visibility = oVis;
        window.visualDebugging = oVis === "visible";
      });
    },

    toggleGfx: function () {
      if (userInterface.gfxEnabled) {
        var c = window.mc.getContext("2d");
        c.save();
        (c.fillStyle = "#000000"), c.fillRect(0, 0, window.mww, window.mhh), c.restore();

        var d = document.createElement("div");
        d.style.position = "fixed";
        d.style.top = "50%";
        d.style.left = "50%";
        d.style.width = "200px";
        d.style.height = "60px";
        d.style.color = "#C0C0C0";
        d.style.fontFamily = "Consolas, Verdana";
        d.style.zIndex = 999;
        d.style.margin = "-30px 0 0 -100px";
        d.style.fontSize = "20px";
        d.style.textAlign = "center";
        d.className = "nsi";
        document.body.appendChild(d);
        userInterface.gfxOverlay = d;

        window.lbf.innerHTML = "";
      } else {
        document.body.removeChild(userInterface.gfxOverlay);
        userInterface.gfxOverlay = undefined;
      }

      userInterface.gfxEnabled = !userInterface.gfxEnabled;
    },

    // Save variable to local storage
    savePreference: function (item, value) {
      window.localStorage.setItem(item, value);
      userInterface.onPrefChange();
    },

    // Load a variable from local storage
    loadPreference: function (preference, defaultVar) {
      var savedItem = window.localStorage.getItem(preference);
      if (savedItem !== null) {
        if (savedItem === "true") {
          window[preference] = true;
        } else if (savedItem === "false") {
          window[preference] = false;
        } else {
          window[preference] = savedItem;
        }
        window.log("Setting found for " + preference + ": " + window[preference]);
      } else {
        window[preference] = defaultVar;
        window.log("No setting found for " + preference + ". Used default: " + window[preference]);
      }
      userInterface.onPrefChange();
      return window[preference];
    },

    // Saves username when you click on "Play" button
    playButtonClickListener: function () {
      userInterface.saveNick();
      userInterface.loadPreference("autoRespawn", false);
      userInterface.onPrefChange();

      if (userInterface.server.value) {
        let s = userInterface.server.value.split(":");
        if (s.length === 2) {
          window.force_ip = s[0];
          window.force_port = s[1];
          bot.connect();
        }
      } else {
        window.force_ip = undefined;
        window.force_port = undefined;
      }
    },

    // Preserve nickname
    saveNick: function () {
      var nick = document.getElementById("nick").value;
      userInterface.savePreference("savedNick", nick);
    },

    // Hide top score
    hideTop: function () {
      var nsidivs = document.querySelectorAll("div.nsi");
      for (var i = 0; i < nsidivs.length; i++) {
        if (nsidivs[i].style.top === "4px" && nsidivs[i].style.width === "300px") {
          nsidivs[i].style.visibility = "hidden";
          bot.isTopHidden = true;
          window.topscore = nsidivs[i];
        }
      }
    },

    // Store FPS data
    framesPerSecond: {
      fps: 0,
      fpsTimer: function () {
        if (window.playing && window.fps && window.lrd_mtm) {
          if (Date.now() - window.lrd_mtm > 970) {
            userInterface.framesPerSecond.fps = window.fps;
          }
        }
      },
    },

    onkeydown: function (e) {
      // Original slither.io onkeydown function + whatever is under it
      original_keydown(e);
      if (window.playing) {
        // Letter `T` to toggle bot
        if (e.keyCode === 84) {
          bot.isBotEnabled = !bot.isBotEnabled;
        }
        // Letter 'U' to toggle debugging (console)
        if (e.keyCode === 85) {
          window.logDebugging = !window.logDebugging;
          console.log("Log debugging set to: " + window.logDebugging);
          userInterface.savePreference("logDebugging", window.logDebugging);
        }
        // Letter 'Y' to toggle debugging (visual)
        if (e.keyCode === 89) {
          window.visualDebugging = !window.visualDebugging;
          console.log("Visual debugging set to: " + window.visualDebugging);
          userInterface.savePreference("visualDebugging", window.visualDebugging);
        }
        // Letter 'I' to toggle autorespawn
        if (e.keyCode === 73) {
          window.autoRespawn = !window.autoRespawn;
          console.log("Automatic Respawning set to: " + window.autoRespawn);
          userInterface.savePreference("autoRespawn", window.autoRespawn);
        }
        // Letter 'H' to toggle hidden mode
        if (e.keyCode === 72) {
          userInterface.toggleOverlays();
        }
        // Letter 'G' to toggle graphics
        if (e.keyCode === 71) {
          userInterface.toggleGfx();
        }
        // Letter 'O' to change rendermode (visual)
        if (e.keyCode === 79) {
          userInterface.toggleMobileRendering(!window.mobileRender);
        }
        // Letter 'A' to increase collision detection radius
        if (e.keyCode === 65) {
          bot.opt.radiusMult++;
          console.log("radiusMult set to: " + bot.opt.radiusMult);
        }
        // Letter 'S' to decrease collision detection radius
        if (e.keyCode === 83) {
          if (bot.opt.radiusMult > 1) {
            bot.opt.radiusMult--;
            console.log("radiusMult set to: " + bot.opt.radiusMult);
          }
        }
        // Letter 'Z' to reset zoom
        if (e.keyCode === 90) {
          canvas.resetZoom();
        }
        // Letter 'Q' to quit to main menu
        if (e.keyCode === 81) {
          window.autoRespawn = false;
          userInterface.quit();
        }
        // 'ESC' to quickly respawn
        if (e.keyCode === 27) {
          bot.quickRespawn();
        }
        userInterface.onPrefChange();
      }
    },

    onmousedown: function (e) {
      if (window.playing) {
        switch (e.which) {
          // "Left click" to manually speed up the slither
          case 1:
            bot.defaultAccel = 1;
            if (!bot.isBotEnabled) {
              original_onmouseDown(e);
            }
            break;
          // "Right click" to toggle bot in addition to the letter "T"
          case 3:
            // bot.isBotEnabled = !bot.isBotEnabled;
            break;
        }
      } else {
        original_onmouseDown(e);
      }
      userInterface.onPrefChange();
    },

    onmouseup: function () {
      bot.defaultAccel = 0;
    },

    // Manual mobile rendering
    toggleMobileRendering: function (mobileRendering) {
      window.mobileRender = mobileRendering;
      window.log("Mobile rendering set to: " + window.mobileRender);
      userInterface.savePreference("mobileRender", window.mobileRender);
      // Set render mode
      if (window.mobileRender) {
        window.render_mode = 1;
        window.want_quality = 0;
        window.high_quality = false;
      } else {
        window.render_mode = 2;
        window.want_quality = 1;
        window.high_quality = true;
      }
    },

    // Update stats overlay.
    updateStats: function () {
      var oContent = [];
      var median;

      if (bot.scores.length === 0) return;

      median = Math.round((bot.scores[Math.floor((bot.scores.length - 1) / 2)] + bot.scores[Math.ceil((bot.scores.length - 1) / 2)]) / 2);

      oContent.push("games played: " + bot.scores.length);
      oContent.push(
        "a: " +
          Math.round(
            bot.scores.reduce(function (a, b) {
              return a + b;
            }) / bot.scores.length
          ) +
          " m: " +
          median
      );

      for (var i = 0; i < bot.scores.length && i < 10; i++) {
        oContent.push(i + 1 + ". " + bot.scores[i]);
      }

      userInterface.overlays.statsOverlay.innerHTML = oContent.join("<br/>");
    },

    onPrefChange: function () {
      // Set static display options here.
      var oContent = [];
      var ht = userInterface.handleTextColor;

      oContent.push("version: " + GM_info.script.version);
      oContent.push("[T] bot: " + ht(bot.isBotEnabled));
      oContent.push("[O] mobile rendering: " + ht(window.mobileRender));
      oContent.push("[A/S] radius multiplier: " + bot.opt.radiusMult);
      oContent.push("[I] auto respawn: " + ht(window.autoRespawn));
      oContent.push("[Y] visual debugging: " + ht(window.visualDebugging));
      oContent.push("[U] log debugging: " + ht(window.logDebugging));
      oContent.push("[Mouse Wheel] zoom");
      oContent.push("[Z] reset zoom");
      oContent.push("[ESC] quick respawn");
      oContent.push("[Q] quit to menu");

      userInterface.overlays.prefOverlay.innerHTML = oContent.join("<br/>");
    },

    onFrameUpdate: function () {
      // Botstatus overlay
      if (window.playing && window.slither !== null) {
        let oContent = [];

        oContent.push("fps: " + userInterface.framesPerSecond.fps);

        // Display the X and Y of the slither
        oContent.push("x: " + (Math.round(window.slither.xx) || 0) + " y: " + (Math.round(window.slither.yy) || 0));

        if (window.goalCoordinates) {
          oContent.push("target");
          oContent.push("x: " + window.goalCoordinates.x + " y: " + window.goalCoordinates.y);
          if (window.goalCoordinates.sz) {
            oContent.push("sz: " + window.goalCoordinates.sz);
          }
        }

        userInterface.overlays.botOverlay.innerHTML = oContent.join("<br/>");

        if (userInterface.gfxOverlay) {
          let gContent = [];

          gContent.push("<b>" + window.slither.nk + "</b>");
          gContent.push(bot.slitherLength);
          gContent.push("[" + window.rank + "/" + window.slither_count + "]");

          userInterface.gfxOverlay.innerHTML = gContent.join("<br/>");
        }

        if (window.bso !== undefined && userInterface.overlays.serverOverlay.innerHTML !== window.bso.ip + ":" + window.bso.po) {
          userInterface.overlays.serverOverlay.innerHTML = window.bso.ip + ":" + window.bso.po;
        }
      }

      if (window.playing && window.visualDebugging) {
        // Only draw the goal when a bot has a goal.
        if (window.goalCoordinates && bot.isBotEnabled) {
          var headCoord = { x: window.slither.xx, y: window.slither.yy };
          canvas.drawLine(headCoord, window.goalCoordinates, "green");
          canvas.drawCircle(window.goalCoordinates, "red", true);
        }
      }
    },

    oefTimer: function () {
      var start = Date.now();
      canvas.maintainZoom();
      original_oef();
      if (userInterface.gfxEnabled) {
        original_redraw();
      } else {
        window.visualDebugging = false;
      }

      if (window.playing && bot.isBotEnabled && window.slither !== null) {
        window.onmousemove = function () {};
        bot.isBotRunning = true;
        bot.go();
      } else if (bot.isBotEnabled && bot.isBotRunning) {
        bot.isBotRunning = false;

        if (window.lastscore && window.lastscore.childNodes[1]) {
          bot.scores.push(parseInt(window.lastscore.childNodes[1].innerHTML));
          bot.scores.sort(function (a, b) {
            return b - a;
          });
          userInterface.updateStats();
        }

        if (window.autoRespawn) {
          bot.connect();
        }
      }

      if (!bot.isBotEnabled || !bot.isBotRunning) {
        window.onmousemove = original_onmousemove;
      }

      userInterface.onFrameUpdate();

      if (!bot.isBotEnabled && !window.no_raf) {
        window.raf(userInterface.oefTimer);
      } else {
        setTimeout(userInterface.oefTimer, 1000 / bot.opt.targetFps - (Date.now() - start));
      }
    },

    // Quit to menu
    quit: function () {
      if (window.playing && window.resetGame) {
        window.want_close_socket = true;
        window.dead_mtm = 0;
        if (window.play_btn) {
          window.play_btn.setEnabled(true);
        }
        window.resetGame();
      }
    },

    handleTextColor: function (enabled) {
      return '<span style="color:' + (enabled ? 'green;">enabled' : 'red;">disabled') + "</span>";
    },
  };
})(window, document));
canvas.setZoom = function (e) {
  if (window.gsc && window.ss && window.ss.options.useZoom) {
    window.gsc *= Math.pow(0.9, e.wheelDelta / -120 || e.detail / 2 || 0);
    window.desired_gsc = window.gsc;
  }
};

// Maintains Zoom
canvas.maintainZoom = function () {
  if (window.desired_gsc !== undefined && window.ss && window.ss.options.useZoom) {
    window.gsc = window.desired_gsc;
  }
};

userInterface.onFrameUpdate = function () {
  if (typeof window.ss != "undefined") window.ss.onFrameUpdate();
};

userInterface.superOefTimer = userInterface.oefTimer;
userInterface.oefTimer = function () {
  userInterface.superOefTimer();
};

userInterface.removeLogo = function () {
  if (typeof window.showlogo_iv !== "undefined") {
    window.ncka = window.lgss = window.lga = 1;
    clearInterval(window.showlogo_iv);
    showLogo(true);
  }
};

userInterface.toggleOverlays = function () {
  Object.keys(userInterface.overlays).forEach(function (okey) {
    var isIpBox = userInterface.overlays[okey].id == "ss-server-overlay";
    if (!isIpBox) {
      var oVis = userInterface.overlays[okey].style.visibility !== "hidden" ? "hidden" : "visible";
      userInterface.overlays[okey].style.visibility = oVis;
    }
  });
};

userInterface.ssOnKeyDown = function (e) {
  userInterface.onkeydown(e);

  if (!window.playing) return;

  // Letter 'B' to prompt for a custom background url
  if (e.keyCode === 66) {
    var url = prompt("Please enter a background url:");
    if (url !== null) ss.setBackground(url);
  }
  // Letter 'L' to rotate skins
  if (e.keyCode === 76) {
    ss.options.rotateSkins = !ss.options.rotateSkins;
    userInterface.savePreference("rotateSkins", ss.options.rotateSkins);
  }
  // Letter 'K' next skin
  if (e.keyCode === 75) {
    ss.skins.next();
  }
  // Letter 'J' previous skin
  if (e.keyCode === 74) {
    ss.skins.previous();
  }
  // Letter 'P' toggle static host
  if (e.keyCode === 80) {
    ss.options.useLastHost = !ss.options.useLastHost;
    // ss.saveOption ('useLastHost', ss.options.useLastHost);
  }

  // Letter 'X' toggle zoom
  if (e.keyCode === 88) {
    ss.options.useZoom = !ss.options.useZoom;
    ss.saveOption("useZoom", ss.options.useZoom);
    if (!ss.options.useZoom) {
      canvas.resetZoom();
    }
  }

  // Key ']' toggle IP visibility
  if (e.keyCode === 221) {
    var serverOverlay = document.getElementById("ss-server-overlay");
    var oVis = serverOverlay.style.visibility !== "hidden" ? "hidden" : "visible";
    serverOverlay.style.visibility = oVis;
  }

  if (e.keyCode === 49) {
    canvas.setBackground();
  }

  if (e.keyCode === 50) {
    canvas.setBackground("https://github.com/SlitherSessions/ss-mods/blob/master/mods/images/bg-1.jpg?raw=true");
  }

  userInterface.onPrefChange();
};

userInterface.onPrefChange = function () {
  // Set static display options here.
  var oContent = [];
  var ht = userInterface.handleTextColor;

  oContent.push("version: " + window.ss.version());
  oContent.push("[T / Right click] bot: " + ht(bot.isBotEnabled));
  oContent.push("[O] mobile rendering: " + ht(window.mobileRender));
  oContent.push("[A/S] radius multiplier: " + bot.opt.radiusMult);
  // oContent.push('[D] quick radius change ' +
  //     bot.opt.radiusApproachSize + '/' + bot.opt.radiusAvoidSize);
  oContent.push("[I] auto respawn: " + ht(window.autoRespawn));
  oContent.push("[G] leaderboard overlay: " + ht(window.leaderboard));
  oContent.push("[Y] visual debugging: " + ht(window.visualDebugging));
  oContent.push("[U] log debugging: " + ht(window.logDebugging));
  oContent.push("[H] overlays");
  oContent.push("[B] change background");
  oContent.push("[Mouse Wheel] zoom");
  oContent.push("[X] zoom enabled: " + ht(ss.options.useZoom));
  oContent.push("[Z] reset zoom");
  oContent.push("[L] rotate skins: " + ht(ss.options.rotateSkins));
  oContent.push("[K] next skin");
  oContent.push("[J] previous skin");
  oContent.push("[P] use static host: " + ht(ss.options.useLastHost));
  oContent.push("[ESC] quick respawn");
  oContent.push("[Q] quit to menu");

  userInterface.overlays.prefOverlay.innerHTML = oContent.join("<br/>");
};

userInterface.playButtonClickListener = function () {
  userInterface.saveNick();
  userInterface.loadPreference("autoRespawn", false);
  userInterface.onPrefChange();
  canvas.resetZoom();

  if (ss.options.useLastHost) ss.forceLastHost();

  ss.waitForSlither(function (s) {
    setSkin(s, ss.skins.skin);
  });
};

// Main
(function (window, document) {
  // This must happen before any options are loaded
  userInterface.initOverlays();

  // Load preferences
  ss.loadOption("logDebugging", false);
  ss.loadOption("visualDebugging", false);
  ss.loadOption("autoRespawn", true);
  ss.loadOption("mobileRender", false);
  ss.options.useZoom = ss.loadOption("useZoom", true);
  ss.options.rotateSkins = ss.loadOption("rotateSkins", false);

  document.addEventListener("keydown", userInterface.ssOnKeyDown);
  document.addEventListener("mousedown", userInterface.onmousedown);
  window.addEventListener("mouseup", userInterface.onmouseup);

  // tweak bot Defaults
  bot.isBotEnabled = false;
  bot.opt.followCircleLength = 8000;
  bot.opt.targetFps = 30;

  // Hide top score
  userInterface.hideTop();

  // IP Connect button
  var connectButton = document.createElement("div");
  connectButton.id = "ss-ip-box";
  connectButton.className = "nsi";
  var connectLabel = document.createElement("label");
  connectLabel.innerHTML = "Connect to IP";
  connectLabel.className = "on";
  connectLabel.id = "ss-ip-connect";
  connectLabel.addEventListener("click", ss.connectToHost);
  connectButton.appendChild(connectLabel);
  document.body.appendChild(connectButton);
  userInterface.connect = connectButton;

  // Overlays
  userInterface.overlays.serverOverlay.id = "ss-server-overlay";
  userInterface.overlays.serverOverlay.style.position = "fixed";
  userInterface.overlays.serverOverlay.style.left = "140px";
  userInterface.overlays.serverOverlay.style.bottom = "10px";
  userInterface.overlays.serverOverlay.style.width = "400px";
  userInterface.overlays.serverOverlay.style.height = "42px";
  userInterface.overlays.serverOverlay.style.color = "#C0C0C0";
  userInterface.overlays.serverOverlay.style.fontFamily = "Consolas, Verdana";
  userInterface.overlays.serverOverlay.style.zIndex = 999;
  userInterface.overlays.serverOverlay.style.fontSize = "42px";
  userInterface.overlays.serverOverlay.style.overflow = "visible";
  userInterface.overlays.serverOverlay.className = "nsi";

  userInterface.overlays.statsOverlay.style.top = "400px";

  // Listener for mouse wheel scroll - used for setZoom function
  document.body.addEventListener("mousewheel", canvas.setZoom);
  document.body.addEventListener("DOMMouseScroll", canvas.setZoom);

  // Set render mode
  if (window.mobileRender) userInterface.toggleMobileRendering(true);

  // Unblocks all skins without the need for FB sharing.
  window.localStorage.setItem("edttsg", "1");

  // Remove social
  userInterface.removeLogo();
  window.social.remove();

  // Maintain fps
  setInterval(userInterface.framesPerSecond.fpsTimer, 80);

  window.onload = function () {
    ss.mods.forEach(function (mod, i, a) {
      if (typeof mod.init != "undefined") mod.init();
    });

    window.nick.value = ss.loadOption("savedNick", "Robot");
    if ((e = document.getElementById("tag"))) e.value = ss.loadOption("savedClan", "[SS]");

    window.play_btn.btnf.addEventListener("click", userInterface.playButtonClickListener);

    // Start!
    userInterface.oefTimer();
  };
})(window, document);
window.asciize = (b, typing) => {
  var h, c, f;
  c = b.length;
  var w = !1;
  for (h = 0; h < c; h++)
    if (((f = b.charCodeAt(h)), 32 > f || 127 < f)) {
      w = !0;
      break;
    }
  if (w) {
    w = "";
    for (h = 0; h < c; h++) {
      (f = b.charCodeAt(h)), (w = 32 > f || 127 < f ? w + " " : w + String.fromCharCode(f));
    }
    return w;
  }

  var s = c < 20 ? " " : "";
  var clanPrefix = $("#tag").val().length > 0 ? $("#tag").val() + s : "";
  return !typing ? clanPrefix + b : b;
};
ss.register(
  (function () {
    var ssClanTags = ["SS", "AYE", "BIG", "JG", "YBR", "YT"];

    function ssAddClanTags() {
      window.nick.oninput = function () {
        self = window.nick;
        var b = self.value;
        var h = asciize(b, true);
        24 < h.length && (h = h.substr(0, 24));
        b != h && (self.value = h);
      };

      $(".taho").before('<div id="ss-tag-holder" class="taho"><select class="sumsginp" id="tag"></select></div>');

      $("#tag").change(function () {
        ss.saveOption("savedClan", $(this).val());
      });

      $("#tag").append("<option value=''>---</option>");
      for (var i = 0; i < ssClanTags.length; ++i) {
        var tag = ssClanTags[i];
        $("#tag").append("<option value='[" + tag + "]'>[" + tag + "]</option>");
      }
    }

    var clans = {
      slug: "clans",
      tags: ssClanTags,
      init: function () {
        ssAddClanTags();
      },
    };

    return clans;
  })()
);
ss.register(
  (function () {
    return {
      slug: "resources",
      images: {
        foxyHead: "https://i.imgur.com/Adp9ep6.png",
        spykeLogo: "https://i.imgur.com/qWEVxy4.png",
        hazardLogo: "https://i.imgur.com/zeyVDy1.png",
        ssLogo: "https://i.imgur.com/4DurTms.png",
        thomasLogo: "https://i.imgur.com/z8xXOdH.png",
        slitherClipsLogo: "https://i.imgur.com/XR0Mkyy.png",
        jokerHead: "https://i.imgur.com/SBI0UvE.png",
        kawaii: "https://i.imgur.com/33HY70E.png",
        yondubr: "https://i.imgur.com/jSFdefH.png",
        mopeXLogo: "https://i.imgur.com/OXDCZL1.png",
        teddyBear: "https://i.imgur.com/a12yUWw.png",
        kitkatAngel: "https://i.imgur.com/1M0nT6T.png",
        tdkCassette: "https://i.imgur.com/y1MWxyG.png",
        psychoSmith: "https://i.imgur.com/hvDkhAI.png",
      },
      init: function () {},
    };
  })()
);
ss.register(
  (function () {
    /** returns a default value if none provided */
    var d = function (a, d) {
      return a ? a : d;
    };

    var impl = {
      /** Reference slither's max skin number */
      superMaxSkinCv: window.max_skin_cv,

      /** Reference slither's original setSkin */
      superSetSkin: window.setSkin,

      /** Canvas used for drawing the antenna */
      bulb: null,

      /** Adds an antennea to a slither */
      addAntenna: function (snk, skin) {
        if (impl.bulb == null) {
          impl.bulb = document.createElement("canvas");
          impl.bulb.style.display = false;
        }

        if (snk.bulb == null || typeof snk.bulb == "undefined") snk.bulb = impl.bulb;

        if (skin.bulb && skin.bulb.image) {
          var img = new Image();
          img.onload = function () {
            snk.bulb.width = parseInt(img.width);
            snk.bulb.height = parseInt(img.height);
            var ctx = snk.bulb.getContext("2d");
            ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width, img.height);
            img = null;

            // these were copied from the JS console, not currently modifiable via code
            snk.atax = [0, 0, 0, 0]; //, 0, 0, 0, 0, 0];
            snk.atay = [0, 0, 0, 0]; //, 0, 0, 0, 0, 0];
            snk.atvx = [0, -2.174018144607544, -1.9938501119613647, -2.2244787216186523, -2.1016628742218018, -2.0143206119537354, -2.095236301422119, -2.2232143878936768, -1.9363921880722046];
            snk.atvy = [0, -0.7573261260986328, -0.7961844801902771, -0.3080170750617981, 0.2950030565261841, 0.8237428069114685, 0.568598210811615, 0.027775723487138748, -0.6246974468231201];
            snk.atx = [10792, 10788.1982421875, 10784.205078125, 10780.369140625, 10776.814453125, 10773.0830078125, 10769.091796875, 10765.2275390625, 10761.48046875];
            snk.aty = [10800, 10799.658203125, 10798.2373046875, 10796.662109375, 10795.90625, 10796.720703125, 10798.310546875, 10799.6298828125, 10799.82421875];

            snk.atba = 0.0; // not sure what this is
            snk.atia = d(skin.antenna.alpha, 1.0);
            snk.atc1 = d(skin.antenna.color1, "#800");
            snk.atc2 = d(skin.antenna.color2, "#b00");

            if (skin.bulb) {
              snk.bsc = d(skin.bulb.scale, 0.25);
              snk.blba = d(skin.bulb.alpha, 1.0);
              snk.blbw = d(skin.bulb.width, snk.bulb.width);
              snk.blbh = d(skin.bulb.height, snk.bulb.height);
              snk.blbx = d(skin.bulb.x, -1 * (snk.bulb.width / 2));
              snk.blby = d(skin.bulb.y, -1 * (snk.bulb.width / 2));
            }

            snk.atwg = true;
            snk.abrot = true;
            snk.antenna_shown = true;
            snk.antenna = true;
          }; // end onload

          img.src = skin.bulb.image;
        }
      },

      /** Setup extra skins and override native setSkin */
      setupSkins: function () {
        if (skins.extras.length > 0) return;

        skins
          .add({ rbcs: [9, 9, 9, 13, 13, 13], stockSkinId: 3 }) // green/white
          .add({ rbcs: [9, 9, 9, 11, 11, 11], stockSkinId: 33 }) // black/white
          .add({ rbcs: [0, 0, 0, 8, 8, 8], stockSkinId: 8 }) // striped purple
          .add({ rbcs: [11], stockSkinId: 25 }) // black
          .add({
            rbcs: [11, 9, 11, 7, 7, 7],
            stockSkinId: 7, // spyke gaming
            antenna: {
              alpha: 1.0,
              color1: "#800",
              color2: "#B00",
            },
            bulb: {
              image: ss.resources.images.spykeLogo,
              scale: 0.3,
              alpha: 1.0,
              x: -16,
              y: -70,
            },
          })
          .add({ rbcs: [5, 5, 5, 11, 11, 11], stockSkinId: 20 }) // orange/black
          .add({
            rbcs: [12, 12, 12, 11, 11, 11],
            stockSkinId: 33, // SS
            antenna: {
              alpha: 1.0,
              color1: "#000000",
              color2: "#EDA407",
            },
            bulb: {
              image: ss.resources.images.ssLogo,
              scale: 0.3,
              alpha: 1.0,
              x: -12,
              y: -86,
            },
          })
          .add({
            rbcs: [6, 6, 6, 6, 12, 12, 12, 12],
            stockSkinId: 6, // thomas37847
            antenna: {
              alpha: 0.5,
              color1: "#9E706F",
              color2: "#F2A8A6",
            },
            bulb: {
              image: ss.resources.images.thomasLogo,
              scale: 0.5,
              alpha: 1.0,
              x: -16,
              y: -50,
            },
          })
          .add({ rbcs: [9, 9, 9, 9, 9, 9, 9, 12, 12, 12, 12, 12, 12, 12], stockSkinId: 5 }) //white/golden orange
          .add({ rbcs: [3, 3, 3, 3, 3, 3, 3, 9, 9, 9, 9, 9, 9, 9], stockSkinId: 3 }) //green/white
          .add({ rbcs: [9, 9, 9, 9, 9, 9, 9, 3, 3, 3, 3, 3, 3, 3], stockSkinId: 3 }) //white/green
          .add({ rbcs: [17, 17, 17, 17, 17, 17, 17, 9, 9, 9, 9, 9, 9, 9], stockSkinId: 0 }) //purple/white
          .add({ rbcs: [9, 9, 9, 9, 9, 9, 9, 17, 17, 17, 17, 17, 17, 17], stockSkinId: 0 }) //white/purple
          .add({ rbcs: [23, 23, 23, 23, 23, 23, 23, 9, 9, 9, 9, 9, 9, 9], stockSkinId: 2 }) //light blue/white
          .add({ rbcs: [9, 9, 9, 9, 9, 9, 9, 23, 23, 23, 23, 23, 23, 23], stockSkinId: 2 }) //white/light blue
          .add({ rbcs: [18, 18, 18, 18, 18, 18, 18, 9, 9, 9, 9, 9, 9, 9], stockSkinId: 4 }) //golden/white
          .add({ rbcs: [22, 22, 22, 22, 22, 22, 22, 9, 9, 9, 9, 9, 9, 9], stockSkinId: 5 }) //orange/white
          .add({ rbcs: [7, 7, 7, 7, 18, 18, 18, 18], stockSkinId: 18 }) //red/gold
          .add({ rbcs: [26, 26, 26, 26, 26, 26, 26, 27, 27, 27, 27, 27, 27, 27], stockSkinId: 12 }) //jelly green/red
          .add({ rbcs: [27, 27, 27, 27, 27, 27, 27, 26, 26, 26, 26, 26, 26, 26], stockSkinId: 12 }) //jelly red/green
          //.add ({rbcs: [18,18,12,5,22,5,12,18,18], stockSkinId: 4 }) //golden striped
          .add({ rbcs: [0, 17], stockSkinId: 0 }) // purple striped
          .add({
            rbcs: [11, 11, 13, 13],
            stockSkinId: 27, // SlitherClips
            antenna: {
              alpha: 0.5,
              color1: "#252525",
              color2: "#646464",
            },
            bulb: {
              image: ss.resources.images.slitherClipsLogo,
              scale: 0.16,
              alpha: 1.0,
              x: -15,
              y: -146,
            },
          })
          .add({
            rbcs: [11, 26, 26, 26],
            stockSkinId: 27, // Wired Gaming
            antenna: {
              alpha: 0.5,
              color1: "#252525",
              color2: "#646464",
            },
            bulb: {
              image: ss.resources.images.jokerHead,
              scale: 0.1,
              alpha: 1.0,
              x: -18,
              y: -320,
            },
          })
          .add({ rbcs: [29, 29, 11, 31, 11], stockSkinId: 54 }) // Red TT Sleek
          .add({ rbcs: [29, 29, 11, 34, 11], stockSkinId: 8 }) // Pink TT Sleek
          .add({
            rbcs: [29, 29, 11, 34, 11],
            stockSkinId: 8, // Cyristal Playz (kawaii)
            antenna: {
              alpha: 0.5,
              color1: "#252525",
              color2: "#646464",
            },
            bulb: {
              image: ss.resources.images.kawaii,
              scale: 0.2,
              alpha: 1.0,
              x: -80,
              y: -108,
            },
          })
          .add({ rbcs: [33, 33, 33, 29, 29, 29], stockSkinId: 56 }) // Glowey Orange/Black
          .add({ rbcs: [33, 33, 33, 32, 32, 32], stockSkinId: 55 }) // Glowey Orange/Yellow
          .add({
            rbcs: [35, 35, 35, 35, 35, 35, 35, 33, 33, 33, 33, 33, 33, 33], // Glowey Orange/Green
            stockSkinId: 56,
          })
          .add({
            rbcs: [33, 33, 33, 33, 33, 33, 33, 35, 35, 35, 35, 35, 35, 35], // Glowey Green/Orange
            stockSkinId: 58,
          })
          .add({ rbcs: [29, 29, 11, 29, 11], stockSkinId: 44 }) // The Worminator
          .add({
            rbcs: [29, 29, 29, 29, 29, 31, 31, 31, 31, 31, 32, 32, 32, 32, 32], // Glowey Black/Red/Yellow Stripe
            stockSkinId: 11,
          })
          .add({
            rbcs: [11, 11, 11, 11, 11, 9, 9, 9, 9, 9, 18, 18, 18, 18, 18], // YonduBR
            stockSkinId: 4,
            antenna: {
              alpha: 0.5,
              color1: "#252525",
              color2: "#646464",
            },
            bulb: {
              image: ss.resources.images.yondubr,
              scale: 0.13,
              alpha: 1.0,
              x: -90,
              y: -140,
            },
          })
          .add({ rbcs: [29, 29, 29, 29, 32, 32, 32, 32, 32, 32], stockSkinId: 55 }) // Killer Bee
          .add({
            rbcs: [31, 31, 31, 7, 29, 7],
            stockSkinId: 54, // FNAF Foxy, Arianna
            antenna: {
              alpha: 0.5,
              color1: "#e52525",
              color2: "#c46464",
            },
            bulb: {
              image: ss.resources.images.foxyHead,
              scale: 0.135,
              alpha: 1.0,
              x: -90,
              y: -160,
            },
          })
          .add({
            rbcs: [
              7,
              7,
              7,
              7,
              7,
              14,
              14,
              14,
              7,
              7,
              9,
              7,
              9,
              7,
              7,
              7,
              7,
              7,
              7,
              7, // King of Agario
              14,
              14,
              14,
              14,
              14,
              7,
              7,
              7,
              14,
              14,
              9,
              14,
              9,
              14,
              14,
              14,
              14,
              14,
              14,
              14,
            ],
            stockSkinId: 55,
          })
          .add({
            rbcs: [4, 4, 4, 4, 4, 13, 13, 13, 13, 13, 9, 9, 9, 9, 9],
            stockSkinId: 54, // MopeX
            antenna: {
              alpha: 0.5,
              color1: "#252525",
              color2: "#646464",
            },
            bulb: {
              image: ss.resources.images.mopeXLogo,
              scale: 0.72,
              alpha: 1.0,
              x: -25,
              y: -20,
            },
          })
          .add({
            rbcs: [33, 33, 33, 12],
            stockSkinId: 4, // Teddy Bear
            antenna: {
              alpha: 0.5,
              color2: "#c78b31",
              color1: "#966308",
            },
            bulb: {
              image: ss.resources.images.teddyBear,
              scale: 0.22,
              alpha: 1.0,
              x: -100,
              y: -80,
            },
          })
          .add({
            rbcs: [34, 34, 34, 34, 29, 11, 11, 11, 11, 29],
            stockSkinId: 8, // Kitkat Angel
            antenna: {
              alpha: 0.5,
              color2: "#f740ff",
              color1: "#f740ff",
            },
            bulb: {
              image: ss.resources.images.kitkatAngel,
              scale: 0.7,
              alpha: 1.0,
              x: -46,
              y: -56,
              width: 100,
              height: 100,
            },
          })
          .add({
            rbcs: [5, 5, 5, 5, 5, 5, 5, 11, 9, 11],
            stockSkinId: 5, // TDK cassette
            antenna: {
              alpha: 0.5,
              color2: "#333333",
              color1: "#222222",
            },
            bulb: {
              image: ss.resources.images.tdkCassette,
              scale: 0.205,
              alpha: 1.0,
              x: -22,
              y: -94,
            },
          })
          .add({
            rbcs: [31, 31, 31, 31, 31, 9, 11, 11, 11, 11, 11, 11, 9],
            stockSkinId: 7, // TDK cassette
            antenna: {
              alpha: 0.5,
              color2: "#222",
              color1: "#333",
            },
            bulb: {
              image: ss.resources.images.psychoSmith,
              scale: 0.52,
              alpha: 1.0,
              width: 100,
              height: 100,
              x: -18,
              y: -50,
            },
          });

        window.setSkin = function (snk, skinId, customSkinParts) {
          skinId = parseInt(skinId);
          var isOnSkinChooser = $("#psk").is(":visible");

          if (isOnSkinChooser && typeof snk.rcv == "undefined") {
            // Should be entering the skin chooser for the first time.
            skinId = skins.savedSkin;
          } else if (isOnSkinChooser) {
            // Probably scrolling though the skin chooser.
            skins.skin = skinId;
          }

          impl.resetAntenna(snk);
          impl.superSetSkin(snk, skinId, customSkinParts);
          if (!isOnSkinChooser && window.slither !== snk) return; // Random slither on the board, let's leave it be.

          snk.SSkin = false;
          if (skinId > impl.superMaxSkinCv) {
            var c;
            var skin = skins.get(skinId);
            if (skin !== null) {
              c = skin.rbcs;
              snk.SSkin = true;
            } else {
              skinId %= 9;
            }

            c && (skinId = c[0]);
            snk.rbcs = c;
            snk.cv = skinId;

            if (skin && (skin.antenna || skin.bulb)) impl.addAntenna(snk, skin);
          }
        };
      },

      loop: function () {
        skins.rotate();
        setTimeout(impl.loop, 1500);
      },

      resetAntenna: function (snk) {
        snk.bulb = null;
      },
    };

    var skins = {
      slug: "skins",
      skin: 0,
      savedSkin: 0,

      extras: [],

      init: function () {
        skins.skin = parseInt(ss.loadOption("skinId", 0));
        if (!ss.isInt(skins.skin) || typeof skins.skin == "undefined" || isNaN(skins.skin)) skins.skin = 0;

        skins.savedSkin = skins.skin;
        impl.setupSkins();
        impl.loop();
        skins.setStockSkin(skins.savedSkin);

        // Add event listener to Save button in the skin chooser.
        if ((b = document.getElementsByClassName("sadg1")[1])) {
          b.addEventListener(
            "click",
            function () {
              ss.skins.savedSkin = ss.skins.skin;
              ss.saveOption("skinId", ss.skins.savedSkin);
              window.slither.rcv = ss.skins.setStockSkin(ss.skins.savedSkin);
            },
            false
          );
        }
      },

      /** adds an additional skin after stock skins */
      add: function (skin) {
        if (typeof skin.rbcs == "undefined" || skin.rbcs == null || skin.rbcs.length <= 0) return skins;

        skins.extras.push(skin);
        window.max_skin_cv += 1;
        return skins;
      },

      /** gets an extra skin */
      get: function (skinId) {
        if (skinId <= impl.superMaxSkinCv || skinId > max_skin_cv) return null;

        return skins.extras[skinId - impl.superMaxSkinCv - 1];
      },

      /** go to next skin if rotation is enabled */
      rotate: function () {
        haveSlither = typeof window.ws != "undefined" && !$("#psk").is(":visible") && typeof window.slither != "undefined" && window.slither != null;
        if (!haveSlither) return;

        if (ss.options.rotateSkins) {
          skins.next();
        } else if ((skins.skin > impl.superMaxSkinCv && !slither.SSkin) || (skins.skin !== slither.rcv && !slither.SSkin)) {
          setSkin(slither, skins.skin);
        }
      },

      /** go to the next skin */
      next: function () {
        if (typeof window.slither == "undefined") return;

        skins.skin += 1;

        if (skins.skin > max_skin_cv) skins.skin = 0;

        setSkin(window.slither, skins.skin);
      },

      /** go to the previous skin */
      previous: function () {
        if (typeof window.slither == "undefined") return;

        if (skins.skin <= 0) skins.skin = max_skin_cv;
        else skins.skin -= 1;
        setSkin(window.slither, skins.skin);
      },

      /** Set the stock skin. This controls how the skin is visible to other players,
        and the dot color. */
      setStockSkin: function (skinId) {
        if (skinId < impl.superMaxSkinCv) {
          // not an extra skin, noop
          return skinId;
        }
        var stockSkinId = 0;
        var skin = skins.get(skinId);
        if (!skin || !(stockSkinId = skin.stockSkinId)) {
          ss.log(
            "setStockSkin: Failed to get skin's stockSkinId, or none has been \
                 defined. Stock skin remains " +
              skinId +
              "."
          );
          return skinId;
        }
        localStorage.slitherrcv = stockSkinId;
        return stockSkinId;
      },
    };
    return skins;
  })()
);
