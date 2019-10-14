import provincesCity from './provincesCities.json';
let provinceObj = {}
let provinceList = []

~function hasPlace() {
    Object.keys(provincesCity).map((v, i) => {
            provinceList.push(v);
        //如果key 为 ’市辖区‘ 即 直接取对应的 辖区名称 arr
        var arr = [];
        var arrflag = 0;
        var arr2 = [];
        Object.keys(provincesCity[v]).map((v2, i2) => {
            // console.log(v2,'v2')
            if (v2 == "市辖区") {
                arrflag = 1;
                arr.push(provincesCity[v]["市辖区"]);
                // console.log(arr,'arr')
                return;
            }
            arr2.push(v2);
        });
        if (arrflag == 1) {
            provinceObj[v] = arr[0];
        } else {
            provinceObj[v] = arr2;
        }
    });
}();

let provinceObjs = {
    provinceObj,
    provinceList
}

export default provinceObjs;