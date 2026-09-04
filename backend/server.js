// ============================================================
// SHREE SHREE DURGA PUJA SAMITI
// FINAL BACKEND SERVER
// Express + MongoDB + JWT + Bcrypt + Excel
// Hindi + English Compatible
// ============================================================
require("dotenv").config();
const express = require("express");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const XLSX = require("xlsx");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { MongoClient, ObjectId } = require("mongodb");




// ============================================================
// CONFIGURATION
// ============================================================

const app = express();
const PORT = process.env.PORT || 5000;

const FRONTEND_DIR = path.join(__dirname, "..");

const VIDEO_UPLOAD_DIR =
    path.join(
        __dirname,
        "uploads",
        "videos"
    );

    // ============================================================
// PHOTO UPLOAD DIRECTORY
// ============================================================

const PHOTO_UPLOAD_DIR =
    path.join(
        __dirname,
        "uploads",
        "gallery"
    );


// Create gallery photo upload folder automatically
     fs.mkdirSync(
    PHOTO_UPLOAD_DIR,
    {
        recursive: true
    }
);


// Create video upload folder automatically
fs.mkdirSync(
    VIDEO_UPLOAD_DIR,
    {
        recursive: true
    }
);
// ============================================================
// VIDEO UPLOAD CONFIGURATION
// ============================================================

const videoStorage =
    multer.diskStorage({

        destination:
            (req, file, cb) => {

                cb(
                    null,
                    VIDEO_UPLOAD_DIR
                );

            },

        filename:
            (req, file, cb) => {

                const extension =
                    path.extname(
                        file.originalname
                    ).toLowerCase();

                const fileName =
                    "video-" +
                    Date.now() +
                    "-" +
                    Math.round(
                        Math.random() * 1E9
                    ) +
                    extension;

                cb(
                    null,
                    fileName
                );

            }

    });


 const videoUpload =
    multer({

        storage:
            videoStorage,

        limits: {

            fileSize:
                100 * 1024 * 1024

        },

        fileFilter:
            (req, file, cb) => {

                const allowedExtensions = [

                    ".mp4",
                    ".webm",
                    ".mov",
                    ".m4v"

                ];

                const extension =
                    path.extname(
                        file.originalname
                    ).toLowerCase();


                if (
                    allowedExtensions
                        .includes(extension)
                ) {

                    cb(
                        null,
                        true
                    );

                } else {

                    cb(
                        new Error(
                            "Only MP4, WEBM, MOV or M4V video files are allowed."
                        )
                    );

                }

            }

    }
 );

 // ============================================================
// GALLERY PHOTO UPLOAD CONFIGURATION
// ============================================================

const photoStorage =
    multer.diskStorage({

        destination:
            (req, file, cb) => {

                cb(
                    null,
                    PHOTO_UPLOAD_DIR
                );

            },

        filename:
            (req, file, cb) => {

                const extension =
                    path.extname(
                        file.originalname
                    ).toLowerCase();

                const fileName =
                    "photo-" +
                    Date.now() +
                    "-" +
                    Math.round(
                        Math.random() * 1E9
                    ) +
                    extension;

                cb(
                    null,
                    fileName
                );

            }

    });


const photoUpload =
    multer({

        storage:
            photoStorage,

        limits: {

            fileSize:
                10 * 1024 * 1024

        },

        fileFilter:
            (req, file, cb) => {

                const allowedExtensions = [

                    ".jpg",
                    ".jpeg",
                    ".png",
                    ".webp",
                    ".gif"

                ];

                const extension =
                    path.extname(
                        file.originalname
                    ).toLowerCase();

                if (
                    allowedExtensions
                        .includes(extension)
                ) {

                    cb(
                        null,
                        true
                    );

                } else {

                    cb(
                        new Error(
                            "Only JPG, JPEG, PNG, WEBP or GIF image files are allowed."
                        )
                    );

                }

            }

    });
const MONGO_URL =
    process.env.MONGO_URL ||
    "mongodb://127.0.0.1:27017";

const DB_NAME = "durga_puja";

const JWT_SECRET =
    process.env.JWT_SECRET ||
    "DURGA_PUJA_LOCAL_SECRET_CHANGE_BEFORE_PRODUCTION";

const ADMIN_USERNAME =
    process.env.ADMIN_USERNAME ||
    "admin";

const ADMIN_PASSWORD =
    process.env.ADMIN_PASSWORD ||
    "Admin@2016";


// ============================================================
// EXPRESS MIDDLEWARE
// ============================================================

app.use(express.json({
    limit: "5mb"
}));

app.use(express.urlencoded({
    extended: true,
    limit: "5mb"
}));


// ============================================================
// STATIC FRONTEND
// ============================================================

app.use(
    express.static(FRONTEND_DIR)
);
// ============================================================
// SERVE UPLOADED VIDEOS
// ============================================================

app.use(
    "/uploads/videos",
    express.static(
        VIDEO_UPLOAD_DIR
    )
);
// ============================================================
// SERVE UPLOADED GALLERY PHOTOS
// ============================================================

app.use(
    "/uploads/gallery",
    express.static(
        PHOTO_UPLOAD_DIR
    )
);


// ============================================================
// HOME PAGE
// ============================================================

app.get("/", (req, res) => {

    res.sendFile(
        path.join(
            FRONTEND_DIR,
            "index.html"
        )
    );

});


// ============================================================
// ADMIN PAGE
// ============================================================

const ADMIN_PAGE =
    path.join(
        FRONTEND_DIR,
        "admin",
        "admin.html"
    );


// /admin
app.get("/admin", (req, res) => {

    res.sendFile(ADMIN_PAGE);

});


// /admin/
app.get("/admin/", (req, res) => {

    res.sendFile(ADMIN_PAGE);

});


// /admin.html
app.get("/admin.html", (req, res) => {

    res.sendFile(ADMIN_PAGE);

});


// /admin/index.html
app.get("/admin/index.html", (req, res) => {

    res.sendFile(ADMIN_PAGE);

});

// ============================================================
// MONGODB
// ============================================================

const client =
    new MongoClient(MONGO_URL);

let db = null;

let collections = {};


// ============================================================
// HELPER FUNCTIONS
// ============================================================

function safeString(value) {

    if (
        value === null ||
        value === undefined
    ) {
        return "";
    }

    return String(value).trim();

}


function cleanObjectId(id) {

    try {

        if (!ObjectId.isValid(id)) {
            return null;
        }

        return new ObjectId(id);

    } catch {

        return null;

    }

}


function toBoolean(value, defaultValue = false) {

    if (
        value === true ||
        value === "true" ||
        value === 1 ||
        value === "1" ||
        value === "on"
    ) {
        return true;
    }

    if (
        value === false ||
        value === "false" ||
        value === 0 ||
        value === "0"
    ) {
        return false;
    }

    return defaultValue;

}


function toNumber(value, defaultValue = 0) {

    const number = Number(value);

    return Number.isFinite(number)
        ? number
        : defaultValue;

}


// ============================================================
// AUTHENTICATION
// ============================================================

function createToken(username) {

    return jwt.sign(
        {
            username,
            role: "admin"
        },
        JWT_SECRET,
        {
            expiresIn: "8h"
        }
    );

}


// ============================================================
// ADMIN AUTH MIDDLEWARE
// ============================================================

function requireAdmin(req, res, next) {

    try {

        const authHeader =
            req.headers.authorization;

        if (!authHeader) {

            return res.status(401).json({

                success: false,

                message:
                    "Authentication required."

            });

        }


        const parts =
            authHeader.split(" ");


        if (
            parts.length !== 2 ||
            parts[0] !== "Bearer"
        ) {

            return res.status(401).json({

                success: false,

                message:
                    "Invalid authorization format."

            });

        }


        const token =
            parts[1];


        const decoded =
            jwt.verify(
                token,
                JWT_SECRET
            );


        if (
            decoded.role !== "admin"
        ) {

            return res.status(403).json({

                success: false,

                message:
                    "Admin access required."

            });

        }


        req.admin =
            decoded;


        next();

    } catch (error) {

        return res.status(401).json({

            success: false,

            message:
                "Invalid or expired login session."

        });

    }

}


// ============================================================
// MONGODB CONNECTION
// ============================================================

