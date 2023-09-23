import { useState, useEffect } from 'react'

function Navbar(props) {
    const [TotalAnggota, setTotalAnggota] = useState(0);
    const [TotalKelompok, setTotalKelompok] = useState(0);
    const [IsInValidAnggota, setIsInValidAnggota] = useState(false);
    const [IsInValidKelompok, setIsInValidKelompok] = useState(false);
    const [KelompokError, setKelompokError] = useState('');
    useEffect(() => {
        setIsInValidAnggota(TotalAnggota < 0)
        setIsInValidKelompok(TotalKelompok < 0 || TotalKelompok > TotalAnggota)
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

    // const generate = () => {
    //     // Ambil anggota yang sudah ada di semua kelompok
    //     const existingMembers = [].concat(...props.DataKelompok);
    //     let temp = props.DataKelompok
    //     // Buat daftar anggota yang belum ada di semua kelompok
    //     const nonExistingMembers = [];
    //     for (let i = 1; i <= TotalAnggota; i++) {
    //         if (!existingMembers.includes(i)) {
    //             nonExistingMembers.push(i);
    //         }
    //     }

    //     for (let i = 0; i < TotalKelompok; i++) {
    //         if (temp[i] == undefined) {
    //             temp[i] = []
    //         }
    //     }

    //     // for (let i = 0; i < nonExistingMembers.length; i++) {
    //     //     const randomIndex = Math.floor(Math.random() * temp.length);
    //     //     temp[randomIndex].push(nonExistingMembers[i]);
    //     // }

    //     for (let i = 0; i < TotalAnggota; i++) {
    //         const randomIndex = Math.floor(Math.random() * temp.length);
    //         if (nonExistingMembers.includes(i + 1)) {
    //             if (temp[randomIndex].length < Math.floor(TotalAnggota / TotalKelompok)) {
    //                 temp[randomIndex].push(i + 1)
    //             } else {
    //                 i--;
    //             }
    //         }
    //     }

    //     // for (let i = 0; i < TotalAnggota; i++) {
    //     //     const randomIndex = Math.floor(Math.random() * temp.length);
    //     //     if (temp[randomIndex].length < Math.floor(TotalAnggota / TotalKelompok) || i === TotalAnggota - 1) {
    //     //         temp[randomIndex].push(nonExistingMembers.pop());
    //     //     } else {
    //     //         i--; // Coba lagi untuk menempatkan anggota ke kelompok yang lain
    //     //     }
    //     // }
    //     props.OnChangeKelompok(temp)
    // }
    const generate = () => {
        if (TotalAnggota < 0 || TotalKelompok < 0 || TotalKelompok > TotalAnggota) {
            return
        }
        const existingMembers = [].concat(...props.DataKelompok);
        let temp = [...props.DataKelompok]; // Salin props.DataKelompok agar tidak mengubah properti asli

        const nonExistingMembers = [];
        for (let i = 1; i <= TotalAnggota; i++) {
            if (!existingMembers.includes(i)) {
                nonExistingMembers.push(i);
            }
        }

        for (let i = 0; i < TotalKelompok; i++) {
            if (temp[i] === undefined) {
                temp[i] = [];
            }
        }

        // Hitung jumlah anggota yang akan ditempatkan di setiap kelompok
        let AnggotaPerKelompok = Math.floor(TotalAnggota / TotalKelompok);
        let anggotaPerSisaKelompok = TotalAnggota % TotalKelompok; // Jumlah anggota yang harus dibagi rata ke kelompok
        let data_exception = [...props.Exception]

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

        // for (let i = 0; i < TotalAnggota; i++) {
        //     const randomIndex = Math.floor(Math.random() * temp.length);
        //     if (temp[randomIndex].length >= AnggotaPerKelompok) {
        //         i--;
        //     }
        //     const currentMember = nonExistingMembers.pop();
        //     if (currentMember !== undefined) {
        //         temp[randomIndex].push(currentMember);
        //     } else {
        //         break; // Jika anggota sudah habis, keluar dari loop
        //     }
        // }

        props.OnChangeKelompok(temp, props.Exception);
    };



    return (
        <>
            <div className="navbar bg-base-100 flex justify-between">
                <div className="navbar-start sm:hidden">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost btn-circle">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {/* <li><a>Homepage</a></li>
                            <li><a>Portfolio</a></li>
                            <li><a>About</a></li> */}
                        </ul>
                    </div>
                </div>
                <div className="navbar-center flex ">
                    <a className="btn btn-ghost normal-case text-xl">
                        <i className="fa-solid fa-people-roof text-2xl"></i>
                        Generate Kelompok
                    </a>
                </div>
                <div className="navbar-end">
                    <div className="flex gap-2 max-sm:hidden">
                        <div className="form-control w-full relative">
                            <input type="number" placeholder="Total Anggota" className={"input input-bordered w-full max-w-xs transition-all duration-75 " + (IsInValidAnggota ? "input-error" : "input-info")}
                                onChange={HandleInputAnggotaChange} />
                            <span className={"text-error absolute bottom-0 translate-y-full " + (IsInValidAnggota ? "" : "hidden")}>Total anggota harus diatas 0!</span>
                        </div>
                        <div className="form-control w-full flex relative">
                            <input type="number" placeholder="Total Kelompok" className={"input input-bordered w-full max-w-xs transition-all duration-75 " + (IsInValidKelompok ? "input-error" : "input-info")}
                                onChange={HandleInputKelompokChange} />
                            <span className={"text-error absolute bottom-0 translate-y-full " + (IsInValidKelompok ? "" : "hidden")}>{KelompokError}</span>
                        </div>
                        <button onClick={generate} className="btn btn-outline btn-success ">GENERATE</button>
                    </div>
                    <button className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <i className="fa-solid fa-gear text-2xl"></i>
                            <span className="badge badge-xs badge-primary indicator-item"></span>
                        </div>
                    </button>
                </div>
            </div>
        </>
    )
}
export default Navbar