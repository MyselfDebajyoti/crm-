// // "use client";

// // import { useState } from "react";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { Label } from "@/components/ui/label";
// // import { Checkbox } from "@/components/ui/checkbox";
// // import Image from "next/image";

// // export default function LoginPage() {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [rememberMe, setRememberMe] = useState(false);

// //   return (
// //     <div className="min-h-screen flex  ">
// //       {/* Left Section - Animated image slide in from left */}
// //       <div className="hidden lg:flex lg:w-[50%] relative overflow-hidden mt-10 ml-18  mb-10 animate-slide-in-left">
// //         <Image
// //           src="/Frame 50.png"
// //           alt="Financial clarity, minus the mess"
// //           fill
// //           className=" object-fill  "
// //           priority
// //         />
// //       </div>

// //       {/* Right Section - Animated bounce up */}
// //       <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
// //         <div className="w-full max-w-md space-y-6 animate-slide-in-right">
// //           <div className="text-center space-y-2 pb-7">
// //             <h1 className="text-4xl font-bold text-gray-900 pb-1 font-helvetica tracking-wide">
// //               Create an account
// //             </h1>
// //             <p className="text-gray-600 font-helvetica-light">
// //               Enter your credentials to access your account
// //             </p>
// //           </div>

// //           <form className="space-y-4">
// //             <div className="space-y-2">
// //               <Label
// //                 htmlFor="username1"
// //                 className="text-lg font-bold text-gray-700 font-helvetica-light tracking-wide"
// //               >
// //                 Enter your Username
// //               </Label>
// //               <Input
// //                 id="username1"
// //                 type="text"
// //                 placeholder="Username"
// //                 value={email}
// //                 onChange={(e) => setEmail(e.target.value)}
// //                 className="w-full px-3 py-2 border font-helvetica-light border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
// //               />
// //             </div>

// //             <div className="space-y-2">
// //               <Label
// //                 htmlFor="username2"
// //                 className="text-lg font-bold text-gray-700 font-helvetica-light tracking-wide"
// //               >
// //                 Enter your Password
// //               </Label>
// //               <Input
// //                 id="username2"
// //                 type="password"
// //                 placeholder="Username"
// //                 value={password}
// //                 onChange={(e) => setPassword(e.target.value)}
// //                 className="w-full px-3 py-2 font-helvetica-light border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-500"
// //               />
// //               <div className="text-right pb-5">
// //                 <a
// //                   href="#"
// //                   className="text-sm text-gray-600 hover:text-gray-800 font-helvetica-light"
// //                 >
// //                   Forgot Password?
// //                 </a>
// //               </div>
// //             </div>

// //             <Button
// //               type="submit"
// //               className="w-full bg-[#A9CC4E] hover:bg-green-900 text-black py-2 px-4 rounded-md font-medium transition-colors text-lg font-helvetica"
// //             >
// //               Login
// //             </Button>

// //             <div className="flex items-center justify-center space-x-2">
// //               <Checkbox
// //                 id="remember"
// //                 checked={rememberMe}
// //                 onCheckedChange={(checked) => setRememberMe(checked as boolean)}
// //               />
// //               <Label
// //                 htmlFor="remember"
// //                 className="text-sm text-gray-600 font-helvetica-light"
// //               >
// //                 Remember me
// //               </Label>
// //             </div>

// //             <p className="text-xs text-gray-500 text-center pt-8 fobt-helvetica-light">
// //               By clicking continue, you agree to our{" "}
// //               <a
// //                 href="#"
// //                 className="underline hover:text-gray-700 font-helvetica-light"
// //               >
// //                 Terms of Service
// //               </a>{" "}
// //               and{" "}
// //               <a href="#" className="underline hover:text-gray-700">
// //                 Privacy Policy
// //               </a>
// //             </p>
// //           </form>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Checkbox } from "@/components/ui/checkbox";
// import Image from "next/image";

// export default function LoginPage() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [rememberMe, setRememberMe] = useState(false);
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const router = useRouter();

//   // User credentials
//   type User = { password: string; route: string };
//   const users: Record<string, User> = {
//     debajyoti10: {
//       password: "12345",
//       route: "/debajyoti",
//     },
//     soumadeep: {
//       password: "101112",
//       route: "/soumadeep",
//     },
//   };

//   const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError("");
//     setIsLoading(true);

