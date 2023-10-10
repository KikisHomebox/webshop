# Collaborative Project Best Practices Guide

## Table of Contents
1. [Committing](#committing)
2. [Branching](#branching)
3. [Rebasing](#rebasing)
4. [Pull Requests to Main](#pull-requests-to-main)
5. [Communication](#communication)
6. [Linting](#linting)
7. [Testing](#testing)
8. [Code review guidelines](#review-guidelines)
9. [Bugs](#bugs)
10. [Security](#security)
11. [Comments](#comments)
12. [Backlog & planning](#backlog)
13. [Continous intergation and continous deployment](#ci-cd)
14. [Offline Pipelines](#offline-pipelines)

### 1. Committing <a name="committing"></a>
- **Meaningful Commit Messages**: Write clear and descriptive commit messages.
  ```shell
  Good: "Taskname: Update user login validation"
  Avoid: "Fixed stuff"
  ```

- **Atomic Commits**: Keep commits focused on a single task or change. For example one checklist item in trello

- **No Debug Code**: Avoid committing debugging statements or commented-out code. These can be pushed to git but are not allowed on pull requests.
  
- **Regular Commits**: Commit your work frequently to avoid large, hard-to-review changes.

- **Committing frequently**: Commit frequently to avoid large, hard-to-review changes.

- **Typos and small details**: In cases where you realize there are typos or small details that you are not happy with but the changes are too small(only few lines) for creating another commit, you can add the changes and "recreate" the previous commit by
  ```shell
  git commit --amend
  git push --force-with-lease
  ```
- **Before committing**: Before committing you can lint and fix your code against linters by running `npm run precommit`. This is very usefull tool and it combines prettier and ESLint checks. (Prettier is a code refactoring tool that makes it ESLint friendly)


### 2. Branching <a name="branching"></a>
- **Descriptive Branch Names**: Use task names from trello as branch names. 
  ```shell
  Before creating branch use: git checkout main 
  Good with subtask: Taskname-subtaskname 
  Good without subtask: Taskname
  Avoid generic names: new-feature
  ```

- **Task Branches**: Create separate feature branches for each new trello task. This keeps changes isolated and simplifies merging. Use **only** main as source for new branches.

- **Sub-task names** are not mandatory unless they are big enough. If a subtask change contains more than 200 lines of code create a new branch for them as well!

- **Main Branch**: Is protected to to prevent direct pushes. Code to main goes through pull requests. See [Pull Requests to Main](#pull-requests-to-main).

### 3. Rebasing <a name="rebasing"></a>
- **Rebase Instead of Merge**: Use `git rebase -i` to incorporate changes from the main branch into your feature branch, instead of merging. This keeps your history linear and makes it easier to resolve conflicts. Remeber to fetch code before this operation.
  ```shell
  git checkout feature-branch
  git rebase main
  ```
- **Pushing to dev branch after rebase**: Use the tag --force-with-lease to push after rebasing

- **Resolve Conflicts**: If conflicts occur during a rebase, resolve them promptly. Communicate with team members if any questions to raise. This makes sure
that you do not remove other peoples work!

### 4. Pull Requests to Main <a name="pull-requests-to-main"></a>
- **Open Pull Requests (PRs)**: Create a PR when you're ready to merge your changes into the main branch. Include a clear title == branchname == ticket and description of what the PR accomplishes. Write notes if something is needed to consider while reviewing your PR.
  
- **Code Review**: Request code reviews from at least one (1) team member(s). Address feedback and make necessary changes before merging.

- **Pass CI/CD**: Ensure that all Continuous Integration/Continuous Deployment checks pass before merging. There will be at least two phases. linting and unit testing.

- **Squash Commits**: Squash and rebase your branch commits into a single, well-organized commit before merging into the main branch, where you will describle changes on high level.

- **Labels**: You are strongly advised to add labels to your PRs. They make it easier to catgorize wheter the pull request is related to documentation, feature or GitHub pipelines itself. 

### 5. Communication <a name="communication"></a>
- **Telegram/Chat**: Maintain open communication channels with team members. Use TG to discuss project-related matters. Ask always if you are unsure about anything!

- **Meetings**: On mondays 18.00 team meetings. Bi-Weekly sprint change ceremonies

- **Document Important Decisions** This helps in the future to track changes!

- **Working together** is important. Let others know what you are working on. If you will be working some topic close to another persons topics let them know so you can work togerher and avoid conflicts.

### 6. Linting <a name="linting"></a>
- **Linting**: Your code will be linted using ESlint tool 

- **Linters** need to be passed before PR can be accepted.

- **More details**: To be anounced

### 7. Testing <a name="testing"></a>
- **Test your own code**: Before merging the code to main your code needs to be tested on your own machine with unittests. Testing is to be included in PR to main. 

- **Unit testing**: Testing is to be done with Jest/React-testing-tool. <- Proposed toolset

- **Integration testing**: To be agreed.

- **Acceptance testing**: To be agreed

- **End to End testing**: To be agreed

- **Selenium testing**: To be agreed

- **More details**: ...

### 8. **Code Review Guidelines** <a name="review-guidelines"></a>

   - **Code Review Checklist**: 
     - code readability: Code follows current linting rules
     - adherence to coding standards: Reasonable variable names etc. 

   - **Reviewer Responsibilities**:
     - Review carefully but there is no need to test it on your own machine if unitests and linting are passing
     - Provide concrete feedback. If somehting is to be improved tag lines etc.
     - Respect the author's work we are here still learning things :).

   - **Author Responsibilities**: 
     - Be open to feedback. The best ideas are born when cooperating
     - make requested changes or explain youe solution if you think its better
     - Address comments in 2 days, the project goes on

### 9. **Bugs** <a name="bugs"></a>

   - **How to report bugs**: 
     - Create a ticket on trello and notify group on telegram. 
     - Try to estimate how critical the bug is since it affects on the fixing time


### 10. **Security Best Practices** <a name="security"></a>

   - **Security Guidelines**: 
     - Aim to write secure code.
     - Do not add API keys to GitHub the repository is public.
     - Environmental variables is safe space for keys or any confidetntial data.
     - Do not install unsecure packages from npm. etc
     - npm shows some flags about security of the packages, take a look on those if they require some action.

### 11. **Commenting code** <a name="comments"></a>

   - **Rules**: 
     1. Rule: Do not comment code. Add notes to commits
     2. Execption to rule 1. If something aboslutely requires commenting you may do it but it should not be added to main

### 12. **Backlog and Planning** <a name="backlog"></a>

   - **Backlog**: Backlog can be found from [Trello](https://trello.com/b/6FLJUeRF/kikis-home-box)

### 13. **Continous intergation and continous deployment** <a name="ci-cd"></a>

   - **CI**: At the moment we have access GitHub's free organization resources. This means that we have access to some online runners. More information about organizations and their offered properties can be found on [here](https://github.com/organizations/Kiki-s-homebox/billing/plans)

### 14. **Continous intergation and continous deployment** <a name="offline-pipelines"></a>

   - **Offline Pipelines**: Can be run locally with docker and act. More detailed instructions about the usage of act is [here](https://github.com/nektos/act). With act you are able to run the pipeline locally with your own machine similarly as they are being run on GitHub. This can be helpfull if your code does not work with github and you want to start debugging it.
