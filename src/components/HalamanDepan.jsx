
import { NavLink } from 'react-router-dom'
import React, { useState, useRef } from 'react';
import { readDataMhs } from ".././firestoreConnect";
import { useEffect } from 'react';
import { Route } from 'react-router-dom';
import MapWithSide from ".././MapWithSide";
import PopupInfo from './PopupInfo';
import ".././index.css"

export default function HalamanDepan({refresh, data, setData}) {
  const [help, setHelp] = useState(false)
  
  return (
    <div className='flex flex-col gap-10 w-screen h-screen pt-14 items-center  bg-gradient-to-r from-[#1A1C4F] to-[#284BC3] no-scrollbar overflow-hidden'>
      {help && <Bantuan updatePopup={setHelp}/>}
      <Tabel refresh={refresh} data={data} setData={setData}/>
      <div className="cta flex gap-10">
        <NavLink to={'/login'} className="login text-xl flex justify-center items-center rounded-xl text-white  ring-1 ring-white bg-[#2743AF] cursor-pointer py-1.5 px-3 hover:bg-[#1B2058] hover:text-gray-500 hover:ring-slate-700">Login</NavLink>
        <NavLink to={'/daftar'} className="login text-xl flex justify-center items-center rounded-xl text-white  ring-1 ring-white bg-[#2743AF] cursor-pointer py-1.5 px-3 hover:bg-[#1B2058] hover:text-gray-500 hover:ring-slate-700">Daftar</NavLink>
      </div>
      <div onClick={()=>setHelp(true)} className="  cursor-pointer fixed right-10 bottom-10 px-5 py-3 rounded-3xl text-white text-xl hover:bg-[#2743AF] ring-1 ring-white bg-[#1B2058] ">bantuan?</div>
    </div>
  )
}


