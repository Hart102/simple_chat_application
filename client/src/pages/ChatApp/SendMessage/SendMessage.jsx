const SendMessage =({ onclick, onchange })=> {
  return (
  <form className="shadow-lg" id='chat-input'>
    <input 
      type="type" 
      className="form-control rounded-pill bg-transparent text-light border py-2 my-3 message" 
      id="floatingInput" placeholder="Type message" onChange={onchange}
    />
    <div className="d-flex align-items-center justify-content-around ms-3 col-md-1">
      <div>
        <label htmlFor="file">
          <i className='fa fa-image text-light' style={{fontSize: '1.5em'}}></i>
        </label>
        <input type="file" className='d-none' id='file'/>
      </div>
      <button type="submit" className="btn" onClick={onclick}>
        <i className="fas fa-paper-plane text-light" style={{fontSize: '1.5em'}}></i>
      </button>
      </div>
    </form>
  )
}


export default SendMessage













// const SendMessage = ({
//   onclick, onchange
// }) => {
//   const[file, setFile] = useState()
//   const inputRef = useRef<HTMLInputElement | null>(null);

//   const handleFileChange = (e) => {
//     if (!e.target.files) {
//       return;
//     }
//     setFile(e.target.files[0]);
//     // 🚩 do the file upload here normally...
//     console.log(file)
//   };

//   return (
//     <form id='chat-input'>
//       <input 
//         type="type" 
//         className="form-control rounded-pill py-2 my-3 message" 
//         id="floatingInput" 
//         placeholder="Type message"
//         onChange={onchange}
//       />
//       <div className="d-flex align-items-center justify-content-around ms-3 col-md-1">
//         <div>
//           <label htmlFor="file">
//             <i className='fa fa-image text-light' style={{fontSize: '1.5em'}}></i>
//           </label>
//           <input type="file" className='d-none' id='file'onChange={handleFileChange}/>
//         </div>
//         <button className="btn" onClick={onclick}>
//           <i className="fas fa-paper-plane text-light" style={{fontSize: '1.5em'}}></i>
//         </button>
//       </div>
//     </form>
//   )
// }

// export default SendMessage



{/* <Link className="ms-1 text-muted" to=''><i className="fas fa-paperclip"></i></Link> */}
  {/* <Link className="ms-3 text-muted" to=''><i className="fas fa-smile"></i></Link> */}