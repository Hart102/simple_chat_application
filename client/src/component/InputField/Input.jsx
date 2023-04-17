const Input = ({type, placeholder, onchange}) => {
  return (
    <input 
        type={type} 
        className="form-control rounded-pill py-2 my-3" 
        id="floatingInput" 
        placeholder={placeholder}
        onChange={onchange}
    />
  )
}

export default Input