//     // Basic validation
//     if (!username || !password) {
//       setError("Please enter both username and password");
//       setIsLoading(false);
//       return;
//     }

//     // Check credentials
//     const user = users[username];
//     if (!user) {
//       setError("Invalid username or password");
//       setIsLoading(false);
//       return;
//     }

//     if (user.password !== password) {
//       setError("Invalid username or password");
//       setIsLoading(false);
//       return;
//     }

//     // Successful login
//     setTimeout(() => {
//       // Store login state if remember me is checked
//       if (rememberMe) {
//         localStorage.setItem("isLoggedIn", "true");
//         localStorage.setItem("username", username);
//       }

//       // Redirect to appropriate route
//       router.push(user.route);
//       setIsLoading(false);
//     }, 1000); // Small delay to show loading state
//   };

//   return (
//     <div className="min-h-screen flex">
//       {/* Left Section - Animated image slide in from left */}
//       <div className="hidden lg:flex lg:w-[50%] relative overflow-hidden mt-10 ml-18 mb-10 animate-slide-in-left">
//         <Image
//           src="/Frame 50.png"
//           alt="Financial clarity, minus the mess"
//           fill
//           className="object-fill"
//           priority
//         />
//       </div>

//       {/* Right Section - Animated bounce up */}
//       <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
//         <div className="w-full max-w-md space-y-6 animate-slide-in-right">
//           <div className="text-center space-y-2 pb-7">
//             <h1 className="text-4xl font-bold text-gray-900 pb-1 font-helvetica tracking-wide">
//               Login to account
//             </h1>
//             <p className="text-gray-600 font-helvetica-light">
//               Enter your credentials to access your account
//             </p>
//           </div>

//           <form onSubmit={handleLogin} className="space-y-4">
//             {/* Error Message */}
//             {error && (
//               <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
//                 {error}
//               </div>
//             )}

//             <div className="space-y-2">
//               <Label
//                 htmlFor="username"
//                 className="text-lg font-bold text-gray-700 font-helvetica-light tracking-wide"
//               >
//                 Enter your Username
//               </Label>
//               <Input
//                 id="username"
//                 type="text"
//                 placeholder="Username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 className="w-full px-3 py-2 border font-helvetica-light border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                 disabled={isLoading}
//               />
//             </div>

//             <div className="space-y-2">
//               <Label
//                 htmlFor="password"
//                 className="text-lg font-bold text-gray-700 font-helvetica-light tracking-wide"
//               >
//                 Enter your Password
//               </Label>
//               <Input
//                 id="password"
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full px-3 py-2 font-helvetica-light border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-500"
//                 disabled={isLoading}
//               />
//               <div className="text-right pb-5">
//                 <a
//                   href="#"
//                   className="text-sm text-gray-600 hover:text-gray-800 font-helvetica-light"
//                 >
//                   Forgot Password?
//                 </a>
//               </div>
//             </div>

//             <Button
//               type="submit"
//               className="w-full bg-[#A9CC4E] hover:bg-green-900 text-black py-2 px-4 rounded-md font-medium transition-colors text-lg font-helvetica"
//               disabled={isLoading}
//             >
//               {isLoading ? "Logging in..." : "Login"}
//             </Button>

//             <div className="flex items-center justify-center space-x-2">
//               <Checkbox
//                 id="remember"
//                 checked={rememberMe}
//                 onCheckedChange={(checked) => setRememberMe(checked as boolean)}
//                 disabled={isLoading}
//               />
//               <Label
//                 htmlFor="remember"
//                 className="text-sm text-gray-600 font-helvetica-light"
//               >
//                 Remember me
//               </Label>
//             </div>

//             <p className="text-xs text-gray-500 text-center pt-8 font-helvetica-light">
//               By clicking continue, you agree to our{" "}
//               <a
//                 href="#"
//                 className="underline hover:text-gray-700 font-helvetica-light"
//               >
//                 Terms of Service
//               </a>{" "}
//               and{" "}
//               <a href="#" className="underline hover:text-gray-700">
//                 Privacy Policy
//               </a>
//             </p>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Checkbox } from "@/components/ui/checkbox";
// import Image from "next/image";
// import LoaderDemo from "./loader";

