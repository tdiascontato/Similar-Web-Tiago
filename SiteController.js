require('dotenv').config()
// const axios = require('axios')
const Site = require('../models/Site')

exports.request = async (req, res) => {
    try {

        const { url } = req.params
        const response = await fetch(`https://pro.similarweb.com/api/WebsiteOverview/getheader?keys=${url}&mainDomainOnly=true&includeCrossData=true&webSource=Total`, {
            "headers": {
              "accept": "application/json",
              "accept-language": "pt-BR,en;q=0.9,pt;q=0.8",
              "cache-control": "no-cache",
              "content-type": "application/json; charset=utf-8",
              "pragma": "no-cache",
              "sec-ch-ua": "\"Not_A Brand\";v=\"8\", \"Chromium\";v=\"120\", \"Google Chrome\";v=\"120\"",
              "sec-ch-ua-mobile": "?0",
              "sec-ch-ua-platform": "\"Windows\"",
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "same-origin",
              "x-requested-with": "XMLHttpRequest",
              "x-sw-page": "https://pro.similarweb.com/#/digitalsuite/acquisition/DMItracker?trackerId=39534dbd-ace6-4026-9937-be8e08921afb",
              "x-sw-page-view-id": "ef525d81-d0e9-42fd-b329-467f04b56237"
            },
            "referrer": "https://pro.similarweb.com/",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": null,
            "method": "GET",
            "mode": "cors",
            "credentials": "include"
          })
        const data = response.json();

        console.log(data)
        return res.status(201).json({ success: true, description: 'success in: ' + url, data })

    } catch (err) {
    console.error("Erro na solicitação da API:", err);
    res.status(400).json({ success: false, erro: "request api", description: err.message });
}
    
}
exports.save_info = async (req, res) => {
    try {
        const { url } = req.params
        const response = await fetch(`https://pro.similarweb.com/api/WebsiteOverview/getheader?keys=${url}&mainDomainOnly=false&includeCrossData=true&webSource=Desktop&country=999`)
        const data = await response.json()
        const savesite = new Site({
            url,
            data,
        });
        const savedSite = await savesite.save();

        res.status(201).json({ message: 'Informações salvas com sucesso.', id: savedSite._id, data: data })
    } catch (err) {
        res.status(400).json({ success: false, Erro: err })
    }
}
exports.return_info = async (req, res) => {
    try {
        const { url } = req.params
        const site = await Site.findOne({ url });
        return site ? res.status(201).json({ Conteúdo: site.data }) : res.status(400).json({ success: false, Erro: 'Site não encontrado.' })
    } catch (err) {
        res.status(400).json({ Erro: 'Erro no catch ' + err, Sucess: false })
    }
}