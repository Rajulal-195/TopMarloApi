import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    photo: {
        type: String,
        default:"https://imgs.search.brave.com/fSnoEac5gcNzc60UBF8NrIexgAMeW_fXR2WOO2sakIk/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzMyLzk3/LzFkLzMyOTcxZDFl/YjljZWRhMjdkN2Jj/Zjg2Mzk2ZTNhNDc2/LmpwZw"
    },
    password: {
        type: String,
        require: true,
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;

