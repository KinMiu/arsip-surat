import { useNavigate, useParams } from "react-router-dom";
import { IMAGES } from "../../assets";
import Layout from "../Layout";
import SweetAlertService from "../../helper/sweetalertService";
import ServiceUser from "../../api/service/User.service";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [data, setData] = useState("");
  const { id } = useParams()
  const navigate = useNavigate()

  const getDataUserById = async () => {
    try {
      const response = await ServiceUser.getById(id);
      setData(response.data)
      console.log(response)
      // setDataJabatan(response.data);
    } catch (error) {
      SweetAlertService.showError("Error", error.message);
    }
  }

  const handleChangePassword = () => {
    navigate(`/profile/change-password/${id}`)
  };
  
  const handleChangeName = () => {
    navigate(`/profile/change-name/${id}`)
  };

  useEffect(() => {
    getDataUserById()
  }, [])

  return (
    <Layout>
      <div className="min-h-auto py-8 px-4">
        <div className="max-w-2xl mx-auto">

          {/* Profile Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              {/* Avatar */}
              <div className="relative">
                <img
                  src={IMAGES.profile}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-2 border-white"></div>
              </div>

              {/* User Info */}
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">{data.NAME}</h2>
                <p className="text-gray-600 mb-2">{data.EMAIL}</p>
                <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded">
                  {data.ROLE === '1' ? "Admin" : "User"}
                </span>
              </div>
            </div>

            {/* Information Grid */}
            <div className="mt-6 border-t pt-6 space-y-4">
              <div className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg">
                <span className="text-gray-500 font-medium w-32">Full Name:</span>
                <span className="text-gray-900">{data.NAME}</span>
              </div>
              <div className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg">
                <span className="text-gray-500 font-medium w-32">Username:</span>
                <span className="text-gray-900">{data.USERNAME}</span>
              </div>
              <div className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg">
                <span className="text-gray-500 font-medium w-32">Role:</span>
                <span className="text-gray-900">{data.ROLE === '1' ? "Admin" : "User"}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button
                onClick={handleChangeName}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
              >
                Change Name
              </button>
              <button
                onClick={handleChangePassword}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
              >
                Change Password
              </button>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}
