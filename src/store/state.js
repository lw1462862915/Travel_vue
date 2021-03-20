// try catch 写法防止游览器隐身状态下报错问题
let defaultCity = '深圳'
try {
    if (localStorage.city) {
        defaultCity = localStorage.city
    }
} catch(e) {}

export default {
    city: defaultCity
}