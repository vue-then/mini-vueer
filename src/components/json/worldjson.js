
import worldaddress from './world.json'

let jsonList =[]
var goodCountry = ["中国", "日本", "朝鲜", "韩国", "蒙古", "越南", "柬埔寨", "老挝", "缅甸", "新加坡", "菲律宾", "印尼", "马来西亚", "文莱", "菲律宾", "东帝汶", "阿富汗", "伊朗", "土耳其", "塞浦路斯", "叙利亚", "黎巴嫩", "巴勒斯坦", "约旦", "以色列", "伊拉克", "科威特", "沙特阿拉伯", "也门", "阿曼", "阿拉伯联合酋长国", "卡塔尔", "巴林", "格鲁吉亚", "亚美尼亚", "阿塞拜疆", "印度", "孟加拉国", "巴基萨坦", "斯里兰卡", "马尔代夫", "尼泊尔", "不丹", "克什米尔地区", "哈萨克斯坦", "土库曼斯坦", "塔吉克斯坦", "乌兹别克斯坦", "挪威", "丹麦", "瑞典", "芬兰", "英国", "爱尔兰", "荷兰", "比利时", "卢森堡", "法国", "西班牙", "葡萄牙", "德国", "奥地利", "新西兰", "其他"]

~function makeJson() {
    // console.log(worldaddress, 'worldaddress')
    // console.log(Object.keys(worldaddress.Earth.Country))
    var c = {}
    Object.keys(worldaddress.Earth.Country).map(v => {
        let country = worldaddress.Earth.Country[v * 1];
        // console.log(country.CountryName)
        if (!goodCountry.includes(country.CountryName)) {
            return;
        }
        c[country.CountryName] = {}
        // console.log(country.Station, 'country')
        // c[country.CountryName][]
        if (country.Station) {
            country.Station.map((v2, i) => {
                // console.log(v2, '-------')
                c[country.CountryName][v2.StationName] = []
                if (v2.City) {
                    if (v2.City.constructor === Array) {
                        v2.City.map(v3 => {
                            // console.log(v3.CityName,'CityName')
                            c[country.CountryName][v2.StationName].push(v3.CityName)
                        })
                    }
                    if (v2.City.constructor === Object) {
                        // console.log(v2.City.CityName)
                        c[country.CountryName][v2.StationName].push(v2.City.CityName)
                    }
                }
            })
        }
        jsonList = c;
    })
}()

export default jsonList;
