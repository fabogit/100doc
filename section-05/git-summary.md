init local repo

`git init`

rename `Master` branch to `main`

`git branch -M main`

git repo status

`git status`

repo log

`git log`

add new files and unstaged changes

`git add <filetoadd>` to add all `git add .`

reset unstaged changes (`filename` fo single file or `.` for all)

`git reset <filename>` && `git checkout -- <filename>`

save unstaged changes

`git commit -m "Title" -m "Description .........."`

push to remote repo

`git push`

fetch from remote repo

`git pull`

jump back of 1 commit

`git reset -hard HEAD~1`

show branches

`git branch`

create branch

`git checkout -b <branch>`

change branch (stage or stash unstaged changes before)

`git checkout <branch>`

merge branch to main (from `main` branch), accept incoming to integrate changes from `branch` to `main`

`git merge <branch>`

reset branch to latest commit

`git checkout -- .`

delete branch, (checkout from branch to delete if in it)

`git branch -D <branch>`

clone remote repo

`git clone <repourl>`

push local repo on remote

`git remote add origin <repo url>` && `git push -u origin main`