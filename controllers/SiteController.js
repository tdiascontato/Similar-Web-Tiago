require('dotenv').config()
const Site = require('../models/Site')

exports.request = async(req, res) => {
    try{
        
        const { url } = req.params

        const options = {method: 'GET', headers: {accept: 'application/json'}}

        const response = await fetch(`https://api.similarweb.com/v1/website/${url}/general-data/all?api_key=${process.env.API_KEY_SIMILARWEB}&format=json`, options)
        const data = await response.json()
        console.log(data)
        return res.status(201).json({success: true, description: 'success in: '+url, data})

    }catch(err){
        res.status(400).json({success:false, erro: "request api", description: err})
    }
}
exports.save_info = async(req, res)=> {
    try{
        const {url} = req.params
        const options = {method: 'GET', headers: {accept: 'application/json'}}
        const response = await fetch(`https://api.similarweb.com/v1/website/${url}/general-data/all?api_key=${process.env.API_KEY_SIMILARWEB}&format=json`, options)
        const data = await response.json()
        const savesite = new Site({
            url,
            data,
        });
        const savedSite = await savesite.save();

    res.status(201).json({ message: 'Informações salvas com sucesso.', id: savedSite._id })
    }catch(err){
        res.status(400).json({success: false, Erro: err})
    }
}
exports.return_info = async (req, res) => {
    try{
        const { url } = req.params
        const site = await Site.findOne({ url });
        return site ? res.status(201).json({ Conteúdo: site.data}) : res.status(400).json({success: false, Erro: 'Site não encontrado.'})
    }catch(err){
        res.status(400).json({Erro: 'Erro no catch '+err, Sucess: false})
    }
}