async function connectMongoDB() {

    try {

        await client.connect();

        db =
            client.db(DB_NAME);


        collections = {

            admins:
                db.collection("admins"),

            members:
                db.collection("members"),

            programs:
                db.collection("programs"),

            notices:
                db.collection("notices"),

            gallery:
                db.collection("gallery"),

            videos:
                db.collection("videos"),

            live:
                db.collection("live"),

            darshan:
                db.collection("darshan"),

            donations:
                db.collection("donations"),

            contributors:
                db.collection("contributors"),

            contacts:
                db.collection("contacts")

        };


        // ====================================================
        // INDEXES
        // ====================================================

        await collections.admins.createIndex(
            {
                username: 1
            },
            {
                unique: true
            }
        );


        await collections.members.createIndex({
            order: 1
        });


        await collections.donations.createIndex({
            year: 1
        });


        await collections.donations.createIndex({
            mobile: 1
        });


        await collections.donations.createIndex({
            name: 1
        });


        await collections.programs.createIndex({
            year: 1
        });


        await collections.gallery.createIndex({
            year: 1
        });


        // ====================================================
        // DEFAULT ADMIN
        // ====================================================

        const existingAdmin =
            await collections.admins.findOne({

                username:
                    ADMIN_USERNAME

            });


        if (!existingAdmin) {

            const passwordHash =
                await bcrypt.hash(
                    ADMIN_PASSWORD,
                    12
                );


            await collections.admins.insertOne({

                username:
                    ADMIN_USERNAME,

                passwordHash,

                role:
                    "admin",

                active:
                    true,

                createdAt:
                    new Date(),

                updatedAt:
                    new Date()

            });


            console.log(
                "Default admin created."
            );

            console.log(
                `Username: ${ADMIN_USERNAME}`
            );

            console.log(
                `Password: ${ADMIN_PASSWORD}`
            );

        }


        console.log(
            "MongoDB connected successfully."
        );

        console.log(
            `Database: ${DB_NAME}`
        );

    } catch (error) {

        console.error(
            "MongoDB connection error:",
            error
        );

        process.exit(1);

    }

}


// ============================================================
// HEALTH CHECK
// ============================================================

app.get(
    "/api/health",
    (req, res) => {

        res.json({

            success: true,

            message:
                "Durga Puja backend is running.",

            database:
                db
                    ? "connected"
                    : "not connected",

            time:
                new Date()

        });

    }
);


// ============================================================
// ADMIN LOGIN
// ============================================================

app.post(
    "/api/auth/login",
    async (req, res) => {

        try {

            const username =
                safeString(
                    req.body.username
                );

            const password =
                safeString(
                    req.body.password
                );


            if (
                !username ||
                !password
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Username and password are required."

                });

            }


            const admin =
                await collections.admins.findOne({

                    username

                });


            if (
                !admin ||
                admin.active !== true
            ) {

                return res.status(401).json({

                    success: false,

                    message:
                        "Invalid username or password."

                });

            }


            const passwordMatch =
                await bcrypt.compare(
                    password,
                    admin.passwordHash
                );


            if (!passwordMatch) {

                return res.status(401).json({

                    success: false,

                    message:
                        "Invalid username or password."

                });

            }


            const token =
                createToken(
                    username
                );


            res.json({

                success: true,

                message:
                    "Login successful.",

                token,

                admin: {

                    username,

                    role:
                        "admin"

                }

            });

        } catch (error) {

            console.error(
                "Login error:",
                error
            );

            res.status(500).json({

                success: false,

                message:
                    "Login failed."

            });

        }

    }
);


// ============================================================
// VERIFY ADMIN SESSION
// ============================================================

app.get(
    "/api/auth/me",
    requireAdmin,
    (req, res) => {

        res.json({

            success: true,

            admin:
                req.admin

        });

    }
);


// ============================================================
// LOGOUT
// ============================================================

app.post(
    "/api/auth/logout",
    requireAdmin,
    (req, res) => {

        res.json({

            success: true,

            message:
                "Logout successful."

        });

    }
);


// ============================================================
// MEMBERS
// ============================================================

// PUBLIC MEMBERS
app.get(
    "/api/members",
    async (req, res) => {

        try {

            const members =
                await collections.members
                    .find({
                        active: true
                    })
                    .sort({
                        order: 1,
                        _id: 1
                    })
                    .toArray();


            res.json(
                members
            );

        } catch (error) {

            console.error(
                "Fetch members error:",
                error
            );

            res.status(500).json({

                success: false,

                message:
                    "Failed to fetch members."

            });

        }

    }
);


// GET MEMBER
app.get(
    "/api/members/:id",
    async (req, res) => {

        try {

            const id =
                cleanObjectId(
                    req.params.id
                );


            if (!id) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Invalid member ID."

                });

            }


            const member =
                await collections.members.findOne({

                    _id: id

                });


            if (!member) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Member not found."

                });

            }


            res.json(
                member
            );

        } catch (error) {

            res.status(500).json({

                success: false,

                message:
                    "Failed to fetch member."

            });

        }

    }
);


// ADD MEMBER
app.post(
    "/api/admin/members",
    requireAdmin,
    async (req, res) => {

        try {

            const member = {

                positionHi:
                    safeString(
                        req.body.positionHi
                    ),

                positionEn:
                    safeString(
                        req.body.positionEn
                    ),

                nameHi:
                    safeString(
                        req.body.nameHi
                    ),

                nameEn:
                    safeString(
                        req.body.nameEn
                    ),
                    memberType:
                   safeString(
                    req.body.memberType
                       ),

                image:
                    safeString(
                        req.body.image
                    ) || null,

                order:
                    toNumber(
                        req.body.order,
                        0
                    ),

                active:
                    toBoolean(
                        req.body.active,
                        true
                    ),

                createdAt:
                    new Date(),

                updatedAt:
                    new Date()

            };


            const result =
                await collections.members
                    .insertOne(
                        member
                    );


            res.status(201).json({

                success: true,

                message:
                    "Member added successfully.",

                member: {

                    ...member,

                    _id:
                        result.insertedId

                }

            });

        } catch (error) {

            console.error(
                "Add member error:",
                error
            );

            res.status(500).json({

                success: false,

                message:
                    "Failed to add member."

            });

        }

    }
);


// UPDATE MEMBER
app.put(
    "/api/admin/members/:id",
    requireAdmin,
    async (req, res) => {

        try {

            const id =
                cleanObjectId(
                    req.params.id
                );


            if (!id) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Invalid member ID."

                });

            }


            const update = {

                positionHi:
                    safeString(
                        req.body.positionHi
                    ),

                positionEn:
                    safeString(
                        req.body.positionEn
                    ),

                nameHi:
                    safeString(
                        req.body.nameHi
                    ),

                nameEn:
                    safeString(
                        req.body.nameEn
                    ),
                 memberType:
                    safeString(
                      req.body.memberType
                   ),

                image:
                    safeString(
                        req.body.image
                    ) || null,

                order:
                    toNumber(
                        req.body.order,
                        0
                    ),

                active:
                    toBoolean(
                        req.body.active,
                        true
                    ),

                updatedAt:
                    new Date()

            };


            const result =
                await collections.members.updateOne(

                    {
                        _id: id
                    },

                    {
                        $set:
                            update
                    }

                );


            if (
                result.matchedCount === 0
            ) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Member not found."

                });

            }


            res.json({

                success: true,

                message:
                    "Member updated successfully."

            });

        } catch (error) {

            console.error(
                "Update member error:",
                error
            );

            res.status(500).json({

                success: false,

                message:
                    "Failed to update member."

            });

        }

    }
);


// DELETE MEMBER
app.delete(
    "/api/admin/members/:id",
    requireAdmin,
    async (req, res) => {

        try {

            const id =
                cleanObjectId(
                    req.params.id
                );


            if (!id) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Invalid member ID."

                });

            }


            const result =
                await collections.members.deleteOne({

                    _id: id

                });


            res.json({

                success:
                    result.deletedCount > 0,

                message:
                    result.deletedCount > 0
                        ? "Member deleted successfully."
                        : "Member not found."

            });

        } catch (error) {

            console.error(
                "Delete member error:",
                error
            );

            res.status(500).json({

                success: false,

                message:
                    "Failed to delete member."

            });

        }

    }
);


// ============================================================
// PROGRAMS
// ============================================================

