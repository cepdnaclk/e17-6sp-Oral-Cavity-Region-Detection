
const express = require('express');
const router = express.Router();
const path = require("path");
const fs = require('fs');
const multer = require('multer')

var uploads = multer({ dest: 'uploads/' })

router.get('/:folder/:id', async (req, res) => {
    let filepath = path.join(__dirname + `/../images/${req.params.folder}/${req.params.id}.png`);
    res.sendFile(filepath);
});

const upload = async (image, folder, id) => {

    let dir = `images`;

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    dir = `images/${folder}`;

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }


    await image.mv(`images/${folder}/${id}.png`);
    //await image.mv();

    return `${config.DOMAIN}/images/${folder}/${id}`;
}


router.post('/:folder/:id', uploads.single('file'), async (req, res) => {
    try {
        console.log(req)
        let image = req.body.image;
        

        if (!image)
            return res.status(400).send({ message: 'Image not provided!' });

        const imageUrl = await upload(image, req.params.folder, req.params.id);

        if (imageUrl)
            res.status(201).send({ message: "Image uploaded", url: imageUrl });

    } catch (e) {
        res.status(400).send({ message: "Error uploading image!", error: e.toString(), req: req.body });
    }
});

router.delete('/:folder/:id', async (req, res) => {
    try {
        fs.unlinkSync(`images/${req.params.folder}/${req.params.id}.png`);

        res.status(201).send({ message: "Image deleted" });

    } catch (e) {
        res.status(400).send({ message: "Error deleting image!", error: e.toString(), req: req.body });
    }
});

module.exports = router;