import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {User}from '../user-class/user'
import {Repository} from '../repository-class/repository'
//import{DateCountPipe} from '../date-count.pipe'
import {environment} from '../../environments/environment.prod'
@Injectable({
  providedIn: 'root'
})
export class UserRequestService {
  user:User;
  repository:Repository[];
  apikey:'1aac104d8a2e871d03860c88a68a2cf21b1dbaf5';
  accessToken:'';
  //all: Repository[];
  

  constructor(private http:HttpClient) {
    this.user=new User("","","",0,0,0,"","",new Date())
   this.repository= []
   //this.all=[];
   } 
   userRequest(userInput){
  
    var userName=userInput;
    
    
    interface ApiResponse{
      name:string;
      avatar_url:string;
      location:string;
      followers:number;
      following:number;
      public_repos:number;
      html_url:string;
      apikey:string;
      production:boolean;
      
      
     
    }

    let promise =new Promise((resolve,reject)=>{
      this.http.get<ApiResponse>(`https://api.github.com/users/${userName}?access_token=${this.accessToken}`).toPromise().then(response=>{          
          this.user.name=response.name
          this.user.avatar_url=response.avatar_url
          this.user.location=response.location
          this.user.followers=response.followers
          this.user.following=response.following
          this.user.public_repos=response.public_repos
          this.user.html_url=response.html_url
         
        
          resolve()
      },
      error=>{
        this.user.name="Sorry the user name can not be found!"
        this.user.avatar_url="??????????????????????"

        reject(error)
    }
)
  })

  return promise
  
}

repositoryrequest(userInput){
  
  var userName=userInput;
  
  interface ApiResponse{
    name:string;
    description:string;
    
    
   
  }

  let promises =new Promise((resolve,reject)=>{
    this.http.get<ApiResponse>('https://api.github.com/users/'+userName+'/repos?access_token='+ this.apikey).toPromise().then(response=>{
        for (var i in response){
          console.log(i)
          this.repository.push(new Repository(response[i].name,response[i].description))
        }
        
        // this.repository.description=response.description
      //  for(let counter in response){
      //    this.all.push(response[counter])
      //  }
      // console.log(this.repository)
        resolve()
    },
    error=>{
            // this.repository.name="Sorry the repository can not be found! Please enter a valid Username"
            // this.repository.description="??????????????????????"

            reject(error)
        }
    )
})

return promises
}
}
