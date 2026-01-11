import express from "express";
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import authRoute from "./Routes/authRoute.js";
import beritaRoute from "./Routes/beritaRoute.js";
import dokumenPublikRoute from "./Routes/dokumenPublikRoute.js";
import informasiKelurahanhRoute from "./Routes/informasiKelurahanhRoute.js";
import layananPublikRoute from "./Routes/layananPublikRoute.js";
import pengaduanRoute from "./Routes/pengaduanRoute.js";
import wilayahRoute from "./Routes/wilayahRoute.js";
import chatRoute from "./Routes/ChatRoute.js";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoute);
app.use("/api/berita", beritaRoute);
app.use("/api/dokumen-publik", dokumenPublikRoute);
app.use("/api/informasi-kelurahan", informasiKelurahanhRoute);
app.use("/api/layanan-publik", layananPublikRoute);
app.use("/api/pengaduan", pengaduanRoute);
app.use("/api/wilayah", wilayahRoute);
app.use("/api/chat", chatRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
