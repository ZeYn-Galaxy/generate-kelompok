import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Table from './components/Table';

function App() {
  const [TotalAnggota, setTotalAnggota] = useState(0);
  const [TotalKelompok, setTotalKelompok] = useState(0);
  const [IsInValidAnggota, setIsInValidAnggota] = useState(false);
  const [IsInValidKelompok, setIsInValidKelompok] = useState(false);
  const [KelompokError, setKelompokError] = useState('');
  const [data, setData] = useState({
    Kelompok: [],
    Exception: [],
  })

  const [temp, setTemp] = useState([])
  const [tempAbsen, setTempAbsen] = useState(0)
  const changeTempAbsen = (e) => {
    setTempAbsen(e.target.value)
  }
  const addKelompokTemp = () => {
    let found = false;

    // Cek apakah tempAbsen ada dalam array temp
    if (temp.includes(parseInt(tempAbsen)) || parseInt(tempAbsen) === 0) {
      found = true;
    } else {
      // Cek apakah tempAbsen ada dalam array data.Kelompok
      data.Kelompok.forEach((item) => {
        item.forEach((v) => {
          if (parseInt(v) === parseInt(tempAbsen)) {
            found = true;
          }
        });
      });
    }

    if (found) {
      return
    }
    const updatedTemp = [...temp, parseInt(tempAbsen)];
    setTemp(updatedTemp);
    setTempAbsen(0)
  }

  const removeKelompokTemp = (index) => {
    // Membuat salinan baru dari temp dan menghapus elemen berdasarkan indeks
    const updatedTemp = [...temp.slice(0, index), ...temp.slice(index + 1)];
    setTemp(updatedTemp);
  };

  const saveKelompokTemp = () => {
    if (temp.length === 0) {
      return
    }
    let temp_data_kelompok = [...data.Kelompok]
    let temp_data_exception = [...data.Exception]
    temp_data_kelompok.push(temp)
    temp_data_exception.push(temp);
    InputDataChange(temp_data_kelompok, temp_data_exception)
    setTemp([])
  }

  const InputDataChange = (value1, value2) => {
    setData({
      ...data,
      Kelompok: value1,
      Exception: value2
    })
  }

  const removeKelompok = (index) => {
    // Membuat salinan baru dari temp dan menghapus elemen berdasarkan indeks
    let data_exception = [...data.Exception]
    data_exception.forEach((item) => {
      item.forEach((i) => {
        if (data.Kelompok[index].includes(i)) {
          data_exception = [...data.Exception.slice(0, index), ...data.Exception.slice(index + 1)];
        }
      })
    })
    const updatedTemp = [...data.Kelompok.slice(0, index), ...data.Kelompok.slice(index + 1)];
    InputDataChange(updatedTemp, data_exception)
  };

  const resetData = () => {
    InputDataChange([], [])
  }

  const generate = () => {
    if (TotalAnggota < 0 || TotalKelompok < 0 || TotalKelompok > TotalAnggota) {
      return
    }

    const existingMembers = [].concat(...data.Kelompok);
    let temp = [...data.Kelompok]; // Salin props.DataKelompok agar tidak mengubah properti asli
    // Hitung jumlah anggota yang akan ditempatkan di setiap kelompok
    let AnggotaPerKelompok = Math.floor(TotalAnggota / TotalKelompok);
    let anggotaPerSisaKelompok = TotalAnggota % TotalKelompok; // Jumlah anggota yang harus dibagi rata ke kelompok
    let data_exception = [...data.Exception]

    const nonExistingMembers = [];
    for (let i = 1; i <= TotalAnggota; i++) {
      if (!existingMembers.includes(i)) {
        nonExistingMembers.push(i);
      }
    }

    for (let i = 0; i < TotalKelompok + data_exception.length; i++) {
      if (temp[i] === undefined) {
        temp[i] = [];
      }
    }


    for (let i = 0; i < temp.length; i++) {
      // if (props.Exception.includes(i+1)) {
      //     continue
      // }
      let found = false
      data_exception.forEach((item) => {
        item.forEach((iterasi) => {
          if (temp[i].includes(iterasi)) {
            found = true
          }
        })
      })
      if (found) {
        continue
      }
      let anggotaKelompok = AnggotaPerKelompok + (i < anggotaPerSisaKelompok ? 1 : 0); // Tentukan jumlah anggota yang harus dimasukkan ke kelompok saat ini
      while (temp[i].length < anggotaKelompok) {
        if (nonExistingMembers.length === 0) {
          break; // Keluar dari loop jika tidak ada anggota yang tersisa
        }
        const randomIndex = Math.floor(Math.random() * nonExistingMembers.length);
        temp[i].push(nonExistingMembers[randomIndex])
        nonExistingMembers.splice(randomIndex, 1)
      }
    }

    temp.forEach((item, index) => {
      if (item.length === 0) {
        temp.splice(index, 1)
      }
    })
    InputDataChange(temp, data.Exception);
  };


  useEffect(() => {
    setIsInValidAnggota(TotalAnggota < 0)
    setIsInValidKelompok(TotalKelompok < 0 || TotalAnggota > 0 && TotalKelompok > TotalAnggota)
    if (TotalKelompok < 0) {
      setKelompokError('Nilai tidak boleh dibawah 0 atau negative!')
    } else if (TotalKelompok > TotalAnggota) {
      setKelompokError('Nilai tidak boleh diatas total anggota!')
    }
  }, [TotalAnggota, TotalKelompok])

  const HandleInputAnggotaChange = (event) => {
    setTotalAnggota(parseInt(event.target.value))
  }

  const HandleInputKelompokChange = (event) => {
    setTotalKelompok(parseInt(event.target.value))
  }


  return (
    <>
      <div>
        <Navbar
          TotalAnggota={TotalAnggota}
          setTotalAnggota={setTotalAnggota}
          TotalKelompok={TotalKelompok}
          setTotalKelompok={setTotalKelompok}
          IsInValidAnggota={IsInValidAnggota}
          setIsInValidAnggota={setIsInValidAnggota}
          IsInValidKelompok={IsInValidKelompok}
          setIsInValidKelompok={setIsInValidKelompok}
          KelompokError={KelompokError}
          setKelompokError={setKelompokError}
          generate={generate}
          resetData={resetData}
        />

        {/* You can open the modal using document.getElementById('ID').showModal() method */}
        <div className='flex justify-between items-center max-lg:justify-start'>
          <div className="form-control lg:mx-5">
            <div className="input-group">
              <button className="btn btn-outline btn-info max-lg:btn-sm max-lg:hidden" onClick={() => document.getElementById('my_modal_3').showModal()}>TAMBAH KELOMPOK</button>
              <button className='btn btn-outline btn-error max-lg:btn-sm max-lg:hidden' onClick={resetData}>RESET DATA</button>
            </div>
          </div>
          <div className="form-control lg:mx-5">
            <div className="input-group">
              <input type="number" placeholder="Total Anggota" className={"input input-bordered ml-10  transition-all duration-75 max-lg:input-sm max-lg:w-28 " + (IsInValidAnggota ? "input-error" : "input-info")}
                onChange={HandleInputAnggotaChange} />
              <input type="number" placeholder="Total Kelompok" className={"input input-bordered  transition-all duration-75 max-lg:input-sm  max-lg:w-28 " + (IsInValidKelompok ? "input-error" : "input-info")}
                onChange={HandleInputKelompokChange} />
              <button className='btn btn-outline btn-success join-item max-lg:btn-sm' onClick={generate}>
                generate</button>
            </div>
          </div>
        </div>
        {/* Put this part before </body> tag */}
        <input type="checkbox" id="my_modal_6" className="modal-toggle" />
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <span className='uppercase font-bold text-xl flex justify-center items-center'>tambah kelompok</span>
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">No Absen.</span>
              </label>
              <div className="input-group">
                <input onChange={changeTempAbsen} value={tempAbsen} type="number" placeholder="Type here" className="input input-bordered w-full focus:outline-none" />
                <button onClick={addKelompokTemp} className='btn btn-outline btn-primary'>TAMBAH</button>
              </div>
              <button onClick={saveKelompokTemp} className='btn btn-outline btn-success my-2'>SAVE</button>

              <div className="overflow-x-auto">
                <table className="table table-zebra">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>NO</th>
                      <th>Absen</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      temp.map((item, index) => (
                        <tr key={index}>
                          <th>{index + 1}</th>
                          <td>{item}</td>
                          <td>
                            <button onClick={() => removeKelompokTemp(index)}>
                              <div className="badge btn-error btn-outline">Delete</div>
                            </button>
                          </td>
                        </tr>
                      ))
                    }

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </dialog>
        <Table Data={data} RemoveData={removeKelompok} />
      </div>
    </>
  )
}

export default App
