import { createAsyncThunk } from "@reduxjs/toolkit";
import { cloudinaryApi } from "api";
import { getFileBinary } from "common";
import { UploadSongFormValues } from "./types";
import { extendedApi as songApi } from "./api";

/**
 * Retreive a Cloudinary signature, use the signature to upload
 * the album cover art image to Cloudinary, upload the song to AWS,
 * save the song in the NEWM back-end with the file url information,
 * and then fetch the user's songs.
 */
export const uploadSong = createAsyncThunk(
  "song/uploadSong",
  async (body: UploadSongFormValues, thunkApi) => {
    // optional upload params to format or crop image could go here
    const uploadParams = {};

    const signatureResp = await thunkApi.dispatch(
      songApi.endpoints.getCloudinarySignature.initiate(uploadParams)
    );

    if ("error" in signatureResp || !("data" in signatureResp)) return;

    const { apiKey, signature, timestamp } = signatureResp.data;

    const imageBinaryStr = await getFileBinary(body.image);

    // upload image to cloudinary
    const cloudinaryResp = await thunkApi.dispatch(
      cloudinaryApi.endpoints.uploadImage.initiate({
        api_key: apiKey,
        file: imageBinaryStr,
        signature,
        timestamp,
        ...uploadParams,
      })
    );

    if ("error" in cloudinaryResp || !("data" in cloudinaryResp)) return;

    // create the song in the NEWM API
    const songResp = await thunkApi.dispatch(
      songApi.endpoints.uploadSong.initiate({
        title: body.title,
        genre: body.genre,
        description: body.description,
        coverArtUrl: cloudinaryResp.data.secure_url,
      })
    );

    if ("error" in songResp) return;

    const { songId } = songResp.data;

    // get signed upload url for AWS
    const audioUploadUrlResp = await thunkApi.dispatch(
      songApi.endpoints.getAudioUploadUrl.initiate({
        songId,
        fileName: body.audio.name,
      })
    );

    if ("error" in audioUploadUrlResp) return;

    const { uploadUrl } = audioUploadUrlResp.data;
    const audioBinaryStr = await getFileBinary(body.audio);

    // upload audio to AWS, song audioUrl will be updated after it's transcoded
    await fetch(uploadUrl, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ file: audioBinaryStr }),
    });

    // fetch user's songs
    thunkApi.dispatch(songApi.endpoints.getSongs.initiate());
  }
);
