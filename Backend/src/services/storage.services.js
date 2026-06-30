const {ImageKit} = require('@imagekit/nodejs');
const imagekit = new ImageKit({
    privateKey:process.env.IMAGE_KIT_PRIVATE_KEY
})
async function uploadFiles(file){
    const result = await imagekit.files.upload({
        file,
        fileName:"image" + Date.now(),
        folder:"My_first_project"
    })
    return result;
}
module.exports = {uploadFiles}