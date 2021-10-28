# action-slack-notify

Github Action to check for presence or absence of a PR/issue label

## Inputs

| Name            | Description                                             | Type      | Required | Default                    |
| --------------- | ------------------------------------------------------- | --------- | -------- | -------------------------- |
| `label`         | The label to test for                                   | `string`  | `true`   | `N/A`                      |
| `state`         | The state of the label [`present`, `absent`]            | `string`  | `false`  | `present`                  |
| `github_token`  | A github token                                          | `string`  | `false`  | `${{github.token}}`        |
| `repo`          | The owner and repository name                           | `string`  | `false`  | `${{ github.repository }}` |
| `fail_on_error` | Whether to fail the workflow if the state doesn't match | `boolean` | `false`  | `false`                    |

## Output

| Name | Description                                                          |
| ---- | -------------------------------------------------------------------- |
| pass | Whether the state matched the expected state [`true`, `false`, `''`] |

# Example use

TODO

```yml
steps:
  - name: Check for label
    uses: egmacke/action-check-label@v1
    with:
      label: some-label
```
