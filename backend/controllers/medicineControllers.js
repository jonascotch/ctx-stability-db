import firebaseApp from "../firebase.js";
import Medicine from "../models/medicineModel.js";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  updateMetadata,
  deleteObject,
} from "firebase/storage";

const db = getFirestore(firebaseApp);

const medicinesCollectionRef = collection(db, "medicines");

const storage = getStorage();

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

    // add new document in firebase collection
    const docRef = await addDoc(
      medicinesCollectionRef,
      Object.assign({}, newMedicine)
    );

    const data = await getDoc(doc(db, "medicines", docRef.id));
    const load = { ...data.data(), id: docRef.id };

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
    const data = await getDocs(medicinesCollectionRef);
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
  console.log(req.params);

  try {
    const queryString = query(
      medicinesCollectionRef,
      where("firstLetter", "==", req.params.letter.toLowerCase())
    );

    const data = await getDocs(queryString);

    let handledData;

    if (data) {
      handledData = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    }

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
    const docRef = doc(db, "medicines", req.params.id);

    const docSnap = await getDoc(docRef);

    let handledData;

    if (docSnap.exists()) {
      handledData = docSnap.data();
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
      // get file name from odl image
      console.log('há imagem')
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
    } else [
      console.log('afinal não há')
    ]

    const newMedicine = new Medicine(req.body);
    newMedicine.validate();

    // get reference for document to update
    const docToUpdateRef = doc(db, "medicines", req.params.id);

    const docRef = await updateDoc(
      docToUpdateRef,
      JSON.parse(JSON.stringify(newMedicine)),
      { merge: true }
    );

    const data = await getDoc(doc(db, "medicines", req.params.id));
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
