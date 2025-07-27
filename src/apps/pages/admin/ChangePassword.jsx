import { useState } from "react";
import Layout from "../Layout";
import { Eye, EyeOff, Shield, CheckCircle, AlertCircle } from "lucide-react";
import SweetAlertService from "../../helper/sweetalertService";
import ServiceUser from "../../api/service/User.service";
import { useNavigate, useParams } from "react-router-dom";

export default function ChangePasswordPage() {
  const {id} = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      numbers: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
    strength = Object.values(checks).filter(Boolean).length;
    return { strength: (strength / 5) * 100, checks };
  };

  const passwordStrength = calculatePasswordStrength(formData.newPassword);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.currentPassword) newErrors.currentPassword = "Current password is required";
    if (!formData.newPassword) newErrors.newPassword = "New password is required";
    else if (formData.newPassword.length < 8) newErrors.newPassword = "Minimum 8 characters";
    if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm new password";
    else if (formData.newPassword !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (formData.currentPassword === formData.newPassword)
      newErrors.newPassword = "New password must differ from current password";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setSuccess(false);

    try {
        const data = {
            oldPassword: formData.currentPassword,
            newPassword: formData.newPassword
        };

        const response = await ServiceUser.changePassword(id, data);

        if (response.status === false) {
            setIsLoading(false);
            return SweetAlertService.showError("Failed", response.message);
        }

        SweetAlertService.showSuccess("Success", response.message);
        setSuccess(true);

        setFormData({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        });

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
      <div className="min-h-auto bg-gray-100 p-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">

          <h1 className="text-2xl font-bold mb-1">Change Password</h1>
          <p className="text-sm text-gray-600 mb-4">Keep your account secure</p>

          {success && (
            <div className="bg-green-100 text-green-700 p-3 rounded flex items-center gap-2 mb-4">
              <CheckCircle className="w-4 h-4" />
              Password updated successfully!
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* CURRENT PASSWORD */}
            <div>
              <label className="block text-sm font-medium mb-1">Current Password</label>
              <div className="relative">
                <input
                  type={showPasswords.current ? "text" : "password"}
                  value={formData.currentPassword}
                  onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                  className={`w-full border rounded px-3 py-2 ${
                    errors.currentPassword ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  className="absolute right-2 top-2 text-gray-500"
                  onClick={() =>
                    setShowPasswords((prev) => ({ ...prev, current: !prev.current }))
                  }
                >
                  {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.currentPassword && (
                <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.currentPassword}
                </p>
              )}
            </div>

            {/* NEW PASSWORD */}
            <div>
              <label className="block text-sm font-medium mb-1">New Password</label>
              <div className="relative">
                <input
                  type={showPasswords.new ? "text" : "password"}
                  value={formData.newPassword}
                  onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                  className={`w-full border rounded px-3 py-2 ${
                    errors.newPassword ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  className="absolute right-2 top-2 text-gray-500"
                  onClick={() => setShowPasswords((prev) => ({ ...prev, new: !prev.new }))}
                >
                  {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.newPassword && (
                <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.newPassword}
                </p>
              )}
              {/* Strength Indicator */}
              {formData.newPassword && (
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded h-2">
                    <div
                      className={`h-2 rounded ${passwordStrength.strength < 40 ? "bg-red-500" : passwordStrength.strength < 70 ? "bg-yellow-500" : "bg-green-500"}`}
                      style={{ width: `${passwordStrength.strength}%` }}
                    ></div>
                  </div>
                  <p className="text-xs mt-1 text-gray-500">
                    Strength:{" "}
                    {passwordStrength.strength < 40
                      ? "Weak"
                      : passwordStrength.strength < 70
                      ? "Medium"
                      : "Strong"}
                  </p>
                </div>
              )}
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label className="block text-sm font-medium mb-1">Confirm Password</label>
              <div className="relative">
                <input
                  type={showPasswords.confirm ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className={`w-full border rounded px-3 py-2 ${
                    errors.confirmPassword ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  className="absolute right-2 top-2 text-gray-500"
                  onClick={() => setShowPasswords((prev) => ({ ...prev, confirm: !prev.confirm }))}
                >
                  {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* BUTTONS */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center items-center gap-2 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
              <Shield className="w-4 h-4" />
              {isLoading ? "Updating..." : "Update Password"}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
