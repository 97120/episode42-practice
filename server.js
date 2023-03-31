import express from "express";
import aws from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
import { run } from "./libs/fileManager.js";

const app = express();
const port = 3000;

app.use( express.static( "public" ) );

const spaceEndpoint = new aws.Endpoint( "sgp1.digitaloceanspaces.com" );
const s3 = new aws.S3( {
    endpoint: spaceEndpoint,
} );

const upload = multer( {
    storage: multerS3( {
        s3: s3,
        bucket: "msquarefdc",
        acl: "public-read",
        key: function ( request, file, cb )
        {
            console.log( file );
            cb( null, "than-zaw-oo21/" + file.originalname );
        }
    } )
} ).array( "files", 1 );

app.post( "/upload", ( request, response, next ) =>
{
    upload( request, response, async ( error ) =>
    {
        if ( error )
        {
            console.log( error );
            return response.send( { Message: "UPload file error." } );
        }
        console.log( "Upload file successful.." );
        const bucketContents = await run();
        //console.log( bucketContents )
        //console.log( Object.keys( bucketContents ) )
        //console.log( bucketContents.Contents );
        const bucketData = bucketContents.Contents

        response.send( { Message: "File uploaded successfully.", bucketData } );
    } )
} )

app.listen( port, () =>
{
    console.log( `Example app is listning on port:${port}` )
} )