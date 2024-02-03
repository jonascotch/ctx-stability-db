import firebaseApp from "../firebase.js";
import Medicine from "../models/medicineModel.js";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  addDoc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  updateMetadata,
} from "firebase/storage";

const db = getFirestore(firebaseApp);

const medicinesCollectionRef = collection(db, "medicines");

const storage = getStorage();

export const addMedicine = async (req, res, next) => {
  try {
    // to store the image in firebase storage
    const mimetype = req.file.mimetype
    const filetype = mimetype.split('/')[1]

    const storageRef = ref(storage, `images/${Date.now()}.${filetype}`);
    await uploadBytes(storageRef, req.file.buffer);
    updateMetadata(storageRef, { contentType: mimetype });

    // reference of image to store in firestore
    req.body.image = await getDownloadURL(storageRef);

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
    newMedicine.validate()

    // add new document in firebase collection
    const docRef = await addDoc(
      medicinesCollectionRef,
      Object.assign({}, newMedicine)
    );

    const data = await getDoc(doc(db, 'medicines', docRef.id))
    const load = {...data.data(), id: docRef.id}

    // response
    res.status(200).json({
      status: "success",
      data:load,
    });

    //error handling
  } catch (error) {
    res.status(400).json({
      status: "error",
      data: {
        data: `Error: ${error.message}`,
      },
    });
  }
};

export const getAllMedicines = async (req, res, next) => {
  try {
    const data = await getDocs(medicinesCollectionRef);
    const detailedData = data.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log(detailedData);

    res.status(200).json(detailedData);
  } catch (error) {
    console.log(error.message);
    res.send("An error has occurred " + error.message);
  }
};
