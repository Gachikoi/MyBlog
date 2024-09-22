if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
    // 当前设备是移动设备
    console.log('1')
    location.href = 'src/html/m-index.html'
}else{
    console.log('2')
}