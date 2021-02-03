/**
 * DeviceController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    list: async function(req, res){
        let owner = req.body.ownerId;
        let devices = await Device.find({
            ownerId: owner
        }).populate('codes');;
        if(devices.length > 0){
            return res.status(200).json({
                devices: devices
            });
        }
        return res.status(404).json({
            status: 404,
            error: 'Dispositivos no encontrados'
        });
    },
    
    create: async function(req, res){
        let newDevice = {
            ownerId: req.body.ownerId,
            devId: req.body.devId,
            name: req.body.name,
        }
    
        let deviceCreated = await Device.create(newDevice).fetch()
    
        return res.status(201).json(deviceCreated)
    },
    
    update: async function(req, res){
        let devId = req.params.id;
        let update = {
            ownerId: req.body.ownerId,
            devId: req.body.devId,
            name: req.body.name,
        }
        let deviceUpdated = await User.updateOne({id: devId}).set(update);
    
        return res.status(200).json(deviceUpdated);
    },
    
    delete: async function(req, res){
        let devId = req.params.id
    
        let deviceDeleted = await User.destroyOne({id: devId})
    
        return res.json(deviceDeleted);
    }
};

