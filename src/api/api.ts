import axios from 'axios'




export const apiRegistration = {
    postRegistration(email:string, password:string) {
      return  axios.post('http://localhost:7542/1.0/auth/register',
            {email, password})
            .then(res => res.data)
    }
}