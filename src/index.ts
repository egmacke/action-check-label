import { getInput, setFailed, setOutput } from "@actions/core";
import { context, getOctokit } from "@actions/github";

enum State {
  PRESENT = "present",
  ABSENT = "absent",
}

const action = async () => {
  try {
    // Load input values
    const label = getInput("label", { required: true });
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

    const actualState = prLabels.some((prl) => prl.name === label)
      ? State.PRESENT
      : State.ABSENT;
    setOutput("state", actualState);

    const pass = actualState === requiredState;

    setOutput("pass", pass);

    if (!pass && failOnError) {
      setFailed(
        `Label ${label} was expected to be ${requiredState} but was ${actualState}`
      );
    }
  } catch (error) {
    // Something went very wrong.
    setFailed(error);
  }
};

action();
