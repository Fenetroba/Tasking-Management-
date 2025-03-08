import React from 'react'
import { RiFacebookBoxFill, RiInstagramFill, RiInstagramLine, RiLinkedinBoxFill, RiTelegram2Fill, RiWhatsappFill } from 'react-icons/ri'
import './style/footer.css'
const Footer = () => {
  return (
    <div className='Footer'>
      <div className="footter_contener">
        
        <div className="socialmediaIcon" style={{color:"#c9e9f1"}}>
          <span>faceBook<RiFacebookBoxFill/></span>
          <span>InstaGram<RiInstagramLine/></span>
          <span>Whatsapp<RiWhatsappFill/></span>
          <span>Linked<RiLinkedinBoxFill/></span>
          <span>Telegrame<RiTelegram2Fill/></span>
        </div>

      </div>
        <div className="copy">
          <p>@copy right by Fenet roba</p>
        </div>
    </div>
  )
}

export default Footer