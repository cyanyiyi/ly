var cqsj = {};
cqsj.url = window.location.href, cqsj.userCode, cqsj.userName = "", cqsj.userAvatar = "", cqsj.tel = "", cqsj.imgs = ["http://ome0dl4la.bkt.clouddn.com/background.jpg", "./img/preview.jpg"], cqsj.per = "", cqsj.newimages = [], cqsj.count = 0, cqsj.done = !1, String.prototype.trim || (String.prototype.trim = function () {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
}), cqsj.start = function () {
    cqsj.initShareInfo(), cqsj.handleLowScreen(), cqsj.handleImageList(), cqsj.loadImages(), cqsj.handleListener()
}, cqsj.initShareInfo = function () {
    var e = cqsj.url.replace(window.location.hash, "");
    $.getJSON("http://www.sphinxcapital.com.cn/wxapi/signature.php?url=" + encodeURIComponent(e)).done(function (e) {
        wx.config({
            debug: !1,
            appId: e.appId,
            timestamp: e.timestamp,
            nonceStr: e.nonceStr,
            signature: e.signature,
            jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"]
        })
    }), wx.ready(function () {
        wx.onMenuShareAppMessage({
            title: "《男人装》柳岩带你进入传奇世界",
            desc: "首个最爽战斗嗨趴，邀你来玩！",
            link: "http://www.sphinxcapital.com.cn/cqsj/",
            imgUrl: "http://ome0dl4la.bkt.clouddn.com/share_img.png"
        }), wx.onMenuShareTimeline({
            title: "《男人装》柳岩带你进入传奇世界",
            link: "http://www.sphinxcapital.com.cn/cqsj/",
            imgUrl: "http://ome0dl4la.bkt.clouddn.com/share_img.png"
        })
    })
}, cqsj.initMovie = function () {
    var e = document.getElementById("video");
    e.play(), document.addEventListener("WeixinJSBridgeReady", function () {
        e.play()
    }, !1)
}, cqsj.handleLowScreen = function () {
    $(window).height() < 420 ? $("body").addClass("low-screen-height") : $(window).height() > 600 && $("body").addClass("height-screen-height"), $(window).width() / $(window).height() > .72 && $("body").addClass("low-screen-ratio")
}, cqsj.handleImageList = function () {
    window.devicePixelRatio > 1.5 ? cqsj.imgs[cqsj.imgs.length] = "sprite/style-index@2x.png" : cqsj.imgs[cqsj.imgs.length] = "sprite/style-index.png", cqsj.len = cqsj.imgs.length, cqsj.per = 1 / cqsj.len
}, cqsj.imageloadpost = function () {
    var e = this;
    e.count++, e.count == e.len && setTimeout(function () {
        $(".b-loading__text").addClass("hide"), $(".b-loading__text-done").addClass("animate"), $("#button-show").show().addClass("animate")
    }, 2500)
}, cqsj.loadImages = function () {
    for (var e = this, t = 0; t < e.len; t++) e.newimages[t] = new Image, e.newimages[t].src = e.imgs[t], e.newimages[t].onload = function () {
        e.imageloadpost()
    }, e.newimages[t].onerror = function () {
        e.imageloadpost()
    }
}, cqsj.switchPageWithTransition = function (e, t, n) {
    $(e).animate({
        opacity: 0
    }, n, function () {
        $(e).css("opacity", 1), $(e).addClass("hide"), $(t).removeClass("hide")
    })
}, cqsj.handleListener = function () {
    $("#button-show").on("click", function () {
        cqsj.switchPageWithTransition(".b-page-loading", ".b-page-movie", 200);
        var e = 0,
            t = setInterval(function () {
                0 == e ? $("#video-loading").text("正在加载.") : 1 == e ? $("#video-loading").text("正在加载..") : $("#video-loading").text("正在加载..."), e = ++e % 3
            }, 500),
            n = document.getElementById("video");
        n.play();
        var i = $("#video");
        i.on("playing", function () {
            clearInterval(t), $(".b-video__placeholder").addClass("hide"), $("#button-skip").removeClass("hide")
        }), i.on("ended", function () {
            cqsj.switchPageWithTransition(".b-page-movie", ".b-page-generate", 300), setTimeout(function () {
                $(".b-page-generate").addClass("animate")
            }, 300)
        })
    }), $("#button-again").click(function () {
        cqsj.switchPageWithTransition(".b-page-edit", ".b-page-movie", 400), $("#video")[0].play(), $("#video").bind("ended", function () {
            cqsj.switchPageWithTransition(".b-page-movie", ".b-page-edit", 300)
        })
    }), $("#button-skip").click(function () {
        var e = document.getElementById("video");
        e.pause(), cqsj.done ? cqsj.switchPageWithTransition(".b-page-movie", ".b-page-edit", 300) : (cqsj.switchPageWithTransition(".b-page-movie", ".b-page-generate", 300), setTimeout(function () {
            $(".b-page-generate").addClass("animate")
        }, 300))
    }), $("#input").bind("focus", function () {
        $("body").hasClass("error") && ($("#input-shake").removeClass("animate"), $("body").removeClass("error"))
    }), $("#button-generate").click(function () {
        var e = $("#input").val();
        return "" == e ? ($("#input-shake").addClass("animate"), $("body").addClass("error"), !1) : ($("#input-shake").removeClass("animate"), $("body").removeClass("error"), cqsj.userName = e, cqsj.generateImage(), cqsj.done = !0, $(".b-page-generate .b-option").addClass("hide"), $(".b-page-generate .b-option-done").removeClass("hide"), void setTimeout(function () {
            cqsj.switchPageWithTransition(".b-page-generate", ".b-page-edit", 400)
        }, 2500))
    })
}, cqsj.generateImage = function () {
    var e = 666,
        t = 666;
    $("#canvas").css({
        width: e,
        height: t
    });
    var n = document.getElementById("canvas");
    n.width = 2 * e, n.height = 2 * t;
    var i = n.getContext("2d"),
        a = new Image;
    a.src = "./img/preview.jpg", a.onload = function () {
        i.drawImage(a, 0, 0, n.width, n.height), i.font = "50px verdana", i.textAlign = "center", i.fillStyle = "#E9E1C9", i.save(), i.transform(1, 0, 0, 1, e - 63, t - 50), i.rotate(Math.PI / 27), i.fillText(cqsj.fittingString(i, cqsj.userName, 400), 0, 0), i.restore();
        var s = n.toDataURL("image/jpeg");
        $(".b-preview__canvas").attr("src", s)
    }
}, cqsj.fittingString = function (e, t, n) {
    var i = e.measureText(t).width,
        a = "…",
        s = e.measureText(a).width;
    if (i <= n || i <= s) return t;
    for (var o = t.length; i >= n - s && o-- > 0;) t = t.substring(0, o), i = e.measureText(t).width;
    return t + a
}, cqsj.start();