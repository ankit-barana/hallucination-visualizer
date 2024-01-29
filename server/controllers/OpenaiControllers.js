const { OpenAI } = require("openai");
const axios = require("axios");
const fs = require("fs");
const sharp = require("sharp"); 
require('dotenv').config();

const openai = new OpenAI({
    apiKey: "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",
});
 
let numGen = 1; // nth number of image-generation
let numMod = 1; // nth number of modification of given generation
let imageName = ""; // intializes image name 
let outputPath = ""; // we need make previous path accessible to each successible modification
let transparentImageBuffer = null; // stores the mask

const generateImage = async (req, res) => {
    try {
        const response = await openai.images.generate({
            model: "dall-e-2",
            prompt: req.body.description,
            n: 1,
            size: "512x512",
        });
        const imageUrl = response.data[0].url;
        console.log(imageUrl);

        // Creates a buffer from the image URL
        const imageBuffer = await axios.get(imageUrl, { responseType: 'arraybuffer' });

        // convert and save the image as PNG in images folder
        imageName = `image${numGen}.png`;
        outputPath = `./images/${imageName}`;
        numGen++;
        
        await sharp(Buffer.from(imageBuffer.data)).ensureAlpha().toFile(outputPath);

        // makes a transparent image to be used in modifyImage
        const originalImage = await sharp(outputPath);
        const metadata = await originalImage.metadata();
        transparentImageBuffer = await sharp({
            create: {
                width: metadata.width,
                height: metadata.height,
                channels: 4,
                background: { r: 0, g: 0, b: 0, alpha: 0 }
            }
        }).png().toBuffer();

        res.status(200).json({
            success: true,
            imageURL: imageUrl, // Sends the saved image path as a response
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while generating the image.' });
    }
}

const modifyImage = async (req, res) => {
    try {
        const response = await openai.images.edit({
            image: fs.createReadStream('./images/image1.png'),
            mask: fs.createReadStream('./images/transparent.png'),
            prompt: req.body.description,
            n: 1,
            size: "512x512",
        });
        const imageUrl = response.data[0].url;
        console.log(imageUrl);

        const imageBuffer = await axios.get(imageUrl, { responseType: 'arraybuffer' });

        imageName = `image${numGen}mod${numMod}.png`;
        outputPath = `./images/${imageName}`;
        numMod++;
        
        await sharp(Buffer.from(imageBuffer.data)).ensureAlpha().toFile(outputPath);

        res.status(200).json({
            success: true,
            imageURL: imageUrl, // Sends the saved image path as a response
        });
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while modifying the image.' });
    }
}

module.exports = { generateImage, modifyImage };