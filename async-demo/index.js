console.log('Before');

//callbacksssssssss 

// getUser(1,function(user){
//     console.log("user: ",user);
//     //get repositories
//     getRepositiories(user.githubUsername, (repos)=>{
//         console.log("repos: ",repos);
//         getCommits(repos[0], (commits)=>{
//                 console.log(commits)
//         })
//     })
// });


//promisesssssssssss
// getUser(1)
//  .then(user =>getRepositiories(user.githubUsername))
//   //on second promise
//   .then(repos => getCommits(repos[0]))
//   //on third promise
//   .then(commits => console.log(commits))
//   .catch(err => console.log(err.message));

//async and awaitttttt
async function displayCommits(){
    try{
        const user = await getUser(1)
        const repos = await getRepositiories(user.githubUsername)
        const commit = await getCommits(repos[0])
        console.log(commit);
    }
    catch(err){
        console.log("error", err.message);
        
    }
}
displayCommits()

console.log('After');

function  getUser(id){

    return new Promise((resolve,reject) => {
        setTimeout(()=> {
            console.log('Reading user from db..');
            resolve({id:id,githubUsername: "Dania"})
        }, 2000);
    })
}

function getRepositiories(username){

    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log("getting repositories..");
            // resolve(['repo1', 'repo2', 'repo3']);
            reject(new Error("smth happned"))
        },2000);
    })
}

function getCommits(repo) {
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
          console.log('Calling GitHub API...');
          resolve(['commit']);
        }, 2000);
    })
  }