# action-slack-notify

Github Action to check for presence or absence of a PR label

## Inputs

| Name           | Description           | Type     | Required | Default             |
| -------------- | --------------------- | -------- | -------- | ------------------- |
| `github_token` | A github token        | `string` | `false`  | `${{github.token}}` |
| `label`        | The label to test for | `string` | `true`   | N/A                 |

# Example use

TODO

```yml
steps:
  - name: Check for label
    uses: egmacke/action-check-label@v1
    with: TODO
```
