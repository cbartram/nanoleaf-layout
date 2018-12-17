#!/usr/bin/env bash

GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

echo "${GREEN}==================${NC}"
echo "${GREEN}Starting Build... ${NC}"
echo "${GREEN}==================${NC}"

# Print Software Versions
node -v
npm -v
git --version
pwd

# Bundle assets and code with Webpack
echo "${GREEN}Bundling assets & Running Babel...${NC}"
webpack --config ./webpack.config.js --mode development

echo "${GREEN}Running Unit Tests...${NC}"
# Run any unit tests
npm test

# If Unit tests fail exit
if [[ $? -eq 1 ]]; then
    echo "${RED}Unit Tests Failed to Pass Fix them and try again.${NC}"
    exit 1;
else
    echo "${GREEN}Unit Tests Passed!${NC}"
fi

echo "${GREEN}Incrementing 'package.json' version${NC}"

# Increment Package.json version according to the env VERSION_NAME
node ./scripts/incrementVersion.js

if [[ $? -eq 0 ]]; then
    echo "${GREEN}Successfully Incremented Package version!${NC}"
    # Commit and Push with user's authorization
    git add .

    echo "${GREEN}What is your desired commit message?${NC}"
    read COMMIT_MESSAGE
    git commit -m "${COMMIT_MESSAGE}"

    # If PUSH env variable is true then actually perform the deploy
    if [[ PUSH -eq "true" ]]; then
        echo "${GREEN}Pushing and Deploying to NPM${NC}"
        git push
        exit 0;
    else
        echo "${GREEN}Run 'git push' if you would like to push to GitHub and Deploy to NPM${NC}"
        exit 0;
    fi
else
    echo "${RED}Failed to Increment Package Version. Check Error Message above${NC}"
    exit 1;
fi
