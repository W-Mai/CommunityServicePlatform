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

let ServerImage = {
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
                return ServerImage.newProxy(target, name)
            }
        })
    },
    init(path){
        return this.newProxy({path: path}, "static")
    }
}

let srvImg = ServerImage.init(SITE_URL)

module.exports = {
    SITE_URL, test, srvImg
    // rest api
   
}
