const upload = async () =>
{
    const inputTag = document.getElementById( "uploadFile" );
    const formData = new FormData();
    formData.append( "files", inputTag.files[0] );
    formData.append( "files", inputTag.files[1] );

    const response = await fetch( "http://localhost:3000/upload", {
        method: "POST",
        body: formData,
    } );
    const data = await response.json();
    //console.log( data );
    const dataFromSever = data.bucketData
    // console.log( dataFromSever[400].Key )
    const myContents = dataFromSever.filter( image => image.Key.includes( "than-zaw" ) );
    console.log( myContents )
}