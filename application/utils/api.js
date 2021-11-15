import {request} from './requests'

const SITE_URL = 'http://com-sp.xclz.tech:5050'

const test = async (code) => {
    return (await request({
        url: SITE_URL + '/api/test',
        method: "GET",
        header: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
            code: code
        },
    })).data
}

let ServerStaticRes = {
    innerClass(last, name) {
        let resPath = `${last.path}/${name}`
        let res = (filename) => {
            if(filename) return `${resPath}/${filename}`
            else return resPath
        }
        res.path = resPath
        return res
    },
    newProxy(last, name) {
        return new Proxy(this.innerClass(last, name), {
            get(target, name) {
                if (name === "path") return target.path
                return ServerStaticRes.newProxy(target, name)
            }
        })
    },
    init(path, category){
        return this.newProxy({
            path: path
        }, `static/${category}`)
    }
}

let srvImg = ServerStaticRes.init(SITE_URL, "imgs")

module.exports = {
    SITE_URL, test, srvImg
    // rest api
   
}
