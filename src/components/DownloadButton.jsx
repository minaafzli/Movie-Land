import download from '../image/download.svg'
function DownloadButton() {
    return (
        <div>
            
                 <a 
                  className=" cursor-pointer"
                  href="/videos/Oppenheimer-720.mp4"
                  download>     
                   <img src={download} alt="download" className='transition-transform hover:scale-110' />
                  </a>
            
        </div>
    )
}

export default DownloadButton
