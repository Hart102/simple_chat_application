const RecievedMsg = ({
  username, userImg, 
  message, time, ondbclick
}) => {
  return (
    <>
      <div className="d-flex flex-row justify-content-start">
        <img src={userImg} style={{width: "45px", height: "100%"}} />
        <div>
          <span className="my-0 mx-3 fw-light text-light" style={{fontSize: "0.9em"}}>{username}</span>
          <p className="small p-3 ms-3 mb-1 rounded-3" style={{background: "#f5f6f7"}} onDoubleClick={ondbclick}>{message}</p>
          <p className="small ms-3 mb-3 rounded-3 text-muted float-end">{time}</p>
        </div>
      </div>
    </>
  )
}

export default RecievedMsg