const app = require('./routes/app');
const vision = require('@google-cloud/vision');

const https = require("https");


//Subir imagen
app.get('/test', async(req, res) => {
    // Imports the Google Cloud client library


    // Creates a client
    const client = new vision.ImageAnnotatorClient({ keyFilename: './credenciales-374423-09f1f26c3239.json' });

    // Performs label detection on the image file
    const [result] = await client.labelDetection('/home/jorodriguez/Descargas/credencia1.jpeg');
    const labels = result.labelAnnotations;
    console.log('Labels:');
    labels.forEach(label => console.log(label.description));
    res.status(200).json(labels);
});


console.log("---------registro de todos los endpoints finalizados -----------------");