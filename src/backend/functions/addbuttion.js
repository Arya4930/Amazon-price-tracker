import trackinglinks from "../DB/TrackingLinks";

async function AddTrackingutton(url){
    const tracked = await trackinglinks.findOne({ where: { name: title } });
    if( !url.startsWith("https://www.amazon.in/") ) return "Please Provide an Amazon.in Link";


    else if ( tracked ) return "This link is already in the database, Please avoid adding duplicates";
    await trackinglinks.create({
        url: url
    })

    return "Amazon Link added succesfully"
}