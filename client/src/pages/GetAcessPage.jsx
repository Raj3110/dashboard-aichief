import React, { useState } from "react";
import Button_1 from "../components/Button_1";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const GetAccessPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [emailOtp, setEmailOtp] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [error, setError] = useState(null);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isEmailOtpSent, setIsEmailOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleSendEmailOTP = async () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/send-email-otp`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email}),
          }
      );
      const data = await response.json();
      if (response.ok) {
        setIsEmailOtpSent(true);
        toast.success("OTP sent to email successfully");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to send OTP");
    }
  };

  const handleVerifyEmailOTP = async () => {
    try {
      const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/verify-email-otp`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email, otp: emailOtp}),
          }
      );
      const data = await response.json();
      if (response.ok) {
        setIsEmailVerified(true);
        toast.success("Email verified");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to verify OTP");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (phone.length !== 10) {
      toast.error("Phone number must be 10 digits");
      setIsLoading(false);
      console.log('Phone number must be 10 digits')
      return;
    }

    if (!isEmailVerified) {
      toast.error("Please verify your email");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/submit-details`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Origin: `${import.meta.env.VITE_CLIENT_URL}`,
            },
            body: JSON.stringify({
              firstName,
              lastName,
              email,
              phone,
              dob,
            }),
            credentials: "include",
          }
      );

      const json = await response.json();

      if (!response.ok) {
        setError(json.message);
        toast.error(json.message);
      } else {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setEmailOtp("");
        setDob("");
        setIsEmailVerified(false);
        toast.success(json.message);
        navigate("/");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div className="mt-16">
        <div className="font-primary justify-center px-4 sm:px-6 md:px-8 py-8">
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="border rounded-lg shadow-xl overflow-hidden">
              <div
                  className="custom-bg custom-text border border-zinc-500 backdrop-filter backdrop-blur-xl p-4 sm:p-6 rounded-lg">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      First Name
                    </label>
                    <input
                        type="text"
                        className="custom-input custom-text w-full py-2 px-3 border border-zinc-600 rounded-lg"
                        placeholder="First Name"
                        name="firstName"
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstName}
                        required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Last Name
                    </label>
                    <input
                        type="text"
                        className="custom-input custom-text w-full py-2 px-3 border border-zinc-600 rounded-lg"
                        placeholder="Last Name"
                        name="lastName"
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                        required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Phone
                    </label>
                    <input
                        type="tel"
                        className="custom-input custom-text w-full py-2 px-3 border border-zinc-600 rounded-lg"
                        placeholder="Phone Number (10 digits)"
                        name="phone"
                        onChange={(e) => setPhone(e.target.value)}
                        value={phone}
                        required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Email
                    </label>
                    <div className="flex">
                      <input
                          type="email"
                          className="custom-input custom-text flex-grow py-2 px-3 border border-zinc-600 rounded-l-lg"
                          placeholder="abc@gmail.com"
                          name="email"
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
                          required
                          disabled={isEmailVerified}
                      />
                      <button
                          type="button"
                          className="bg-zinc-600 text-white px-3 rounded-r-lg"
                          onClick={handleSendEmailOTP}
                          disabled={isEmailVerified || isEmailOtpSent}
                      >
                        Send OTP
                      </button>
                    </div>
                  </div>

                  {isEmailOtpSent && !isEmailVerified && (
                      <div>
                        <label className="block text-sm font-medium mb-1">Email OTP</label>
                        <div className="flex">
                          <input
                              type="text"
                              className="custom-input custom-text flex-grow py-2 px-3 border border-zinc-600 rounded-l-lg"
                              placeholder="Enter Email OTP"
                              name="emailOtp"
                              onChange={(e) => setEmailOtp(e.target.value)}
                              value={emailOtp}
                              required
                          />
                          <button
                              type="button"
                              className="bg-zinc-600 text-white px-3 rounded-r-lg"
                              onClick={handleVerifyEmailOTP}
                          >
                            Verify OTP
                          </button>
                        </div>
                      </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Date of Birth
                    </label>
                    <input
                        type="date"
                        className="custom-input custom-text w-full py-2 px-3 border border-zinc-600 rounded-lg"
                        name="dob"
                        onChange={(e) => setDob(e.target.value)}
                        value={dob}
                        required
                    />
                  </div>

                  <Button_1 isLoading={isLoading} type="submit" onClick={handleSubmit} name="Submit Details"/>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
  );
};

export default GetAccessPage;
