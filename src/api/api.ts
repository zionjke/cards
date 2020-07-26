import axios from 'axios'




export const apiRegistration = {
    postRegistration(email:string, password:string) {
      return  axios.post('https://cards-nya-back.herokuapp.com/1.0/auth/register',
            {email, password})
            .then(res => res.data)
    }
}