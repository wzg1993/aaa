var options = {
    imgCon: "box1", //正常图片的容器
    showImg: "box2", //放大镜显示图片区域
    mask: "mask", //正常图片上的滑动块
    imgList: "img-list", //图片列表的容器
    active: "active", //点击图片列表是给li添加的class （li.active{改变边框的颜色}）
};

function magnifier(opts) {
    var imgCon = document.getElementById(opts.imgCon),
        showImg = document.getElementById(opts.showImg),
        mask = document.getElementById(opts.mask),
        imgList = document.getElementById(opts.imgList).querySelectorAll("li");

    // 点击小图片改变上方的正常图片
    for (var i = 0, len = imgList.length; i < len; i++) {
        imgList[i].onclick = function() {
            for (var x = 0; x < len; x++) {
                imgList[x].classList.remove(opts.active);
            }
            
            var imgSrc = this.querySelector("img").src; //点击图片列表中当前图片的src
            document.getElementById(opts.imgCon).querySelector("img").src = imgSrc;
            this.classList.add(opts.active);
        }
    }

    imgCon.onmouseout = function() {
        mask.style.display = "none";
        showImg.style.display = "none";
    }

    imgCon.onmousemove = function(event) {
        mask.style.display = "block";
        showImg.style.display = "block";


        var e = event || window.event,
            x = e.clientX,
            y = e.clientY,
            mW = mask.offsetWidth,
            mH = mask.offsetHeight,
            imgConW = imgCon.offsetWidth,
            imgConH = imgCon.offsetHeight,
            imgConL = imgCon.getBoundingClientRect().left,
            imgConT = imgCon.getBoundingClientRect().top,
            X = x - imgConL,
            Y = y - imgConT,
            showImgSrc = document.getElementById(opts.imgCon).querySelector("img").src;
        document.getElementById(opts.showImg).querySelector("img").src = showImgSrc;

        mask.style.left = (X - mW / 2) + "px";
        mask.style.top = (Y - mH / 2) + "px";

        // 获取跟随鼠标移动后的偏移量
        var l = mask.offsetLeft,
            t = mask.offsetTop;

        mask.style.left = l + "px";
        mask.style.top = t + "px";

        //left范围
        if (l <= 0) {
            mask.style.left = "0";
        } else if (l >= imgConW - mW) {
            mask.style.left = imgConW - mW + "px";
        }

        //top值范围
        if (t <= 0) {
            mask.style.top = "0";
        } else if (t >= imgConH - mH) {
            mask.style.top = imgConH - mH + "px";
        }

        //放大显示部分
        var bigImg = document.getElementById(opts.showImg).querySelector("img"),
            bigImgW = bigImg.offsetWidth,
            bigImgH = bigImg.offsetHeight,
            xx = bigImgW / imgConW; //放大倍数

        bigImg.style.left = "-" + xx * l + "px";
        bigImg.style.top = "-" + xx * t + "px";

        console.log(xx + "...." + imgConT)
    }
}

magnifier(options);
