import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function SignIn() {

  const [formData, setFormData] = useState({})
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,

    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true)
     
      //Posting the data to the server
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      
      //Failed to load the data
      if(data.success == false){
        setLoading(false)
        setError(data.message)
        return
      }

      //No Errors found
      setLoading(false);
      setError(null)
      navigate('/')
    } catch (error) {
      setLoading(false)
      setError(error.message)
    } 
  } 
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>
        Sign In</h1>

        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>

        <input type="text" placeholder='Email' 
            className='border p-3 rounded-lg' id='email'onClick={handleChange} />

          <input type="text" placeholder='Password' 
            className='border p-3 rounded-lg' id='password'onClick={handleChange} />

          <button disabled={loading} className='bg-slate-700 text-white p-3 
            rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
           { loading ? 'Loading...' : 'Sign in' }
          </button>
        </form>

        <div className="flex gap-2 mt-5">
          <p>Dont have an account?</p>
          <Link to={"/sign-up"}>
            <span className='text-blue-700 '>Sign up</span>
          </Link>
          { error && <p className='text-red-500'>{error}</p> }
        </div>
    </div>
  )
}
