# Full Stack Engineer - Git & GitHub

### CodeCademy | Full Stack Engineer

## Some Commands

### Repo, new repository
* GitHub => Repositories => New
* git init
* git add .
* git commit -m “first commit”
* git remote add origin [GitHub URL for repository]
* git remote -v
* git push -u origin main

### Copy branches to Local
* git fetch
* git branch
* git switch [branch name]

### Copy remote to local
* git clone [remote url]

### Reset local with remote
* git reset --hard origin/main

### Repo, commit
* Copy repo URL, from the website
* git init
* git ignore [folder names & file names, in separate lines]
* git status
* git add -A
  * gt add .
  * git add [file name]
* git commit -m “[Description Message]”
* paste repo URL
  * git remote add origin [URL]
* git push origin [branch name]

### Log
* log --oneline --decorate --graph --all
  * file system style log
* git log --pretty=format:'%h - %an [%ar] %s'
  * Time and author focused log
* git log --pretty=format:'%C(yellow)%h%C(reset) - %an [%C(green)%ar%C(reset)] %s'
  * In color log
* git log --grep -E -i 'cach(e|ing)'
  * Searching for caching history
* git log -S [code to look for in the code base]
* git log --oneline -- [file name]
  * This will log changes related to that specific file
* git blame [file name]
  * Shows changes done author on specified file
* git show [commit hash number]
  * Shows the entire code that was changed


### Config
* git config --global alias.sla 'log --oneline --decorate --graph --all'
* git log sla

### Undo
Forgotten file while committing changes
* git show
* git add
* git status
* git commit --amend --no-edit
Edit commit message
* git commit --amend
Remove file from staging area
* git reset [file name]
Undoing a commit, removing it from history too
* git reset --soft HEAD^

### Setting up Git
* git config --global user.name "arturas"
* git config --global user.email "triple1024@gmail.com"
* git config -l


## git branches

Git allows us to create `branches` to experiment with versions of a project. Imagine you want to create version of a story with a happy ending. You can create a new `branch` and make the happy ending changes to that branch only. It will have no effect on the master branch until you’re ready to merge the happy ending to the master branch.

The following commands are useful in the Git branch workflow:

* `git branch`: Lists all a Git project’s branches.
* `git branch branch_name`: Creates a new branch.
  * Branch names can’t contain whitespaces:`new-branch` and `new_branch` are `valid` branch names, but `new branch` is `not`.
* `git checkout branch_name`: Used to switch from one branch to another.
* `git merge branch_name`: Used to join file changes from one branch to another.
* `git branch -d branch_name`: Deletes the branch specified, if it `was merged` into main/master.
* `git branch -D branch_name`: Deletes the branch specified, if it `was not merged` into main/master.
  * In Git, branches are usually a means to an end. You create them to work on a new project feature, but the end goal is to merge that feature into the master branch. After the branch has been integrated into master, it has served its purpose and can be deleted.

### git log

Print the Git commit log:<br />
`git log`<br />
Note: if you find that your cursor is stuck in Git log, press `q` to `escape`.

## Git workflow
The workflow for Git collaborations typically follows this order:
1. Fetch and merge changes from the remote
2. Create a branch to work on a new project feature
3. Develop the feature on your branch and commit your work
4. Fetch and merge from the remote again (in case new commits were made while you were working)
5. Push your branch up to the remote for review
Steps 1 and 4 are a safeguard against `merge conflicts`, which occur when two branches contain file changes that cannot be merged with the `git merge` command. Step 5 involves `git push`.

A <i>remote</i> is a Git repository that lives <i>outside</i> your Git project folder. Remotes can live on the web, on a shared network or even in a separate folder on your local computer. The <i>Git Collaborative Workflow</i> are steps that enable smooth project development when multiple collaborators are working on the same Git project.
* `git clone`: Creates a local copy of a remote.
* `git remote -v`: Lists a Git project’s remotes.
* `git fetch`: Fetches work from the remote into the local copy.
* `git merge origin/master`: Merges origin/master into your local branch.
* `git push origin <branch_name>`: Pushes a local branch to the origin remote.

