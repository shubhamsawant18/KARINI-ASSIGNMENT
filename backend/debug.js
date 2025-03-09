const bcrypt = require("bcrypt");


const plainPassword = "sandeep";


const hashedPassword = "$2b$10$qc7LZiI2I/z91YyzEZWpIuZ7ddHRCqCCoIdL15rPyuTrMqX2uDiEW";

bcrypt.compare(plainPassword, hashedPassword, (err, result) => {
    if (err) console.error("❌ Error:", err);
    else console.log("✅ Password Match:", result);
});
