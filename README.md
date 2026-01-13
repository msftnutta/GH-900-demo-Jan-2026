# GH-900: GitHub Fundamentals Demo

Welcome to the GitHub Fundamentals training repository! This demo covers essential GitHub features and workflows.

## 📋 Table of Contents

- [About This Demo](#about-this-demo)
- [Getting Started](#getting-started)
- [GitHub Features Covered](#github-features-covered)
- [Hands-On Exercises](#hands-on-exercises)
- [Best Practices](#best-practices)
- [Resources](#resources)

## 🎯 About This Demo

This repository demonstrates core GitHub functionality including:
- Repository management
- Issues and project tracking
- Pull requests and code review
- Branching strategies
- Collaboration workflows
- GitHub Actions (basic introduction)

**Node.js Application:** This repository includes a weather dashboard web application built with Node.js, Express, and Bootstrap.

## 🚀 Getting Started

### Prerequisites

- Git installed on your local machine
- GitHub account
- Basic command line knowledge
- Text editor or IDE (VS Code recommended)
- Node.js (v14 or higher) and npm installed
- OpenWeatherMap API key (free tier available)

### Initial Setup

1. **Clone this repository**
   ```bash
   git clone https://github.com/YOUR-USERNAME/GH-900-demo-Jan-2026.git
   cd GH-900-demo-Jan-2026
   ```

2. **Configure Git**
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   ``Install dependencies**
   ```bash
   npm install
   ```

4. **Set up environment variables**
   ```bash
   # Copy the example env file
   copy .env.example .env
   
   # Edit .env and add your OpenWeatherMap API key
   # Get a free API key from: https://openweathermap.org/api
   ```

5. **`

3. **Verify setup**
   ```bash
   git status
   ```

## 📚 GitHub Features Covered

### 1. Repository Basics

- **Creating repositories**: Public vs. Private
- **README.md**: Documentation best practices
- **LICENSE**: Choosing the right license
- **.gitignore**: Excluding files from version control
- **Repository settings**: Managing access and features

### 2. Issues

Issues are used to track tasks, enhancements, and bugs.

**Creating an Issue:**
1. Navigate to the "Issues" tab
2. Click "New Issue"
3. Provide a descriptive title
4. Add details in the description
5. Assign labels (bug, enhancement, documentation, etc.)
6. Assign to team members
7. Link to projects or milestones

**Best Practices:**
- Use clear, descriptive titles
- Provide reproduction steps for bugs
- Add relevant labels
- Reference related issues using `#issue-number`
- Close issues with commit messages: `Fixes #123`

### 3. Branches

Branches allow you to develop features isolated from the main codebase.

**Common Branching Strategy:**
```
main (production-ready code)
├── develop (integration branch)
│   ├── feature/add-login
│   ├── feature/user-dashboard
│   └── bugfix/fix-typo
```

**Working with Branches:**

```bash
# Create a new branch
git checkout -b feature/your-feature-name

# List all branches
git branch -a

# Switch to a branch
git checkout branch-name

# Push branch to remote
git push -u origin feature/your-feature-name

# Delete a branch (local)
git branch -d branch-name

# Delete a branch (remote)
git push origin --delete branch-name
```

**Branch Naming Conventions:**
- `feature/` - New features (e.g., `feature/user-authentication`)
- `bugfix/` - Bug fixes (e.g., `bugfix/login-error`)
- `hotfix/` - Urgent production fixes (e.g., `hotfix/security-patch`)
- `docs/` - Documentation updates (e.g., `docs/update-readme`)

### 4. Pull Requests (PRs)

Pull requests let you tell others about changes you've pushed to a branch.

**Creating a Pull Request:**

1. Push your branch to GitHub
2. Navigate to the repository on GitHub
3. Click "Pull requests" → "New pull request"
4. Select base branch (usually `main`) and compare branch (your feature branch)
5. Add a descriptive title and detailed description
6. Request reviewers
7. Add labels and link related issues
8. Create the pull request

**PR Description Template:**

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring

## Related Issues
Fixes #123

## Changes Made
- Added feature X
- Updated component Y
- Fixed bug in Z

## Testing
- [ ] Tested locally
- [ ] Added unit tests
- [ ] Manual testing completed

## Screenshots (if applicable)
[Add screenshots here]

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-reviewed the code
- [ ] Commented code where necessary
- [ ] Updated documentation
```

**PR Review Process:**
1. Reviewer examines code changes
2. Leaves comments on specific lines
3. Requests changes or approves
4. Author addresses feedback
5. Re-review if needed
6. Merge when approved

**Merging Strategies:**
- **Merge commit**: Preserves all commits and creates a merge commit
- **Squash and merge**: Combines all commits into one
- **Rebase and merge**: Replays commits on top of base branch

### 5. Code Review

**As a Reviewer:**
- Be constructive and respectful
- Explain the "why" behind suggestions
- Approve when satisfied or request changes
- Use GitHub suggestions for quick fixes

**As an Author:**
- Respond to all comments
- Make requested changes promptly
- Mark conversations as resolved
- Keep PRs small and focused

### 6. Collaboration Workflow

**Standard Git Workflow:**

```bash
# 1. Update your local main branch
git checkout main
git pull origin main

# 2. Create a feature branch
git checkout -b feature/my-feature

# 3. Make changes and commit
git add .
git commit -m "Add feature description"

# 4. Push to remote
git push -u origin feature/my-feature

# 5. Create Pull Request on GitHub

# 6. After PR is merged, update local main
git checkout main
git pull origin main

# 7. Delete feature branch
git branch -d feature/my-feature
```

**Commit Message Best Practices:**
```bash
# Good commit messages
git commit -m "Add user authentication feature"
git commit -m "Fix login button alignment issue"
git commit -m "Update README with setup instructions"

# Use conventional commits format
git commit -m "feat: add user profile page"
git commit -m "fix: resolve memory leak in dashboard"
git commit -m "docs: update API documentation"
git commit -m "refactor: simplify authentication logic"
```

### 7. GitHub Projects

GitHub Projects help organize and prioritize work.

**Setting up a Project:**
1. Go to "Projects" tab
2. Click "New project"
3. Choose template (Board, Table, etc.)
4. Add columns (To Do, In Progress, Done)
5. Link issues and pull requests

### 8. Labels & Milestones

**Common Labels:**
- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Documentation improvements
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention needed
- `priority: high` - High priority items

**Using Milestones:**
- Group issues and PRs
- Track progress toward goals
- Set due dates
- Plan releases

### 9. Markdown Formatting

GitHub uses Markdown for formatting text.

**Common Syntax:**

```markdown
# Heading 1
## Heading 2
### Heading 3

**bold text**
*italic text*
~~strikethrough~~

- Unordered list item
- Another item

1. Ordered list item
2. Second item

[Link text](https://example.com)

![Image alt text](image-url.jpg)

`inline code`

```code block```

> Blockquote

| Table | Header |
|-------|--------|
| Cell  | Cell   |

- [ ] Task list item
- [x] Completed task
```

### 10. GitHub CLI (gh)

The GitHub CLI brings GitHub to your terminal.

**Installation:**
```bash
# Windows (using winget)
winget install --id GitHub.cli

# Mac (using Homebrew)
brew install gh

# Authenticate
gh auth login
```

**Common Commands:**
```bash
# Create a repository
gh repo create my-project --public

# Clone a repository
gh repo clone owner/repo

# Create an issue
gh issue create --title "Bug report" --body "Description"

# List issues
gh issue list

# Create a pull request
gh pr create --title "Add feature" --body "Description"

# Check out a pull request
gh pr checkout 123

# Merge a pull request
gh pr merge 123

# View PR status
gh pr status
```

## 🎓 Hands-On Exercises

### Exercise 1: Create and Manage Issues

1. Create 3 issues with different labels (bug, enhancement, documentation)
2. Assign yourself to one issue
3. Comment on an issue
4. Close an issue with a commit reference

### Exercise 2: Branch and Merge Workflow

1. Create a new branch `feature/update-readme`
2. Make changes to this README
3. Commit and push your changes
4. Create a pull request
5. Review and merge your PR
6. Delete the branch

### Exercise 3: Collaborative Development

1. Fork this repository (if working in teams)
2. Clone your fork
3. Create a feature branch
4. Make changes and push
5. Create a PR to the original repository
6. Participate in code review

### Exercise 4: Using Projects

1. Create a new project board
2. Add existing issues to the board
3. Move issues between columns
4. Link a PR to an issue

### Exercise 5: Working with GitHub CLI

1. Install GitHub CLI
2. Authenticate with your account
3. Create an issue using `gh issue create`
4. List all issues using `gh issue list`
5. Create a PR using `gh pr create`

## ✨ Best Practices

### Repository Management

- Keep your README up to date
- Use meaningful repository descriptions
- Add topics/tags for discoverability
- Maintain a clear folder structure
- Include a LICENSE file

### Branching

- Keep branches short-lived
- Delete merged branches
- Use descriptive branch names
- Don't commit directly to `main`
- Pull latest changes before creating branches

### Commits

- Make atomic commits (one logical change per commit)
- Write clear commit messages
- Commit frequently
- Don't commit sensitive data
- Use `.gitignore` appropriately

### Pull Requests

- Keep PRs small and focused
- Write descriptive titles and descriptions
- Link related issues
- Respond promptly to review feedback
- Ensure tests pass before requesting review
- Update PR branch with latest main before merging

### Code Review

- Review promptly
- Be constructive and kind
- Test the changes locally if needed
- Approve only when fully satisfied
- Use inline comments for specific feedback

### Communication

- Use issues for tracking work
- Comment on relevant issues/PRs
- Use @mentions to notify team members
- Keep discussions focused and professional
- Document decisions in issues/PRs

## 📖 Resources

### Official Documentation

- [GitHub Docs](https://docs.github.com)
- [Git Documentation](https://git-scm.com/doc)
- [GitHub Skills](https://skills.github.com)
- [GitHub CLI Manual](https://cli.github.com/manual/)

###🌤️ Weather Dashboard Application

This repository includes a fully functional Node.js web application that displays real-time weather information.

### Features

- **Real-time Clock**: Displays current date, time, and timezone
- **Multi-City Weather**: Shows weather for 5 cities:
  - Singapore
  - Bangalore, India
  - Mumbai, India
  - Sydney, Australia
  - Bangkok, Thailand
- **Weather Details**: Temperature, humidity, wind speed, pressure, and conditions
- **Clean UI**: Built with Bootstrap 5 for a modern, responsive design
- **Auto-refresh**: Weather data updates every 10 minutes

### Running the Application

1. **Start the server**
   ```bash
   npm start
   ```

2. **Access the application**
   - Open your browser and navigate to: `http://localhost:3000`

3. **For development with auto-reload**
   ```bash
   npm run dev
   ```

### Project Structure

```
.
├── public/
│   ├── index.html      # Main HTML file with Bootstrap UI
│   ├── styles.css      # Custom styling
│   └── app.js          # Frontend JavaScript
├── server.js           # Express server and API endpoints
├── package.json        # Dependencies and scripts
├── .env.example        # Environment variables template
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

### API Endpoints

- `GET /` - Serves the main application
- `GET /api/weather` - Returns weather data for all configured cities

### Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **UI Framework**: Bootstrap 5
- **Icons**: Bootstrap Icons
- **Weather API**: OpenWeatherMap API
- **HTTP Client**: Axios

### Getting Your API Key

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Navigate to API Keys section
4. Copy your API key
5. Add it to your `.env` file

### Customization

**Adding More Cities:**

Edit [server.js](server.js#L14-L20) and add city coordinates to the `cities` array:

```javascript
{ name: 'Your City', lat: 0.0000, lon: 0.0000 }
```

**Changing Refresh Interval:**

Edit [public/app.js](public/app.js) line with `setInterval(fetchWeather, 600000)` and change `600000` (10 minutes in milliseconds).

## 🔮 Next Steps

- Advanced GitHub Actions workflows for CI/CD
- Deploy application to Azure App Service or GitHub Pages
- Add weather forecast (5-day prediction)
- Security features (Dependabot, Code scanning)
- Implement caching for API responses
- Add unit tests
### Tools

- [GitHub Desktop](https://desktop.github.com)
- [VS Code](https://code.visualstudio.com)
- [Git Graph Extension](https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph)
- [GitHub Pull Requests Extension](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github)

## 🔮 Next Steps

- **Coming Soon**: Node.js web application integration
- Advanced GitHub Actions workflows
- GitHub Pages deployment
- Security features (Dependabot, Code scanning)
- GitHub API integration

## 🤝 Contributing

This is a learning repository. Feel free to:
- Open issues for questions or suggestions
- Submit pull requests to improve documentation
- Share your feedback

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Participants

Add your name here after completing the exercises:
- [Your Name] - [Date Completed]

---

**Happy Learning! 🚀**

*Last Updated: January 13, 2026*
