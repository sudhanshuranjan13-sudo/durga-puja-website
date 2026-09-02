require("dotenv").config();

const { MongoClient } = require("mongodb");
const fs = require("fs");
const path = require("path");

const MONGO_URL =
    process.env.MONGO_URL || "mongodb://127.0.0.1:27017";

const DB_NAME = "durga_puja";

async function importMembers() {

    const client = new MongoClient(MONGO_URL);

    try {

        // MongoDB connect
        await client.connect();

        console.log("MongoDB connected.");

        const db = client.db(DB_NAME);

        const collection = db.collection("members");

        // Read members.json
        const filePath = path.join(
            __dirname,
              "data",
            "members.json"
        );

        const fileData = fs.readFileSync(
            filePath,
            "utf8"
        );

        const members = JSON.parse(fileData);

        if (!Array.isArray(members)) {

            throw new Error(
                "members.json must contain an array."
            );

        }

        // Remove old member records only
        const deleteResult =
            await collection.deleteMany({});

        console.log(
            `Old members removed: ${deleteResult.deletedCount}`
        );

        // Prepare data for MongoDB
        const records = members.map(
            (member, index) => ({

                positionHi:
                    String(member.positionHi || "").trim(),

                positionEn:
                    String(member.positionEn || "").trim(),

                nameHi:
                    String(member.nameHi || "").trim(),

                nameEn:
                    String(member.nameEn || "").trim(),

                image:
                    member.image || null,

                order:
                    index + 1,

                active:
                    true,

                createdAt:
                    new Date(),

                updatedAt:
                    new Date()

            })
        );

        // Insert members
        const result =
            await collection.insertMany(
                records
            );

        console.log(
            `Members imported successfully: ${result.insertedCount}`
        );

        // Show imported members
        const imported =
            await collection
                .find({})
                .sort({
                    order: 1
                })
                .toArray();

        console.log("\nImported Members:");

        imported.forEach(
            (member, index) => {

                console.log(
                    `${index + 1}. ${member.nameEn} - ${member.positionEn}`
                );

            }
        );

        console.log(
            "\nMember import completed successfully."
        );

    } catch (error) {

        console.error(
            "Member import failed:",
            error
        );

    } finally {

        await client.close();

        console.log(
            "MongoDB connection closed."
        );

    }

}

importMembers();