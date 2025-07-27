import { useEffect, useState } from "react"
import Layout from "../Layout"
import SweetAlertService from "../../helper/sweetalertService"
import { useNavigate } from "react-router-dom"
import ServicePegawai from "../../api/service/Pegawai.service"
import TablePegawai from "../../components/Table/TablePegawai"

const PegawaiPage = () => {
  const navigate = useNavigate()
  const [dataSuratMasuk, setDataSuratMasuk] = useState([])

  const getPegawai = async () => {
    try {
      const response = await ServicePegawai.getPegawai()
      setDataSuratMasuk(response.data)
      // console.log(response)
    } catch (error) {
      SweetAlertService.showError('Error', error.message)
    }
  }

  const openFormModal = () => {
    return navigate('/pegawai-page/add-pegawai')
  }

  useEffect(() => {
    getPegawai()
  }, [])

  return(
    <Layout>
      <div className="flex flex-col gap-3 px-5 my-2 border-lg shadow w-full py-3 bg-white">
        <p className="text-lg font-bold uppercase">Data Pegawai</p>
        <hr />
        <div className="flex justify-between">
          <button 
            type="button" 
            onClick={openFormModal}
            className="mt-3 inline-flex justify-center rounded-md bg-blue-400 px-3 py-2 text-sm text-white shadow-sm ring-1 ring-inset ring-blue-300 hover:bg-blue-300 sm:mt-0 sm:w-auto"
            >
            Tambah
          </button>
        </div>
        <div>
          {
            dataSuratMasuk ? 
            <TablePegawai dataSurat={dataSuratMasuk} />
            : null
          }
        </div>
      </div>
    </Layout>
  )
}

export default PegawaiPage