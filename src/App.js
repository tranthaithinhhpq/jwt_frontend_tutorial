// import './App.scss';
// import NavHeader from './components/Navigation/NavHeader';
// import { BrowserRouter as Router, } from "react-router-dom";
// // import Login from './components/Login/Login';
// // import Register from './components/Register/Register';
// // import User from './components/ManageUsers/Users';
// // import _ from "lodash";
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useEffect, useState, useContext } from 'react';
// import AppRoutes from './routes/AppRoutes';
// import { Rings } from 'react-loader-spinner';
// import { UserContext } from './context/UserContext';
// // import { Audio } from 'react-loader-spinner'


// function App() {
//   const { user } = useContext(UserContext);

//   return (
//     <>
//       <Router>
//         {user && user.isLoading ?
//           <div className="loading-container">
//             <Rings
//               height="100"
//               width="100"
//               color="#1877f2"
//               ariaLabel="loading"
//             />
//             <div>Loading data...</div>
//           </div>
//           :
//           <>
//             <div className="app-header">
//               <NavHeader />
//             </div>
//             <div className="app-container">
//               <AppRoutes />
//             </div>
//           </>
//         }
//       </Router>

//       <ToastContainer
//         position="top-right"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick={false}
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//       />
//     </>
//   );
// }

// export default App;
import './App.scss';
import NavHeader from './components/Navigation/NavHeader';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import AppRoutes from './routes/AppRoutes';
import { Rings } from 'react-loader-spinner';
import { UserContext } from './context/UserContext';

function App() {
  const { user } = useContext(UserContext);

  return (
    <>
      <Router>
        {user && user.isLoading ? (
          <div className="loading-container">
            <Rings
              height="100"
              width="100"
              color="#1877f2"
              ariaLabel="loading"
            />
            <div>Loading data...</div>
          </div>
        ) : (
          <>
            {/* Hiển thị NavHeader nếu không ở trang login */}
            {user && user.isAuthenticated && (
              <div className="app-header">
                <NavHeader />
              </div>
            )}

            <div className="app-container">
              <AppRoutes />
            </div>
          </>
        )}
      </Router>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;