// // Custom Loader Component
// const CustomLoader = ({ message = "Loading..." }) => {
//   return (
//     <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
//       <div className="text-center">
//         {/* Spinner */}
//         <div className="relative w-16 h-16 mx-auto mb-4">
//           <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
//           <div className="absolute inset-0 border-4 border-[#A9CC4E] border-t-transparent rounded-full animate-spin"></div>
//         </div>
//         {/* Loading text */}
//         <p className="text-lg font-helvetica text-gray-700">{message}</p>
//       </div>
//     </div>
//   );
// };

// export default function LoginPage() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [rememberMe, setRememberMe] = useState(false);
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [isPageLoading, setIsPageLoading] = useState(true);

//   const router = useRouter();

//   // User credentials
//   const users: Record<string, { password: string; route: string }> = {
//     debajyoti10: {
//       password: "12345",
//       route: "/debajyoti",
//     },
//     soumadeep: {
//       password: "101112",
//       route: "/soumadeep",
//     },
//   };

//   // Initial page load effect
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsPageLoading(false);
//     }, 2000); // Show loader for 2 seconds

//     return () => clearTimeout(timer);
//   }, []);

//   const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError("");
//     setIsLoading(true);

//     // Basic validation
//     if (!username || !password) {
//       setError("Please enter both username and password");
//       setIsLoading(false);
//       return;
//     }

//     // Check credentials
//     const user = users[username];
//     if (!user) {
//       setError("Invalid username or password");
//       setIsLoading(false);
//       return;
//     }

//     if (user.password !== password) {
//       setError("Invalid username or password");
//       setIsLoading(false);
//       return;
//     }

//     // Successful login
//     setTimeout(() => {
//       // Store login state if remember me is checked
//       if (rememberMe) {
//         localStorage.setItem("isLoggedIn", "true");
//         localStorage.setItem("username", username);
//       }

//       // Redirect to appropriate route
//       router.push(user.route);
//       setIsLoading(false);
//     }, 2000); // 2 second delay to show loading state
//   };

//   // Show initial page loader
//   if (isPageLoading) {
//     return <LoaderDemo />;
//   }

//   return (
//     <div className="min-h-screen flex">
//       {/* Login Loading Overlay */}
//       {isLoading && <LoaderDemo />}

//       {/* Left Section - Animated image slide in from left */}
//       <div className="hidden lg:flex lg:w-[50%] relative overflow-hidden mt-10 ml-18 mb-10 animate-slide-in-left">
//         <Image
//           src="/Frame 50.png"
//           alt="Financial clarity, minus the mess"
//           fill
//           className="object-fill"
//           priority
//         />
//       </div>

//       {/* Right Section - Animated bounce up */}
//       <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
//         <div className="w-full max-w-md space-y-6 animate-slide-in-right">
//           {/* <div className="text-center space-y-2 pb-7">
//             <h1 className="text-4xl font-bold text-gray-900 pb-1 font-helvetica tracking-tighter">
//               Login to{" "}

//             </h1>
//             <p className="text-gray-600 font-helvetica-light">
//               Enter your credentials to access your account
//             </p>
//           </div> */}

//           <div className="text-center space-y-2 pb-7">
//             <h1 className="text-4xl font-bold text-gray-900 pb-1 font-helvetica tracking-tighter flex items-center justify-center gap-2 flex-wrap">
//               Login to{" "}
//               <span className="inline-flex items-center pl-1">
//                 <Image
//                   src={"/Frame 109-cropped.svg"}
//                   alt="logo"
//                   height={100}
//                   width={100}
//                   className="h-12 w-auto sm:h-14 md:h-16 lg:h-15 object-contain"
//                 />
//               </span>
//             </h1>
//             <p className="text-gray-600 font-helvetica-light">
//               Enter your credentials to access your account
//             </p>
//           </div>

//           <form onSubmit={handleLogin} className="space-y-4">
//             {/* Error Message */}
//             {error && (
//               <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
//                 {error}
//               </div>
//             )}

//             <div className="space-y-2">
//               <Label
//                 htmlFor="username"
//                 className="text-lg font-bold text-gray-700 font-helvetica-light tracking-wide"
//               >
//                 Enter your Username
//               </Label>
//               <Input
//                 id="username"
//                 type="text"
//                 placeholder="Username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 className="w-full px-3 py-2 border font-helvetica-light border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                 disabled={isLoading}
//               />
//             </div>

