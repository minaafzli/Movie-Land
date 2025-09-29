import Footer from '../components/Footer'
import F_and_Q from '../components/F_and_Q'
import Tick_text from '../components/Tick_text';
import { useNavigate } from "react-router-dom";


function Subscription() {
  const navigate = useNavigate();


const handleBuy = (plan) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    user.subscription = plan;
    localStorage.setItem("user", JSON.stringify(user));
    alert("Subscription Sucsess full✅");
    navigate("/profile");
  } else {
    alert("Sign in First, Please!");
    navigate("/Signup");
  }
};


  return (
   <div>
      <div className='bg-secondary overflow-x-hidden md:px-20 pt-10  px-[30px] font-[inter] flex flex-col items-center text-accent '>
        <div className='md:w-2xl text-center flex flex-col gap-4 py-10'>
        <p className=' text-4xl  font-bold'>Discover the Perfect Plan for You</p>
        <p className='text-muted'>Delve into our extensive array of movie subscription pricing plans, each thoughtfully designed to cater to the distinct preferences and viewing habits of our diverse customer base.</p>
        </div>

      <div className='flex flex-wrap justify-center gap-6 w-full min-w-3xl'>
        <div className='bg-bgGray flex-wrap'>
          <div className='p-4 flex flex-col gap-4'>
          <p className=' text-lg font-bold'>Basic Subscription</p>
          <div className='flex gap-4 items-center '><p className=' text-3xl font-bold'> $9.99 </p>
             <span className='text-sm '>/Montly</span>
          </div> 
          <div className='w-full max-w-sm flex-shrink-0 flex flex-col gap-4 '>
            <Tick_text>Unlock unlimited access to our vast movie library, including new releases and exclusive content.</Tick_text>
            <Tick_text>Enjoy movies in stunning 4K Ultra HD and High Dynamic Range (HDR).</Tick_text>
            <Tick_text>Download your favorite films to watch offline on your mobile devices.</Tick_text>
            <Tick_text>Experience uninterrupted movie enjoyment.</Tick_text>
          </div>
          <button  onClick={() => handleBuy("Basic")} className="bg-primary w-full md:w-auto py-3 px-4 rounded-lg text-accent text-sm hover:bg-hover transition cursor-pointer">
               Get Started
              </button>       

          </div>
        </div>
        <div className='bg-bgGray flex-wrap'>
          <div className='p-4 flex flex-col gap-4'>
          <p className=' text-lg font-bold'>Premium Subscription</p>
          <div className='flex gap-4 items-center '><p className=' text-3xl font-bold'> $24.99 </p>
             <span className='text-sm '>/Montly</span>
          </div> 
          <div className='w-full max-w-sm flex-shrink-0 flex flex-col gap-4'>
            <Tick_text>Unlock unlimited access to our vast movie library, including new releases and exclusive content.</Tick_text>
            <Tick_text>Enjoy movies in stunning 4K Ultra HD and High Dynamic Range (HDR).</Tick_text>
            <Tick_text>Download your favorite films to watch offline on your mobile devices.</Tick_text>
            <Tick_text>Experience uninterrupted movie enjoyment.</Tick_text>
          </div>
          <button  onClick={() => handleBuy("premium")} className="bg-primary w-full md:w-auto py-3 px-4 rounded-lg text-accent text-sm hover:bg-hover transition cursor-pointer">
               Get Started
              </button>

          </div>
        </div>
        <div className='bg-bgGray flex-wrap'>
          <div className='p-4 flex flex-col gap-4'>
          <p className=' text-lg font-bold'>Ultimate Subscription</p>
          <div className='flex gap-4 items-center '><p className=' text-3xl font-bold'> $34.99 </p>
             <span className='text-sm '>/Montly</span>
          </div> 
          <div className='w-full max-w-sm flex-shrink-0 flex flex-col gap-4'>
            <Tick_text>Unlock unlimited access to our vast movie library, including new releases and exclusive content.</Tick_text>
            <Tick_text>Enjoy movies in stunning 4K Ultra HD and High Dynamic Range (HDR).</Tick_text>
            <Tick_text>Download your favorite films to watch offline on your mobile devices.</Tick_text>
            <Tick_text>Experience uninterrupted movie enjoyment.</Tick_text>
          </div>
           <button  onClick={() => handleBuy("ultimate")} className="bg-primary w-full md:w-auto py-3 px-4 rounded-lg text-accent text-sm hover:bg-hover transition cursor-pointer">
               Get Started
              </button>

          </div>
        </div>
      </div>
      </div>
      <F_and_Q/>
      <Footer/>
   </div>
  );
}

export default Subscription;
