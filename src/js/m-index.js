// store portfolioData and render portfolioData
let videoPortfolioData = [
    {
        url: 'https://www.bilibili.com/video/BV1UF4m1T73e/?spm_id_from=333.1007.top_right_bar_window_history.content.click&vd_source=f5bba81ca8b73b2852e36b66ab1dc349',
        playerUrl: "https://player.bilibili.com/player.html?aid=1200393032&cid=1434970450&page=1",
        title: '【西电Shining动漫社】晒你2024拜年祭',
        imageUrl: 'http://i1.hdslb.com/bfs/archive/a1c7a6c505b3d0a95fba01601aa3e614670a99f3.jpg'
    },
    {
        url: '#',
        playerUrl: "https://player.bilibili.com/player.html?aid=1900100426&cid=1426429072&page=1",
        title: '【魔法少女小圆/MAD】不爱我，就去死吧（重制版）',
        imageUrl: 'http://i0.hdslb.com/bfs/archive/aa6705c8cbc01e274e3fcd88daa1f6c2c3811ded.jpg'
    },
    {
        url: '#',
        playerUrl: "https://player.bilibili.com/player.html?aid=704027549&cid=1284892010&page=1",
        title: '【Shining动漫社/MEP】Baby you P7',
        imageUrl: 'http://i0.hdslb.com/bfs/archive/5c5aa327d05c49c80f36086d2acaac6e90e436bf.jpg'
    },
    {
        url: '#',
        playerUrl: "https://player.bilibili.com/player.html?aid=872156405&cid=1231704755&page=1",
        title: 'Shining ACG 2023晒你祭',
        imageUrl: 'http://i1.hdslb.com/bfs/archive/163fea372e7c227ac9ed14f9967749ca0b9b24f3.jpg'
    },
]

renderVideoPortfolioData()
function renderVideoPortfolioData() {
    let content = ''
    videoPortfolioData.forEach(element => {
        content += ` 
    <div class="content-box">
        <h3>${element.title}</h3>
        <iframe src=${element.playerUrl}+'&autoplay=0'
                        allow="fullscreen">
        </iframe>
        <div class="function-bar">
            <a class="fullscreen">全屏观看</a>
            <a class="link-to-origin" href=${element.url} target="_blank">跳转到源链接</a>
        </div>
    </div>
    `
    })
    document.querySelector('.video-portfolio .box-container').innerHTML = content
}

// control menu display and Elevator navigation
const menu = document.querySelector('.menu')

menu.addEventListener('click', function (e) {
    if (!menu.classList.contains('active')) {
        menu.classList.add('active')
        // innerHTML里面.close div内必须加上和li一样的类名——由于事件冒泡，当用户触碰这两个div的时候，不会触发菜单栏关闭事件。
        menu.innerHTML = `
        <ul>
            <li data-id="1">排版</br>作品</li>
            <li data-id="2">视频</br>作品</li>
            <li data-id="3">文档</li>
            <li class="top"><a href='#'>回到</br>顶部</a></li>
            <li class="close">
                <a href='#'>
                    <div class="close"></div>
                    <div class="close"></div>
                </a>
            </li>
        </ul>
         `
        // 每次激活菜单，都判断当前哪个li被激活
        scrollResponse()
    } else {
        // 注意这里不能用this.target，因为this指向menu，而menu没有target属性
        if (e.target.classList.contains('close')) {
            //这里单独设置heigth属性、使用setTimeout是为了在关闭菜单的时候，让文字和盒子一起下降，下降到原有高度之后再显露Menu
            menu.style.maxHeight = '.8rem'
            const old = document.querySelector('.menu ul .active')
            setTimeout(() => {
                menu.innerHTML = '<span>Menu</span>'
                menu.classList.remove('active')
                menu.style.maxHeight = ''
            }, 400)
        }
        else if (e.target.classList.contains("top")) {
            document.documentElement.scrollTop = 0
        }
        else if (e.target.tagName === "LI") {
            // 用户点击导航按钮时，仍然需要给li 加上active了，因为虽然后面监听scroll事件的函数会自动检测当前页面所处位置，从而给li加上active属性，
            // 但是如果我为scroll的时候，去点击导航按钮，则li不会被active，因而出现bug
            const old = document.querySelector('.menu ul .active')
            if (old) old.classList.remove('active')
            e.target.classList.add('active')
            document.documentElement.scrollTop = document.querySelector(`.body>div:nth-child(${e.target.dataset.id})`).offsetTop
        }
    }
})

window.addEventListener('scroll', () => {
    scrollResponse()
})

function scrollResponse() {
    // 因为开始 .menu li 是隐藏的，所以如果不加这个判断条件，后面获取它的时候就会报错。并且在它隐藏的时候我们也不需要侦测scroll以动态响应scrollTop的变化。
    if (document.querySelector('.menu').classList.contains('active')) {
        const scrollTop = document.documentElement.scrollTop
        const li1 = document.querySelector(`.body .typesetting-portfolio`)
        const li2 = document.querySelector(`.body .video-portfolio`)
        const li3 = document.querySelector(`.body .document`)
        const old = document.querySelector('.menu ul .active')
        if (old) old.classList.remove('active')
        if (scrollTop >= li1.offsetTop && scrollTop < li2.offsetTop) {
            document.querySelector('.menu li[data-id="1"]').classList.add('active')
        } else if (scrollTop >= li2.offsetTop && scrollTop < li3.offsetTop) {
            document.querySelector('.menu li[data-id="2"]').classList.add('active')
        } else if (scrollTop >= li3.offsetTop) {
            document.querySelector('.menu li[data-id="3"]').classList.add('active')
        }
    }
}

//  display content when title is touched
const body = document.querySelector('.body')
const boxContainer = document.querySelector('.body .box-container')
let timerId = null

body.addEventListener('click', (e) => {
    if (timerId === null) {
        if (e.target.tagName === 'H2') {
            e.target.classList.toggle('active')
            e.target.nextElementSibling.classList.toggle('active')
        }
        // 实现先执行事件的节流
        timerId = setTimeout(() => {
            timerId = null
        }, 400)
    }
})

// 全屏播放视频
const fullScreenButton = document.querySelector('.fullscreen')

const iframe = document.querySelector('iframe')

fullScreenButton.addEventListener('click', function () {
    iframe.requestFullscreen()
})

// 对2d的function-button实现touch时向用户提示的效果
// 注意，hover会和touch事件冲突，需要用媒体查询消除冲突
const functionButtons2d = document.querySelectorAll('.function-button-2d')

for (const functionButton2d of functionButtons2d) {
    functionButton2d.addEventListener('touchstart', function () {
        this.style.transform = 'translate(-0.0667rem, -0.0667rem)'
        this.style.borderRadius = '.1333rem'
        this.style.boxShadow = '.0133rem .0133rem .0133rem .0133rem rgba(0, 0, 0, 0.2)'
    })
    functionButton2d.addEventListener('touchend', function () {
        this.style = ""
    })
}

// 检测pdf是否加载成功
// const pdfObject = document.querySelector('.typesetting-portfolio .box-container .pdf');

// bug
// bug
// bug
// bug
// bug
// bug
// bug
// bug
// bug
// 不确定是否有效，仍待手机端验证
function isPDFSupported() {
    const pdfTest = document.createElement('object');
    pdfTest.type = 'application/pdf';
    return pdfTest.type === 'application/pdf';
}

// 加载不成功，则让高度适应object内p的高度
if (!isPDFSupported()) {
    pdfObject.style.height = 'auto'
}

// transform markdown to html
const document_boxContainer_contentBox = document.querySelector('.body .document .box-cotainer')
// abandoned now