// PUBLIC
app.get(
    "/api/programs",
    async (req, res) => {

        try {

            const filter = {
                active: true
            };


            if (req.query.year) {

                filter.year =
                    toNumber(
                        req.query.year
                    );

            }


            const programs =
                await collections.programs
                    .find(filter)
                    .sort({
                        date: 1,
                        order: 1
                    })
                    .toArray();


            res.json(
                programs
            );

        } catch (error) {

            console.error(error);

            res.status(500).json({

                success: false,

                message:
                    "Failed to fetch programs."

            });

        }

    }
);


// ADD
app.post(
    "/api/admin/programs",
    requireAdmin,
    async (req, res) => {

        try {

            const program = {

                year:
                    toNumber(
                        req.body.year,
                        new Date().getFullYear()
                    ),

                dayHi:
                    safeString(
                        req.body.dayHi
                    ),

                dayEn:
                    safeString(
                        req.body.dayEn
                    ),

                titleHi:
                    safeString(
                        req.body.titleHi
                    ),

                titleEn:
                    safeString(
                        req.body.titleEn
                    ),

                descriptionHi:
                    safeString(
                        req.body.descriptionHi
                    ),

                descriptionEn:
                    safeString(
                        req.body.descriptionEn
                    ),

                date:
                    safeString(
                        req.body.date
                    ),

                time:
                    safeString(
                        req.body.time
                    ),

                order:
                    toNumber(
                        req.body.order,
                        0
                    ),

                active:
                    toBoolean(
                        req.body.active,
                        true
                    ),

                createdAt:
                    new Date(),

                updatedAt:
                    new Date()

            };


            const result =
                await collections.programs
                    .insertOne(
                        program
                    );


            res.status(201).json({

                success: true,

                message:
                    "Program added successfully.",

                id:
                    result.insertedId

            });

        } catch (error) {

            console.error(error);

            res.status(500).json({

                success: false,

                message:
                    "Failed to add program."

            });

        }

    }
);


// UPDATE
app.put(
    "/api/admin/programs/:id",
    requireAdmin,
    async (req, res) => {

        try {

            const id =
                cleanObjectId(
                    req.params.id
                );


            if (!id) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Invalid program ID."

                });

            }


            const update = {

                year:
                    toNumber(
                        req.body.year,
                        new Date().getFullYear()
                    ),

                dayHi:
                    safeString(
                        req.body.dayHi
                    ),

                dayEn:
                    safeString(
                        req.body.dayEn
                    ),

                titleHi:
                    safeString(
                        req.body.titleHi
                    ),

                titleEn:
                    safeString(
                        req.body.titleEn
                    ),

                descriptionHi:
                    safeString(
                        req.body.descriptionHi
                    ),

                descriptionEn:
                    safeString(
                        req.body.descriptionEn
                    ),

                date:
                    safeString(
                        req.body.date
                    ),

                time:
                    safeString(
                        req.body.time
                    ),

                order:
                    toNumber(
                        req.body.order,
                        0
                    ),

                active:
                    toBoolean(
                        req.body.active,
                        true
                    ),

                updatedAt:
                    new Date()

            };


            const result =
                await collections.programs.updateOne(

                    {
                        _id: id
                    },

                    {
                        $set:
                            update
                    }

                );


            res.json({

                success:
                    result.matchedCount > 0,

                message:
                    result.matchedCount > 0
                        ? "Program updated successfully."
                        : "Program not found."

            });

        } catch (error) {

            console.error(error);

            res.status(500).json({

                success: false,

                message:
                    "Failed to update program."

            });

        }

    }
);


// DELETE
app.delete(
    "/api/admin/programs/:id",
    requireAdmin,
    async (req, res) => {

        try {

            const id =
                cleanObjectId(
                    req.params.id
                );


            if (!id) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Invalid program ID."

                });

            }


            const result =
                await collections.programs.deleteOne({

                    _id: id

                });


            res.json({

                success:
                    result.deletedCount > 0,

                message:
                    result.deletedCount > 0
                        ? "Program deleted successfully."
                        : "Program not found."

            });

        } catch (error) {

            console.error(error);

            res.status(500).json({

                success: false,

                message:
                    "Failed to delete program."

            });

        }

    }
);


// ============================================================
// NOTICES
// ============================================================

// PUBLIC
app.get(
    "/api/notices",
    async (req, res) => {

        try {

            const notices =
                await collections.notices
                    .find({
                        active: true
                    })
                    .sort({
                        date: -1,
                        _id: -1
                    })
                    .toArray();


            res.json(
                notices
            );

        } catch (error) {

            res.status(500).json({

                success: false,

                message:
                    "Failed to fetch notices."

            });

        }

    }
);


// ADMIN GET
app.get(
    "/api/admin/notices",
    requireAdmin,
    async (req, res) => {

        try {

            const notices =
                await collections.notices
                    .find({})
                    .sort({
                        date: -1,
                        _id: -1
                    })
                    .toArray();


            res.json(
                notices
            );

        } catch (error) {

            res.status(500).json({

                success: false,

                message:
                    "Failed to fetch notices."

            });

        }

    }
);


// ADD
app.post(
    "/api/admin/notices",
    requireAdmin,
    async (req, res) => {

        try {

            const notice = {

                titleHi:
                    safeString(
                        req.body.titleHi
                    ),

                titleEn:
                    safeString(
                        req.body.titleEn
                    ),

                messageHi:
                    safeString(
                        req.body.messageHi
                    ),

                messageEn:
                    safeString(
                        req.body.messageEn
                    ),

                date:
                    safeString(
                        req.body.date
                    ) ||
                    new Date()
                        .toISOString()
                        .slice(0, 10),

                active:
                    toBoolean(
                        req.body.active,
                        true
                    ),

                createdAt:
                    new Date(),

                updatedAt:
                    new Date()

            };


            const result =
                await collections.notices
                    .insertOne(
                        notice
                    );


            res.status(201).json({

                success: true,

                message:
                    "Notice added successfully.",

                id:
                    result.insertedId

            });

        } catch (error) {

            console.error(error);

            res.status(500).json({

                success: false,

                message:
                    "Failed to add notice."

            });

        }

    }
);


// UPDATE
app.put(
    "/api/admin/notices/:id",
    requireAdmin,
    async (req, res) => {

        try {

            const id =
                cleanObjectId(
                    req.params.id
                );


            if (!id) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Invalid notice ID."

                });

            }


            const update = {

                titleHi:
                    safeString(
                        req.body.titleHi
                    ),

                titleEn:
                    safeString(
                        req.body.titleEn
                    ),

                messageHi:
                    safeString(
                        req.body.messageHi
                    ),

                messageEn:
                    safeString(
                        req.body.messageEn
                    ),

                date:
                    safeString(
                        req.body.date
                    ),

                active:
                    toBoolean(
                        req.body.active,
                        true
                    ),

                updatedAt:
                    new Date()

            };


            const result =
                await collections.notices.updateOne(

                    {
                        _id: id
                    },

                    {
                        $set:
                            update
                    }

                );


            res.json({

                success:
                    result.matchedCount > 0,

                message:
                    result.matchedCount > 0
                        ? "Notice updated successfully."
                        : "Notice not found."

            });

        } catch (error) {

            console.error(error);

            res.status(500).json({

                success: false,

                message:
                    "Failed to update notice."

            });

        }

    }
);


// DELETE
app.delete(
    "/api/admin/notices/:id",
    requireAdmin,
    async (req, res) => {

        try {

            const id =
                cleanObjectId(
                    req.params.id
                );


            if (!id) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Invalid notice ID."

                });

            }


            const result =
                await collections.notices.deleteOne({

                    _id: id

                });


            res.json({

                success:
                    result.deletedCount > 0,

                message:
                    result.deletedCount > 0
                        ? "Notice deleted successfully."
                        : "Notice not found."

            });

        } catch (error) {

            console.error(error);

            res.status(500).json({

                success: false,

                message:
                    "Failed to delete notice."

            });

        }

    }
);


// ============================================================
// GALLERY
// ============================================================

// PUBLIC
app.get(
    "/api/gallery",
    async (req, res) => {

        try {

            const filter = {
                active: true
            };


            if (
                req.query.year &&
                req.query.year !== "all"
            ) {

                filter.year =
                    toNumber(
                        req.query.year
                    );

            }


            if (
                req.query.category &&
                req.query.category !== "all"
            ) {

                filter.category =
                    safeString(
                        req.query.category
                    );

            }


            const gallery =
                await collections.gallery
                    .find(filter)
                    .sort({
                        date: -1,
                        _id: -1
                    })
                    .toArray();


            res.json(
                gallery
            );

        } catch (error) {

            console.error(error);

            res.status(500).json({

                success: false,

                message:
                    "Failed to fetch gallery."

            });

        }

    }
);
// ============================================================
// DIRECT GALLERY PHOTO UPLOAD
// ============================================================


