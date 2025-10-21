# Testing Modernized Azure DevOps Templates

This branch contains test pipelines for validating the modernized Azure DevOps pipeline templates from the Cloud Excellence Team.

## Test Pipeline

- **File**: `.azure/azure-pipelines.test-modernized.yml`
- **Purpose**: Test the new `appservice-npm-container.yml` template
- **Execution**: Run in the kopps-public-react-web Azure DevOps project

## What's Being Tested

### Original Pipeline (azure-pipelines.pr.yml)
- Uses `templates/security/security-scans.yml` + `templates/test/docker.yml`
- Sequential execution
- Separate security and test templates

### New Modernized Pipeline (azure-pipelines.test-modernized.yml)
- Uses `stages/appservice-npm-container.yml`
- **Parallel execution**: Source security scans run parallel to build/test
- **Unified security template**: All security scans in one template
- **Modern Azure DevOps tasks**: `Gitleaks@2`, `trivy@2`, etc.
- **Container-first approach**: No host Node.js dependencies

## Key Improvements Tested

1. **Parallel Security Scanning**
   - Source code security scans (secrets, dependencies, SonarQube) run in parallel with container build/test
   - Faster feedback without blocking delivery

2. **Modern Tooling**
   - Uses official Azure DevOps extensions instead of manual tool installation
   - Consistent SARIF output for security findings

3. **Container-Native Workflow**
   - Build → Test → Deploy all use containers
   - No host-based npm/Node.js installation

4. **Simplified Maintenance**
   - Single template covers 80% of services
   - Reduces template sprawl and maintenance overhead

## Expected Behavior

The new pipeline should:
- ✅ Build the container image successfully
- ✅ Run unit and integration tests in parallel with security scans
- ✅ Generate security reports (non-blocking during introduction phase)
- ✅ Complete faster than the original due to parallelization
- ❌ Not deploy (disabled for testing)

## Variables Used

- **studadm-general-params**: Existing variable group (unchanged)
- **imageName**: kopps-public-react-web
- **imageTag**: $(Build.SourceVersion)

## Cleanup

After testing is complete, this branch and test pipeline can be deleted.

## Running the Test

1. Push this branch to GitHub
2. In Azure DevOps (kopps-public-react-web project):
   - Create new pipeline pointing to `.azure/azure-pipelines.test-modernized.yml`
   - Run manually to test
   - Compare execution time and results with existing PR pipeline