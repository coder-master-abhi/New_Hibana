/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const functions = require('firebase-functions');
const cloudinary = require('cloudinary').v2;

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

cloudinary.config({
  cloud_name: functions.config().cloudinary.cloud_name,
  api_key: functions.config().cloudinary.api_key,
  api_secret: functions.config().cloudinary.api_secret,
});

// Add a properly scoped uploadImage callable function:
exports.uploadImage = functions.https.onCall(async (data, context) => {
  const { imagePath } = data;
  if (!imagePath) {
    throw new functions.https.HttpsError('invalid-argument', 'imagePath is required');
  }
  try {
    const uploadResult = await cloudinary.uploader.upload(imagePath);
    // TODO: Save uploadResult.public_id in Firestore with the product/offer/campaign if needed
    return { public_id: uploadResult.public_id, url: uploadResult.secure_url };
  } catch (error) {
    throw new functions.https.HttpsError('internal', error.message);
  }
});

exports.deleteImage = functions.https.onCall(async (data, context) => {
  const { public_id } = data;
  if (!public_id) {
    throw new functions.https.HttpsError('invalid-argument', 'public_id is required');
  }
  try {
    await cloudinary.uploader.destroy(public_id);
    // Optionally, update Firestore to remove the public_id or image URL
    return { success: true };
  } catch (error) {
    throw new functions.https.HttpsError('internal', error.message);
  }
});
