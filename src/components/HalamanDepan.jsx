
import { NavLink } from 'react-router-dom'
import React, { useState } from 'react';
import { readDataMhs } from ".././firestoreConnect";
import { useEffect } from 'react';
import { Route } from 'react-router-dom';
import MapWithSide from ".././MapWithSide";

export default function HalamanDepan({refresh, data, setData}) {
  
  return (
    <div className='flex flex-col gap-10 w-screen h-screen justify-center items-center'>
      <Tabel refresh={refresh} data={data} setData={setData}/>
      <div className="cta flex gap-10">
        <NavLink to={'/login'} className="login flex justify-center items-center rounded-xl ring-1 ring-black cursor-pointer py-1 px-2 hover:ring-slate-700">Login</NavLink>
        <NavLink to={'/daftar'} className="login flex justify-center items-center rounded-xl ring-1 ring-black cursor-pointer py-1 px-2 hover:ring-slate-700">Daftar</NavLink>
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
    <section className="section p-10 pt-10 h-fit ">
      <h2 className="text-4xl font-bold text-black text-center mb-4">Data Kelas</h2>
      <div className="w-full h-1 bg-black mb-5"></div>
      <div className="mb-4">
        <input 
          type="text" 
          id="search-input" 
          className="w-full p-2 border border-gray-600 rounded  text-black"
          placeholder="Cari Nama atau NIM..."
          value={search}
          onChange={(e) => {setSearch(e.target.value); filterData(e.target.value) }}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-900 text-white">
          <thead>
            <tr className='text-black border-b-2 border-b-gray-600'>
              <th className="py-2 px-4 text-left   bg-gray-100">Name</th>
              <th className="py-2 px-4 text-left bg-gray-100">NIM</th>
              <th className="py-2 px-4 text-left  bg-gray-100">Tanggal Lahir</th>
              <th className="py-2 px-4 text-left bg-gray-100">Alamat</th>
              <th className="py-2 px-4 text-left  bg-gray-100">Nomor Telepon</th>
              <th className="py-2 px-4 text-left  bg-gray-100">Favorite</th>
            </tr>
          </thead>
          <tbody className='overflow-scroll '>
            {filteredData.map((el, index) => (
              <tr key={index} onClick={()=>{setRoute(!route); setClicked(el)}} className={index % 2 === 0 ? 'bg-gray-100 text-black' : 'bg-gray-300 text-black'}>
                <td className="py-2 px-4">{el.nama}</td>
                <td className="py-2 px-4">{el.NIM}</td>
                <td className="py-2 px-4">{el.tglLahir}</td>
                <td className="py-2 px-4">{el.alamat.nama.slice(0,30)}...</td>
                <td className="py-2 px-4">{el.telp}</td>
                <td className="py-2 px-4">{el.kesukaan}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
    {route && (<div className=' flex justify-center items-center w-screen bg-red-900 h-screen fixed top-0 left-0 z-50'><MapWithSide  type={"showOnDash"}  h={`30rem`} w={"75%"} user={clicked}/></div>)}
  </>
  );
};


