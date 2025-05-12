import { getInput, setFailed, setOutput, warning } from "@actions/core";
import { context, getOctokit } from "@actions/github";
import { allLabelsAbsent, allLabelsPresent } from "action/label-check";

enum State {
  PRESENT = "present",
  ABSENT = "absent",
}

const action = async () => {
  try {
    // Load input values
    const labels = getInput('label')
      .split('\n')
      .map(label => label.trim())
      .filter(l => l !== '');
    const requiredState = getInput("state") as State;
    const githubToken = getInput("github_token");
    const [owner, repo] = getInput("repo").split("/");
    const failOnError = getInput("fail_on_error") === "true";

    const client = getOctokit(githubToken);

    const pullRequest = await client.rest.pulls.get({
      owner,
      repo,
      pull_number: context.issue.number,
    });

    const prLabels = pullRequest.data.labels.map(label => label.name);

    // Only pass if all labels are in required state
    const pass = requiredState === State.PRESENT ? allLabelsPresent(labels, prLabels) : allLabelsAbsent(labels, prLabels);

    setOutput("pass", pass);

    if (!pass) {
      const message = labels.map(label => {
        const actualState = prLabels.some((prl) => prl === label)
        ? State.PRESENT
        : State.ABSENT

        if (actualState === requiredState) {
          return '';
        }
        return `\tLabel ${label} was expected to be ${requiredState} but was ${actualState}.`;
      }).filter(msg => msg !== '').join('\n');

      if (failOnError) {
        setFailed(`\n${message}`);
      } else {
        warning(`\n${message}`);
      }
    }
  } catch (error) {
    // Something went very wrong.
    setFailed(error as Error);
  }
};

action();
