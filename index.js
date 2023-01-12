const app = require('./routes/app');
const vision = require('@google-cloud/vision');

const fs = require("fs");
const { url } = require('inspector');


//Subir imagen
app.get('/test/:imagen', async(req, res) => {
    // Imports the Google Cloud client library


    // Creates a client
    const client = new vision.ImageAnnotatorClient({ keyFilename: './credenciales-374423-09f1f26c3239.json' });

    // Performs label detection on the image file
    /*const [result] = await client.labelDetection('/home/jorodriguez/Descargas/credencia1.jpeg');
    const labels = result.labelAnnotations;
    console.log('Labels:');
    labels.forEach(label => console.log(label.description));
    */
    const imagen = req.params.imagen;

    if(!imagen){

        res.status(200).send("selecciona una foto");
    }

    const urlImagen = `/home/joel/Documentos/imagenes_prueba/${imagen}`;

    const existeImagen = fs.existsSync(urlImagen);

    if(!existeImagen){
        res.status(200).send("No existe la imagen");
    }    
    const [result] = await client.textDetection(urlImagen);
    const detections = result.textAnnotations;    
    //detections.forEach(text => console.log(text));

    let  imgBase64 = fs.readFileSync(urlImagen,'base64');
    
    console.log(detections);
    console.log("-------------");

    console.log(detections[0].description);

    const texto = JSON.stringify(detections[0].description);

    const arrayText = texto.split(/\\n/g);


    const arrayLabels = ['NOMBRE','DOMICILIO','INSTITUTO NACIONAL ELECTORAL','COL.','CLAVE DE ELECTOR','CURP','MUNICIPIO','SECCIÓN','EMISIÓN','VIGENCIA','FECHA NACIMIENTO','SEXO','LOCALIDAD'];

    //${texto.replace(/\\n/g,'<br/>')}

    let html;
    
    arrayText.forEach(text => {                                
        html += (arrayLabels.includes(text) ? '<strong>'+text+'</strong>':text)+'<br/>';
    });

    console.log(imgBase64);
    
    res.set('Content-Type', 'text/html');
    
    res.status(200).send(`

                        <table border="1">
                            <tr colspan="2"><td>${urlImagen}</td></tr>
                            <tr>
                            <td style="width:50%"><img src="data:image/png;base64, ${imgBase64}" style="width: 80%;"/> </td>
                            <td> <p> ${html} </p></td>
                            </tr>
                            </table>
                            
                            `);
    

    /*const [result] = await client.faceDetection('/home/joel/Imágenes/credencialprueba.png');
    const faces = result.faceAnnotations;
    console.log('Faces:');
    faces.forEach((face, i) => {
    console.log(`  Face #${i + 1}:`);
    console.log(`    Joy: ${face.joyLikelihood}`);
    console.log(`    Anger: ${face.angerLikelihood}`);
    console.log(`    Sorrow: ${face.sorrowLikelihood}`);
    console.log(`    Surprise: ${face.surpriseLikelihood}`);
      });
      res.status(200).json(faces);
      */

    
});


console.log("---------registro de todos los endpoints finalizados -----------------");