app.post(
    "/api/admin/gallery/upload",
    requireAdmin,
    photoUpload.single("photoFile"),
    async (req, res) => {

        try {

            if (!req.file) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Please select a photo file."

                });

            }


            const item = {

                titleHi:
                    safeString(
                        req.body.titleHi
                    ),

                titleEn:
                    safeString(
                        req.body.titleEn
                    ),

                image:
                    "/uploads/gallery/" +
                    req.file.filename,

                year:
                    toNumber(
                        req.body.year,
                        new Date().getFullYear()
                    ),

                category:
                    safeString(
                        req.body.category
                    ) || "puja",

                date:
                    safeString(
                        req.body.date
                    ) ||
                    new Date()
                        .toISOString()
                        .slice(0, 10),

                active:
                    true,

                originalName:
                    req.file.originalname,

                fileName:
                    req.file.filename,

                createdAt:
                    new Date(),

                updatedAt:
                    new Date()

            };


            const result =
                await collections.gallery
                    .insertOne(
                        item
                    );


            res.status(201).json({

                success: true,

                message:
                    "Gallery photo uploaded successfully.",

                id:
                    result.insertedId,

                image:
                    item.image

            });

        } catch (error) {

            console.error(
                "Gallery photo upload error:",
                error
            );


            // Delete uploaded file if MongoDB insert fails
            if (req.file) {

                const uploadedFile =
                    path.join(
                        PHOTO_UPLOAD_DIR,
                        req.file.filename
                    );

                try {

                    if (
                        fs.existsSync(
                            uploadedFile
                        )
                    ) {

                        fs.unlinkSync(
                            uploadedFile
                        );

                    }

                } catch (deleteError) {

                    console.error(
                        "Failed to delete uploaded gallery photo:",
                        deleteError
                    );

                }

            }


            res.status(500).json({

                success: false,

                message:
                    error.message ||
                    "Gallery photo upload failed."

            });

        }

    }
);


// ADD
app.post(
    "/api/admin/gallery",
    requireAdmin,
    async (req, res) => {

        try {

            const item = {

                titleHi:
                    safeString(
                        req.body.titleHi
                    ),

                titleEn:
                    safeString(
                        req.body.titleEn
                    ),

                image:
                    safeString(
                        req.body.image
                    ),

                year:
                    toNumber(
                        req.body.year,
                        new Date().getFullYear()
                    ),

                category:
                    safeString(
                        req.body.category
                    ) || "puja",

                date:
                    safeString(
                        req.body.date
                    ),

                active:
                    toBoolean(
                        req.body.active,
                        true
                    ),

                createdAt:
                    new Date(),

                updatedAt:
                    new Date()

            };


            const result =
                await collections.gallery
                    .insertOne(
                        item
                    );


            res.status(201).json({

                success: true,

                message:
                    "Gallery item added successfully.",

                id:
                    result.insertedId

            });

        } catch (error) {

            console.error(error);

            res.status(500).json({

                success: false,

                message:
                    "Failed to add gallery item."

            });

        }

    }
);


// UPDATE GALLERY
app.put(
    "/api/admin/gallery/:id",
    requireAdmin,
    async (req, res) => {

        try {

            const id =
                cleanObjectId(
                    req.params.id
                );


            if (!id) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Invalid gallery ID."

                });

            }


            const update = {

                titleHi:
                    safeString(
                        req.body.titleHi
                    ),

                titleEn:
                    safeString(
                        req.body.titleEn
                    ),

                image:
                    safeString(
                        req.body.image
                    ),

                year:
                    toNumber(
                        req.body.year,
                        new Date().getFullYear()
                    ),

                category:
                    safeString(
                        req.body.category
                    ) || "puja",

                date:
                    safeString(
                        req.body.date
                    ),

                active:
                    toBoolean(
                        req.body.active,
                        true
                    ),

                updatedAt:
                    new Date()

            };


            const result =
                await collections.gallery.updateOne(

                    {
                        _id: id
                    },

                    {
                        $set:
                            update
                    }

                );


            res.json({

                success:
                    result.matchedCount > 0,

                message:
                    result.matchedCount > 0
                        ? "Gallery item updated successfully."
                        : "Gallery item not found."

            });

        } catch (error) {

            console.error(error);

            res.status(500).json({

                success: false,

                message:
                    "Failed to update gallery item."

            });

        }

    }
);


// ============================================================
// DELETE GALLERY ITEM
// ============================================================

app.delete(
    "/api/admin/gallery/:id",
    requireAdmin,
    async (req, res) => {

        try {

            const id =
                cleanObjectId(
                    req.params.id
                );


            if (!id) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Invalid gallery ID."

                });

            }


            // Find gallery item first
            const galleryItem =
                await collections.gallery.findOne({

                    _id: id

                });


            if (!galleryItem) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Gallery item not found."

                });

            }


            // Delete MongoDB record
            const result =
                await collections.gallery.deleteOne({

                    _id: id

                });


            // Delete uploaded physical file
            if (
                result.deletedCount > 0 &&
                galleryItem.fileName
            ) {

                const uploadedFile =
                    path.join(
                        PHOTO_UPLOAD_DIR,
                        galleryItem.fileName
                    );


                try {

                    if (
                        fs.existsSync(
                            uploadedFile
                        )
                    ) {

                        fs.unlinkSync(
                            uploadedFile
                        );

                    }

                } catch (fileDeleteError) {

                    console.error(
                        "Gallery file delete error:",
                        fileDeleteError
                    );

                }

            }


            res.json({

                success:
                    result.deletedCount > 0,

                message:
                    result.deletedCount > 0
                        ? "Gallery item deleted successfully."
                        : "Gallery item not found."

            });

        } catch (error) {

            console.error(
                "Delete gallery error:",
                error
            );


            res.status(500).json({

                success: false,

                message:
                    "Failed to delete gallery item."

            });

        }

    }
);


// ============================================================
// VIDEOS
// ============================================================

// PUBLIC
app.get(
    "/api/videos",
    async (req, res) => {

        try {

            const videos =
                await collections.videos
                    .find({
                        active: true
                    })
                    .sort({
                        date: -1,
                        _id: -1
                    })
                    .toArray();


            res.json(
                videos
            );

        } catch (error) {

            res.status(500).json({

                success: false,

                message:
                    "Failed to fetch videos."

            });

        }

    }
);


// ADD
app.post(
    "/api/admin/videos",
    requireAdmin,
    async (req, res) => {

        try {

            const video = {

                titleHi:
                    safeString(
                        req.body.titleHi
                    ),

                titleEn:
                    safeString(
                        req.body.titleEn
                    ),

                youtubeUrl:
                    safeString(
                        req.body.youtubeUrl
                    ),

                thumbnail:
                    safeString(
                        req.body.thumbnail
                    ),

                active:
                    toBoolean(
                        req.body.active,
                        true
                    ),

                date:
                    new Date(),

                createdAt:
                    new Date(),

                updatedAt:
                    new Date()

            };


            const result =
                await collections.videos
                    .insertOne(
                        video
                    );


            res.status(201).json({

                success: true,

                message:
                    "Video added successfully.",

                id:
                    result.insertedId

            });

        } catch (error) {

            console.error(error);

            res.status(500).json({

                success: false,

                message:
                    "Failed to add video."

            });

        }

    }
);


// UPDATE VIDEO
app.put(
    "/api/admin/videos/:id",
    requireAdmin,
    async (req, res) => {

        try {

            const id =
                cleanObjectId(
                    req.params.id
                );


            if (!id) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Invalid video ID."

                });

            }


            const update = {

                titleHi:
                    safeString(
                        req.body.titleHi
                    ),

                titleEn:
                    safeString(
                        req.body.titleEn
                    ),

                youtubeUrl:
                    safeString(
                        req.body.youtubeUrl
                    ),

                thumbnail:
                    safeString(
                        req.body.thumbnail
                    ),

                active:
                    toBoolean(
                        req.body.active,
                        true
                    ),

                updatedAt:
                    new Date()

            };


            const result =
                await collections.videos.updateOne(

                    {
                        _id: id
                    },

                    {
                        $set:
                            update
                    }

                );


            res.json({

                success:
                    result.matchedCount > 0,

                message:
                    result.matchedCount > 0
                        ? "Video updated successfully."
                        : "Video not found."

            });

        } catch (error) {

            console.error(error);

            res.status(500).json({

                success: false,

                message:
                    "Failed to update video."

            });

        }

    }
);


