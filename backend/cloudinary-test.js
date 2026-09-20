require("dotenv").config();

const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("API Key:", process.env.CLOUDINARY_API_KEY);
console.log(
    "API Secret:",
    process.env.CLOUDINARY_API_SECRET ? "LOADED" : "MISSING"
);

cloudinary.uploader.upload(
    "./uploads/gallery/photo-1788473272528-423688109.jpeg",
    {
        folder: "durga-puja/test",
        resource_type: "image"
    }
)
.then((result) => {

    console.log("\n========== SUCCESS ==========");
    console.log("URL:", result.secure_url);
    console.log("Public ID:", result.public_id);

})
.catch((error) => {

    console.log("\n========== FAILED ==========");
    console.log("Status:", error.http_code);
    console.log("Message:", error.message);
    console.log("Name:", error.name);
    console.log("Error:", error);

});