function Bantuan({updatePopup}) {
  const ref = useRef(null);

  
  useEffect(() => {
    const handleOutSideClick = (event) => {
      if (!ref.current?.contains(event.target)) {
        updatePopup()
      }
    };
    
    window.addEventListener("mousedown", handleOutSideClick);
    
    return () => {
      window.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [ref]);
  
  const listHelp =[
    {judul:"Bagaimana jika lupa password?",
    isi:"Pada halaman login, terdapat pilihan lupa password. Jika diklik maka akan menampilkan form untuk username atau NIM. Jika anda bisa mengisinya dengan data yang benar maka, password akan ditampilkan di layar"
    },
    {judul:"Bagaimana cara mendaftar?",
    isi:"Anda dapat mendaftar dengan mengunjungi halaman pendaftaran dan mengisi form yang disediakan secara valid, petunjuk pengisian dapat dilihan pada masing-masing form."
  },
    {judul:"Bagaimana cara mendapatkan informasi mahasiswa secara rinci?",
    isi:"Anda dapat mengakses secara rinci data mahasiswa dengan mengklik baris data mahasiswa yang anda ingin."
  },
  {judul:"Bagaimana cara menambah data mahasiswa?",
  isi:"Kewenangan menambah data mahasiswa hanya dapat dilakukan oleh admin pada halaman dashboard, sedangkan untuk mahasiswa hanya bisa mendaftarkan akunnya."
},
{judul:"Bagaimana cara mengisi form alamat?",
isi:"Di halaman daftar, edit, dan tambah data terdapat form alamat berupa peta lokasi, anda bisa mengklik lokasi alamat dengan mengklik lokasi pada peta. Koordinat latitude dan longitude akan diisi secara otomatis."
},
{judul:"Apa yang harus dilakukan jika data mahasiswa tidak ditemukan?",
isi:"Jika data mahasiswa tidak ditemukan, pastikan Anda telah memasukkan kata kunci pencarian yang benar. Jika masih tidak ditemukan, mungkin data tersebut belum diinput ke dalam sistem. Hubungi administrator untuk informasi lebih lanjut."
},
{judul:"Bagaimana cara masuk sebagai admin dan mahasiswa?",
isi:`Masuk Sebagai Admin 
Username: admin123 
Password: admin123 

Masuk Sebagai Mahasiswa 
Username: nim (Contoh '11220910000059') 
Password: 'Kho123'`
},
]
const [active, setActive]=useState(listHelp[0].judul)
return(
    <div className={`w-screen z-[99999] cursor-pointer backdrop-blur-sm bg-white/30 h-screen fixed top-0 left-0 flex  justify-center items-center`}>
      <div className="font-semibold  w-[50%] flex text-xl  rounded-lg overflow-clip" ref={ref}>
        <div className="side flex flex-col justify-evenly w-fit bg-[#2743AF]  basis-2/5 text-white pt-2">
          {listHelp.map((e,i)=>(<div key={i} onClick={()=>setActive(e.judul)} className={`hover:bg-[#1B2058] ${active==e.judul?"bg-[#1B2058]":""} h-full ${e.judul==active?"  bg-opacity-70":""} flex flex-wrap border-b-2 border-black/30 text-lg px-5 py-2 `}>{e.judul}</div>))}
        </div>
        <div className="isi flex flex-col justify-center gap-10 pl-14 px-20 bg-[#1A1C4F]  text-white basis-3/5">
          <p className=' text-2xl'>{active}</p>
          {active==listHelp[6].judul?(<div>
            <p className='text-lg font-bold  mb-3'>Masuk Sebagai Admin:</p>
            <div className="flex flex-col text-lg gap-1 "><p>Username : admin123</p><p>Password  : admin123</p></div>
            <p className='text-lg font-bold  mb-3 mt-5'>Masuk Sebagai User:</p>
            <div className="text-lg flex flex-col gap-1"><p>Username: 112220910000059</p><p>Password: Kho123</p></div>
          </div>):(<p className='text-lg'>{listHelp.filter((e)=>{
            return e.judul==active
          })[0].isi}</p>)}
        </div>
      </div>
    </div>
  )
}




const Tabel = ({refresh, data, setData}) => {
  const [search, setSearch] = useState('');
  const [route, setRoute] = useState(false) //munculin route
  const [filteredData,setFilteredData] = useState([]);
  const [clicked,setClicked] = useState();

  function filterData(value) {
    setFilteredData(data.filter(data => data.nama.toLowerCase().includes(value.toLowerCase()) || data.NIM.toLowerCase().includes(value.toLowerCase())));
    console.log(filteredData)
  }

  useEffect(() => {
    const fetchData = async () => {
      await readDataMhs(setData);
    };
    
    fetchData();
    console.log('bb')
  }, [refresh]);

  useEffect(() => {
    if (data.length > 0) {
      setFilteredData(data) 
    }
  }, [data]);

  return (
    <>
    <section className="section p-10 pt-0 h-fit w-[70%]">
      <h2 className="text-4xl font-bold text-white text-center mb-4">Data Kelas</h2>
      <div className="w-full h-1 bg-white mb-5"></div>
      <div className="mb-4">
        <input 
          type="text" 
          id="search-input" 
          className="w-full p-2 pl-4  backdrop-blur-sm bg-white/15  rounded-lg  text-white"
          placeholder="Cari Nama atau NIM..."
          value={search}
          onChange={(e) => {setSearch(e.target.value); filterData(e.target.value) }}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-900 text-white">
          <thead className='block'>
            <tr style={{ display: 'table',  tableLayout: 'fixed' }} className='w-full bg-[#2443AE] text-white border-b-2 border-b-gray-600'>
              <th className="py-2 px-4 border text-left   ">Name</th>
              <th className="py-2 px-4 border text-left">NIM</th>
              <th className="py-2 px-4 border text-left  ">Tanggal Lahir</th>
              <th className="py-2 px-4 border text-left ">Alamat</th>
              <th className="py-2 px-4 border text-left  ">Nomor Telepon</th>
              <th className="py-2 px-4 border text-left  ">Favorite</th>
            </tr>
          </thead>
          <tbody className="custom-inset-shadow overflow-y-auto no-scrollbar w-[100%] " style={{ maxHeight: '25rem', display: 'block' }}>
            {filteredData.map((el, index) => (
              <tr key={index} style={{ display: 'table', tableLayout: 'fixed' }} onClick={()=>{setRoute(!route); setClicked(el)}} className={`w-full cursor-pointer border hover:bg-gray-900 hover:text-gray-100 ${index % 2 === 0 ? 'bg-[#1B2058]  text-white' : 'bg-[#1B2058] text-white'}`}>
                <td className="py-2 border px-4">{el.nama.slice(0,20)}{el.kesukaan.length>20?'...':''}</td>
                <td className="py-2 border px-4">{el.NIM}</td>
                <td className="py-2 border px-4">{el.tglLahir}</td>
                <td className="py-2 border px-4">{el.alamat.nama.slice(0,30)}...</td>
                <td className="py-2 border px-4">{el.telp}</td>
                <td className="py-2 border px-4">{el.kesukaan.slice(0,15)}{el.kesukaan.length>15?'...':''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
    {route && (<div className=' flex justify-center items-center w-screen h-screen fixed top-0 left-0 z-50'><PopupInfo dataClicked={clicked} updatePopup={setRoute}/></div>)}
  </>
  );
};


