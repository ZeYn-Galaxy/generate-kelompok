import { useState, useEffect } from 'react'

function Navbar(props) {
    return (
        <>

            <div className="navbar bg-base-100 flex justify-between">
                <div className="navbar-start lg:hidden">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost btn-circle">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {/* <li><a>Homepage</a></li>
                            <li><a>Portfolio</a></li>
                            <li><a>About</a></li> */}
                            <li className='join join-vertical'>
                                <button className='btn btn-outline btn-info btn-sm join-item' onClick={() => document.getElementById('my_modal_3').showModal()}>TAMBAH KELOMPOK</button>
                                <button className='btn btn-outline btn-error btn-sm join-item' onClick={props.resetData}>RESET DATA</button>
                            </li>
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