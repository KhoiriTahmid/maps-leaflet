import React, { useState } from 'react';
import { readDataHistory } from "../../firestoreConnect";
import { useEffect } from 'react';
import Form from '../Form';
import { Timestamp } from 'firebase/firestore';


export default function AdminHistory  ({refresh, refreshing ,user, setUser, data, setData})  {
  const [search, setSearch] = useState('');

  const [filteredData,setFilteredData] = useState([]);

  function filterData(value) {
    setFilteredData(data.filter(data => data.nama.toLowerCase().includes(value.toLowerCase()) || data.NIM.toLowerCase().includes(value.toLowerCase())));
    console.log(filteredData)
  }

  useEffect(() => {
    const fetchData = async () => {
      await readDataHistory(setData);
    };
    
    fetchData();
    console.log('bb')
  }, [refresh]);

  useEffect(() => {
    if (data.length > 0) {
      setFilteredData(data) 
      console.log('date',data)
    }
  }, [data]);

  
  
  
  
  


  return (
    <section className="section p-10 pt-10 bg-slate-950 min-h-screen">
      <h2 className="text-4xl font-bold text-yellow-500 text-center mb-4">Data Kelas</h2>
      <div className="w-full h-1 bg-yellow-500 mb-5"></div>
      <div className="mb-4">
        <input 
          type="text" 
          id="search-input" 
          className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
          placeholder="Cari Nama atau NIM..."
          value={search}
          onChange={(e) => {setSearch(e.target.value); filterData(e.target.value) }}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-900 text-white">
          <thead>
            <tr className='text-yellow-500 border-b-2 border-b-yellow-500'>
              <th className="py-2 px-4 text-left bg-gray-700">Name</th>
              <th className="py-2 px-4 text-left bg-gray-700">NIM</th>
              <th className="py-2 px-4 text-left bg-gray-700">Aktivitas</th>
              <th className="py-2 px-4 text-left bg-gray-700">Waktu</th>
            </tr>
          </thead>
          <tbody className='overflow-scroll '>
            {filteredData.map((data, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'}>
                <td className="py-2 px-4">{data.nama}</td>
                <td className="py-2 px-4">{data.NIM}</td>
                <td className="py-2 px-4">{data.aktifitas}</td>
                <td className="py-2 px-4">{data.waktu}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

