import React from 'react'
import './style/createAccount.css'
import { RiDeleteBack2Fill, RiDeleteBin3Fill } from 'react-icons/ri'
const CreateAccount = ({CreateAccounts, createAccountHandler}) => {

  return (
    <div className={`createAccount ${CreateAccounts ? 'open':"closed"}`}>
   
     <p onClick={createAccountHandler}>
             <RiDeleteBack2Fill
               style={{
                 fontSize: "30px",
                 fontWeight: "900",
                 cursor: "pointer",
                 marginTop:'10px'
               }}
             />
           </p>
           <div className="createAccountContener">
               <h3>Add Your User Name Each socialmedia</h3>
               <form>
               telegram <input type="text" placeholder='Telegram User Name' />
               Whatsapp <input type="text" placeholder='Whatsapp User Name' />
               Linkdin <input type="text" placeholder='Linkdin link' />
               facebook <input type="text" placeholder='facebook User Name' />
               Github <input type="text" placeholder='Github Link' />
               <button type='submit'>Submit</button>
               </form>

               <button className='deletBtn'>
                    Delete All <RiDeleteBin3Fill/>
               </button>
           </div>
   
    </div>
  )
}

export default CreateAccount