const Post = require("../models/postModel");

exports.listAllPosts = async(req, res) => {
    /* ES5
    Post.find({}, (error, posts) => {
            if(error) {
                res.status(500);
                console.log(error);
                res.json({message: "Erreur serveur"});
            } else {
                res.status(200);
                res.json(posts);
            }
        })
    */
    
    // ES6
    try {
        const posts = await Post.find({});
        res.status(200);
        res.json(posts);

    } catch (error) {
        res.status(500);
        console.log(error);
        res.json({ message: "Erreur serveur." })
    }
}

exports.createAPost = async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const post = await newPost.save();
        res.status(201);
        res.json(post);
    } catch (error) {
        res.status(500);
        console.log(error);
        res.json({ message: "Erreur serveur." })
    }
}
// getAPost 
exports.getAPost = async (req, res) => {
    const postId = req.params.id; 
    try {
        const post = await Post.findById(postId);
        if (!post) {
            res.status(404).json({ message: "Post non trouvé." });
            return;
        }
        res.status(200).json(post);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur." });
    }
};

// updateAPost 
exports.updateAPost = async (req, res) => {
    const postId = req.params.id; 
    try {
        const postToUpdate = await Post.findById(postId);
        if (!postToUpdate) {
            res.status(404).json({ message: "Post non trouvé." });
            return;
        }
        postToUpdate.title = req.body.title;
        postToUpdate.content = req.body.content;

        const updatedPost = await postToUpdate.save();
        res.status(200).json(updatedPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur." });
    }
};

//deleteAPost
exports.deleteAPost = async (req, res) => {
    const postId = req.params.id; 
    try {
        const deletedPost = await Post.findByIdAndDelete(postId);
        if (!deletedPost) {
            res.status(404).json({ message: "Post non trouvé." });
            return;
        }
        res.status(200).json(deletedPost);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur." });
    }
};