// DELETE
app.delete(
    "/api/admin/videos/:id",
    requireAdmin,
    async (req, res) => {

        try {

            const id =
                cleanObjectId(
                    req.params.id
                );


            if (!id) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Invalid video ID."

                });

            }


            const result =
                await collections.videos.deleteOne({

                    _id: id

                });


            res.json({

                success:
                    result.deletedCount > 0,

                message:
                    result.deletedCount > 0
                        ? "Video deleted."
                        : "Video not found."

            });

        } catch (error) {

            console.error(error);

            res.status(500).json({

                success: false,

                message:
                    "Failed to delete video."

            });

        }

    }
);


// ============================================================
// LIVE DARSHAN
// ============================================================

// PUBLIC
app.get(
    "/api/live",
    async (req, res) => {

        try {

            const live =
                await collections.live.findOne({

                    active: true

                });


            res.json(
                live || {
                    active: false
                }
            );

        } catch (error) {

            res.status(500).json({

                success: false,

                message:
                    "Failed to fetch live darshan."

            });

        }

    }
);


// ADMIN UPDATE
app.put(
    "/api/admin/live",
    requireAdmin,
    async (req, res) => {

        try {

            await collections.live.deleteMany({});


            const live = {

                titleHi:
                    safeString(
                        req.body.titleHi
                    ),

                titleEn:
                    safeString(
                        req.body.titleEn
                    ),

                streamUrl:
                    safeString(
                        req.body.streamUrl
                    ),

                active:
                    toBoolean(
                        req.body.active,
                        false
                    ),

                updatedAt:
                    new Date()

            };


            await collections.live.insertOne(
                live
            );


            res.json({

                success: true,

                message:
                    "Live Darshan updated successfully."

            });

        } catch (error) {

            console.error(error);

            res.status(500).json({

                success: false,

                message:
                    "Failed to update live darshan."

            });

        }

    }
);


// ============================================================
// SPECIAL DARSHAN
// ============================================================

// PUBLIC
app.get(
    "/api/darshan",
    async (req, res) => {

        try {

            const darshan =
                await collections.darshan.findOne({

                    active: true

                });


            res.json(
                darshan || {
                    active: false
                }
            );

        } catch (error) {

            res.status(500).json({

                success: false,

                message:
                    "Failed to fetch special darshan."

            });

        }

    }
);


// ADMIN UPDATE
app.put(
    "/api/admin/darshan",
    requireAdmin,
    async (req, res) => {

        try {

            await collections.darshan.deleteMany({});


            const darshan = {

                titleHi:
                    safeString(
                        req.body.titleHi
                    ),

                titleEn:
                    safeString(
                        req.body.titleEn
                    ),

                image:
                    safeString(
                        req.body.image
                    ),

                active:
                    toBoolean(
                        req.body.active,
                        false
                    ),

                updatedAt:
                    new Date()

            };


            await collections.darshan.insertOne(
                darshan
            );


            res.json({

                success: true,

                message:
                    "Special Darshan updated successfully."

            });

        } catch (error) {

            console.error(error);

            res.status(500).json({

                success: false,

                message:
                    "Failed to update special darshan."

            });

        }

    }
);


// ============================================================
// DONATION HELPERS
// ============================================================

function normalizeHeader(header) {

    return safeString(header)
        .toLowerCase()
        .replace(/\n/g, " ")
        .replace(/\r/g, " ")
        .replace(/\s+/g, " ");

}


function getFlexibleValue(
    row,
    possibleHeaders
) {

    const keys =
        Object.keys(row);


    for (const key of keys) {

        const normalizedKey =
            normalizeHeader(key);


        for (
            const header of possibleHeaders
        ) {

            if (
                normalizedKey ===
                normalizeHeader(header)
            ) {

                return row[key];

            }

        }

    }


    return "";

}


function extractYear(dateValue) {

    if (!dateValue) {
        return "";
    }


    const text =
        String(dateValue);


    const match =
        text.match(
            /(20\d{2})/
        );


    return match
        ? Number(match[1])
        : "";

}


function convertDonationRecord(row) {

    const serialNo =
        getFlexibleValue(
            row,
            [
                "S.No.",
                "S.No",
                "S No",
                "Serial No",
                "Serial Number",
                "क्रम संख्या",
                "क्रमांक"
            ]
        );


    const yearFromExcel =
        getFlexibleValue(
            row,
            [
                "Year",
                "वर्ष"
            ]
        );


    const name =
        getFlexibleValue(
            row,
            [
                "Name",
                "Donor Name",
                "Donor",
                "दाता का नाम",
                "नाम"
            ]
        );


    const fatherName =
        getFlexibleValue(
            row,
            [
                "Father's Name",
                "Father’s Name",
                "Father Name",
                "पिता का नाम"
            ]
        );


    const designation =
        getFlexibleValue(
            row,
            [
                "Designation",
                "Designation / Job",
                "Job",
                "Position",
                "पद",
                "पदनाम"
            ]
        );


    const organization =
        getFlexibleValue(
            row,
            [
                "Company",
                "Organization",
                "Company / Organization",
                "संस्था",
                "संगठन"
            ]
        );


    const mobile =
        getFlexibleValue(
            row,
            [
                "Mobile",
                "Mobile No",
                "Mobile No.",
                "Phone",
                "Phone No",
                "मोबाइल",
                "मोबाइल नंबर"
            ]
        );


    const email =
        getFlexibleValue(
            row,
            [
                "Email",
                "Email ID",
                "Email Id",
                "ईमेल",
                "ईमेल आईडी"
            ]
        );


    const address =
        getFlexibleValue(
            row,
            [
                "Address",
                "पता"
            ]
        );


    const amount =
        getFlexibleValue(
            row,
            [
                "Amount",
                "Amount (₹)",
                "Amount ₹",
                "Donation Amount",
                "राशि",
                "चंदा"
            ]
        );


    const receivedBy =
        getFlexibleValue(
            row,
            [
                "Amount Received By",
                "Received By",
                "राशि प्राप्तकर्ता"
            ]
        );


    const date =
        getFlexibleValue(
            row,
            [
                "Date",
                "दिनांक",
                "तारीख"
            ]
        );


    const paymentMode =
        getFlexibleValue(
            row,
            [
                "Payment Mode",
                "Payment Method",
                "Mode",
                "भुगतान माध्यम",
                "भुगतान का माध्यम"
            ]
        );


    const remarks =
        getFlexibleValue(
            row,
            [
                "Remarks",
                "Remark",
                "Comments",
                "विशेष विवरण",
                "टिप्पणी"
            ]
        );


    let cleanAmount =
        Number(
            String(amount)
                .replace(/₹/g, "")
                .replace(/,/g, "")
                .replace(/\s/g, "")
        );


    if (
        Number.isNaN(cleanAmount)
    ) {
        cleanAmount = 0;
    }


    const year =
        toNumber(
            yearFromExcel,
            extractYear(date) ||
            new Date().getFullYear()
        );


    return {

        serialNo:
            safeString(serialNo),

        year,

        name:
            safeString(name),

        fatherName:
            safeString(fatherName),

        designation:
            safeString(designation),

        organization:
            safeString(organization),

        mobile:
            safeString(mobile),

        email:
            safeString(email),

        address:
            safeString(address),

        amount:
            cleanAmount,

        receivedBy:
            safeString(receivedBy),

        date:
            safeString(date),

        paymentMode:
            safeString(paymentMode),

        remarks:
            safeString(remarks),

        publicVisible:
            false,

        approved:
            false,

        source:
            "excel",

        createdAt:
            new Date(),

        updatedAt:
            new Date()

    };

}


// ============================================================
// DONATIONS
// ============================================================

