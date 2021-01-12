// const express = require('express');
// const { validate } = require('../db');
// const router = express.Router();
// const validateSession = require('../middleware/validateSession');
const Campaign = require('../models/campaigns');

exports.getCampaigns = (req, res) => {
    Campaign.findAll()
        .then(campaign => res.status(200).json(campaign))
        .catch(err => res.status(500).json({
            error: err
        }))
}

exports.getCampaign = (req, res) => {
    Campaign.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(campaign => res.status(200).json(campaign))
        .catch(err => res.status(500).json({
            error: err
        }))
}

exports.createCampaign = (req, res) => {         
    const campaign = {
        title: req.body.title,
        description: req.body.description,
        videoURL: req.body.videoURL,
        endDate: req.body.endDate,
        softCap: req.body.softCap,
        userId: req.user.id
    }
    Campaign.create(rating)
        .then(campaign => res.status(200).json(campaign)
        .catch(err => res.status(500).json({error: err })
        ))

}
            
exports.editCampaign = (req, res) => {
    const query = req.params.id;
    Campaign.update(req.body, {
            where: {
                id: query
            }
        })
        .then((campaignUpdated) => {
            Campaign.findOne({
                    where: {
                        id: query
                    }
                })
                .then((locatedUpdatedCampaign) => {
                    res.status(200).json({
                        campaign: locatedUpdatedCampaign,
                        message: "Campaign updated successful",
                        campaignChanged: campaignUpdated,
                    });
                });
        })
        .catch((err) => res.json(err));
};

exports.deleteCampaign = (req, res) => {
    Campaign.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(campaign => res.status(200).json(campaign))
        .catch(err => res.json({
            error: err
        })) // OR json(err)
}

// module.exports = router;