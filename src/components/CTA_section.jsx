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
    <div className='px-[30px] md:px-[50px] bg-secondary pt-20 pb-10'>
      <div
        className="h-[500px] bg-center bg-cover font-[inter] rounded-xl flex justify-center items-center"
        style={{ backgroundImage: `url(${cta_bg})` }}
      >
        <div className='w-3/5 flex flex-col items-center'>
          <p className='text-4xl font-bold text-accent text-center'>
            Unlock Your Cinematic Experience! Ready to Dive Into Movie Magic
          </p>
          <p className='text-muted font-bold text-center pt-4 text-lg'>
            Embark on a journey beyond the ordinary and unlock the door to a world where every frame tells a story and every scene is a masterpiece.
          </p>

          <form onSubmit={handleSubmit} className='flex gap-x-2 pt-8'>
            <input
              type='email'
              placeholder='Input Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              className='text-accent pl-3 border border-muted bg-secondary rounded-lg'
            />
            <Link to='Subscription'><Button type="submit">Subscribe</Button></Link>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CTA_section
