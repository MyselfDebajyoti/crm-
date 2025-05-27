// import React from "react";

// const RadarLoader = () => {
//   return (
//     <div className="loader">
//       <span></span>
//       <style jsx>{`
//         .loader {
//           position: relative;
//           width: 150px;
//           height: 150px;
//           background: transparent;
//           border-radius: 50%;
//           box-shadow: 25px 25px 75px rgba(0, 0, 0, 0.55);
//           border: 1px solid #333;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           overflow: hidden;
//         }

//         .loader::before {
//           content: "";
//           position: absolute;
//           inset: 20px;
//           background: transparent;
//           border: 1px dashed #444;
//           border-radius: 50%;
//           box-shadow: inset -5px -5px 25px rgba(0, 0, 0, 0.25),
//             inset 5px 5px 35px rgba(0, 0, 0, 0.25);
//         }

//         .loader::after {
//           content: "";
//           position: absolute;
//           width: 50px;
//           height: 50px;
//           border-radius: 50%;
//           border: 1px dashed #444;
//           box-shadow: inset -5px -5px 25px rgba(0, 0, 0, 0.25),
//             inset 5px 5px 35px rgba(0, 0, 0, 0.25);
//         }

//         .loader span {
//           position: absolute;
//           top: 50%;
//           left: 50%;
//           width: 50%;
//           height: 100%;
//           background: transparent;
//           transform-origin: top left;
//           animation: radar81 2s linear infinite;
//           border-top: 1px dashed #fff;
//         }

//         .loader span::before {
//           content: "";
//           position: absolute;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           background: seagreen;
//           transform-origin: top left;
//           transform: rotate(-55deg);
//           filter: blur(30px) drop-shadow(20px 20px 20px seagreen);
//         }

//         @keyframes radar81 {
//           0% {
//             transform: rotate(0deg);
//           }
//           100% {
//             transform: rotate(360deg);
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// // Demo component to show the loader in action
// const LoaderDemo = () => {
//   return (
//     <div className="min-h-screen  fixed inset-0 bg-[#111606] flex items-center justify-center z-50">
//       <div className="text-center">
//         <RadarLoader />
//         {/* <p className="text-white mt-8 text-lg">Radar Loader</p> */}
//         {/* <p className="text-gray-400 mt-2 text-sm">Next.js Component with Tailwind CSS</p> */}
//       </div>
//     </div>
//   );
// };

// export default LoaderDemo;

// import React from "react";

// const WaveLoader = () => {
//   return (
//     <div className="loader">
//       <style jsx>{`
//         .loader {
//           width: 150px;
//           height: 150px;
//           background-color: #ff3d00;
//           border-radius: 50%;
//           position: relative;
//           box-shadow: 0 0 30px 4px rgba(0, 0, 0, 0.5) inset,
//             0 5px 12px rgba(0, 0, 0, 0.15);
//           overflow: hidden;
//         }

//         .loader:before,
//         .loader:after {
//           content: "";
//           position: absolute;
//           width: 100%;
//           height: 100%;
//           border-radius: 45%;
//           top: -40%;
//           background-color: #fff;
//           animation: wave 5s linear infinite;
//         }

//         .loader:before {
//           border-radius: 30%;
//           background: rgba(255, 255, 255, 0.4);
//           animation: wave 5s linear infinite;
//         }

//         @keyframes wave {
//           0% {
//             transform: rotate(0);
//           }
//           100% {
//             transform: rotate(360deg);
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// // Demo component to show the loader in action
// const LoaderDemo = () => {
//   return (
//     <div className="min-h-screen fixed inset-0 z-50 bg-gray-100 flex items-center justify-center">
//       <div className="text-center">
//         <WaveLoader />
//         {/* <p className="text-gray-800 mt-8 text-lg font-semibold">Wave Loader</p>
//         <p className="text-gray-600 mt-2 text-sm">Next.js Component with Tailwind CSS</p> */}
//       </div>
//     </div>
//   );
// };

// export default LoaderDemo;

import React from "react";

const WaveLoader = () => {
  return (
    <div className="loader">
      <style jsx>{`
        .loader {
          width: 150px;
          height: 150px;
          background-color: rgba(169, 204, 78, 1);
          border-radius: 50%;
          position: relative;
          box-shadow: 0 0 30px 4px rgba(0, 0, 0, 0.5) inset,
            0 5px 12px rgba(0, 0, 0, 0.15);
          overflow: hidden;
          transform: rotate(-90deg);
        }

        .loader:before,
        .loader:after {
          content: "";
          position: absolute;
          width: 200%;
          height: 200%;
          border-radius: 45%;
          top: -40%;
          background-color: #fff;
          animation: wave 5s linear infinite;
        }

        .loader:before {
          border-radius: 30%;
          background: rgba(17, 22, 6, 1);
          animation: wave 5s linear infinite;
        }

        @keyframes wave {
          0% {
            transform: rotate(0);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

// Demo component to show the loader in action
const LoaderDemo = () => {
  return (
    <div className="min-h-screen fixed inset-0 z-50 bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <WaveLoader />
        {/* <p className="text-gray-800 mt-8 text-lg font-semibold">Wave Loader</p>
        <p className="text-gray-600 mt-2 text-sm">React Component with CSS Animations</p> */}
      </div>
    </div>
  );
};

export default LoaderDemo;
