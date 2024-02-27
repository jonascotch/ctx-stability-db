import Medicine from "../models/medicineModel.js";
import firebaseApp from "../firebase.js";
import {
  getStorage,
  getDownloadURL,
  ref,
  uploadBytes,
  updateMetadata,
  deleteObject,
} from "firebase/storage";

import { db } from "../firebaseAdmin.js";

// const medicinesCollectionRef = collection(db, "medicines");

const storage = getStorage(firebaseApp);

// function to add medicine to DB
export const addMedicine = async (req, res, next) => {
  try {
    // to store the image in firebase storage
    if (req.file) {
      const mimetype = req.file.mimetype;
      const filetype = mimetype.split("/")[1];

      const storageRef = ref(storage, `images/${Date.now()}.${filetype}`);
      await uploadBytes(storageRef, req.file.buffer);
      updateMetadata(storageRef, { contentType: mimetype });

      // reference of image to store in firestore
      req.body.image = await getDownloadURL(storageRef);
    }

    // USING req.body
    // req.body.createdAt = Date.now()
    // req.body.firstLetter = req.body.brandName[0]
    // const docRef = await addDoc(medicinesCollectionRef, req.body);
    // res.status(200).json({
    //     status: 'success',
    //     data: docRef.id
    //     }
    // )

    //USING MODEL
    // use model to create new Object
    const newMedicine = new Medicine(req.body);
    newMedicine.validate();

    // create new document
    const docRef = await db
      .collection("medicines")
      .add(JSON.parse(JSON.stringify(newMedicine)));
    // ref to new doc created
    const newDocRef = db.collection("medicines").doc(docRef.id);
    // get new doc to send to client
    const newDoc = await newDocRef.get();
    // add id to new doc data
    const load = { ...newDoc.data(), id: docRef.id };

    // add new document in firebase collection - NOT USED WITH FIREBASE ADMIN
    // const docRef = await addDoc(
    //   medicinesCollectionRef,
    //   Object.assign({}, newMedicine)
    // );

    // get new document created to send to client - NOT USED WITH FIREBASE ADMIN
    // const data = await getDoc(doc(db, "medicines", docRef.id));
    // const load = { ...data.data(), id: docRef.id };

    // response
    res.status(200).json({
      status: "success",
      data: load,
    });

    //error handling
  } catch (error) {
    res.status(400).json({
      status: "error",
      data: error.message,
    });
  }
};

// function to get all medicines from db
export const getAllMedicines = async (req, res, next) => {
  try {
    const dataRef = db.collection("medicines");

    // used with client firebase sdk
    // const data = await getDocs(medicinesCollectionRef);

    // with firebase admin SDK
    const data = await dataRef.get();
    const detailedData = data.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json({
      status: "success",
      data: detailedData,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      data: error.message,
    });
  }
};

export const getMedicines = async (req, res, next) => {
  try {
    // used with client sdk
    // const queryString = query(
    //   medicinesCollectionRef,
    //   where("firstLetter", "==", req.params.letter.toLowerCase())
    // );
    // const data = await getDocs(queryString);

    const medicinesRef = db.collection("medicines");
    const query = medicinesRef.where(
      "firstLetter",
      "==",
      req.params.letter.toLowerCase()
    );
    const data = await query.get();

    let handledData = data.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json({
      status: "success",
      data: handledData,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      data: error.message,
    });
  }
};

export async function getMedicineById(req, res, next) {
  try {
    // used with firebase client sdk
    // const docRef = doc(db, "medicines", req.params.id);
    // const docSnap = await getDoc(docRef);

    const medicineRef = db.collection("medicines").doc(req.params.id);
    const data = await medicineRef.get();

    let handledData;

    if (data.exists) {
      handledData = data.data();
    }

    res.status(200).json({
      status: "success",
      data: {
        id: req.params.id,
        ...handledData,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      data: error.message,
    });
  }
}

export async function updateMedicine(req, res, next) {
  try {
    if (req.file) {
      // get file name from old image
      const firstCut = req.body.image.split("%2F")[1];
      const imageName = firstCut.split("?")[0];

      //create reference to old image in storage
      const oldImageRef = ref(storage, `images/${imageName}`);

      // delete old image
      await deleteObject(oldImageRef);

      // save new image to storage and save ref in req.body
      const mimetype = req.file.mimetype;
      const filetype = mimetype.split("/")[1];

      const storageRef = ref(storage, `images/${Date.now()}.${filetype}`);
      await uploadBytes(storageRef, req.file.buffer);
      updateMetadata(storageRef, { contentType: mimetype });

      // reference of image to store in firestore
      req.body.image = await getDownloadURL(storageRef);
    }

    const newMedicine = new Medicine(req.body);
    newMedicine.validate();

    // get reference for document to update and update it. USING FIREBASE client
    // const docToUpdateRef = doc(db, "medicines", req.params.id);
    // const docRef = await updateDoc(
    //   docToUpdateRef,
    //   JSON.parse(JSON.stringify(newMedicine)),
    //   { merge: true }
    // );

    const docToUpdateRef = db.collection("medicines").doc(req.params.id);

    const docRef = await docToUpdateRef.update(
      JSON.parse(JSON.stringify(newMedicine), { merge: true })
    );

    const data = await docToUpdateRef.get();
    const load = { ...data.data(), id: req.params.id };

    // response
    res.status(200).json({
      status: "success",
      data: load,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      data: error.message,
    });
  }
}
