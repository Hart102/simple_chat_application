const SentMsg = ({ username, userImg, message, time , ondbclick}) => {
  return (
    <>
    <div>
        <span className="my-0 ms- fw-light text-light" 
        style={{fontSize: "0.9em"}}>{username}</span>
        <p className="small p-3 me-3 mb-1 text-white1 rounded-3" 
        style={{background: "#f5f6f7"}} onDoubleClick={ondbclick}>{message}</p>
        <p className="small me-3 mb-3 rounded-3 text-muted">{time}</p>
    </div>
    <img src={userImg} style={{width: "45px", height: "100%"}} />
    </>
)
}

export default SentMsg