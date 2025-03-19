// import React, { useState } from "react";
// import "./style/createAccount.css";
// import { RiDeleteBack2Fill, RiDeleteBin3Fill } from "react-icons/ri";
// const CreateAccount = ({ CreateAccounts, createAccountHandler }) => {
//   // create the user socialmedia account dem0

//   const [createUserAccount, setCreateAccount] = useState({
//     telegram: "",
//     whatsapp: "",
//     Linkedin: "",
//     facebook: "",
//     Github: "",
//   });
//   const CreateAccountHandler = (e) => {
//     e.preventDefault();
//     console.log(createUserAccount);
//     setCreateAccount({
//       telegram: "",
//       whatsapp: "",
//       Linkedin: "",
//       facebook: "",
//       Github: "",
//     });
//   };

//   return (
//     <div className={`createAccount ${CreateAccounts ? "open" : "closed"}`}>
//       <p onClick={createAccountHandler}>
//         <RiDeleteBack2Fill
//           style={{
//             fontSize: "30px",
//             fontWeight: "900",
//             cursor: "pointer",
//             marginTop: "10px",
//           }}
//         />
//       </p>
//       <div className="createAccountContener">
//         <h3>Add Your User Name Each socialmedia</h3>
//         <form onSubmit={CreateAccountHandler}>
//           telegram{" "}
//           <input
//             type="text"
//             placeholder="Telegram User Name"
//             onChange={(e) =>
//               setCreateAccount({
//                 ...createUserAccount,
//                 telegram: e.target.value,
//               })
//             }
//           />
//           Whatsapp{" "}
//           <input
//             type="text"
//             placeholder="Whatsapp User Name"
//             onChange={(e) =>
//               setCreateAccount({
//                 ...createUserAccount,
//                 whatsapp: e.target.value,
//               })
//             }
//           />
//           Linkdin{" "}
//           <input
//             type="text"
//             placeholder="Linkdin link"
//             onChange={(e) =>
//               setCreateAccount({
//                 ...createUserAccount,
//                 Linkedin: e.target.value,
//               })
//             }
//           />
//           facebook{" "}
//           <input
//             type="text"
//             placeholder="facebook User Name"
//             onChange={(e) =>
//               setCreateAccount({
//                 ...createUserAccount,
//                 facebook: e.target.value,
//               })
//             }
//           />
//           Github{" "}
//           <input
//             type="text"
//             placeholder="Github Link"
//             onChange={(e) =>
//               setCreateAccount({ ...createUserAccount, Github: e.target.value })
//             }
//           />
//           <button type="submit">Submit</button>
//         </form>

//         <button className="deletBtn">
//           Delete All <RiDeleteBin3Fill />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CreateAccount;
