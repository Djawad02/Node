console.log('Before');
getUser(1,function(user){
    console.log("user: ",user);
    //get repositories
    getRepositiories(user.githubUsername, (repos)=>{
        console.log("repos: ",repos);
        getCommits(repos[0], (commits)=>{
                console.log(commits)
        })
    })
});
console.log('After');

function  getUser(id,callback){
    setTimeout(()=> {
        console.log('Reading user from db..');
        callback({id:id,githubUsername: "Dania"})
    }, 2000);
}

function getRepositiories(username, callback){
    setTimeout(()=>{
        console.log("getting repositories..");
        callback(['repo1', 'repo2', 'repo3']);
    },2000);
}

function getCommits(repo, callback) {
    setTimeout(() => {
      console.log('Calling GitHub API...');
      callback(['commit']);
    }, 2000);
  }