import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Table from './components/Table';

function App() {
  const [count, setCount] = useState(0)
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
    if (temp.includes(parseInt(tempAbsen))) {
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
  return (
    <>
      <div>
        <Navbar OnChangeKelompok={InputDataChange} DataKelompok={data.Kelompok} Exception={data.Exception} />
        {/* Form Tambah */}
        {/* You can open the modal using document.getElementById('ID').showModal() method */}
        <div className='w-full flex justify-start items-center input-group'>
          <button className="btn btn-outline btn-info my-2 ml-5" onClick={() => document.getElementById('my_modal_3').showModal()}>TAMBAH KELOMPOK</button>
          <button className='btn btn-outline btn-error m-2' onClick={resetData}>RESET DATA</button>
        </div>
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
