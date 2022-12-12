# React boilerplate

## Setup project
1. Install dependencies
```bash
npm i
```
2. Add `.env` file
```bash
cp .env.example .env
```
3. Change `name` in `package.json` to actual project name in kebab-case


4. Run development server and go to [http://localhost:3000/](http://localhost:3000/)
```bash
npm start
```

## Git

### Branch
Describe branch as `TASK_KEY/SHORT_NAME`
- `TASK_KEY` - project prefix + task number (e.g. AVA017)
- `SHORT_NAME` - description of the task

Example:

`AVA0017/create-sign-up-screen`

### Commit
Describe commit as `TASK_KEY`: `SHORT_DESCRIPTION`

Example:

`AVA0017: make sign up layout`

## Deployment

There are 3 git branches: `dev`, `stage` and `master`. Each branch has own deploy environment: `development`, `staging`, `production`.

Add `.env` variables into `.drone.yml` file.

`.drone.yml` has 3 sections: `Build Development`, `Build Staging` and `Build Production`. You should fill up `environment` in section you needed.
```yaml
- name: Build Development
  image: kudato/baseimage:node12
  commands:
  - npm install --quiet
  - npm run build
  environment:
    YOUR_VARIABLE: 'your-value'
  when:
    branch: dev
    event:
    - push
    - pull_request
```
