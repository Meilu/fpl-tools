const gitLastCommit = require('git-last-commit');
const fs = require('fs');
const path = require('path');

// Extract Git commit info and write to a file
gitLastCommit.getLastCommit(
  (err, commit) => {
    if (err) {
      console.error('Failed to get Git commit info:', err);
      return;
    }

    const gitInfoPath = path.resolve(__dirname, './git-info.json');
    console.log(commit);
    fs.writeFileSync(
      gitInfoPath,
      JSON.stringify({
       commit
      }, null, 2)
    );

    console.log('Git info written to src/git-info.json');
  },
  {
    // Options: Include all fields from the commit object
    fields: ['hash', 'shortHash', 'subject', 'committer', 'committerDate', 'author', 'authorDate', 'branch'],
  }
);
