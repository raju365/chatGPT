import { Link, useNavigate } from "react-router-dom";
import Button from "./ui/Button";
import Input from "./ui/Input";
import OrivIcon from "../assets/oriv-icon.svg";
import api from "../lib/axios";
import { useState } from "react";
import { toast } from "sonner";

const Register = () => {
  const navigate = useNavigate();
  const [agree, setAgree] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (!agree) {
      toast.error("Please accept the Terms & Privacy Policy");
      return;
    }
    try {
      setLoading(true);

      const { data } = await api.post("/auth/register", {
        fullName: {
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
        },
        email: formData.email.trim(),
        password: formData.password,
      });
      

      console.log(data);

      toast.success("Welcome to Oriv AI 🚀");

      navigate("/login");
    } catch (err) {
      console.error(err);

      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900/70 backdrop-blur-xl p-8 shadow-2xl">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="h-14 w-14 rounded-2xl bg-violet-600 flex items-center justify-center">
            <img src={OrivIcon} alt="Oriv AI" className="h-8 w-8" />
          </div>
        </div>

        {/* Heading */}
        <div className="mt-6 text-center">
          <h1 className="text-3xl font-bold">Create Account 🚀</h1>

          <p className="mt-2 text-zinc-400">
            Join <span className="text-violet-400">Oriv AI</span> and start your
            AI journey.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <Input
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
          />

          <Input
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
          />

          <Input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email address"
          />

          <Input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create password"
          />

          <Input
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm password"
          />

          <label className="flex items-start gap-3 text-sm text-zinc-400">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="mt-1 accent-violet-600"
            />

            <span>
              I agree to the{" "}
              <button
                type="button"
                className="text-violet-400 hover:text-violet-300"
              >
                Terms
              </button>{" "}
              &{" "}
              <button
                type="button"
                className="text-violet-400 hover:text-violet-300"
              >
                Privacy Policy
              </button>
            </span>
          </label>

          <Button type="submit" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>

        {/* Divider */}

        <div className="my-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-zinc-800"></div>

          <span className="text-sm text-zinc-500">OR</span>

          <div className="h-px flex-1 bg-zinc-800"></div>
        </div>

        {/* Google */}

        <button className="w-full rounded-xl border border-zinc-700 py-3 transition hover:bg-zinc-800">
          Continue with Google
        </button>

        {/* Footer */}

        <p className="mt-8 text-center text-sm text-zinc-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-violet-400 hover:text-violet-300"
          >
            Sign In
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