// ADMIN GET
app.get(
    "/api/admin/donations",
    requireAdmin,
    async (req, res) => {

        try {

            const filter = {};


            if (req.query.year) {

                filter.year =
                    toNumber(
                        req.query.year
                    );

            }


            if (req.query.search) {

                const search =
                    safeString(
                        req.query.search
                    );


                filter.$or = [

                    {
                        name: {
                            $regex:
                                search,
                            $options:
                                "i"
                        }
                    },

                    {
                        mobile: {
                            $regex:
                                search,
                            $options:
                                "i"
                        }
                    },

                    {
                        email: {
                            $regex:
                                search,
                            $options:
                                "i"
                        }
                    }

                ];

            }


            const records =
                await collections.donations
                    .find(filter)
                    .sort({
                        year: -1,
                        _id: -1
                    })
                    .toArray();


            const totalDonors =
                records.length;


            const totalDonation =
                records.reduce(
                    (
                        total,
                        record
                    ) =>
                        total +
                        Number(
                            record.amount || 0
                        ),
                    0
                );


            res.json({

                success: true,

                records,

                summary: {

                    totalDonors,

                    totalDonation

                }

            });

        } catch (error) {

            console.error(error);

            res.status(500).json({

                success: false,

                message:
                    "Failed to fetch donations."

            });

        }

    }
);


// PUBLIC DONATIONS
app.get(
    "/api/donations/public",
    async (req, res) => {

        try {

            const filter = {

                approved:
                    true,

                publicVisible:
                    true

            };


            if (
                req.query.year &&
                req.query.year !== "all"
            ) {

                filter.year =
                    toNumber(
                        req.query.year
                    );

            }


            const records =
                await collections.donations
                    .find(
                        filter,
                        {
                            projection: {

                                name: 1,
                                year: 1,
                                amount: 1,
                                date: 1,
                                paymentMode: 1

                            }
                        }
                    )
                    .sort({
                        year: -1,
                        _id: -1
                    })
                    .toArray();


            res.json({

                success: true,

                records

            });

        } catch (error) {

            res.status(500).json({

                success: false,

                message:
                    "Failed to fetch public donation records."

            });

        }

    }
);


// ============================================================
// ADD MANUAL DONATION
// ============================================================

app.post(
    "/api/admin/donations",
    requireAdmin,
    async (req, res) => {

        try {

            console.log("====================================");
            console.log("ADD DONATION REQUEST RECEIVED");
            console.log("Request Body:", req.body);
            console.log("Admin:", req.admin);
            console.log("====================================");


            // -------------------------------
            // DONOR NAME
            // -------------------------------

            const name =
                safeString(
                    req.body.name
                );


            // -------------------------------
            // AMOUNT
            // -------------------------------

            const amount =
                Number(
                    req.body.amount
                );


            // -------------------------------
            // VALIDATION
            // -------------------------------

            if (!name) {

                console.log(
                    "Donation validation failed: Name missing"
                );

                return res.status(400).json({

                    success: false,

                    message:
                        "Donor name is required."

                });

            }


            if (
                !Number.isFinite(amount) ||
                amount <= 0
            ) {

                console.log(
                    "Donation validation failed: Invalid amount"
                );

                return res.status(400).json({

                    success: false,

                    message:
                        "Valid donation amount is required."

                });

            }


            // -------------------------------
            // CREATE DONATION RECORD
            // -------------------------------

            const record = {

                serialNo:
                    safeString(
                        req.body.serialNo
                    ),

                year:
                    toNumber(
                        req.body.year,
                        new Date().getFullYear()
                    ),

                name,

                fatherName:
                    safeString(
                        req.body.fatherName
                    ),

                designation:
                    safeString(
                        req.body.designation
                    ),

                organization:
                    safeString(
                        req.body.organization
                    ),

                mobile:
                    safeString(
                        req.body.mobile
                    ),

                email:
                    safeString(
                        req.body.email
                    ),

                address:
                    safeString(
                        req.body.address
                    ),

                amount,

                receivedBy:
                    safeString(
                        req.body.receivedBy
                    ),

                date:
                    safeString(
                        req.body.date
                    ) ||
                    new Date()
                        .toISOString()
                        .slice(0, 10),

                paymentMode:
                    safeString(
                        req.body.paymentMode
                    ),

                remarks:
                    safeString(
                        req.body.remarks
                    ),

                approved:
                    toBoolean(
                        req.body.approved,
                        false
                    ),

                publicVisible:
                    toBoolean(
                        req.body.publicVisible,
                        false
                    ),

                source:
                    "manual",

                createdAt:
                    new Date(),

                updatedAt:
                    new Date()

            };


            console.log(
                "Donation record to insert:",
                record
            );


            // -------------------------------
            // INSERT INTO MONGODB
            // -------------------------------

            const result =
                await collections.donations.insertOne(
                    record
                );


            console.log(
                "Donation inserted successfully."
            );

            console.log(
                "Inserted ID:",
                result.insertedId
            );


            // -------------------------------
            // RESPONSE
            // -------------------------------

            return res.status(201).json({

                success: true,

                message:
                    "Donation added successfully.",

                id:
                    result.insertedId

            });


        } catch (error) {

            console.error(
                "===================================="
            );

            console.error(
                "ADD DONATION ERROR:"
            );

            console.error(
                error
            );

            console.error(
                "===================================="
            );


            return res.status(500).json({

                success: false,

                message:
                    error.message ||
                    "Failed to add donation."

            });

        }

    }
);


// UPDATE DONATION
app.put(
    "/api/admin/donations/:id",
    requireAdmin,
    async (req, res) => {

        try {

            const id =
                cleanObjectId(
                    req.params.id
                );


            if (!id) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Invalid donation ID."

                });

            }


            const update = {

                year:
                    toNumber(
                        req.body.year
                    ),

                name:
                    safeString(
                        req.body.name
                    ),

                fatherName:
                    safeString(
                        req.body.fatherName
                    ),

                designation:
                    safeString(
                        req.body.designation
                    ),

                organization:
                    safeString(
                        req.body.organization
                    ),

                mobile:
                    safeString(
                        req.body.mobile
                    ),

                email:
                    safeString(
                        req.body.email
                    ),

                address:
                    safeString(
                        req.body.address
                    ),

                amount:
                    toNumber(
                        req.body.amount
                    ),

                receivedBy:
                    safeString(
                        req.body.receivedBy
                    ),

                date:
                    safeString(
                        req.body.date
                    ),

                paymentMode:
                    safeString(
                        req.body.paymentMode
                    ),

                remarks:
                    safeString(
                        req.body.remarks
                    ),

                approved:
                    toBoolean(
                        req.body.approved,
                        false
                    ),

                publicVisible:
                    toBoolean(
                        req.body.publicVisible,
                        false
                    ),

                updatedAt:
                    new Date()

            };


            const result =
                await collections.donations.updateOne(

                    {
                        _id: id
                    },

                    {
                        $set:
                            update
                    }

                );


            if (
                result.matchedCount === 0
            ) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Donation record not found."

                });

            }


            res.json({

                success: true,

                message:
                    "Donation updated successfully."

            });

        } catch (error) {

            console.error(error);

            res.status(500).json({

                success: false,

                message:
                    "Failed to update donation."

            });

        }

    }
);

// UPDATE DONATION STATUS
app.patch(
    "/api/admin/donations/:id/status",
    requireAdmin,
    async (req, res) => {

        try {

            const id =
                cleanObjectId(
                    req.params.id
                );

            if (!id) {

                return res.status(400).json({
                    success: false,
                    message:
                        "Invalid donation ID."
                });

            }

            const update = {};

            if (
                typeof req.body.approved ===
                "boolean"
            ) {

                update.approved =
                    req.body.approved;

            }

            if (
                typeof req.body.publicVisible ===
                "boolean"
            ) {

                update.publicVisible =
                    req.body.publicVisible;

            }

            if (
                Object.keys(update).length === 0
            ) {

                return res.status(400).json({
                    success: false,
                    message:
                        "No valid status provided."
                });

            }

            /*
             * अगर donation unapproved है,
             * तो उसे public भी नहीं रखा जाएगा.
             */
            if (
                update.approved === false
            ) {

                update.publicVisible = false;

            }

            update.updatedAt =
                new Date();

            const result =
                await collections.donations.updateOne(
                    {
                        _id: id
                    },
                    {
                        $set: update
                    }
                );

            if (
                result.matchedCount === 0
            ) {

                return res.status(404).json({
                    success: false,
                    message:
                        "Donation record not found."
                });

            }

            res.json({
                success: true,
                message:
                    "Donation status updated successfully."
            });

        } catch (error) {

            console.error(
                "Donation status update error:",
                error
            );

            res.status(500).json({
                success: false,
                message:
                    "Failed to update donation status."
            });

        }

    }
);