## Merge Conflict Example Scenario
### git merge
In a moment, you’ll merge branches. Keep in mind:
* Your goal is to update master with changes you made to fencing.
* `fencing` is the giver branch, since it `provides` the changes.
* `master` is the receiver branch, since it `accepts` those changes.
To switch from `fencing` to `master`:<br />
`git checkout master`<br />
To add `fencing` chenges to `master` branch:<br />
`git merge fencing`

What would happen if you made a commit on master before you merged the two branches? Furthermore, what if the commit you made on master altered the same exact text you worked on in fencing? When you switch back to master and ask Git to merge the two branches, Git doesn’t know which changes you want to keep. This is called a merge conflict.

CONFLICT (content): Merge conflict in resumé.txt
Automatic merge failed; fix conflicts and then commit the result.

Note: If the markings are not showing in `resume.txt`, please close `resume.txt` and re-open the file.

`<<<<<<< HEAD`<br />
`master version of line`<br />
`=======`<br />
`fencing version of line`<br />
`>>>>>>> fencing`<br />

From the code editor:

Delete the content of the line as it appears in the master branch

Delete `all of Git’s special markings` including the words `HEAD` and `fencing`. If any of Git’s markings remain, for example, `>>>>>>>` and `=======,` the conflict remains.

## Resources
* Codecademy Article: [Git Branching](https://www.codecademy.com/learn/paths/full-stack-engineer-career-path/tracks/fscp-git-and-github-part-ii/modules/fscp-git-branching/cheatsheet)
* Documentation: [Markdown](https://docs.github.com/en/github/writing-on-github/getting-started-with-writing-and-formatting-on-github)
* Tutorial: Youtube [Basic Workflow: Collaborative Work on the Same Project](https://www.youtube.com/watch?v=o9Z3gfyiqzQ&ab_channel=Codecademy)
* Tutorial: Youtube [GitHub & Git Foundations: Forking](https://www.youtube.com/watch?v=5oJHRbqEofs&ab_channel=GitHubTraining%26Guides)
* Tutorial: Youtube [GitHub & Git Foundations: Pull Requests](https://www.youtube.com/watch?v=d5wpJ5VimSU&ab_channel=GitHubTraining%26Guides)
* Tutorial: Youtube [GitHub & Git Foundations: Rebase](https://www.youtube.com/watch?v=SxzjZtJwOgo&ab_channel=GitHubTraining%26Guides)
* Tutorial: Atlassian | BitBucket [Git Merge Conflicts](https://www.atlassian.com/git/tutorials/using-branches/merge-conflicts)
* Tutorial: [How to Contribute to Open Source](https://opensource.guide/how-to-contribute/)
* Documentation: GitHub Features [Project Management](https://github.com/features/issues)
* Tutorial: Youtube [GitHub for Project Management](https://www.youtube.com/watch?v=6fByt0o4UYs&ab_channel=GitHubTraining%26Guides)
* Article: ZenHub [How to Use GitHub for Agile Management](https://blog.zenhub.com/how-to-use-github-agile-project-management/)
* Article: Analytics Vidhya [An Introduction to Continuous Integration & GitHub Actions for Julia](https://medium.com/analytics-vidhya/an-introduction-to-continuous-integration-github-actions-for-julia-1a5a1a6e64d6)
* Resource: [How to Contribute to Open Source, FreeCodeCamp](https://github.com/freeCodeCamp/how-to-contribute-to-open-source)
* Article: [How to Contribute on GitHub, dataschool](https://www.dataschool.io/how-to-contribute-on-github/)
* Article: [Git Branch Naming Conventions, deepsource](https://deepsource.io/blog/git-branch-naming-conventions/)
* Tutorial: Youtube [GitHub Review - Exploring Workflows, GitHub](https://www.youtube.com/watch?v=EwWZbyjDs9c)
* Resource: [List of Continuous Integration Services, ligurio](https://github.com/ligurio/awesome-ci)
* Extensions: [Markdown and Visual Studio Code](https://code.visualstudio.com/docs/languages/markdown)
* Article: [How to write a good README for your GitHub project?](https://bulldogjob.com/news/449-how-to-write-a-good-readme-for-your-github-project)
* Youtube: [Get up and Running](https://www.youtube.com/playlist?list=PLg7s6cbtAD15G8lNyoaYDuKZSKyJrgwB-)
* Article: [Crafting History with Rebase](https://thoughtbot.com/upcase/videos/git-crafting-history)
