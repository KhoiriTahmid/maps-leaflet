import { collection, addDoc, getDocs, query, where, doc, updateDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import {db} from './Firebase';

const addDataMhs = async (user, input) => {
    //if(Object.values(verif).includes(false)) return; // bisa pake ref ke atau apa, biar ke popup kalo isi dulu yg bener
    try {
      console.log(Object.values(user, input))
      const docRef = await addDoc(collection(db, "mahasiswa"), {
        NIM   : input.NIM,
        nama  : input.nama,
        tglLahir:input.tglLahir,
        telp  : input.telp,
        alamat: input.alamat,
        kesukaan:input.kesukaan,
        userName:input.userName,
        pass:input.pass
      });
      console.log("Document written with ID: ", docRef.id);
      try {
        await addDataHistory({NIM:user.NIM, nama:user.nama}, "menambah data")
        //console.log("Document written with ID: ", docHst);
        alert("berhasil menambahakan data")
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const readDataMhs = async (setData) => {
       
      try {
        await getDocs(collection(db, "mahasiswa"))
          .then((querySnapshot)=>{
              const newData = querySnapshot.docs.map((doc) => ({...doc.data() }));
              setData(newData);
              console.log(newData)
              return newData
          })
      } catch (error) {
        console.log(error)
      }
  }
  

const findDataByParam = async (NIM, nama=null) => {
  try {
    let q;
    if (nama==null) {
      q = query(
        collection(db, "mahasiswa"),
        where("NIM", "==", NIM)
      );
    }else{
      q = query(
        collection(db, "mahasiswa"),
        where("NIM", "==", NIM),
        where("nama", "==", nama)
      );
    }
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const documentData = nama? querySnapshot.docs.map((doc) => ({...doc.data()})):querySnapshot.docs.map((doc) => ({id:doc.id }));
      console.log("Document data:", documentData);
      return documentData[0];
    } else {
      console.log("No matching documents.");
      return null;
    }
  } catch (e) {
    console.error("Error finding document: ", e);
    return null;
  }
};

const findDataByUnameOrNIM = async (input) => {
  try {
    const nimQuery = query(
      collection(db, "mahasiswa"),
      where("NIM", "==", input)
    );
    
    const userNameQuery = query(
      collection(db, "mahasiswa"),
      where("userName", "==", input)
    );

    const [nimSnapshot, userNameSnapshot] = await Promise.all([
      getDocs(nimQuery),
      getDocs(userNameQuery)
    ]);

    let documentData = [];

    if (!nimSnapshot.empty) {
      documentData = nimSnapshot.docs.map((doc) => ({ ...doc.data() }));
    } else if (!userNameSnapshot.empty) {
      documentData = userNameSnapshot.docs.map((doc) => ({ ...doc.data() }));
    }

    if (documentData.length > 0) {
      console.log("login? ", documentData);
      return documentData[0];
    } else {
      console.log("No matching documents.");
      return null;
    }
  } catch (e) {
    console.error("Error finding document: ", e);
    return null;
  }
};




const updateDataMhs = async (user, NIM, updatedData) => {
    
    try {
      const id = await findDataByParam(NIM)
      console.log("ini   ",id, updatedData)
      const docRef = doc(db, "mahasiswa", id.id);
      await updateDoc(docRef, updatedData);
      console.log("Document updated with ID: ", id);
      try {
        await addDataHistory({NIM:user.NIM, nama:user.nama}, "update data")
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  };
  
  const deleteDataMhs = async (user, NIM) => {
    try {
      const id = await findDataByParam(NIM)
      const docRef = doc(db, "mahasiswa", id.id);
      await deleteDoc(docRef);
      console.log("Document updated with ID: ", id);
      try {
        await addDataHistory({NIM:user.NIM, nama:user.nama}, "menghapus data")
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    } catch (e) {
        console.error("Error updating document: ", e);
    }
};

const addDataHistory = async (user, aktifitas) => {//login, update, delete, create
    //if(Object.values(verif).includes(false)) return; // bisa pake ref ke atau apa, biar ke popup kalo isi dulu yg bener
    try {
      const docRef = await addDoc(collection(db, "history"), {
        NIM   : user.NIM,
        nama  : user.nama,
        aktifitas:aktifitas,
        time  : serverTimestamp()
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const readDataHistory = async (setData) => {

    function convertTimestampToString(timestamp) {
      const date = timestamp.toDate();
      const dateString = date.toLocaleString(); 
    
      return dateString;
    }
       
      try {
        await getDocs(collection(db, "history"))
          .then((querySnapshot)=>{
              const newData = querySnapshot.docs.map((doc) => ({...doc.data(), id:doc.id }));
              const dateString = newData.map(e=>({...e, waktu:convertTimestampToString(e.time)})) ;
              dateString.sort((a,b)=> b.time-a.time)
              console.log(dateString);
              setData(dateString);
          })
      } catch (error) {
        console.log(error)
      }
    
  }

export {addDataMhs, findDataByUnameOrNIM, readDataMhs, updateDataMhs, deleteDataMhs, readDataHistory, addDataHistory, findDataByParam}