// DELETE ONE
app.delete(
    "/api/admin/donations/:id",
    requireAdmin,
    async (req, res) => {

        try {

            const id =
                cleanObjectId(
                    req.params.id
                );


            if (!id) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Invalid donation ID."

                });

            }


            const result =
                await collections.donations.deleteOne({

                    _id: id

                });


            res.json({

                success:
                    result.deletedCount > 0,

                message:
                    result.deletedCount > 0
                        ? "Donation deleted successfully."
                        : "Donation not found."

            });

        } catch (error) {

            console.error(error);

            res.status(500).json({

                success: false,

                message:
                    "Failed to delete donation."

            });

        }

    }
);


// DELETE ALL
app.delete(
    "/api/admin/donations",
    requireAdmin,
    async (req, res) => {

        try {

            const result =
                await collections.donations
                    .deleteMany({});


            res.json({

                success: true,

                message:
                    "All donation records deleted.",

                deletedCount:
                    result.deletedCount

            });

        } catch (error) {

            console.error(error);

            res.status(500).json({

                success: false,

                message:
                    "Failed to delete donations."

            });

        }

    }
);


// ============================================================
// EXCEL UPLOAD
// ============================================================

const excelUpload =
    multer({

        storage:
            multer.memoryStorage(),

        limits: {

            fileSize:
                10 * 1024 * 1024

        },

        fileFilter:
            (req, file, cb) => {

                const allowedExtensions = [

                    ".xlsx",
                    ".xls",
                    ".csv"

                ];


                const extension =
                    path.extname(
                        file.originalname
                    ).toLowerCase();


                if (
                    allowedExtensions.includes(
                        extension
                    )
                ) {

                    cb(
                        null,
                        true
                    );

                } else {

                    cb(
                        new Error(
                            "Only Excel (.xlsx, .xls) or CSV files are allowed."
                        )
                    );

                }

            }

    });


// UPLOAD
app.post(
    "/api/admin/donations/upload",
    requireAdmin,
    excelUpload.single("excelFile"),
    async (req, res) => {

        try {

            if (!req.file) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Please select an Excel or CSV file."

                });

            }


            const workbook =
                XLSX.read(
                    req.file.buffer,
                    {
                        type: "buffer",
                        cellDates: true
                    }
                );


            if (
                !workbook.SheetNames.length
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "No Excel sheet found."

                });

            }


            const worksheet =
                workbook.Sheets[
                    workbook.SheetNames[0]
                ];


            const rows =
                XLSX.utils.sheet_to_json(
                    worksheet,
                    {
                        defval: ""
                    }
                );


            if (
                rows.length === 0
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Excel file contains no records."

                });

            }


            const records =
                rows
                    .map(
                        convertDonationRecord
                    )
                    .filter(
                        record =>
                            record.name ||
                            record.mobile ||
                            record.amount > 0
                    );


            if (
                records.length === 0
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "No valid donation records found."

                });

            }


            const result =
                await collections.donations
                    .insertMany(
                        records
                    );


            res.json({

                success: true,

                message:
                    "Excel imported successfully.",

                totalRecords:
                    result.insertedCount

            });

        } catch (error) {

            console.error(
                "Excel import error:",
                error
            );

            res.status(500).json({

                success: false,

                message:
                    error.message ||
                    "Excel import failed."

            });

        }

    }
);


   

// ============================================================
// DIRECT VIDEO UPLOAD
// ============================================================

app.post(
    "/api/admin/videos/upload",
    requireAdmin,
    videoUpload.single("videoFile"),
    async (req, res) => {

        try {

            if (!req.file) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Please select a video file."

                });

            }


            const video = {

                titleHi:
                    safeString(
                        req.body.titleHi
                    ),

                titleEn:
                    safeString(
                        req.body.titleEn
                    ),

                youtubeUrl:
                    "",

                thumbnail:
                    safeString(
                        req.body.thumbnail
                    ),

                videoType:
                    "upload",

                videoUrl:
                    "/uploads/videos/" +
                    req.file.filename,

                originalName:
                    req.file.originalname,

                fileName:
                    req.file.filename,

                active:
                    true,

                date:
                    new Date(),

                createdAt:
                    new Date(),

                updatedAt:
                    new Date()

            };


            const result =
                await collections.videos
                    .insertOne(
                        video
                    );


            res.status(201).json({

                success: true,

                message:
                    "Video uploaded successfully.",

                id:
                    result.insertedId,

                videoUrl:
                    video.videoUrl

            });

        } catch (error) {

            console.error(
                "Video upload error:",
                error
            );


            if (req.file) {

                const uploadedFile =
                    path.join(
                        VIDEO_UPLOAD_DIR,
                        req.file.filename
                    );

                try {

                    if (
                        fs.existsSync(
                            uploadedFile
                        )
                    ) {

                        fs.unlinkSync(
                            uploadedFile
                        );

                    }

                } catch (deleteError) {

                    console.error(
                        "Failed to delete uploaded video:",
                        deleteError
                    );

                }

            }


            res.status(500).json({

                success: false,

                message:
                    error.message ||
                    "Video upload failed."

            });

        }

    }
);




// ============================================================
// EXPORT DONATIONS
// ============================================================

app.get(
    "/api/admin/donations/export",
    requireAdmin,
    async (req, res) => {

        try {

            const filter = {};


            if (req.query.year) {

                filter.year =
                    toNumber(
                        req.query.year
                    );

            }


            const records =
                await collections.donations
                    .find(filter)
                    .sort({
                        year: -1,
                        _id: 1
                    })
                    .toArray();


            const excelData =
                records.map(
                    (record, index) => ({

                        "S.No.":
                            index + 1,

                        "Year":
                            record.year,

                        "Donor Name":
                            record.name,

                        "Father's Name":
                            record.fatherName,

                        "Designation":
                            record.designation,

                        "Company / Organization":
                            record.organization,

                        "Mobile No.":
                            record.mobile,

                        "Email ID":
                            record.email,

                        "Address":
                            record.address,

                        "Amount (₹)":
                            record.amount,

                        "Amount Received By":
                            record.receivedBy,

                        "Date":
                            record.date,

                        "Payment Mode":
                            record.paymentMode,

                        "Remarks":
                            record.remarks,

                        "Approved":
                            record.approved
                                ? "Yes"
                                : "No",

                        "Public Visible":
                            record.publicVisible
                                ? "Yes"
                                : "No"

                    })
                );


            const worksheet =
                XLSX.utils.json_to_sheet(
                    excelData
                );


            const workbook =
                XLSX.utils.book_new();


            XLSX.utils.book_append_sheet(
                workbook,
                worksheet,
                "Donations"
            );


            const buffer =
                XLSX.write(
                    workbook,
                    {
                        type: "buffer",
                        bookType: "xlsx"
                    }
                );


            res.setHeader(
                "Content-Disposition",
                "attachment; filename=donation-records.xlsx"
            );


            res.setHeader(
                "Content-Type",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            );


            res.send(
                buffer
            );

        } catch (error) {

            console.error(error);

            res.status(500).json({

                success: false,

                message:
                    "Excel export failed."

            });

        }

    }
);


// ============================================================
// CONTRIBUTORS
// ============================================================

// PUBLIC
app.get(
    "/api/contributors",
    async (req, res) => {

        try {

            const contributors =
                await collections.contributors
                    .find({
                        approved: true,
                        active: true
                    })
                    .sort({
                        year: -1,
                        amount: -1
                    })
                    .toArray();


            res.json(
                contributors
            );

        } catch (error) {

            res.status(500).json({

                success: false,

                message:
                    "Failed to fetch contributors."

            });

        }

    }
);