//             <div className="space-y-2">
//               <Label
//                 htmlFor="password"
//                 className="text-lg font-bold text-gray-700 font-helvetica-light tracking-wide"
//               >
//                 Enter your Password
//               </Label>
//               <Input
//                 id="password"
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full px-3 py-2 font-helvetica-light border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-500"
//                 disabled={isLoading}
//               />
//               <div className="text-right pb-5">
//                 <a
//                   href="#"
//                   className="text-sm text-gray-600 hover:text-gray-800 font-helvetica-light"
//                 >
//                   Forgot Password?
//                 </a>
//               </div>
//             </div>

//             <Button
//               type="submit"
//               className="w-full bg-[#A9CC4E] hover:bg-[#111606] hover:text-[#A9CC4E] text-black py-2 px-4 rounded-md font-medium transition-colors text-lg font-helvetica"
//               disabled={isLoading}
//             >
//               {isLoading ? "Logging in..." : "Login"}
//             </Button>

//             <div className="flex items-center justify-center space-x-2">
//               <Checkbox
//                 id="remember"
//                 checked={rememberMe}
//                 onCheckedChange={(checked) => setRememberMe(checked as boolean)}
//                 disabled={isLoading}
//               />
//               <Label
//                 htmlFor="remember"
//                 className="text-sm text-gray-600 font-helvetica-light"
//               >
//                 Remember me
//               </Label>
//             </div>

//             <p className="text-xs text-gray-500 text-center pt-8 font-helvetica-light">
//               By clicking continue, you agree to our{" "}
//               <a
//                 href="#"
//                 className="underline hover:text-gray-700 font-helvetica-light"
//               >
//                 Terms of Service
//               </a>{" "}
//               and{" "}
//               <a href="#" className="underline hover:text-gray-700">
//                 Privacy Policy
//               </a>
//             </p>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Checkbox } from "@/components/ui/checkbox";
// import Image from "next/image";
// import LoaderDemo from "./loader";

// // Custom Loader Component
// const CustomLoader = ({ message = "Loading..." }) => {
//   return (
//     <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
//       <div className="text-center">
//         {/* Spinner */}
//         <div className="relative w-16 h-16 mx-auto mb-4">
//           <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
//           <div className="absolute inset-0 border-4 border-[#A9CC4E] border-t-transparent rounded-full animate-spin"></div>
//         </div>
//         {/* Loading text */}
//         <p className="text-lg font-helvetica text-gray-700">{message}</p>
//       </div>
//     </div>
//   );
// };

// export default function LoginPage() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [rememberMe, setRememberMe] = useState(false);
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [isPageLoading, setIsPageLoading] = useState(true);
//   const [showLoginForm, setShowLoginForm] = useState(false);

//   const router = useRouter();

//   // User credentials
//   const users: Record<string, { password: string; route: string }> = {
//     debajyoti10: {
//       password: "12345",
//       route: "/debajyoti",
//     },
//     soumadeep: {
//       password: "101112",
//       route: "/soumadeep",
//     },
//   };

//   // Initial page load effect
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsPageLoading(false);
//     }, 2000); // Show loader for 2 seconds

//     return () => clearTimeout(timer);
//   }, []);

//   const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError("");
//     setIsLoading(true);

//     // Basic validation
//     if (!username || !password) {
//       setError("Please enter both username and password");
//       setIsLoading(false);
//       return;
//     }

//     // Check credentials
//     const user = users[username];
//     if (!user) {
//       setError("Invalid username or password");
//       setIsLoading(false);
//       return;
//     }

//     if (user.password !== password) {
//       setError("Invalid username or password");
//       setIsLoading(false);
//       return;
//     }

//     // Successful login
//     setTimeout(() => {
//       // Store login state if remember me is checked
//       if (rememberMe) {
//         localStorage.setItem("isLoggedIn", "true");
//         localStorage.setItem("username", username);
//       }

//       // Redirect to appropriate route
//       router.push(user.route);
//       setIsLoading(false);
//     }, 2000); // 2 second delay to show loading state
//   };

//   const handleContinue = () => {
//     setShowLoginForm(true);
//   };

//   // Show initial page loader
//   if (isPageLoading) {
//     return <LoaderDemo />;
//   }

//   return (
//     <div className="min-h-screen flex">
//       {/* Login Loading Overlay */}
//       {isLoading && <LoaderDemo />}

//       {/* Mobile Welcome Screen */}
//       <div className="lg:hidden w-full">
//         {!showLoginForm ? (
//           // Welcome Screen for Mobile
//           <div className="min-h-screen bg-white flex flex-col">
//             {/* Header with Logo */}
//             <div className="flex justify-center pt-8 pb-6">
//               <div className="text-2xl font-bold tracking-tight">Finployee</div>
//             </div>

