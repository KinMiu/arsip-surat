import { useEffect, useState } from "react"
import Layout from "../Layout"
import SweetAlertService from "../../helper/sweetalertService"
import ServiceJenisSurat from "../../api/service/JenisSurat.service"
import FormAddSuratJenis from "../../components/Form/FormAddJenisSurat"
import TableJenisSurat from "../../components/Table/TableJenisSurat"

const JenisSuratPage = () => {
  const [dataJenisSurat, setDataJenisSurat] = useState([])
  const [isFormModalOpen, setIsFormModalOpen] = useState(false)

  const getJenisSurat = async () => {
    try {
      const response = await ServiceJenisSurat.getJenisSurat()
      setDataJenisSurat(response.data)
      // console.log(response)
    } catch (error) {
      SweetAlertService.showError('Error', error.message)
    }
  }

  const openFormModal = () => {
    setIsFormModalOpen(true)
  }

  const closeFormModal = () => {
    setIsFormModalOpen(false)
  }

  // const openFormExcelModal = () => {
  //   setIsFormExcelModalOpen(true)
  // }

  useEffect(() => {
    getJenisSurat()
  }, [])

  return(
    <Layout>
      <div className="flex flex-col gap-3 px-5 my-2 border-lg shadow w-full py-3 bg-white">
        <p className="text-lg font-bold uppercase">Data Jenis Surat</p>
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
            dataJenisSurat ? 
            <TableJenisSurat dataSurat={dataJenisSurat} />
            : null
          }
        </div>
        {
          isFormModalOpen ? (
            <FormAddSuratJenis onClose={closeFormModal} />
          ) : null
        }
      </div>
    </Layout>
  )
}

export default JenisSuratPage