// ADD
app.post(
    "/api/admin/contributors",
    requireAdmin,
    async (req, res) => {

        try {

            const contributor = {

                name:
                    safeString(
                        req.body.name
                    ),

                year:
                    toNumber(
                        req.body.year,
                        new Date().getFullYear()
                    ),

                amount:
                    toNumber(
                        req.body.amount
                    ),

                message:
                    safeString(
                        req.body.message
                    ),

                approved:
                    toBoolean(
                        req.body.approved,
                        false
                    ),

                active:
                    toBoolean(
                        req.body.active,
                        true
                    ),

                createdAt:
                    new Date(),

                updatedAt:
                    new Date()

            };


            const result =
                await collections.contributors
                    .insertOne(
                        contributor
                    );


            res.status(201).json({

                success: true,

                message:
                    "Contributor added successfully.",

                id:
                    result.insertedId

            });

        } catch (error) {

            console.error(error);

            res.status(500).json({

                success: false,

                message:
                    "Failed to add contributor."

            });

        }

    }
);


// UPDATE
app.put(
    "/api/admin/contributors/:id",
    requireAdmin,
    async (req, res) => {

        try {

            const id =
                cleanObjectId(
                    req.params.id
                );


            if (!id) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Invalid contributor ID."

                });

            }


            const result =
                await collections.contributors.updateOne(

                    {
                        _id: id
                    },

                    {
                        $set: {

                            name:
                                safeString(
                                    req.body.name
                                ),

                            year:
                                toNumber(
                                    req.body.year,
                                    new Date().getFullYear()
                                ),

                            amount:
                                toNumber(
                                    req.body.amount
                                ),

                            message:
                                safeString(
                                    req.body.message
                                ),

                            approved:
                                toBoolean(
                                    req.body.approved,
                                    false
                                ),

                            active:
                                toBoolean(
                                    req.body.active,
                                    true
                                ),

                            updatedAt:
                                new Date()

                        }

                    }

                );


            res.json({

                success:
                    result.matchedCount > 0,

                message:
                    result.matchedCount > 0
                        ? "Contributor updated."
                        : "Contributor not found."

            });

        } catch (error) {

            console.error(error);

            res.status(500).json({

                success: false,

                message:
                    "Failed to update contributor."

            });

        }

    }
);


// DELETE
app.delete(
    "/api/admin/contributors/:id",
    requireAdmin,
    async (req, res) => {

        try {

            const id =
                cleanObjectId(
                    req.params.id
                );


            if (!id) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Invalid contributor ID."

                });

            }


            const result =
                await collections.contributors.deleteOne({

                    _id: id

                });


            res.json({

                success:
                    result.deletedCount > 0,

                message:
                    result.deletedCount > 0
                        ? "Contributor deleted."
                        : "Contributor not found."

            });

        } catch (error) {

            console.error(error);

            res.status(500).json({

                success: false,

                message:
                    "Failed to delete contributor."

            });

        }

    }
);


// ============================================================
// CONTACT
// ============================================================

// PUBLIC
app.post(
    "/api/contact",
    async (req, res) => {

        try {

            const name =
                safeString(
                    req.body.name
                );

            const mobile =
                safeString(
                    req.body.mobile
                );

            const email =
                safeString(
                    req.body.email
                );

            const message =
                safeString(
                    req.body.message
                );


            if (
                !name ||
                !mobile ||
                !message
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Name, mobile and message are required."

                });

            }


            const contact = {

                name,

                mobile,

                email,

                message,

                status:
                    "new",

                createdAt:
                    new Date(),

                updatedAt:
                    new Date()

            };


            const result =
                await collections.contacts
                    .insertOne(
                        contact
                    );


            res.status(201).json({

                success: true,

                message:
                    "Your message has been sent successfully.",

                id:
                    result.insertedId

            });

        } catch (error) {

            console.error(error);

            res.status(500).json({

                success: false,

                message:
                    "Failed to send message."

            });

        }

    }
);


// ADMIN CONTACTS
app.get(
    "/api/admin/contacts",
    requireAdmin,
    async (req, res) => {

        try {

            const messages =
                await collections.contacts
                    .find({})
                    .sort({
                        createdAt: -1
                    })
                    .toArray();


            res.json(
                messages
            );

        } catch (error) {

            res.status(500).json({

                success: false,

                message:
                    "Failed to fetch contact messages."

            });

        }

    }
);


// UPDATE CONTACT
app.put(
    "/api/admin/contacts/:id",
    requireAdmin,
    async (req, res) => {

        try {

            const id =
                cleanObjectId(
                    req.params.id
                );


            if (!id) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Invalid message ID."

                });

            }


            const status =
                safeString(
                    req.body.status
                ) || "read";


            const result =
                await collections.contacts.updateOne(

                    {
                        _id: id
                    },

                    {
                        $set: {

                            status,

                            updatedAt:
                                new Date()

                        }

                    }

                );


            res.json({

                success:
                    result.matchedCount > 0,

                message:
                    result.matchedCount > 0
                        ? "Message status updated."
                        : "Message not found."

            });

        } catch (error) {

            console.error(error);

            res.status(500).json({

                success: false,

                message:
                    "Failed to update message."

            });

        }

    }
);


// DELETE CONTACT
app.delete(
    "/api/admin/contacts/:id",
    requireAdmin,
    async (req, res) => {

        try {

            const id =
                cleanObjectId(
                    req.params.id
                );


            if (!id) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Invalid message ID."

                });

            }


            const result =
                await collections.contacts.deleteOne({

                    _id: id

                });


            res.json({

                success:
                    result.deletedCount > 0,

                message:
                    result.deletedCount > 0
                        ? "Message deleted."
                        : "Message not found."

            });

        } catch (error) {

            console.error(error);

            res.status(500).json({

                success: false,

                message:
                    "Failed to delete message."

            });

        }

    }
);


// ============================================================
// ADMIN DASHBOARD
// ============================================================

app.get(
    "/api/admin/dashboard",
    requireAdmin,
    async (req, res) => {

        try {

            const [

                totalMembers,

                totalDonations,

                donationSummary,

                pendingContacts,

                approvedContributors,

                totalPrograms,

                totalNotices,

                totalGallery

            ] = await Promise.all([

                collections.members.countDocuments(),

                collections.donations.countDocuments(),

                collections.donations
                    .aggregate([

                        {
                            $group: {

                                _id: null,

                                totalAmount: {
                                    $sum:
                                        "$amount"
                                }

                            }

                        }

                    ])
                    .toArray(),

                collections.contacts.countDocuments({
                    status: "new"
                }),

                collections.contributors.countDocuments({
                    approved: true,
                    active: true
                }),

                collections.programs.countDocuments(),

                collections.notices.countDocuments(),

                collections.gallery.countDocuments()

            ]);


            const totalAmount =
                donationSummary.length > 0
                    ? Number(
                        donationSummary[0].totalAmount
                    )
                    : 0;


            const recentDonations =
                await collections.donations
                    .find({})
                    .sort({
                        _id: -1
                    })
                    .limit(10)
                    .toArray();


            res.json({

                success: true,

                stats: {

                    totalMembers,

                    totalDonations,

                    totalAmount,

                    pendingContacts,

                    approvedContributors,

                    totalPrograms,

                    totalNotices,

                    totalGallery

                },

                recentDonations

            });

        } catch (error) {

            console.error(
                "Dashboard error:",
                error
            );

            res.status(500).json({

                success: false,

                message:
                    "Failed to load dashboard."

            });

        }

    }
);


// ============================================================
// API 404 HANDLER
// ============================================================

app.use(
    "/api",
    (req, res) => {

        res.status(404).json({

            success: false,

            message:
                "API endpoint not found."

        });

    }
);


// ============================================================
// GLOBAL ERROR HANDLER
// ============================================================

app.use(
    (error, req, res, next) => {

        console.error(
            "Server Error:",
            error
        );


        if (
            error instanceof multer.MulterError
        ) {

            return res.status(400).json({

                success: false,

                message:
                    error.message

            });

        }


        res.status(500).json({

            success: false,

            message:
                error.message ||
                "Internal server error."

        });

    }
);


// ============================================================
// START SERVER
// ============================================================

connectMongoDB()
    .then(() => {

        app.listen(
            PORT,
            "0.0.0.0",
            () => {

                console.log(
                    "=========================================="
                );

                console.log(
                    "SHREE SHREE DURGA PUJA SAMITI"
                );

                console.log(
                    "Backend Server Started"
                );

                console.log(
                    `http://localhost:${PORT}`
                );

                console.log(
                    `Admin Login: http://localhost:${PORT}/admin.html`
                );

                console.log(
                    "=========================================="
                );

            }
        );

    })
    .catch(
        error => {

            console.error(
                "Server startup failed:",
                error
            );

            process.exit(1);

        }
    );