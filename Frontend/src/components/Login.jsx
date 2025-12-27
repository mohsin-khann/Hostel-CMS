import { useContext, useRef, useState } from "react";
import Validate from "../utils/validate";
import { useNavigate } from "react-router";
import API from "../../api/api";
import toast from "react-hot-toast";
import { AppContext } from "../context/AppContext";
const LoginForm = () => {
  const nav = useNavigate();
  const {setToken,token,role}=useContext(AppContext)
  // Create state for toggling between forms
  const [isSignIn, setSignIn] = useState(true);
  const [loading,setLoading]= useState(false)
  const [Iserror, setiserror] = useState(null);
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const firstName = useRef();
  const lastName = useRef();
  const accountType = useRef();
  const address = useRef();
  // Handle form toggle
  const handleToggle = () => {
    setSignIn(!isSignIn);
  };
  // useEffect(()=>{toast.success("hu")},[])
  const Handleform = async () => {
    const Message = Validate(
      email?.current?.value,
      password?.current?.value,
      firstName?.current?.value,
      lastName?.current?.value
    );

    setiserror(Message);

    if (!isSignIn) {
      console.log(confirmPassword.current.value);
      if (password.current.value !== confirmPassword.current.value) {
        return alert("Passwords do not match");
      }
      const check = Validate(
        email?.current?.value,
        password?.current?.value,
        firstName?.current?.value,
        lastName.current?.value
      );
      setiserror(check);
      if (!check) {
        setLoading(true)
        try {
          
          const res = await API.post(
            "/auth/sendOTP",
            { email: email.current.value },
          );

          console.log(res);
          toast.success(`OTP Send to ${email.current.value}`);

          nav("/wait", {
            state: {
              firstName: firstName.current.value,
              lastName: lastName.current.value,
              email: email.current.value,
              password: password.current.value,
              confirmPassword: confirmPassword.current.value,
              accountType: accountType.current.value,
              address: address.current.value,
            },
          });

        } catch (error) {
          alert("Error sending OTP");
          console.log(error);
        }
        setLoading(false)
      }
    } else {
      // if (!Message) {
      setLoading(true)
        try {
          const res = await API.post("/user/login", {
            email: email.current.value,
            password: password.current.value,
          });
          // console.log(res.data.token);

          setToken(res.data.token)
          console.log(token)
          localStorage.setItem('token',res.data.token)
          if(role==="Admin"){
            console.log("admin")
            toast.success("loggedIn Successfully!");
            nav("/admin/panel");
            return
          }
          if(role==="Agent"){
            console.log("agent")
            toast.success("loggedIn Successfully!");
            nav("/browse/card");
            return
          }
          if(role==="Ordinary"){
            console.log("ord")
            toast.success("loggedIn Successfully!");
            nav("/browse/card");
            return
          }
          if(role==="Warden"){
            toast.success("loggedIn Successfully!");
            nav("/warden/panel");
            return
          }
          if(role==="Employee"){
            toast.success("loggedIn Successfully!");
            nav("/employee/panel");
            return
          }
          if(role==="Provost"){
            toast.success("loggedIn Successfully!");
            nav("/provost/panel");
            return
          }
        } catch (error) {
          alert("Error Logging");
          console.log(error);
        }
        setLoading(false)
      // }
      // setiserror(Message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-600">
      {isSignIn ? (
        <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
          {/* Login Form */}
          <h1 className="text-2xl font-bold text-gray-700 text-center mb-6">
            Reflex<span className="text-blue-500">CMS</span>
          </h1>
          <form onSubmit={(e) => e.preventDefault()}>
            {/* Email */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email address
              </label>
              <input
                ref={email}
                name="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                ref={password}
                name="password"
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <p className="text-red-400 px-4 font-bold">{Iserror}</p>
            </div>

            {/* Forgot Password */}
            <div className="text-right text-sm text-blue-500 mb-4">
              <a href="/forgot-password">Forgot password?</a>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              onClick={Handleform}
              className="w-full bg-blue-500 text-white font-medium py-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
                                {!loading ? 'Sign In' :'loading...'}

            </button>

            {/* Toggle to Register */}
            <div className="text-center text-sm text-gray-600 mt-4">
              <p>
                Don’t have an account?{" "}
                <button
                  type="button"
                  onClick={handleToggle}
                  className="text-blue-500 hover:underline"
                >
                  Register here
                </button>
              </p>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-lg">
          {/* Registration Form */}
          <h1 className="text-2xl font-bold text-gray-700 text-center mb-6">
            Reflex<span className="text-blue-500">CMS</span>
          </h1>
          <form onSubmit={(e) => e.preventDefault()}>
            {/* Full Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  First Name
                </label>
               <input
  type="text"
  id="firstName"
  name="firstName"
  ref={firstName}
  placeholder="Enter your full name"
  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
  required
  pattern="[A-Za-z\s]+"
/>


              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  ref={lastName}
                  placeholder="Enter your full name"
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  pattern="[A-Za-z\s]+"
                />
              </div>
              <div>
                <select
                  id="accountType"
                  ref={accountType}
                  name="accountType"
                  className="w-full border text-sm border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option >
                    Select your Account Type
                  </option>
                  <option value="Ordinary">Student</option>
                  <option value="Employee">Employee</option>
                  <option value="Warden">Warden</option>
                  <option value="Provost">Provost</option>
              
                </select>

                <label
                  htmlFor="cnic"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  ref={address}
                  name="address"
                  placeholder="Enter your Address"
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {/* Email */}
 <input
  type="email"
  id="email"
  ref={email}
  name="email"
  placeholder="Enter your email"
  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
  required
  pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
  title="Enter a valid email address (e.g. user@example.com)"
/>



            {/* Password and Confirm Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  ref={password}
                  name="password"
                  placeholder="Enter your password"
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  ref={confirmPassword}
                  id="confirm-password"
                  name="confirm-password"
                  placeholder="Confirm your password"
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {/* Password Hint */}
            <p className="text-sm text-gray-500 mb-4">
              Use 8 or more characters with a mix of letters, numbers & symbols.
            </p>
            <p className="text-red-400 px-4 font-bold">{Iserror}</p>

            {/* Register Button */}
            <button
              type="submit"
              onClick={Handleform}
              disabled={loading}
              className="w-full bg-blue-500 text-white font-medium py-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
             {!loading ? 'Register here' :'loading...'}

            </button>

            {/* Toggle to Sign In */}
            <div className="text-center text-sm text-gray-600 mt-4">
              <p>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={handleToggle}
                  className="text-blue-500 hover:underline"
                  
                >
                  Sign in
                </button>
              </p>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
