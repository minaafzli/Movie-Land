import { useState } from 'react'
import cta_bg from '../image/CTA_bg.jpg'
import Button from './Button'
import { Link } from 'react-router-dom'

function CTA_section() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault() 

    if (email.trim() === '') {
      alert('Please enter your email!')
      return
    }
    setEmail('') 
  }

  return (
    <div className=' md:px-16 bg-secondary pt-20 pb-10'>
      <div
        className="h-auto py-10 bg-cover bg-center font-[inter] rounded-xl flex justify-center items-center"
        style={{ backgroundImage: `url(${cta_bg})` }}
      >
        <div className=' md:p-10 flex flex-col items-center'>
          <p className='px-4 text-2xl md:text-4xl  font-bold text-accent text-center'>
            Unlock Your Cinematic Experience! Ready to Dive Into Movie Magic
          </p>
          <p className='px-4 text-muted   text-center pt-4  text-md md:text-lg'>
            Embark on a journey beyond the ordinary and unlock the door to a world where every frame tells a story and every scene is a masterpiece.
          </p>

          <form onSubmit={handleSubmit} className='flex flex-col md:flex-row gap-2 pt-8 items-center justify-center'>
            <input
              type='email'
              placeholder='Input Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              className='text-accent pl-3 border border-muted py-3 px-4 bg-secondary rounded-lg'
            />
            <Link to='Subscription'><Button type="submit">Subscribe</Button></Link>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CTA_section
