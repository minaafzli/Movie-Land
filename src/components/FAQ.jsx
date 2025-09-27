import FandQimag1 from '../image/FandQimage1.svg'
import FandQimag2 from '../image/FandQimage2.svg'
function FAQ() {
    return (
        <>
        <div className="bg-secondary flex px-[30px] md:px-[100px] justify-between items-center py-40">
            <div>
            <img src={FandQimag1} alt="img1" />
            </div>
            <div className='flex flex-col gap-6 w-lg '>
                <p className='text-4xl  text-accent font-bold'>Exclusive Premieres</p>
                <p className='text-muted'>Be the first to witness the extraordinary with our Exclusive Premieres. From Hollywood blockbusters to independent gems, catch the latest releases before they hit other platforms.</p>
            </div>
        </div>

        <div className="bg-secondary flex px-[30px] md:px-[100px] justify-between items-center">
            <div className='flex flex-col gap-6 w-lg '>
                <p className='text-4xl  text-accent font-bold'>Download and Play</p>
                <p className='text-muted'>No Wi-Fi? No problem! Download your go-to movies and watch them offline. Whether you're on a plane, in a remote cabin, or just lounging in your backyard, our Download and Play feature lets you take your favorite films with you, anytime, anywhere.</p>
            </div>
            <div>
            <img src={FandQimag2} alt="img2" />
            </div>
        </div>
        </>
    )
}

export default FAQ