//             {/* Main Content Container */}
//             <div className="flex-1 flex flex-col justify-between px-6 pb-8">
//               {/* Hero Section */}
//               <div className="flex-1 flex items-center justify-center">
//                 <div className="w-full max-w-sm">
//                   {/* Dark rounded container */}
//                   <div className="bg-gray-900 rounded-3xl p-8 mb-8 relative">
//                     <h1 className="text-[#A9CC4E] text-4xl font-bold leading-tight mb-8">
//                       Financial clarity, minus the mess.
//                     </h1>

//                     {/* Progress indicators */}
//                     <div className="flex items-center justify-between mt-12">
//                       <div className="flex items-center space-x-4">
//                         <div className="flex items-center space-x-2">
//                           <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
//                             <span className="text-black text-sm font-medium">
//                               1
//                             </span>
//                           </div>
//                           <div className="w-16 h-0.5 bg-white"></div>
//                         </div>
//                         <div className="flex items-center space-x-2">
//                           <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
//                             <span className="text-black text-sm font-medium">
//                               2
//                             </span>
//                           </div>
//                           <div className="w-16 h-0.5 bg-white"></div>
//                         </div>
//                         <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
//                           <span className="text-black text-sm font-medium">
//                             3
//                           </span>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Step labels */}
//                     <div className="flex justify-between mt-4 text-white text-xs">
//                       <span>Login to your account</span>
//                       <span>Login to your account</span>
//                       <span>Login to your account</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Continue Button */}
//               <div className="mt-8">
//                 <Button
//                   onClick={handleContinue}
//                   className="w-full bg-[#A9CC4E] hover:bg-[#98b844] text-black py-4 px-6 rounded-xl font-medium text-lg font-helvetica shadow-lg"
//                 >
//                   Continue
//                 </Button>
//               </div>
//             </div>
//           </div>
//         ) : (
//           // Login Form for Mobile
//           <div className="min-h-screen bg-white flex items-center justify-center p-6">
//             <div className="w-full max-w-md space-y-6">
//               <div className="text-center space-y-2 pb-7">
//                 <h1 className="text-3xl font-bold text-gray-900 pb-1 font-helvetica tracking-tighter flex items-center justify-center gap-2 flex-wrap">
//                   Login to{" "}
//                   <span className="inline-flex items-center pl-1">
//                     <Image
//                       src={"/Frame 109-cropped.svg"}
//                       alt="logo"
//                       height={80}
//                       width={80}
//                       className="h-10 w-auto object-contain"
//                     />
//                   </span>
//                 </h1>
//                 <p className="text-gray-600 font-helvetica-light">
//                   Enter your credentials to access your account
//                 </p>
//               </div>

//               <form onSubmit={handleLogin} className="space-y-4">
//                 {/* Error Message */}
//                 {error && (
//                   <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
//                     {error}
//                   </div>
//                 )}

//                 <div className="space-y-2">
//                   <Label
//                     htmlFor="username"
//                     className="text-lg font-bold text-gray-700 font-helvetica-light tracking-wide"
//                   >
//                     Enter your Username
//                   </Label>
//                   <Input
//                     id="username"
//                     type="text"
//                     placeholder="Username"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                     className="w-full px-3 py-3 border font-helvetica-light border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                     disabled={isLoading}
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label
//                     htmlFor="password"
//                     className="text-lg font-bold text-gray-700 font-helvetica-light tracking-wide"
//                   >
//                     Enter your Password
//                   </Label>
//                   <Input
//                     id="password"
//                     type="password"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="w-full px-3 py-3 font-helvetica-light border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-500"
//                     disabled={isLoading}
//                   />
//                   <div className="text-right pb-5">
//                     <a
//                       href="#"
//                       className="text-sm text-gray-600 hover:text-gray-800 font-helvetica-light"
//                     >
//                       Forgot Password?
//                     </a>
//                   </div>
//                 </div>

//                 <Button
//                   type="submit"
//                   className="w-full bg-[#A9CC4E] hover:bg-[#111606] hover:text-[#A9CC4E] text-black py-3 px-4 rounded-md font-medium transition-colors text-lg font-helvetica"
//                   disabled={isLoading}
//                 >
//                   {isLoading ? "Logging in..." : "Login"}
//                 </Button>

