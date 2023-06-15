import Fetchdata from "../utils/fetch";
import { baseUrl1 } from "../utils/fetch";

class JobsData {

    async getJobs() {
        let job = Fetchdata.get(baseUrl1)
        .then(response =>{
            return response.data;
        })
        .catch(err => console.log(err))

        return job
    }

    async deleteJob(id){
        let job = Fetchdata.delete(`${baseUrl1}/${id}`)
        .then(response =>{
            return response.data
        })
        .catch(e => { console.log(e)})

      return job;
    }

    async postJob(newJob){
        let job = Fetchdata.post(`${baseUrl1}`,newJob)
        .then(response =>{
            return response.data;
        })
        .catch(err => console.log(err))
        return job;
    }
    
    async editJob(newJob,id){
        let job = Fetchdata.put(`${baseUrl1}/${id}`,newJob)
        .then(response =>{
            return response.data;
        })
        .catch(err => console.log(err))
         
        return job;
    }

}

// eslint-disable-next-line import/no-anonymous-default-export
export default new JobsData();
