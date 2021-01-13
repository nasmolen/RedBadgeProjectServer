const Comment = require('../models/comments');

exports.getComments = (req, res) => {
    Comment.findAll()
        .then(comment => res.status(200).json(comment))
        .catch(err => res.status(500).json({
            error: err
        }))
}

exports.getSomeComments = (req, res) => {
    Comment.findAll({
            where: {
                pageID: req.params.pageID
            }
        })
        .then(comment => res.status(200).json(comment))
        .catch(err => res.status(500).json({
            error: err
        }))
}

exports.createComment = (req, res) => {         
    const comment = {
        commentText: req.body.commentText,
        userID: req.user.id,
        pageID: req.params.pageID
    }
    Comment.create(comment)
        .then(comment => res.status(200).json(comment)
        .catch(err => res.status(500).json({error: err })
        ))

}
            
exports.editComment = (req, res) => {
    const query = req.params.id;
    Comment.update(req.body, {
            where: {
                id: query
            }
        })
        .then((commentUpdated) => {
            Comment.findOne({
                    where: {
                        id: query
                    }
                })
                .then((locatedUpdatedComment) => {
                    res.status(200).json({
                        comment: locatedUpdatedComment,
                        message: "Comment updated successful",
                        commentChanged: commentUpdated,
                    });
                });
        })
        .catch((err) => res.json(err));
};

exports.deleteComment = (req, res) => {
    Comment.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(comment => res.status(200).json(comment))
        .catch(err => res.json({
            error: err
        })) // OR json(err)
}