//                 <div className="flex items-center justify-center space-x-2">
//                   <Checkbox
//                     id="remember"
//                     checked={rememberMe}
//                     onCheckedChange={(checked) =>
//                       setRememberMe(checked as boolean)
//                     }
//                     disabled={isLoading}
//                   />
//                   <Label
//                     htmlFor="remember"
//                     className="text-sm text-gray-600 font-helvetica-light"
//                   >
//                     Remember me
//                   </Label>
//                 </div>

//                 <p className="text-xs text-gray-500 text-center pt-8 font-helvetica-light">
//                   By clicking continue, you agree to our{" "}
//                   <a
//                     href="#"
//                     className="underline hover:text-gray-700 font-helvetica-light"
//                   >
//                     Terms of Service
//                   </a>{" "}
//                   and{" "}
//                   <a href="#" className="underline hover:text-gray-700">
//                     Privacy Policy
//                   </a>
//                 </p>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Desktop Layout (unchanged) */}
//       <div className="hidden lg:flex w-full">
//         {/* Left Section - Animated image slide in from left */}
//         <div className="lg:w-[50%] relative overflow-hidden mt-10 ml-18 mb-10 animate-slide-in-left">
//           <Image
//             src="/Frame 50.png"
//             alt="Financial clarity, minus the mess"
//             fill
//             className="object-fill"
//             priority
//           />
//         </div>

//         {/* Right Section - Animated bounce up */}
//         <div className="lg:w-1/2 flex items-center justify-center p-8 bg-white">
//           <div className="w-full max-w-md space-y-6 animate-slide-in-right">
//             <div className="text-center space-y-2 pb-7">
//               <h1 className="text-4xl font-bold text-gray-900 pb-1 font-helvetica tracking-tighter flex items-center justify-center gap-2 flex-wrap">
//                 Login to{" "}
//                 <span className="inline-flex items-center pl-1">
//                   <Image
//                     src={"/Frame 109-cropped.svg"}
//                     alt="logo"
//                     height={100}
//                     width={100}
//                     className="h-12 w-auto sm:h-14 md:h-16 lg:h-15 object-contain"
//                   />
//                 </span>
//               </h1>
//               <p className="text-gray-600 font-helvetica-light">
//                 Enter your credentials to access your account
//               </p>
//             </div>

//             <form onSubmit={handleLogin} className="space-y-4">
//               {/* Error Message */}
//               {error && (
//                 <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
//                   {error}
//                 </div>
//               )}

//               <div className="space-y-2">
//                 <Label
//                   htmlFor="username-desktop"
//                   className="text-lg font-bold text-gray-700 font-helvetica-light tracking-wide"
//                 >
//                   Enter your Username
//                 </Label>
//                 <Input
//                   id="username-desktop"
//                   type="text"
//                   placeholder="Username"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   className="w-full px-3 py-2 border font-helvetica-light border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                   disabled={isLoading}
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label
//                   htmlFor="password-desktop"
//                   className="text-lg font-bold text-gray-700 font-helvetica-light tracking-wide"
//                 >
//                   Enter your Password
//                 </Label>
//                 <Input
//                   id="password-desktop"
//                   type="password"
//                   placeholder="Password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full px-3 py-2 font-helvetica-light border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-500"
//                   disabled={isLoading}
//                 />
//                 <div className="text-right pb-5">
//                   <a
//                     href="#"
//                     className="text-sm text-gray-600 hover:text-gray-800 font-helvetica-light"
//                   >
//                     Forgot Password?
//                   </a>
//                 </div>
//               </div>

//               <Button
//                 type="submit"
//                 className="w-full bg-[#A9CC4E] hover:bg-[#111606] hover:text-[#A9CC4E] text-black py-2 px-4 rounded-md font-medium transition-colors text-lg font-helvetica"
//                 disabled={isLoading}
//               >
//                 {isLoading ? "Logging in..." : "Login"}
//               </Button>

//               <div className="flex items-center justify-center space-x-2">
//                 <Checkbox
//                   id="remember-desktop"
//                   checked={rememberMe}
//                   onCheckedChange={(checked) =>
//                     setRememberMe(checked as boolean)
//                   }
//                   disabled={isLoading}
//                 />
//                 <Label
//                   htmlFor="remember-desktop"
//                   className="text-sm text-gray-600 font-helvetica-light"
//                 >
//                   Remember me
//                 </Label>
//               </div>

