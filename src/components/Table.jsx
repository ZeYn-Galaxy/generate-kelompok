function Table(props) {
    props.Data.Kelompok.map((item, index) => {
    })
    return (
        <>
            <div className="overflow-x-auto m-5">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr className="bg-base-200">
                            <th className="text-center">Kelompok</th>
                            <th className="text-center">Total Anggota</th>
                            <th className="text-center">Anggota</th>
                            <th className="text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.Data.Kelompok.map((item, index) => (

                                <tr key={index}>
                                    <th className={"text-2xl text-center"}>{index + 1}</th>
                                    <td className="text-xl text-center">{item.length}</td>
                                    <td>
                                        <div className="flex flex-col justify-start items-center">
                                            <div className={"w-72 flex justify-start items-center max-2xl:flex-wrap " + (item.length >= 25 ? "flex-wrap" : "")}>
                                                {item.map((item, index) => (
                                                    <div key={index} className="badge badge-outline m-2 w-10">{item}</div>
                                                ))}
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex justify-center items-center">
                                            <button onClick={() => props.RemoveData(index)}>
                                                <div className="badge btn-error btn-outline">Delete</div>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }

                        {/* <tr>
                            <th>1</th>
                            <td>25</td>
                            <td>
                                <div className="flex flex-col justify-start gap-5">
                                    <div className="flex gap-1">
                                        <div className="badge badge-outline">1</div>
                                        <div className="badge badge-outline">2</div>
                                        <div className="badge badge-outline">3</div>
                                        <div className="badge badge-outline">4</div>
                                        <div className="badge badge-outline">5</div>
                                    </div>
                                    <div className="flex gap-1">
                                        <div className="badge badge-outline">1</div>
                                        <div className="badge badge-outline">2</div>
                                        <div className="badge badge-outline">3</div>
                                        <div className="badge badge-outline">4</div>
                                        <div className="badge badge-outline">5</div>
                                    </div>
                                </div>
                            </td>
                        </tr> */}

                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Table