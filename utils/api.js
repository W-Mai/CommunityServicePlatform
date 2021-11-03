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

const img_url = (category, name) => {
    return `${SITE_URL}/static/${category}/${name}`
}

module.exports = {
    SITE_URL, test,
    // rest api

    img_url
}
