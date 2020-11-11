# NextJS starter kit

@maintainer `piotr.bosak@vmlyr.com`

## Hey, you!

Do not clone this repo to start a new project!

[Fork it](https://git.pride.gl/piotr.bosak/nextjs-starter/-/forks/new) or add it as an [additional remote](#add-to-your-project-repo) to [already existing project repo](#add-to-your-project-repo) instead.

# Examples
Check out the [examples branch](https://git.pride.gl/piotr.bosak/nextjs-starter/-/tree/examples)

# Structure
Everthing except for `pages`, `vendor`, `config` and `public` is your playground

* `pages` - **required** contains directory driven routing and contents of your pages. Check [NextJS routing](https://nextjs.org/docs/routing/introduction) for more info.

* `public` - **required** files that will be statically served. Useful for resources like fonts.\

* `vendor` - **required** contains starter provided tools and components\
\
You **should not** modify files inside this directory if you want to be able to **receive framework updates without merge conflicts**

* `config/public.json` - **required** Data from this file will be presented to client code. \
**NEVER PUT ANY CONFIDENTIAL DATA LIKE API PASSWORDS HERE**.\
For such things use `config/private.json`.\
\
Contains config files that should contain all your public app parameters, like an API endpoint root.
 
* `config/private.json` - **required** Contains configuration data that will only be available to server-side rendering. You may use confidential data here. 

## Add to your project repo
**It's always best to add starter to an empty repo to avoid conflicts**

### Before you begin
* starter can be added only to **git repo root**. \
If you have for ex. `my_project/frontend` directory and you want to initialize starter in `frontend` directory **it won't work**\.
It must be initialized in **git root directory**.

If you have already created a repo for your project you can add the starter to it using additional remote:

Add new remote
```
cd my_project
git remote add framework git@git.pride.gl:piotr.bosak/nextjs-starter.git
```

Merge framework into branch
```
git fetch framework
git merge framework/master --allow-unrelated-histories
``` 

# Updating framework
If you want to pull updates to the framework just pull the changes:
```
git fetch framework master
git merge framework/master
```

# Contribute
Do you have a component or an idea for a component that can be reused in other projects?

Have you found a bug and want to submit a patch?

## Create a merge request!

It's extremely simple.

Recipe:
* Clone the starter repository \
`git clone git@git.pride.gl:piotr.bosak/nextjs-starter.git`
* Checkout master branch\
`cd nextjs-starter`\
`git checkout master`
* Create patch branch
`git checkout -b patch-fixes-modal-bug`
or
`git checkout -b feature-mobile-menu-component`
* Make changes, commit, push
* Create a [merge request](https://git.pride.gl/piotr.bosak/nextjs-starter/-/merge_requests/new?merge_request%5Bsource_project_id%5D=1310&merge_request%5Btarget_branch%5D=master&merge_request%5Btarget_project_id%5D=1310)
