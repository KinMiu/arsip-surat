import { useState } from "react";
import { CheckCircle, AlertCircle, Edit3 } from "lucide-react";
import Layout from "../Layout";
import SweetAlertService from "../../helper/sweetalertService";
import ServiceUser from "../../api/service/User.service";
import { useNavigate, useParams } from "react-router-dom";

export default function ChangeNamePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [newName, setNewName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({});
    setSuccess(false);

    const errors = {};

    if (!newName.trim()) {
        errors.newName = "Name cannot be empty";
    }

    if (!password.trim()) {
        errors.password = "Password is required for confirmation";
    }

    if (Object.keys(errors).length > 0) {
        setError(errors);
        return;
    }

    setIsLoading(true);

    try {
        const data = {
            newName,
            password
        };

        const response = await ServiceUser.changeName(id, data);

        if (response.status === false) {
            setIsLoading(false);
            return SweetAlertService.showError("Failed", response.message);
        }

        SweetAlertService.showSuccess("Success", response.message);
        setSuccess(true);
        setNewName("");
        setPassword("");

        // Redirect atau reload jika perlu:
        navigate(`/profile/${id}`);
        window.location.reload();

    } catch (error) {
        SweetAlertService.showError("Error !!", error.message);
    } finally {
        setIsLoading(false);
    }
};

  return (
    <Layout>
      <div className="min-h-auto p-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">

          <h1 className="text-2xl font-bold mb-1">Change Name</h1>
          <p className="text-sm text-gray-600 mb-4">Update your display name with password confirmation</p>

          {success && (
            <div className="bg-green-100 text-green-700 p-3 rounded flex items-center gap-2 mb-4">
              <CheckCircle className="w-4 h-4" />
              Your name has been updated!
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Input New Name */}
            <div>
              <label className="block text-sm font-medium mb-1">New Name</label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className={`w-full border rounded px-3 py-2 ${
                  error.newName ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your new name"
              />
              {error.newName && (
                <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {error.newName}
                </p>
              )}
            </div>

            {/* Input Password */}
            {/* <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full border rounded px-3 py-2 ${
                  error.password ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your password to confirm"
              />
              {error.password && (
                <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {error.password}
                </p>
              )}
            </div> */}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center items-center gap-2 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              )}
              <Edit3 className="w-4 h-4" />
              {isLoading ? "Saving..." : "Save Name"}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
