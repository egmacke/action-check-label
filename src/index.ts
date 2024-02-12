import { debug, getInput, setFailed, setOutput, warning } from "@actions/core";
import { context, getOctokit } from "@actions/github";

enum State {
  PRESENT = "present",
  ABSENT = "absent",
}

const action = async () => {
  try {
    const labelInput = getInput('label');
    setOutput('labelInput', labelInput);
    console.log(labelInput);
    debug(labelInput);
    // Load input values
    const labels = getInput('label')
      .split('\n')
      .filter(l => l !== '');
    // const label = getInput("label", { required: true });
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

    const prLabels = pullRequest.data.labels;

    const labelStates = labels.map(label => prLabels.some((prl) => prl.name === label)
      ? State.PRESENT
      : State.ABSENT);

    // Set state output to absent if any labels are missing.
    const actualState = labelStates.some(state => state === State.ABSENT);

    // Only pass if all labels are in required state
    const pass = labelStates.every(state => state === requiredState)

    setOutput("state", actualState);

    setOutput("pass", pass);

    if (!pass) {
      const message = labels.map(label => {
        const actualState = prLabels.some((prl) => prl.name === label)
        ? State.PRESENT
        : State.ABSENT
        return `Label ${label} was expected to be ${requiredState} but was ${actualState}`
      }).join('\n');

      if (failOnError) {
        setFailed(message);
      } else {
        warning(message);
      }
    }
  } catch (error) {
    // Something went very wrong.
    setFailed(error as Error);
  }
};

action();
