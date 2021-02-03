/**
 * CodeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    
    list: async function(req, res){
        let dev = req.body.devId;
        let codes = await Code.find({
            device: dev
        });
        if(codes.length > 0){
            return res.status(200).json({
                codes: codes
            });
        }
        return res.status(404).json({
            status: 404,
            error: 'Sin codigos'
        });
    },
    
    create: async function(req, res){
        // let newCodes = [{
        //     name: 'countdown_1', 
        //     numberCode: '9', 
        //     value: '0', 
        //     device: 1 
        // },{
        //     name: 'countdown_1', 
        //     numberCode: '9', 
        //     value: '0', 

        //     device: 1 
        // }]
        let newCodes = req.body.codes;
        let codesCreated = await Code.createEach(newCodes).fetch();
    
        return res.status(201).json(codesCreated);
    },

};