//               <p className="text-xs text-gray-500 text-center pt-8 font-helvetica-light">
//                 By clicking continue, you agree to our{" "}
//                 <a
//                   href="#"
//                   className="underline hover:text-gray-700 font-helvetica-light"
//                 >
//                   Terms of Service
//                 </a>{" "}
//                 and{" "}
//                 <a href="#" className="underline hover:text-gray-700">
//                   Privacy Policy
//                 </a>
//               </p>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import LoaderDemo from "./loader";

// Custom Loader Component
const CustomLoader = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div className="text-center">
        {/* Spinner */}
        <div className="relative w-16 h-16 mx-auto mb-4">
          <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-[#A9CC4E] border-t-transparent rounded-full animate-spin"></div>
        </div>
        {/* Loading text */}
        <p className="text-lg font-helvetica text-gray-700">{message}</p>
      </div>
    </div>
  );
};

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [showLoginForm, setShowLoginForm] = useState(false);

  const router = useRouter();

  // User credentials
  const users: Record<string, { password: string; route: string }> = {
    debajyoti10: {
      password: "12345",
      route: "/debajyoti",
    },
    soumadeep: {
      password: "101112",
      route: "/soumadeep",
    },
  };

  // Initial page load effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 2000); // Show loader for 2 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Basic validation
    if (!username || !password) {
      setError("Please enter both username and password");
      setIsLoading(false);
      return;
    }

    // Check credentials
    const user = users[username];
    if (!user) {
      setError("Invalid username or password");
      setIsLoading(false);
      return;
    }

    if (user.password !== password) {
      setError("Invalid username or password");
      setIsLoading(false);
      return;
    }

    // Successful login
    setTimeout(() => {
      // Store login state if remember me is checked
      if (rememberMe) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", username);
      }

      // Redirect to appropriate route
      router.push(user.route);
      setIsLoading(false);
    }, 2000); // 2 second delay to show loading state
  };

  const handleContinue = () => {
    setShowLoginForm(true);
  };

  // Show initial page loader
  if (isPageLoading) {
    return <LoaderDemo />;
  }

  return (
    <div className="min-h-screen flex">
      {/* Login Loading Overlay */}
      {isLoading && <LoaderDemo />}

      {/* Mobile Welcome Screen */}
      <div className="lg:hidden w-full">
        {!showLoginForm ? (
          // Welcome Screen for Mobile
          <div className="min-h-screen bg-white flex flex-col">
            {/* Header with Logo */}
            <div className="flex justify-center pt-2 pb-1">
              <div className="text-2xl font-bold tracking-tight">
                <Image
                  src="/Frame 109-cropped.svg" // Replace with your actual image path
                  alt="Financial clarity, minus the mess"
                  width={150}
                  height={40}
                  priority
                  className="object-contain h-12 w-auto "
                />
              </div>
            </div>

            {/* Main Content Container */}
            <div className="flex-1 flex flex-col justify-between px-6 pb-3">
              {/* Hero Section */}
              <div className="flex-1 flex items-center justify-center">
                <div className="w-full max-w-md">
                  {/* Mobile Welcome Image */}
                  <div className="relative w-full aspect-[4/5] md:h-100 md:w-full mb-2">
                    <Image
                      src="/Frame 50.png" // Replace with your actual image path
                      alt="Financial clarity, minus the mess"
                      fill
                      className="object-fill rounded-xl"
                      priority
                    />
                  </div>
                </div>
              </div>

              {/* Continue Button */}
              <div className="mt-2 flex justify-end">
                <Button
                  onClick={handleContinue}
                  className="w-[40%] bg-[#A9CC4E] hover:bg-[#98b844] text-black py-2 px-4 rounded-lg font-medium text-lg font-helvetica shadow-lg"
                >
                  Continue
                </Button>
              </div>
            </div>
          </div>
        ) : (
          // Login Form for Mobile
          <div className="min-h-screen bg-white flex items-center justify-center p-6">
            <div className="w-full max-w-md space-y-6">
              <div className="text-center space-y-2 pb-4 pt-8">
                <h1 className="text-3xl font-bold text-gray-900  font-helvetica tracking-tighter flex items-center justify-center gap-2 flex-wrap">
                  Login to{" "}
                  <span className="inline-flex items-center pl-1 pt-1">
                    <Image
                      src={"/Frame 109-cropped.svg"}
                      alt="logo"
                      height={80}
                      width={80}
                      className="h-10 w-auto object-contain"
                    />
                  </span>
                </h1>
                <p className="text-gray-600 font-helvetica-light">
                  Enter your credentials to access your account
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-3">
                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <Label
                    htmlFor="username"
                    className="text-lg font-bold text-gray-700 font-helvetica-light tracking-wide"
                  >
                    Enter your Username
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-3 py-3 border font-helvetica-light border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-lg font-bold text-gray-700 font-helvetica-light tracking-wide"
                  >
                    Enter your Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-3 font-helvetica-light border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-500"
                    disabled={isLoading}
                  />
                  <div className="text-right pb-5">
                    <a
                      href="#"
                      className="text-sm text-gray-600 hover:text-gray-800 font-helvetica-light"
                    >
                      Forgot Password?
                    </a>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#A9CC4E] hover:bg-[#111606] hover:text-[#A9CC4E] text-black py-3 px-4 rounded-md font-medium transition-colors text-lg font-helvetica"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </Button>

                <div className="flex items-center justify-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) =>
                      setRememberMe(checked as boolean)
                    }
                    disabled={isLoading}
                  />
                  <Label
                    htmlFor="remember"
                    className="text-sm text-gray-600 font-helvetica-light"
                  >
                    Remember me
                  </Label>
                </div>

                <p className="text-xs text-gray-500 text-center pt-8 font-helvetica-light">
                  By clicking continue, you agree to our{" "}
                  <a
                    href="#"
                    className="underline hover:text-gray-700 font-helvetica-light"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="underline hover:text-gray-700">
                    Privacy Policy
                  </a>
                </p>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Desktop Layout (unchanged) */}
      <div className="hidden lg:flex w-full">
        {/* Left Section - Animated image slide in from left */}
        <div className="lg:w-[50%] relative overflow-hidden mt-10 ml-18 mb-10 animate-slide-in-left">
          <Image
            src="/Frame 50.png"
            alt="Financial clarity, minus the mess"
            fill
            className="object-fill"
            priority
          />
        </div>

        {/* Right Section - Animated bounce up */}
        <div className="lg:w-1/2 flex items-center justify-center p-8 bg-white">
          <div className="w-full max-w-md space-y-6 animate-slide-in-right">
            <div className="text-center space-y-2 pb-7">
              <h1 className="text-4xl font-bold text-gray-900 pb-1 font-helvetica tracking-tighter flex items-center justify-center gap-2 flex-wrap">
                Login to{" "}
                <span className="inline-flex items-center pl-1">
                  <Image
                    src={"/Frame 109-cropped.svg"}
                    alt="logo"
                    height={100}
                    width={100}
                    className="h-12 w-auto sm:h-14 md:h-16 lg:h-15 object-contain"
                  />
                </span>
              </h1>
              <p className="text-gray-600 font-helvetica-light">
                Enter your credentials to access your account
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label
                  htmlFor="username-desktop"
                  className="text-lg font-bold text-gray-700 font-helvetica-light tracking-wide"
                >
                  Enter your Username
                </Label>
                <Input
                  id="username-desktop"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3 py-2 border font-helvetica-light border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password-desktop"
                  className="text-lg font-bold text-gray-700 font-helvetica-light tracking-wide"
                >
                  Enter your Password
                </Label>
                <Input
                  id="password-desktop"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 font-helvetica-light border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-500"
                  disabled={isLoading}
                />
                <div className="text-right pb-5">
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-gray-800 font-helvetica-light"
                  >
                    Forgot Password?
                  </a>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#A9CC4E] hover:bg-[#111606] hover:text-[#A9CC4E] text-black py-2 px-4 rounded-md font-medium transition-colors text-lg font-helvetica"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>

              <div className="flex items-center justify-center space-x-2">
                <Checkbox
                  id="remember-desktop"
                  checked={rememberMe}
                  onCheckedChange={(checked) =>
                    setRememberMe(checked as boolean)
                  }
                  disabled={isLoading}
                />
                <Label
                  htmlFor="remember-desktop"
                  className="text-sm text-gray-600 font-helvetica-light"
                >
                  Remember me
                </Label>
              </div>

              <p className="text-xs text-gray-500 text-center pt-8 font-helvetica-light">
                By clicking continue, you agree to our{" "}
                <a
                  href="#"
                  className="underline hover:text-gray-700 font-helvetica-light"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="underline hover:text-gray-700">
                  Privacy Policy
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
